<?php
/**
 * Aura Diamond Atelier — Products & Catalog Controller
 * Migrated from Node.js (productController.ts, filterController.ts) to PHP 8.3 / PDO MySQL
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

if (!function_exists('safeJsonParse')) {
    function safeJsonParse(?string $val, mixed $fallback): mixed {
        if (empty($val)) return $fallback;
        $decoded = json_decode($val, true);
        return is_array($decoded) ? $decoded : $fallback;
    }
}

if (!function_exists('getEtsyDescriptionMap')) {
    function getEtsyDescriptionMap(): array {
        static $map = null;
        if ($map !== null) return $map;

        $map = [];
        $csvPath = __DIR__ . '/../../EtsyListingsDownload.csv';
        if (!file_exists($csvPath)) {
            $csvPath = __DIR__ . '/../EtsyListingsDownload.csv';
        }
        if (!file_exists($csvPath)) {
            $csvPath = 'd:/Aura Diamond Atelier/EtsyListingsDownload.csv';
        }

        if (file_exists($csvPath) && ($handle = @fopen($csvPath, 'r')) !== false) {
            $headers = fgetcsv($handle);
            while (($row = fgetcsv($handle)) !== false) {
                $t = trim($row[0] ?? '');
                $d = trim($row[1] ?? '');
                if (!empty($t) && !empty($d)) {
                    $norm = strtolower(preg_replace('/[^a-z0-9]/i', '', $t));
                    $map[$norm] = $d;
                }
            }
            fclose($handle);
        }
        return $map;
    }
}

if (!function_exists('ensureDescriptionSchemaFix')) {
    function ensureDescriptionSchemaFix(): void {
        static $done = false;
        if ($done) return;
        try {
            $pdo = getDatabaseConnection();
            @$pdo->exec("ALTER TABLE `product` MODIFY COLUMN `fullDescription` LONGTEXT NULL");
            @$pdo->exec("ALTER TABLE `product` MODIFY COLUMN `shortDescription` LONGTEXT NULL");
            @$pdo->exec("ALTER TABLE `product` MODIFY COLUMN `description` LONGTEXT NULL");
            @$pdo->exec("ALTER TABLE `product` MODIFY COLUMN `specifications` LONGTEXT NULL");
            @$pdo->exec("ALTER TABLE `product` MODIFY COLUMN `accordionsConfig` LONGTEXT NULL");
            $done = true;
        } catch (Throwable $e) {}
    }
}

if (!function_exists('getFullDescriptionForProduct')) {
    function getFullDescriptionForProduct(array $product): string {
        ensureDescriptionSchemaFix();
        $dbFull = trim($product['fullDescription'] ?? ($product['description'] ?? ''));

        $standardSuffix = "\n\n💎 Handcrafted & Made to Order\nEvery piece we make is done to order right here in our workshop. We never grab pre-made items off a shelf. Our master jewelers cast the metal and set your stones one by one, which means your jewelry gets a proper, secure setting that can handle everyday life. If you need an engagement ring or just want a new bespoke piece, we create it to perfection.\n━━━━━━━━━━━━━━━━━━\n🎨 Customize Your Design\nWe handle both loose diamond sourcing and finished custom jewelry in-house, so changing up a design is no problem at all.\n✔️ Want a bigger center stone?\n✔️ Need a different prong style?\n✔️ Looking for a matching band?\n✔️ Need help sourcing a specific stone?\n✔️ Want a totally new custom design?\nSend over a message and we can work out the details.\n━━━━━━━━━━━━━━━━━━\n🚚 Production & Delivery\n⏱️ Crafting Time: Give us 7 to 12 business days to make it.\n🌐 Delivery: Secure insured shipping anywhere in the world.\n🎁 Packaging: Arrives packed in luxury presentation box, ready to gift.\n━━━━━━━━━━━━━━━━━━\n📋 Cancellations & Returns\n* Canceled within 3 hours: 10% fee applies.\n* Canceled after 6 hours: 20% fee applies.\n* Returns: Let us know within 7 days of delivery. Keep in mind that anything custom-made, personalized, or engraved is a final sale.\n━━━━━━━━━━━━━━━━━━\n❤️ About Aura Diamond Atelier\nAura Diamond Atelier is a premier fine jewellery atelier. We source certified loose lab-grown and natural diamonds directly, and we cast and hand-finish every piece of fine jewellery in-house.\n📩 Reach out if you need advice on picking a stone or want to start a custom build!";

        // If dbFull is already complete (> 600 chars and has section headers), return it
        if (!empty($dbFull) && strlen($dbFull) > 600 && str_contains($dbFull, 'Handcrafted') && str_contains($dbFull, 'Aura Diamond Atelier')) {
            return $dbFull;
        }

        // Try lookup in Etsy CSV map
        $title = $product['title'] ?? ($product['name'] ?? '');
        if (!empty($title)) {
            $map = getEtsyDescriptionMap();
            $norm = strtolower(preg_replace('/[^a-z0-9]/i', '', $title));
            if (isset($map[$norm]) && strlen($map[$norm]) > 600) {
                return $map[$norm];
            }
            foreach ($map as $normKey => $fullText) {
                if (!empty($normKey) && strlen($fullText) > 600) {
                    if (str_contains($normKey, substr($norm, 0, 15)) || str_contains($norm, substr($normKey, 0, 15))) {
                        return $fullText;
                    }
                }
            }
        }

        // Clean truncated end markers if present
        $cleanBase = $dbFull;
        $truncatedMarkers = [
            'Every piece we make',
            'Every piece we make is done to order right here in ou',
            'Every piece we make is done to order right here in our S',
            'Every piece we make is done to order right here in',
            'Handcrafted & Made to Order',
            'ðŸ’Ž Handcrafted & Made to Order',
            '💎 Handcrafted & Made to Order'
        ];

        foreach ($truncatedMarkers as $marker) {
            $pos = strrpos($cleanBase, $marker);
            if ($pos !== false && $pos > 20) {
                $cleanBase = trim(substr($cleanBase, 0, $pos));
                break;
            }
        }

        if (empty($cleanBase)) {
            $cleanBase = !empty($title) ? $title : 'Aura Atelier Fine Jewellery Piece';
        }

        return $cleanBase . $standardSuffix;
    }
}

if (!function_exists('mapProductResponse')) {
    function mapProductResponse(array $product, ?array $customerPriceRecord = null): array {
        $images = $product['images'] ?? [];
        if (is_array($images) && count($images) > 0) {
            usort($images, function($a, $b) {
                return ($a['position'] ?? 0) - ($b['position'] ?? 0);
            });
        } else {
            $images = [];
        }

        $primaryImage = null;
        foreach ($images as $img) {
            if (($img['imageType'] ?? '') === 'primary' || ($img['imageType'] ?? '') === 'hero') {
                $primaryImage = $img['url'];
                break;
            }
        }
        if (!$primaryImage && count($images) > 0) {
            $primaryImage = $images[0]['url'];
        }
        if (!$primaryImage && !empty($product['mainImage']) && $product['mainImage'] !== '/assets/gem_rings_cat.png') {
            $primaryImage = $product['mainImage'];
        }
        if (!$primaryImage) {
            $primaryImage = $product['mainImage'] ?? '/assets/gem_rings_cat.png';
        }

        $secondaryImage = null;
        if (count($images) > 1) {
            $secondaryImage = $images[1]['url'];
        }
        if (!$secondaryImage && !empty($product['secondaryImage']) && $product['secondaryImage'] !== '/assets/gem_rings_cat.png') {
            $secondaryImage = $product['secondaryImage'];
        }
        if (!$secondaryImage) {
            $secondaryImage = $product['secondaryImage'] ?? null;
        }

        $availableRingSizes = safeJsonParse($product['availableRingSizes'] ?? null, [
            'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'
        ]);

        $rawMetals = safeJsonParse($product['metalsConfig'] ?? null, [
            ['label' => '14K Yellow Gold', 'code' => '14k', 'circleColor' => '#E8C872', 'priceAdjustment' => 0],
            ['label' => '14K White Gold', 'code' => '14k', 'circleColor' => '#CBD5E1', 'priceAdjustment' => 0],
            ['label' => '14K Rose Gold', 'code' => '14k', 'circleColor' => '#E4A8A5', 'priceAdjustment' => 0],
            ['label' => '18K Yellow Gold', 'code' => '18k', 'circleColor' => '#E8C872', 'priceAdjustment' => 250],
            ['label' => '18K White Gold', 'code' => '18k', 'circleColor' => '#CBD5E1', 'priceAdjustment' => 350],
            ['label' => '18K Rose Gold', 'code' => '18k', 'circleColor' => '#E4A8A5', 'priceAdjustment' => 350],
        ]);

        $metalsConfig = array_values(array_filter($rawMetals, function($m) {
            $lbl = strtolower($m['label'] ?? '');
            return !str_contains($lbl, '9k') && !str_contains($lbl, '10k') && !str_contains($lbl, 'platinum') && !str_contains($lbl, 'silver') && !str_contains($lbl, 'ag');
        }));

        $benefitsConfig = safeJsonParse($product['benefitsConfig'] ?? null, [
            ['icon' => 'Truck', 'title' => 'Free Insured Delivery'],
            ['icon' => 'ShieldCheck', 'title' => 'Lifetime Service Warranty'],
            ['icon' => 'Award', 'title' => 'GIA / IGI Certification']
        ]);

        $accordionsConfig = safeJsonParse($product['accordionsConfig'] ?? null, [
            ['id' => 'experience', 'title' => 'YOUR ATELIER EXPERIENCE', 'content' => 'Every creation is handcrafted in our atelier using certified conflict-free diamonds and 100% recycled precious metals.'],
            ['id' => 'details', 'title' => 'PRODUCT & DIAMOND SPECIFICATIONS', 'content' => 'Each diamond is individually selected for optimum brilliance, fire, and symmetry. Hand-set under 40x microscopic precision with official IGI / GIA certification detailing cut, color, clarity, and carat weight.'],
            ['id' => 'craftsmanship', 'title' => 'CRAFTSMANSHIP & SUSTAINABILITY', 'content' => 'Handcrafted in our atelier using 100% recycled solid gold. Ethically created with 100% Kimberley Process certified, conflict-free lab-grown & natural diamonds.'],
            ['id' => 'shipping', 'title' => 'SHIPPING & DELIVERY', 'content' => 'After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery.']
        ]);

        // Sanitize any existing shipping accordion content dynamically
        if (is_array($accordionsConfig)) {
            foreach ($accordionsConfig as $idx => $acc) {
                if (isset($acc['content']) && is_string($acc['content'])) {
                    $c = $acc['content'];
                    $c = str_replace('FedEx Priority Air', 'Priority Air', $c);
                    $c = str_replace('FedEx locations', 'express courier locations', $c);
                    $c = str_replace('FedEx', 'Priority Air', $c);
                    $c = str_replace('We also offer a 30-day return policy, subject to our return terms and conditions.', '', $c);
                    $c = str_replace('30-day return policy.', '', $c);
                    $accordionsConfig[$idx]['content'] = trim($c);
                }
            }
        }

        $pricingMatrix = safeJsonParse($product['pricingMatrix'] ?? null, new stdClass());
        $rawVariations = safeJsonParse($product['variationsJson'] ?? null, []);
        $variationsConfig = array_values(array_filter($rawVariations, function($v) {
            $metalStr = strtolower($v['metal'] ?? '');
            return !str_contains($metalStr, '9k') && !str_contains($metalStr, '10k') && !str_contains($metalStr, 'silver') && !str_contains($metalStr, 'ag') && !str_contains($metalStr, 'platinum');
        }));

        $customOptionsConfig = safeJsonParse($product['customOptionsJson'] ?? null, []);
        $shippingInfoConfig  = safeJsonParse($product['shippingInfoJson'] ?? null, [
            'title' => 'Shipping & Delivery',
            'description' => 'Dispatched via fully insured Priority Air in discreet unbranded outer security packaging.',
            'returnsPolicy' => 'Service Warranty Included'
        ]);
        $schemaInformation   = safeJsonParse($product['schemaInformation'] ?? null, null);

        $price           = (float) ($product['price'] ?? 2500.0);
        $comparePrice    = isset($product['comparePrice']) && $product['comparePrice'] !== null ? (float) $product['comparePrice'] : null;
        $onSaleFlag      = isset($product['onSale']) ? (bool) $product['onSale'] : false;
        $salePriceVal    = isset($product['salePrice']) && $product['salePrice'] !== null ? (float) $product['salePrice'] : null;

        if ($customerPriceRecord !== null && isset($customerPriceRecord['specialPrice'])) {
            $effectivePrice = (float) $customerPriceRecord['specialPrice'];
        } elseif ($onSaleFlag && $salePriceVal !== null && $salePriceVal > 0) {
            $effectivePrice = $salePriceVal;
            if ($comparePrice === null || $comparePrice <= $effectivePrice) {
                $comparePrice = $price;
            }
        } else {
            $effectivePrice = $price;
        }

        $isOnSale = $onSaleFlag || ($comparePrice !== null && $comparePrice > $effectivePrice);
        $salePrice = $isOnSale ? $effectivePrice : null;

        $title = $product['title'] ?? ($product['name'] ?? 'Aura Atelier Creation');
        $diamondDetails = safeJsonParse($product['diamondDetailsJson'] ?? null, [
            'shape' => $product['shape'] ?? 'Round',
            'caratWeight' => (float) ($product['carat'] ?? 1.0),
            'color' => $product['color'] ?? 'D',
            'clarity' => $product['clarity'] ?? 'VS1',
            'cut' => $product['cut'] ?? 'Excellent',
            'polish' => 'Excellent',
            'symmetry' => 'Excellent',
            'fluorescence' => 'None',
            'certification' => $product['certification'] ?? 'IGI',
            'certificateNumber' => $product['certificateNo'] ?? '',
            'origin' => ($product['diamondType'] ?? '') === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural',
            'measurements' => ''
        ]);

        $internalTags = safeJsonParse($product['internalTagsJson'] ?? null, []);
        $seoSocial    = safeJsonParse($product['seoSocialJson'] ?? null, [
            'keywords' => $product['metaKeywords'] ?? '',
            'ogTitle' => $product['metaTitle'] ?? $title,
            'ogDescription' => $product['metaDescription'] ?? ($product['shortDescription'] ?? ''),
            'socialImage' => $product['ogImage'] ?? $primaryImage,
            'twitterTitle' => $product['metaTitle'] ?? $title,
            'twitterDescription' => $product['metaDescription'] ?? ($product['shortDescription'] ?? ''),
            'canonicalUrl' => !empty($product['slug']) ? "https://auroradiamonds.com/product/{$product['slug']}" : ''
        ]);

        $rawFull = getFullDescriptionForProduct($product);
        $rawShort = $product['shortDescription'] ?? ($product['fullDescription'] ?? ($product['description'] ?? ''));

        $mojibakeFix = [
            'ðŸ’Ž' => '💎', 'ðŸ†' => '🏷️', 'ðŸŸ¡' => '🟡', 'âšª' => '⚪', 'ðŸ©·' => '🩷',
            'ðŸŽ¨' => '🎨', 'ðŸšš' => '🚚', 'â±ï¸' => '⏱️', 'ðŸŒŽ' => '🌐', 'ðŸŽ' => '🎁',
            'ðŸ“‹' => '📋', 'â¤ï¸' => '❤️', 'ðŸ“©' => '📩', 'âœ“' => '✓', 'âœ”ï¸' => '✔️',
            'â€¢' => '•', 'â”' => '─', 'Ã©' => 'é', 'Ã ' => 'à'
        ];

        $resolvedDesc = is_string($rawFull) ? strtr($rawFull, $mojibakeFix) : '';
        $resolvedShortDesc = is_string($rawShort) ? strtr($rawShort, $mojibakeFix) : '';

        $res = $product;
        $res['shortDescription']         = $resolvedShortDesc;
        $res['fullDescription']          = $resolvedDesc;
        $res['description']              = $resolvedDesc;
        $res['price']                   = $effectivePrice;
        $res['comparePrice']            = $comparePrice;
        $res['salePrice']               = $salePrice;
        $res['onSale']                  = $isOnSale ? 1 : 0;
        $res['stockQuantity']           = isset($res['stockQuantity']) ? (int) $res['stockQuantity'] : 10;
        $res['title']                   = $title;
        $res['name']                    = $title;
        $res['primaryImage']            = $primaryImage;
        $res['secondaryImage']          = $secondaryImage;
        $res['originalPublicPrice']     = $rawPrice;
        $res['hasCustomerSpecialPrice'] = $customerPriceRecord !== null;
        $res['pricingMode']             = $product['pricingMode'] ?? 'BASE';
        $res['enableMetalSelection']    = isset($product['enableMetalSelection']) ? (bool) $product['enableMetalSelection'] : true;
        $res['enableDiamondSelection']  = false;
        $res['enableDiamondShape']      = false;
        $res['enableCustomOptions']     = isset($product['enableCustomOptions']) ? (bool) $product['enableCustomOptions'] : false;
        $res['enableRingSize']          = isset($product['enableRingSize']) ? (bool) $product['enableRingSize'] : true;
        $res['ringSizeMode']            = $product['ringSizeMode'] ?? 'CUSTOMER_SELECTABLE';
        $res['fixedRingSize']           = $product['fixedRingSize'] ?? '7';
        $res['masterPrice14k']          = isset($product['masterPrice14k']) ? (float) $product['masterPrice14k'] : 2500.0;
        $res['masterPrice18k']          = isset($product['masterPrice18k']) ? (float) $product['masterPrice18k'] : 2750.0;
        $res['masterPriceSilver']       = isset($product['masterPriceSilver']) ? (float) $product['masterPriceSilver'] : 2000.0;
        $res['availableRingSizes']      = $availableRingSizes;
        $res['isRingSizeRequired']      = isset($product['isRingSizeRequired']) ? (bool) $product['isRingSizeRequired'] : true;
        $res['metalsConfig']            = $metalsConfig;
        $res['diamondsConfig']          = [];

        if (!is_array($accordionsConfig)) {
            $accordionsConfig = [];
        }

        if (!empty($resolvedDesc)) {
            $hasOverview = false;
            foreach ($accordionsConfig as $idx => $accItem) {
                if (is_array($accItem)) {
                    $accId = strtolower($accItem['id'] ?? '');
                    $accTitle = strtoupper($accItem['title'] ?? '');
                    if ($accId === 'overview' || str_contains($accTitle, 'DESCRIPTION') || str_contains($accTitle, 'OVERVIEW')) {
                        $accordionsConfig[$idx]['title'] = 'PRODUCT OVERVIEW & DESCRIPTION';
                        $accordionsConfig[$idx]['content'] = $resolvedDesc;
                        $hasOverview = true;
                        break;
                    }
                }
            }
            if (!$hasOverview) {
                array_unshift($accordionsConfig, [
                    'id' => 'overview',
                    'title' => 'PRODUCT OVERVIEW & DESCRIPTION',
                    'content' => $resolvedDesc
                ]);
            }
        }

        $res['benefitsConfig']          = $benefitsConfig;
        $res['accordionsConfig']        = $accordionsConfig;
        $res['pricingMatrix']          = $pricingMatrix;
        $res['variations']              = $variationsConfig;
        $res['customOptions']           = $customOptionsConfig;
        $res['shippingInfo']            = $shippingInfoConfig;
        $res['schemaInformation']       = $schemaInformation;
        $res['saleEndsAt']              = $product['saleEndsAt'] ?? null;
        $res['diamondDetails']          = $diamondDetails;
        $res['internalTags']            = $internalTags;
        $res['seoSocial']               = $seoSocial;

        // Fetch customer reviews for this product from the database
        $reviewCount = 0;
        $avgRating = 5.0;
        $reviewsList = [];

        if ($pdo && !empty($product['id'])) {
            $pId = $product['id'];
            $pSku = $product['sku'] ?? '';
            $pSlug = $product['slug'] ?? '';

            try {
                $revStmt = $pdo->prepare("SELECT r.*, p.name as productName FROM `review` r LEFT JOIN `product` p ON (r.productId = p.id OR r.productId = p.sku OR r.productId = p.slug) WHERE (r.productId = ? OR r.productId = ? OR r.productId = ? OR p.id = ? OR p.slug = ? OR p.sku = ?) ORDER BY r.createdAt DESC");
                $revStmt->execute([$pId, $pSku, $pSlug, $pId, $pSlug, $pSku]);
                $rawList = $revStmt->fetchAll() ?: [];

                $reviewsList = array_map(function($r) use ($product) {
                    $comment = $r['comment'] ?? ($r['content'] ?? '');
                    $title = $r['title'] ?? '';
                    $text = $comment;
                    if (empty($title) && str_contains($comment, "\n\n")) {
                        $parts = explode("\n\n", $comment, 2);
                        $title = $parts[0];
                        $text = $parts[1];
                    } else if (empty($title) && str_contains($comment, "\n")) {
                        $parts = explode("\n", $comment, 2);
                        $title = $parts[0];
                        $text = $parts[1];
                    }
                    if (empty($title)) {
                        $title = 'Exceeded Every Expectation!';
                    }
                    $authorName = $r['author'] ?? ($r['authorName'] ?? 'Verified Buyer');
                    return [
                        'id' => $r['id'] ?? ('rev_' . uniqid()),
                        'name' => $authorName,
                        'author' => $authorName,
                        'rating' => (int) ($r['rating'] ?? 5),
                        'title' => $title,
                        'text' => $text,
                        'comment' => $comment,
                        'verified' => true,
                        'date' => isset($r['createdAt']) ? date('m/d/y', strtotime($r['createdAt'])) : date('m/d/y'),
                        'createdAt' => $r['createdAt'] ?? date('Y-m-d H:i:s'),
                        'productReviewed' => $r['productName'] ?? ($product['title'] ?? ($product['name'] ?? 'Aura Atelier Creation')),
                        'response' => $r['response'] ?? null
                    ];
                }, $rawList);

                $reviewCount = count($reviewsList);
                if ($reviewCount > 0) {
                    $sum = 0;
                    foreach ($reviewsList as $rItem) {
                        $sum += (int) ($rItem['rating'] ?? 5);
                    }
                    $avgRating = round($sum / $reviewCount, 1);
                }
            } catch (Throwable $e) {
                error_log("Failed to fetch reviews for product {$pId}: " . $e->getMessage());
            }
        }

        $res['reviewCount'] = $reviewCount;
        $res['avgRating']   = $avgRating;
        $res['reviews']     = $reviewsList;

        return $res;
    }
}

/**
 * GET /api/v1/products
 */
function handleGetProducts(): void {
    $page  = max(1, (int) ($_GET['page'] ?? 1));
    $limit = max(1, min(500, (int) ($_GET['limit'] ?? 100)));
    $offset = ($page - 1) * $limit;

    try {
        $pdo = getDatabaseConnection();

        $whereClauses = [];
        $params = [];

        if (!empty($_GET['id'])) {
            $whereClauses[] = "`p`.`id` = ?";
            $params[] = $_GET['id'];
        } else if (!empty($_GET['status']) && $_GET['status'] !== 'ALL') {
            $whereClauses[] = "`p`.`status` = ?";
            $params[] = $_GET['status'];
        } else if (($_GET['status'] ?? '') === 'ALL' || ($_GET['includeDrafts'] ?? '') === 'true' || ($_GET['admin'] ?? '') === 'true') {
            // Include drafts/all status types
        } else {
            $whereClauses[] = "`p`.`status` = 'ACTIVE'";
        }

        // Category Filter
        $categoryParam = $_GET['category'] ?? ($_GET['jewelleryType'] ?? null);
        if (!empty($categoryParam) && strtolower($categoryParam) !== 'all') {
            $catSlug = strtolower(trim($categoryParam));
            $whereClauses[] = "(LOWER(`c`.`slug`) = ? OR LOWER(`c`.`name`) = ?)";
            $params[] = $catSlug;
            $params[] = $catSlug;
        }

        // Gender Filter
        if (!empty($_GET['gender']) && strtolower($_GET['gender']) !== 'all') {
            $g = strtolower(trim($_GET['gender']));
            $whereClauses[] = "(LOWER(`p`.`gender`) = ? OR LOWER(`p`.`gender`) = 'unisex' OR `p`.`gender` IS NULL)";
            $params[] = $g;
        }

        // Style Filter
        if (!empty($_GET['style']) && strtolower($_GET['style']) !== 'all') {
            $s = strtolower(trim($_GET['style']));
            $whereClauses[] = "(LOWER(`p`.`style`) LIKE ? OR LOWER(`p`.`name`) LIKE ?)";
            $params[] = '%' . $s . '%';
            $params[] = '%' . $s . '%';
        }

        // Metal Filter
        if (!empty($_GET['metal']) && strtolower($_GET['metal']) !== 'all') {
            $m = strtolower(trim($_GET['metal']));
            $whereClauses[] = "(LOWER(`p`.`metal`) LIKE ? OR LOWER(`p`.`metalsConfig`) LIKE ? OR LOWER(`p`.`name`) LIKE ?)";
            $params[] = '%' . $m . '%';
            $params[] = '%' . $m . '%';
            $params[] = '%' . $m . '%';
        }

        // Shape Filter
        if (!empty($_GET['shape']) && strtolower($_GET['shape']) !== 'all') {
            $sh = strtolower(trim($_GET['shape']));
            $whereClauses[] = "(LOWER(`p`.`shape`) = ? OR LOWER(`p`.`diamondDetailsJson`) LIKE ?)";
            $params[] = $sh;
            $params[] = '%"' . $sh . '"%';
        }

        // Diamond Type / Origin Filter
        if (!empty($_GET['diamondType']) && strtolower($_GET['diamondType']) !== 'all') {
            $dt = strtolower(trim($_GET['diamondType']));
            $whereClauses[] = "LOWER(`p`.`diamondType`) LIKE ?";
            $params[] = '%' . $dt . '%';
        }

        // Color Filter
        if (!empty($_GET['color']) && strtolower($_GET['color']) !== 'any' && strtolower($_GET['color']) !== 'all') {
            $c = strtoupper(trim($_GET['color']));
            $whereClauses[] = "UPPER(`p`.`color`) = ?";
            $params[] = $c;
        }

        // Clarity Filter
        if (!empty($_GET['clarity']) && strtolower($_GET['clarity']) !== 'any' && strtolower($_GET['clarity']) !== 'all') {
            $cla = strtoupper(trim($_GET['clarity']));
            $whereClauses[] = "UPPER(`p`.`clarity`) = ?";
            $params[] = $cla;
        }

        // Cut Filter
        if (!empty($_GET['cut']) && strtolower($_GET['cut']) !== 'any' && strtolower($_GET['cut']) !== 'all') {
            $cutVal = strtolower(trim($_GET['cut']));
            $whereClauses[] = "LOWER(`p`.`cut`) = ?";
            $params[] = $cutVal;
        }

        // Certification Filter
        if (!empty($_GET['certification']) && strtolower($_GET['certification']) !== 'any' && strtolower($_GET['certification']) !== 'all') {
            $cert = strtoupper(trim($_GET['certification']));
            $whereClauses[] = "UPPER(`p`.`certification`) = ?";
            $params[] = $cert;
        }

        // Price Filter
        if (!empty($_GET['minPrice'])) {
            $whereClauses[] = "`p`.`price` >= ?";
            $params[] = (float) $_GET['minPrice'];
        }
        if (!empty($_GET['maxPrice'])) {
            $whereClauses[] = "`p`.`price` <= ?";
            $params[] = (float) $_GET['maxPrice'];
        }

        // Search Query Engine (search, q, or query)
        $searchRaw = trim($_GET['search'] ?? ($_GET['q'] ?? ($_GET['query'] ?? '')));
        $sortOrder = "`p`.`createdAt` DESC";
        
        if (!empty($searchRaw)) {
            $searchLower = strtolower(trim($searchRaw));
            
            // 1. Synonym & Term Expansion
            $termExpansions = [$searchLower];
            
            // Carat Weight Patterns (e.g. 7ct -> 7 ct, 7 carat, 7carat, 7.00 ct)
            if (preg_match('/(\d+(?:\.\d+)?)\s*(ct|carat|cwt)/i', $searchLower, $m)) {
                $num = $m[1];
                $termExpansions[] = "{$num} ct";
                $termExpansions[] = "{$num}ct";
                $termExpansions[] = "{$num} carat";
                $termExpansions[] = "{$num}carat";
                $termExpansions[] = "{$num}.00 ct";
                $termExpansions[] = "{$num}.00ct";
            }
            
            // Metals
            if (str_contains($searchLower, 'white gold') || str_contains($searchLower, 'wg')) {
                $termExpansions[] = '14k white gold';
                $termExpansions[] = '18k white gold';
            }
            if (str_contains($searchLower, 'yellow gold') || str_contains($searchLower, 'yg')) {
                $termExpansions[] = '14k yellow gold';
                $termExpansions[] = '18k yellow gold';
            }
            if (str_contains($searchLower, 'rose gold') || str_contains($searchLower, 'rg')) {
                $termExpansions[] = '14k rose gold';
                $termExpansions[] = '18k rose gold';
            }
            
            // Lab Grown / Natural
            if (str_contains($searchLower, 'lab') || str_contains($searchLower, 'cvd') || str_contains($searchLower, 'hpht')) {
                $termExpansions[] = 'lab grown';
                $termExpansions[] = 'lab diamond';
            }

            // Clean keywords (remove stop words)
            $rawWords = array_values(array_filter(explode(' ', preg_replace('/[^a-z0-9.]/i', ' ', $searchLower))));
            $stopWords = ['and', 'the', 'with', 'for', 'in', 'of', 'a', 'an', 'to'];
            $keywords = array_values(array_filter($rawWords, fn($w) => !in_array($w, $stopWords) && strlen($w) > 0));

            // Multi-Token Intersect Grouping (AND condition for each keyword)
            $tokenAndClauses = [];
            foreach ($keywords as $kw) {
                // Determine expanded variations for this token
                $subVariations = [$kw];
                if (preg_match('/^\d+(?:\.\d+)?$/', $kw)) {
                    $subVariations[] = "{$kw}ct";
                    $subVariations[] = "{$kw} ct";
                    $subVariations[] = "{$kw} carat";
                } elseif (in_array($kw, ['ct', 'carat'])) {
                    $subVariations = ['ct', 'carat'];
                }

                $kwOrs = [];
                foreach ($subVariations as $sv) {
                    $kwOrs[] = "LOWER(`p`.`name`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`title`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`sku`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`jewelleryType`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`shape`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`metal`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`shortDescription`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`p`.`fullDescription`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                    $kwOrs[] = "LOWER(`c`.`name`) LIKE ?";
                    $params[] = '%' . $sv . '%';
                }
                $tokenAndClauses[] = "(" . implode(' OR ', $kwOrs) . ")";
            }

            if (count($tokenAndClauses) > 0) {
                $whereClauses[] = "(" . implode(' AND ', $tokenAndClauses) . ")";
            }

            // Weighted Relevance Score Ranking
            $exactTerm = $pdo->quote($searchLower);
            $startTerm = $pdo->quote($searchLower . '%');
            $likeTerm  = $pdo->quote('%' . $searchLower . '%');

            $sortOrder = "(
                (CASE WHEN LOWER(`p`.`name`) = {$exactTerm} THEN 100 ELSE 0 END) +
                (CASE WHEN LOWER(`p`.`name`) LIKE {$startTerm} THEN 80 ELSE 0 END) +
                (CASE WHEN LOWER(`p`.`name`) LIKE {$likeTerm} THEN 50 ELSE 0 END) +
                (CASE WHEN LOWER(`p`.`sku`) LIKE {$likeTerm} THEN 60 ELSE 0 END) +
                (CASE WHEN LOWER(`c`.`name`) LIKE {$likeTerm} THEN 40 ELSE 0 END) +
                (CASE WHEN LOWER(`p`.`shape`) = {$exactTerm} THEN 70 ELSE 0 END)
            ) DESC, `p`.`createdAt` DESC";
        }

        $whereSql = count($whereClauses) > 0 ? "WHERE " . implode(' AND ', $whereClauses) : "";

        // Count total matching products
        $countStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `product` `p` LEFT JOIN `category` `c` ON `p`.`categoryId` = `c`.`id` {$whereSql}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['cnt'];

        // Fallback: If 0 results returned on AND search, try broader OR search across keywords
        if ($total === 0 && !empty($searchRaw) && count($keywords) > 1) {
            // Reset params to pre-search state
            $params = [];
            $whereClauses = ["`p`.`status` = 'ACTIVE'"];
            
            $orClauses = [];
            foreach ($keywords as $kw) {
                if (in_array($kw, ['ring', 'jewel', 'jewelry', 'diamond'])) continue;
                $orClauses[] = "LOWER(`p`.`name`) LIKE ?";
                $params[] = '%' . $kw . '%';
                $orClauses[] = "LOWER(`p`.`shape`) LIKE ?";
                $params[] = '%' . $kw . '%';
                $orClauses[] = "LOWER(`c`.`name`) LIKE ?";
                $params[] = '%' . $kw . '%';
            }
            if (count($orClauses) > 0) {
                $whereClauses[] = "(" . implode(' OR ', $orClauses) . ")";
                $whereSql = "WHERE " . implode(' AND ', $whereClauses);
                
                $countStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM `product` `p` LEFT JOIN `category` `c` ON `p`.`categoryId` = `c`.`id` {$whereSql}");
                $countStmt->execute($params);
                $total = (int) $countStmt->fetch()['cnt'];
            }
        }

        // Fetch products
        $sql = "SELECT `p`.*, `c`.`name` as `category_name`, `c`.`slug` as `category_slug` 
                FROM `product` `p` 
                LEFT JOIN `category` `c` ON `p`.`categoryId` = `c`.`id` 
                {$whereSql} 
                ORDER BY {$sortOrder} 
                LIMIT {$limit} OFFSET {$offset}";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rawProducts = $stmt->fetchAll();

        // Fetch images for returned products
        $productIds = array_column($rawProducts, 'id');
        $imagesByProduct = [];
        if (count($productIds) > 0) {
            $inClause = implode(',', array_fill(0, count($productIds), '?'));
            $imgStmt = $pdo->prepare("SELECT * FROM `productimage` WHERE `productId` IN ({$inClause}) ORDER BY `position` ASC");
            $imgStmt->execute($productIds);
            foreach ($imgStmt->fetchAll() as $img) {
                $imagesByProduct[$img['productId']][] = $img;
            }
        }

        $mapped = [];
        foreach ($rawProducts as $p) {
            $p['images'] = $imagesByProduct[$p['id']] ?? [];
            if (!empty($p['category_name'])) {
                $p['category'] = ['id' => $p['categoryId'], 'name' => $p['category_name'], 'slug' => $p['category_slug']];
            }
            $mapped[] = mapProductResponse($p);
        }

        jsonResponse([
            'products'   => $mapped,
            'pagination' => [
                'total'      => $total,
                'page'       => $page,
                'limit'      => $limit,
                'totalPages' => (int) ceil($total / $limit)
            ]
        ], 200);

    } catch (Throwable $e) {
        error_log("handleGetProducts error: " . $e->getMessage());
        jsonResponse([
            'products'   => [],
            'pagination' => ['total' => 0, 'page' => $page, 'limit' => $limit, 'totalPages' => 0]
        ], 200);
    }
}

/**
 * GET /api/v1/products/:slug
 */
function handleGetProductBySlug(string $slug): void {
    try {
        $pdo = getDatabaseConnection();
        $cleanSlug = strtolower(trim(urldecode($slug)));
        $dashedSlug = str_replace(' ', '-', $cleanSlug);
        $spacedSlug = str_replace('-', ' ', $cleanSlug);

        $stmt = $pdo->prepare("SELECT `p`.*, `c`.`name` as `category_name`, `c`.`slug` as `category_slug` FROM `product` `p` LEFT JOIN `category` `c` ON `p`.`categoryId` = `c`.`id` WHERE `p`.`slug` = ? OR `p`.`id` = ? OR LOWER(REPLACE(`p`.`name`, ' ', '-')) = ? OR LOWER(`p`.`name`) = ? LIMIT 1");
        $stmt->execute([$slug, $slug, $dashedSlug, $spacedSlug]);
        $product = $stmt->fetch();

        if (!$product) {
            jsonError('Product not found', 404);
        }

        // Fetch images
        $imgStmt = $pdo->prepare("SELECT * FROM `productimage` WHERE `productId` = ? ORDER BY `position` ASC");
        $imgStmt->execute([$product['id']]);
        $product['images'] = $imgStmt->fetchAll();

        // Fetch related products
        $relStmt = $pdo->prepare("SELECT * FROM `product` WHERE `categoryId` = ? AND `id` != ? AND `status` = 'ACTIVE' LIMIT 4");
        $relStmt->execute([$product['categoryId'], $product['id']]);
        $relatedRaw = $relStmt->fetchAll();
        $relatedMapped = array_map(fn($rp) => mapProductResponse($rp), $relatedRaw);

        jsonResponse([
            'product'         => mapProductResponse($product),
            'relatedProducts' => $relatedMapped
        ], 200);

    } catch (Throwable $e) {
        error_log("handleGetProductBySlug error: " . $e->getMessage());
        jsonError('Error fetching product', 500);
    }
}

/**
 * GET /api/v1/product-page-content/:id
 * GET /api/v1/admin/product-page-content
 * POST /api/v1/admin/product-page-content
 */
function handleGetProductPageContent(string $id = 'global'): void {
    handleAdminProductPageContent();
}

function handleAdminProductPageContent(): void {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $pdo = getDatabaseConnection();

    if ($method === 'GET') {
        $productId = $_GET['productId'] ?? (preg_match('#/product-page-content/([^/]+)#', $_SERVER['REQUEST_URI'] ?? '', $m) ? urldecode($m[1]) : 'global');
        $stmt = $pdo->prepare("SELECT * FROM `ProductPageContent` WHERE `productId` = ? OR `id` = ? LIMIT 1");
        $stmt->execute([$productId, $productId]);
        $content = $stmt->fetch();

        if (!$content) {
            $defaultContent = [
                'id' => $productId,
                'productId' => $productId,
                'heroTitle' => 'AURA DIAMOND ATELIER',
                'heroSubtitle' => 'Handcrafted Fine Jewellery',
                'heroShortDescription' => 'Discover master-crafted certified lab-grown & natural diamond creations.',
                'heroAnnouncement' => 'Complimentary Priority Shipping & Insured Delivery',
                'heroBreadcrumbLabel' => 'Fine Jewellery Collection',
                'benefitsJson' => json_encode([
                    ['icon' => 'Truck', 'title' => 'Free Insured Delivery'],
                    ['icon' => 'ShieldCheck', 'title' => 'Lifetime Service Warranty'],
                    ['icon' => 'Award', 'title' => 'GIA / IGI Certification']
                ]),
                'accordionsJson' => json_encode([
                    ['id' => 'experience', 'title' => 'YOUR ATELIER EXPERIENCE', 'content' => 'Every creation is handcrafted in our atelier using certified conflict-free diamonds and 100% recycled precious metals.'],
                    ['id' => 'details', 'title' => 'PRODUCT & DIAMOND SPECIFICATIONS', 'content' => 'Each diamond is individually selected for optimum brilliance, fire, and symmetry. Hand-set under 40x microscopic precision with official IGI / GIA certification detailing cut, color, clarity, and carat weight.'],
                    ['id' => 'craftsmanship', 'title' => 'CRAFTSMANSHIP & SUSTAINABILITY', 'content' => 'Handcrafted in our atelier using 100% recycled solid gold. Ethically created with 100% Kimberley Process certified, conflict-free lab-grown & natural diamonds.'],
                    ['id' => 'shipping', 'title' => 'SHIPPING & DELIVERY', 'content' => 'After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery.']
                ]),
                'packagingImageUrl' => '/assets/gem_ring_box.png'
            ];
            jsonResponse(['content' => $defaultContent, 'id' => $productId, 'productId' => $productId], 200);
            return;
        }

        // Dynamically sanitize stored content fields
        $content['packagingImageUrl'] = '/assets/gem_ring_box.png';
        if (isset($content['accordionsJson']) && is_string($content['accordionsJson'])) {
            $content['accordionsJson'] = str_replace('FedEx Priority Air', 'Priority Air', $content['accordionsJson']);
            $content['accordionsJson'] = str_replace('FedEx locations', 'express courier locations', $content['accordionsJson']);
            $content['accordionsJson'] = str_replace('FedEx', 'Priority Air', $content['accordionsJson']);
            $content['accordionsJson'] = str_replace('We also offer a 30-day return policy, subject to our return terms and conditions.', '', $content['accordionsJson']);
            $content['accordionsJson'] = str_replace('30-day return policy.', '', $content['accordionsJson']);
        }
        if (isset($content['packagingItemsJson']) && is_string($content['packagingItemsJson'])) {
            $content['packagingItemsJson'] = str_replace('FedEx Priority Air', 'Priority Air', $content['packagingItemsJson']);
            $content['packagingItemsJson'] = str_replace('FedEx locations', 'express courier locations', $content['packagingItemsJson']);
            $content['packagingItemsJson'] = str_replace('FedEx', 'Priority Air', $content['packagingItemsJson']);
            $content['packagingItemsJson'] = str_replace('We also offer a 30-day return policy, subject to our return terms and conditions.', '', $content['packagingItemsJson']);
            $content['packagingItemsJson'] = str_replace('30-day return policy.', '', $content['packagingItemsJson']);
        }

        jsonResponse(['content' => $content, 'id' => $content['id'], 'productId' => $content['productId']], 200);

    } else {
        requireRole(['CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;
        $productId = $body['productId'] ?? 'global';

        $heroTitle            = $body['heroTitle'] ?? null;
        $heroSubtitle         = $body['heroSubtitle'] ?? null;
        $heroShortDescription = $body['heroShortDescription'] ?? null;
        $heroAnnouncement     = $body['heroAnnouncement'] ?? null;
        $heroBreadcrumbLabel  = $body['heroBreadcrumbLabel'] ?? null;
        $benefitsJson         = isset($body['benefits']) ? json_encode($body['benefits']) : null;
        $accordionsJson       = isset($body['accordions']) ? json_encode($body['accordions']) : null;
        $shippingInfoJson     = isset($body['shippingInfo']) ? json_encode($body['shippingInfo']) : null;
        $craftsmanshipTitle   = $body['craftsmanshipTitle'] ?? null;
        $craftsmanshipDesc    = $body['craftsmanshipDescription'] ?? null;
        $packagingHeading     = $body['packagingHeading'] ?? null;
        $packagingDesc        = $body['packagingDescription'] ?? null;

        $chk = $pdo->prepare("SELECT `id` FROM `ProductPageContent` WHERE `productId` = ? OR `id` = ? LIMIT 1");
        $chk->execute([$productId, $productId]);
        $exists = $chk->fetch();

        if ($exists) {
            $u = $pdo->prepare("UPDATE `ProductPageContent` SET `heroTitle` = ?, `heroSubtitle` = ?, `heroShortDescription` = ?, `heroAnnouncement` = ?, `heroBreadcrumbLabel` = ?, `benefitsJson` = ?, `accordionsJson` = ?, `shippingInfoJson` = ?, `craftsmanshipTitle` = ?, `craftsmanshipDescription` = ?, `packagingHeading` = ?, `packagingDescription` = ?, `updatedAt` = NOW() WHERE `id` = ?");
            $u->execute([$heroTitle, $heroSubtitle, $heroShortDescription, $heroAnnouncement, $heroBreadcrumbLabel, $benefitsJson, $accordionsJson, $shippingInfoJson, $craftsmanshipTitle, $craftsmanshipDesc, $packagingHeading, $packagingDesc, $exists['id']]);
        } else {
            $i = $pdo->prepare("INSERT INTO `ProductPageContent` (`id`, `productId`, `heroTitle`, `heroSubtitle`, `heroShortDescription`, `heroAnnouncement`, `heroBreadcrumbLabel`, `benefitsJson`, `accordionsJson`, `shippingInfoJson`, `craftsmanshipTitle`, `craftsmanshipDescription`, `packagingHeading`, `packagingDescription`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
            $i->execute([$productId, $productId, $heroTitle, $heroSubtitle, $heroShortDescription, $heroAnnouncement, $heroBreadcrumbLabel, $benefitsJson, $accordionsJson, $shippingInfoJson, $craftsmanshipTitle, $craftsmanshipDesc, $packagingHeading, $packagingDesc]);
        }

        jsonResponse(['message' => 'Product page content saved successfully'], 200);
    }
}

/**
 * GET /api/v1/admin/products/:id
 * GET /api/v1/products/by-id/:id
 */
function handleGetProductById(string $id): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT `p`.*, `c`.`name` as `category_name`, `c`.`slug` as `category_slug` FROM `product` `p` LEFT JOIN `category` `c` ON `p`.`categoryId` = `c`.`id` WHERE `p`.`id` = ? LIMIT 1");
        $stmt->execute([$id]);
        $product = $stmt->fetch();

        if (!$product) {
            jsonError('Product not found', 404);
        }

        $imgStmt = $pdo->prepare("SELECT * FROM `productimage` WHERE `productId` = ? ORDER BY `position` ASC");
        $imgStmt->execute([$id]);
        $product['images'] = $imgStmt->fetchAll();

        jsonResponse(mapProductResponse($product), 200);

    } catch (Throwable $e) {
        error_log("handleGetProductById error: " . $e->getMessage());
        jsonError('Error fetching product by ID', 500);
    }
}

/**
 * POST /api/v1/products/:productId/calculate-price
 */
function handleCalculateServerSidePrice(string $productId): void {
    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true) ?? $_POST;

    $metalLabel = $body['metalLabel'] ?? null;
    $diamondId  = $body['diamondId'] ?? null;
    $quantity   = max(1, (int) ($body['quantity'] ?? 1));

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->prepare("SELECT * FROM `product` WHERE `id` = ? LIMIT 1");
        $stmt->execute([$productId]);
        $product = $stmt->fetch();

        if (!$product) {
            jsonError('Product not found', 404);
        }

        $basePrice = (float) $product['price'];
        $metalAdjustment = 0.0;

        $metalsConfig = safeJsonParse($product['metalsConfig'] ?? null, []);
        if ($metalLabel) {
            foreach ($metalsConfig as $m) {
                if (($m['label'] ?? '') === $metalLabel) {
                    $metalAdjustment = (float) ($m['priceAdjustment'] ?? 0);
                    break;
                }
            }
        }

        $diamondPrice = 0.0;
        if ($diamondId) {
            $dStmt = $pdo->prepare("SELECT `price` FROM `diamond` WHERE `id` = ? LIMIT 1");
            $dStmt->execute([$diamondId]);
            $dbDiamond = $dStmt->fetch();
            if ($dbDiamond) {
                $diamondPrice = (float) $dbDiamond['price'];
            }
        }

        $unitPrice  = $basePrice + $metalAdjustment + $diamondPrice;
        $totalAmount = $unitPrice * $quantity;

        jsonResponse([
            'productId'             => $product['id'],
            'productName'           => $product['name'],
            'basePrice'             => $basePrice,
            'metalAdjustment'       => $metalAdjustment,
            'diamondPrice'          => $diamondPrice,
            'unitPrice'             => $unitPrice,
            'quantity'              => $quantity,
            'totalAmount'           => $totalAmount,
            'currency'              => 'USD',
            'isCustomerCustomPrice' => false
        ], 200);

    } catch (Throwable $e) {
        error_log("handleCalculateServerSidePrice error: " . $e->getMessage());
        jsonError('Error calculating price', 500);
    }
}

/**
 * GET /api/v1/categories
 */
function handleGetCategories(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT `c`.*, (SELECT COUNT(*) FROM `product` `p` WHERE `p`.`categoryId` = `c`.`id`) as `_count_products` FROM `category` `c` ORDER BY `c`.`sortOrder` ASC");
        $categories = $stmt->fetchAll();

        $mapped = array_map(function($c) {
            $c['_count'] = ['products' => (int) $c['_count_products']];
            unset($c['_count_products']);
            return $c;
        }, $categories);

        jsonResponse($mapped, 200);

    } catch (Throwable $e) {
        error_log("handleGetCategories error: " . $e->getMessage());
        jsonError('Error fetching categories', 500);
    }
}

/**
 * GET /api/v1/collections
 */
function handleGetCollections(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT `c`.*, (SELECT COUNT(*) FROM `product` `p` WHERE `p`.`collectionId` = `c`.`id`) as `_count_products` FROM `collection` `c` ORDER BY `c`.`name` ASC");
        $collections = $stmt->fetchAll();

        $mapped = array_map(function($c) {
            $c['_count'] = ['products' => (int) $c['_count_products']];
            unset($c['_count_products']);
            return $c;
        }, $collections);

        jsonResponse($mapped, 200);

    } catch (Throwable $e) {
        error_log("handleGetCollections error: " . $e->getMessage());
        jsonError('Error fetching collections', 500);
    }
}

/**
 * GET /api/v1/ring-size-guide
 * GET /api/v1/admin/ring-size-guide
 */
function handleGetRingSizeGuide(): void {
    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM `RingSizeGuide` WHERE `id` = 'main' LIMIT 1");
        $guide = $stmt->fetch();

        if (!$guide) {
            // Return default initial guide structure
            jsonResponse([
                'id'            => 'main',
                'title'         => 'Ring Size Guide',
                'slug'          => 'find-your-ring-size',
                'status'        => 'PUBLISHED',
                'heroTitle'     => 'FIND YOUR PERFECT RING SIZE',
                'heroSubtitle'  => 'Comprehensive Aura Atelier Sizing Guide',
                'infoHeading'   => 'International Ring Size Conversion',
                'infoDescription' => 'Measure your finger diameter or convert existing ring sizes using our standardized international chart.'
            ], 200);
        }

        jsonResponse($guide, 200);

    } catch (Throwable $e) {
        error_log("handleGetRingSizeGuide error: " . $e->getMessage());
        jsonError('Error fetching ring size guide', 500);
    }
}

/**
 * GET /api/v1/filters (Public API)
 * GET /api/v1/admin/filters (Admin API)
 */
function handleGetFilters(bool $isAdmin = false): void {
    if ($isAdmin) {
        requireRole(['PRODUCT_MANAGER', 'CONTENT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    }

    try {
        $pdo = getDatabaseConnection();

        $cfgSql = $isAdmin ? "SELECT * FROM `ProductFilterConfig` ORDER BY `sortOrder` ASC"
                           : "SELECT * FROM `ProductFilterConfig` WHERE `isEnabled` = 1 ORDER BY `sortOrder` ASC";
        $cfgStmt = $pdo->query($cfgSql);
        $configs = $cfgStmt->fetchAll();

        if (count($configs) === 0) {
            $defaultFilters = [
                ['name' => 'Special Offers & Sale', 'key' => 'on_sale', 'customerLabel' => 'On Sale / Deals', 'filterType' => 'Checkbox', 'sortOrder' => 1, 'options' => [
                    ['label' => 'On Sale Items Only', 'value' => 'on_sale']
                ]],
                ['name' => 'Precious Metal', 'key' => 'metal', 'customerLabel' => 'Metal', 'filterType' => 'Swatch/List', 'sortOrder' => 2, 'options' => [
                    ['label' => '14K Yellow Gold', 'value' => '14K Yellow Gold', 'colorHex' => '#E6CA65'],
                    ['label' => '14K White Gold', 'value' => '14K White Gold', 'colorHex' => '#E0E0E0'],
                    ['label' => '18K Rose Gold', 'value' => '18K Rose Gold', 'colorHex' => '#E8B4A0'],
                    ['label' => 'Platinum', 'value' => 'Platinum', 'colorHex' => '#D1D5DB']
                ]],
                ['name' => 'Diamond Shape', 'key' => 'stone_shape', 'customerLabel' => 'Shape', 'filterType' => 'Shape Grid', 'sortOrder' => 3, 'options' => [
                    ['label' => 'Round', 'value' => 'Round'],
                    ['label' => 'Oval', 'value' => 'Oval'],
                    ['label' => 'Cushion', 'value' => 'Cushion'],
                    ['label' => 'Emerald', 'value' => 'Emerald'],
                    ['label' => 'Pear', 'value' => 'Pear'],
                    ['label' => 'Marquise', 'value' => 'Marquise'],
                    ['label' => 'Princess', 'value' => 'Princess'],
                    ['label' => 'Radiant', 'value' => 'Radiant']
                ]],
                ['name' => 'Price Range', 'key' => 'price', 'customerLabel' => 'Price ($)', 'filterType' => 'Price Range', 'sortOrder' => 4, 'options' => []],
                ['name' => 'Jewellery Category', 'key' => 'category', 'customerLabel' => 'Category', 'filterType' => 'Select', 'sortOrder' => 5, 'options' => [
                    ['label' => 'Rings', 'value' => 'Rings'],
                    ['label' => 'Earrings', 'value' => 'Earrings'],
                    ['label' => 'Necklaces', 'value' => 'Necklaces'],
                    ['label' => 'Bracelets', 'value' => 'Bracelets'],
                    ['label' => 'Pendants', 'value' => 'Pendants']
                ]]
            ];

            foreach ($defaultFilters as $df) {
                $fId = 'flt_' . bin2hex(random_bytes(6));
                $stmt = $pdo->prepare("INSERT INTO `ProductFilterConfig` (`id`, `name`, `key`, `customerLabel`, `filterType`, `sortOrder`, `isEnabled`) VALUES (?, ?, ?, ?, ?, ?, 1)");
                $stmt->execute([$fId, $df['name'], $df['key'], $df['customerLabel'], $df['filterType'], $df['sortOrder']]);
                foreach ($df['options'] as $oIdx => $opt) {
                    $oId = 'opt_' . bin2hex(random_bytes(6));
                    $oStmt = $pdo->prepare("INSERT INTO `ProductFilterOption` (`id`, `filterId`, `label`, `value`, `colorHex`, `sortOrder`, `isEnabled`) VALUES (?, ?, ?, ?, ?, ?, 1)");
                    $oStmt->execute([$oId, $fId, $opt['label'], $opt['value'], $opt['colorHex'] ?? null, $oIdx + 1]);
                }
            }

            $cfgStmt = $pdo->query($cfgSql);
            $configs = $cfgStmt->fetchAll();
        }

        $configIds = array_column($configs, 'id');
        $optionsByConfig = [];
        if (count($configIds) > 0) {
            $inClause = implode(',', array_fill(0, count($configIds), '?'));
            $optSql = $isAdmin ? "SELECT * FROM `ProductFilterOption` WHERE `filterId` IN ({$inClause}) ORDER BY `sortOrder` ASC"
                               : "SELECT * FROM `ProductFilterOption` WHERE `filterId` IN ({$inClause}) AND `isEnabled` = 1 ORDER BY `sortOrder` ASC";
            $optStmt = $pdo->prepare($optSql);
            $optStmt->execute($configIds);
            foreach ($optStmt->fetchAll() as $opt) {
                $optionsByConfig[$opt['filterId']][] = $opt;
            }
        }

        $resFilters = [];
        foreach ($configs as $cfg) {
            $cfg['options'] = $optionsByConfig[$cfg['id']] ?? [];
            $resFilters[] = $cfg;
        }

        jsonResponse(['filters' => $resFilters], 200);

    } catch (Throwable $e) {
        error_log("handleGetFilters error: " . $e->getMessage());
        jsonResponse(['filters' => []], 200);
    }
}

/**
 * GET /api/v1/admin/customer-prices
 */
function handleGetCustomerPrices(): void {
    authenticateToken();

    try {
        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT `csp`.*, `c`.`name` as `customer_name`, `c`.`email` as `customer_email`, `p`.`name` as `product_name`, `p`.`sku` as `product_sku`, `p`.`price` as `product_price` FROM `customerspecificprice` `csp` LEFT JOIN `customer` `c` ON `csp`.`customerId` = `c`.`id` LEFT JOIN `product` `p` ON `csp`.`productId` = `p`.`id` ORDER BY `csp`.`updatedAt` DESC");
        $prices = $stmt->fetchAll();

        $mapped = array_map(function($r) {
            $r['customer'] = ['id' => $r['customerId'], 'name' => $r['customer_name'], 'email' => $r['customer_email']];
            $r['product']  = ['id' => $r['productId'], 'name' => $r['product_name'], 'sku' => $r['product_sku'], 'price' => (float) $r['product_price']];
            return $r;
        }, $prices);

        jsonResponse($mapped, 200);

    } catch (Throwable $e) {
        error_log("handleGetCustomerPrices error: " . $e->getMessage());
        jsonError('Error fetching customer prices', 500);
    }
}

/**
 * POST /api/v1/admin/products
 * PUT /api/v1/admin/products/:id
 */
function handleSaveProduct(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    try {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;

        $id = $body['id'] ?? (preg_match('#/products/([^/]+)#', $_SERVER['REQUEST_URI'] ?? '', $m) ? $m[1] : null);
        if (!$id) {
            $id = 'prod_' . bin2hex(random_bytes(8));
        }

        $pdo = getDatabaseConnection();

        $chk = $pdo->prepare("SELECT * FROM `product` WHERE `id` = ? OR `slug` = ? LIMIT 1");
        $chk->execute([$id, $body['slug'] ?? '']);
        $existing = $chk->fetch();

        $title        = isset($body['title']) ? trim($body['title']) : (isset($body['name']) ? trim($body['name']) : ($existing['title'] ?? ($existing['name'] ?? 'New Product')));
        $slug         = isset($body['slug']) ? trim($body['slug']) : ($existing['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/i', '-', $title)));
        $sku          = isset($body['sku']) ? trim($body['sku']) : ($existing['sku'] ?? ('FJ-SKU-' . rand(1000, 9999)));
        $price        = isset($body['price']) ? (float) $body['price'] : (float) ($existing['price'] ?? 0);
        $compare      = isset($body['comparePrice']) ? (float) $body['comparePrice'] : (isset($existing['comparePrice']) ? (float)$existing['comparePrice'] : 0);
        $status       = isset($body['status']) ? strtoupper($body['status']) : ($existing['status'] ?? 'ACTIVE');
        $catId        = isset($body['categoryId']) ? $body['categoryId'] : ($existing['categoryId'] ?? null);
        $jewelleryType = isset($body['jewelleryType']) ? $body['jewelleryType'] : ($existing['jewelleryType'] ?? 'Ring');
        $mainImage    = isset($body['mainImage']) ? $body['mainImage'] : (isset($body['image']) ? $body['image'] : ($existing['mainImage'] ?? null));
        $secondImage  = isset($body['secondaryImage']) ? $body['secondaryImage'] : ($existing['secondaryImage'] ?? null);
        $shortDesc    = isset($body['shortDescription']) ? $body['shortDescription'] : ($existing['shortDescription'] ?? '');
        $fullDesc     = isset($body['fullDescription']) ? $body['fullDescription'] : (isset($body['description']) ? $body['description'] : ($existing['fullDescription'] ?? ''));

        $master14k    = isset($body['masterPrice14k']) ? (float) $body['masterPrice14k'] : (isset($existing['masterPrice14k']) ? (float)$existing['masterPrice14k'] : $price);
        $master18k    = isset($body['masterPrice18k']) ? (float) $body['masterPrice18k'] : (isset($existing['masterPrice18k']) ? (float)$existing['masterPrice18k'] : ($price + 250));
        $masterAg     = isset($body['masterPriceSilver']) ? (float) $body['masterPriceSilver'] : (isset($existing['masterPriceSilver']) ? (float)$existing['masterPriceSilver'] : max(0, $price - 500));

        $enableMetalSelection = isset($body['enableMetalSelection']) ? ($body['enableMetalSelection'] ? 1 : 0) : ($existing['enableMetalSelection'] ?? 1);
        $enableCustomOptions  = isset($body['enableCustomOptions']) ? ($body['enableCustomOptions'] ? 1 : 0) : ($existing['enableCustomOptions'] ?? 0);
        $enableRingSize       = isset($body['enableRingSize']) ? ($body['enableRingSize'] ? 1 : 0) : ($existing['enableRingSize'] ?? 1);
        $isRingSizeRequired   = isset($body['isRingSizeRequired']) ? ($body['isRingSizeRequired'] ? 1 : 0) : ($existing['isRingSizeRequired'] ?? 1);
        $isFeatured           = isset($body['isFeatured']) ? ($body['isFeatured'] ? 1 : 0) : ($existing['isFeatured'] ?? 0);
        $isNewArrival         = isset($body['isNewArrival']) ? ($body['isNewArrival'] ? 1 : 0) : ($existing['isNewArrival'] ?? 0);
        $isBestseller         = isset($body['isBestseller']) ? ($body['isBestseller'] ? 1 : 0) : ($existing['isBestseller'] ?? 0);

        $rawMetalsInput = isset($body['metalsConfig']) ? $body['metalsConfig'] : (isset($existing['metalsConfig']) ? safeJsonParse($existing['metalsConfig'], []) : []);
        if (is_array($rawMetalsInput)) {
            $rawMetalsInput = array_values(array_filter($rawMetalsInput, function($m) {
                $lbl = strtolower(is_array($m) ? ($m['label'] ?? '') : (string)$m);
                return !str_contains($lbl, 'silver') && !str_contains($lbl, 'ag');
            }));
        }
        $metalsCfgJson = json_encode($rawMetalsInput);

        $customOptsJson   = isset($body['customOptions']) ? json_encode($body['customOptions']) : (isset($body['customOptionsJson']) ? json_encode($body['customOptionsJson']) : ($existing['customOptionsJson'] ?? null));
        $accordionsJson   = isset($body['accordionsConfig']) ? json_encode($body['accordionsConfig']) : ($existing['accordionsConfig'] ?? null);
        $benefitsJson     = isset($body['benefitsConfig']) ? json_encode($body['benefitsConfig']) : ($existing['benefitsConfig'] ?? null);
        $internalTagsJson = isset($body['internalTags']) ? json_encode($body['internalTags']) : (isset($body['internalTagsJson']) ? json_encode($body['internalTagsJson']) : ($existing['internalTagsJson'] ?? null));
        $seoSocialJson    = isset($body['seoSocial']) ? json_encode($body['seoSocial']) : (isset($body['seoSocialJson']) ? json_encode($body['seoSocialJson']) : ($existing['seoSocialJson'] ?? null));
        $diamondDetJson   = isset($body['diamondDetails']) ? json_encode($body['diamondDetails']) : (isset($body['diamondDetailsJson']) ? json_encode($body['diamondDetailsJson']) : ($existing['diamondDetailsJson'] ?? null));

        $rawVarsInput = isset($body['variations']) ? $body['variations'] : (isset($body['variationsJson']) ? (is_array($body['variationsJson']) ? $body['variationsJson'] : safeJsonParse($body['variationsJson'], [])) : (isset($existing['variationsJson']) ? safeJsonParse($existing['variationsJson'], []) : []));
        if (is_array($rawVarsInput)) {
            $rawVarsInput = array_values(array_filter($rawVarsInput, function($v) {
                $m = strtolower(is_array($v) ? ($v['metal'] ?? '') : '');
                return !str_contains($m, 'silver') && !str_contains($m, 'ag');
            }));
        }
        $variationsJson = json_encode($rawVarsInput);

        $pdo->beginTransaction();

        if ($existing) {
            $uStmt = $pdo->prepare("UPDATE `product` SET `title` = ?, `name` = ?, `slug` = ?, `sku` = ?, `price` = ?, `comparePrice` = ?, `status` = ?, `categoryId` = ?, `jewelleryType` = ?, `mainImage` = ?, `secondaryImage` = ?, `shortDescription` = ?, `fullDescription` = ?, `masterPrice14k` = ?, `masterPrice18k` = ?, `masterPriceSilver` = ?, `metalsConfig` = ?, `customOptionsJson` = ?, `accordionsConfig` = ?, `benefitsConfig` = ?, `internalTagsJson` = ?, `seoSocialJson` = ?, `diamondDetailsJson` = ?, `variationsJson` = ?, `enableMetalSelection` = ?, `enableCustomOptions` = ?, `enableRingSize` = ?, `isRingSizeRequired` = ?, `isFeatured` = ?, `isNewArrival` = ?, `isBestseller` = ?, `updatedAt` = NOW() WHERE `id` = ?");
            $uStmt->execute([
                $title, $title, $slug, $sku, $price, $compare, $status, $catId, $jewelleryType, $mainImage, $secondImage, $shortDesc, $fullDesc,
                $master14k, $master18k, $masterAg, $metalsCfgJson, $customOptsJson, $accordionsJson, $benefitsJson, $internalTagsJson, $seoSocialJson, $diamondDetJson, $variationsJson,
                $enableMetalSelection, $enableCustomOptions, $enableRingSize, $isRingSizeRequired, $isFeatured, $isNewArrival, $isBestseller,
                $existing['id']
            ]);
            $productId = $existing['id'];
        } else {
            $iStmt = $pdo->prepare("INSERT INTO `product` (`id`, `title`, `name`, `slug`, `sku`, `price`, `comparePrice`, `status`, `categoryId`, `jewelleryType`, `mainImage`, `secondaryImage`, `shortDescription`, `fullDescription`, `masterPrice14k`, `masterPrice18k`, `masterPriceSilver`, `metalsConfig`, `customOptionsJson`, `accordionsConfig`, `benefitsConfig`, `internalTagsJson`, `seoSocialJson`, `diamondDetailsJson`, `variationsJson`, `enableMetalSelection`, `enableCustomOptions`, `enableRingSize`, `isRingSizeRequired`, `isFeatured`, `isNewArrival`, `isBestseller`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
            $iStmt->execute([
                $id, $title, $title, $slug, $sku, $price, $compare, $status, $catId, $jewelleryType, $mainImage, $secondImage, $shortDesc, $fullDesc,
                $master14k, $master18k, $masterAg, $metalsCfgJson, $customOptsJson, $accordionsJson, $benefitsJson, $internalTagsJson, $seoSocialJson, $diamondDetJson, $variationsJson,
                $enableMetalSelection, $enableCustomOptions, $enableRingSize, $isRingSizeRequired, $isFeatured, $isNewArrival, $isBestseller
            ]);
            $productId = $id;
        }

        if (!empty($body['images']) && is_array($body['images'])) {
            $pdo->prepare("DELETE FROM `productimage` WHERE `productId` = ?")->execute([$productId]);
            $imgIns = $pdo->prepare("INSERT INTO `productimage` (`id`, `productId`, `url`, `position`, `imageType`, `createdAt`) VALUES (?, ?, ?, ?, ?, NOW())");
            foreach ($body['images'] as $pos => $img) {
                $imgUrl = is_array($img) ? ($img['url'] ?? '') : $img;
                if ($imgUrl) {
                    $imgId = 'img_' . bin2hex(random_bytes(6));
                    $imgType = is_array($img) ? ($img['imageType'] ?? ($pos === 0 ? 'hero' : 'gallery')) : ($pos === 0 ? 'hero' : 'gallery');
                    $imgIns->execute([$imgId, $productId, $imgUrl, $pos, $imgType]);
                }
            }
        }

        $pdo->commit();

        $rStmt = $pdo->prepare("SELECT * FROM `product` WHERE `id` = ? LIMIT 1");
        $rStmt->execute([$productId]);
        $savedProduct = $rStmt->fetch();

        jsonResponse([
            'message' => 'Product saved successfully',
            'product' => mapProductResponse($savedProduct)
        ], 200);

    } catch (Throwable $e) {
        if (isset($pdo) && $pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log("handleSaveProduct error: " . $e->getMessage());
        jsonError('Failed to save product: ' . $e->getMessage(), 500);
    }
}

/**
 * GET /api/v1/admin/products/:id/details
 * PUT /api/v1/admin/products/:id/details
 * POST /api/v1/admin/products/:id/details
 */
function handleProductDetailsRoute(string $id): void {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $pdo = getDatabaseConnection();

    $pStmt = $pdo->prepare("SELECT * FROM `product` WHERE `id` = ? OR `slug` = ? LIMIT 1");
    $pStmt->execute([$id, $id]);
    $product = $pStmt->fetch();

    if (!$product) {
        jsonError('Product not found', 404);
    }

    if ($method === 'GET') {
        $mappedProduct = mapProductResponse($product);
        $accordions = safeJsonParse($product['accordionsConfig'] ?? null, []);

        jsonResponse([
            'product'  => $mappedProduct,
            'sections' => $accordions
        ], 200);
    } else {
        requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;
        $sections = $body['sections'] ?? [];

        $sectionsJson = json_encode($sections);
        $upd = $pdo->prepare("UPDATE `product` SET `accordionsConfig` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $upd->execute([$sectionsJson, $product['id']]);

        $mappedProduct = mapProductResponse($product);
        jsonResponse([
            'message'  => 'Product detail sections updated successfully',
            'product'  => $mappedProduct,
            'sections' => $sections
        ], 200);
    }
}

/**
 * GET /api/v1/admin/products/bulk-upload/template
 */
function handleDownloadProductImportTemplate(): void {
    $csv = "product_name,sku,slug,jewelry_type,category,status,description,seo_title,meta_description\n";
    $csv .= "Aura Signature Solitaire Ring,AD-DEMO-RING-001,aura-signature-solitaire-ring,Ring,Rings,Draft,A luxury solitaire diamond ring handcrafted to perfection.,Aura Signature Solitaire Ring | Luxury Diamond Ring,Luxury customizable solitaire diamond ring.\n";

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="aura-product-import-template.csv"');
    echo $csv;
    exit;
}

/**
 * Helper to parse CSV files robustly handling comma, semicolon, tab delimiters and multiline strings
 */
function parseCsvFileToRows(string $filePath): array {
    if (!file_exists($filePath)) {
        return [];
    }
    $handle = fopen($filePath, 'r');
    if (!$handle) {
        return [];
    }

    $delimiter = ',';
    $firstLine = fgets($handle);
    if ($firstLine !== false) {
        if (substr_count($firstLine, "\t") > substr_count($firstLine, ",")) {
            $delimiter = "\t";
        } elseif (substr_count($firstLine, ";") > substr_count($firstLine, ",")) {
            $delimiter = ";";
        }
        rewind($handle);
    }

    $headers = fgetcsv($handle, 0, $delimiter);
    if (!$headers || empty($headers)) {
        fclose($handle);
        return [];
    }

    $headers = array_map('trim', $headers);
    if (isset($headers[0])) {
        $headers[0] = preg_replace('/[\x{EF}\x{BB}\x{BF}]/u', '', $headers[0]);
    }

    $resultRows = [];
    while (($rowArr = fgetcsv($handle, 0, $delimiter)) !== false) {
        if (empty(array_filter($rowArr))) continue;
        $row = [];
        foreach ($headers as $idx => $h) {
            if ($h !== '') {
                $row[$h] = trim($rowArr[$idx] ?? '');
            }
        }
        $resultRows[] = $row;
    }

    fclose($handle);
    return $resultRows;
}

function parseXlsxFileToRows(string $filePath): array {
    if (!class_exists('ZipArchive')) {
        return [];
    }
    $zip = new ZipArchive();
    if ($zip->open($filePath) !== true) {
        return [];
    }

    $sharedStrings = [];
    if (($ssData = $zip->getFromName('xl/sharedStrings.xml')) !== false) {
        $xml = @simplexml_load_string($ssData);
        if ($xml) {
            foreach ($xml->si as $val) {
                if (isset($val->t)) {
                    $sharedStrings[] = (string)$val->t;
                } else if (isset($val->r)) {
                    $txt = '';
                    foreach ($val->r as $r) {
                        $txt .= (string)$r->t;
                    }
                    $sharedStrings[] = $txt;
                } else {
                    $sharedStrings[] = '';
                }
            }
        }
    }

    $sheetData = $zip->getFromName('xl/worksheets/sheet1.xml');
    $zip->close();

    if (!$sheetData) {
        return [];
    }

    $xml = @simplexml_load_string($sheetData);
    if (!$xml) {
        return [];
    }

    $matrix = [];
    foreach ($xml->sheetData->row as $r) {
        $rowCells = [];
        foreach ($r->c as $c) {
            $ref = (string)$c['r'];
            $colLetter = preg_replace('/[0-9]/', '', $ref);
            $colIdx = 0;
            $len = strlen($colLetter);
            for ($i = 0; $i < $len; $i++) {
                $colIdx = $colIdx * 26 + (ord($colLetter[$i]) - ord('A') + 1);
            }
            $colIdx -= 1;

            $type = (string)$c['t'];
            $val = (string)$c->v;

            if ($type === 's' && isset($sharedStrings[(int)$val])) {
                $cellVal = $sharedStrings[(int)$val];
            } else {
                $cellVal = $val;
            }

            $rowCells[$colIdx] = trim($cellVal);
        }
        ksort($rowCells);
        if (count($rowCells) > 0) {
            $maxCol = max(array_keys($rowCells));
            $fullRow = [];
            for ($i = 0; $i <= $maxCol; $i++) {
                $fullRow[] = $rowCells[$i] ?? '';
            }
            $matrix[] = $fullRow;
        }
    }

    if (count($matrix) < 2) {
        return [];
    }

    $headers = array_map('trim', array_shift($matrix));
    if (isset($headers[0])) {
        $headers[0] = preg_replace('/[\x{EF}\x{BB}\x{BF}]/u', '', $headers[0]);
    }

    $resultRows = [];
    foreach ($matrix as $rowArr) {
        if (empty(array_filter($rowArr))) continue;
        $row = [];
        foreach ($headers as $idx => $h) {
            if ($h !== '') {
                $row[$h] = trim($rowArr[$idx] ?? '');
            }
        }
        $resultRows[] = $row;
    }

    return $resultRows;
}

function parseSpreadsheetFileToRows(string $filePath, string $originalName = ''): array {
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if ($ext === 'xlsx' || $ext === 'xls' || str_contains($originalName, '.xlsx') || str_contains($originalName, '.xls')) {
        $xlsxRows = parseXlsxFileToRows($filePath);
        if (count($xlsxRows) > 0) {
            return $xlsxRows;
        }
    }
    // Also try parseXlsxFileToRows first if file starts with ZIP signature PK
    if (file_exists($filePath) && filesize($filePath) > 4) {
        $fp = fopen($filePath, 'rb');
        $sig = fread($fp, 4);
        fclose($fp);
        if ($sig === "PK\x03\x04") {
            $xlsxRows = parseXlsxFileToRows($filePath);
            if (count($xlsxRows) > 0) {
                return $xlsxRows;
            }
        }
    }
    return parseCsvFileToRows($filePath);
}

/**
 * POST /api/v1/admin/products/bulk-upload/validate
 */
function handleValidateProductBulkUpload(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    if (empty($_FILES['excelFile']['tmp_name']) && empty($_FILES['file']['tmp_name'])) {
        jsonError('No Excel or CSV file uploaded for validation.', 400);
    }

    $tmp = $_FILES['excelFile']['tmp_name'] ?? $_FILES['file']['tmp_name'];
    $origName = $_FILES['excelFile']['name'] ?? ($_FILES['file']['name'] ?? '');
    $rawRows = parseSpreadsheetFileToRows($tmp, $origName);

    $parsedProducts = [];
    $preview = [];
    $errors = [];
    $warnings = [];

    $pdo = getDatabaseConnection();
    $existingTitles = [];
    $existingSkus = [];
    try {
        $dbProds = $pdo->query("SELECT `name`, `sku` FROM `product`")->fetchAll();
        foreach ($dbProds as $dp) {
            if (!empty($dp['name'])) $existingTitles[strtolower(trim($dp['name']))] = true;
            if (!empty($dp['sku']))  $existingSkus[strtolower(trim($dp['sku']))] = true;
        }
    } catch (Throwable $e) {}

    $seenTitlesBatch = [];
    $seenSkusBatch = [];

    foreach ($rawRows as $idx => $row) {
        $rowNum = $idx + 2;
        $name = $row['product_name'] ?? ($row['TITLE'] ?? ($row['Title'] ?? ($row['name'] ?? '')));
        $sku  = $row['sku'] ?? ($row['SKU'] ?? '');
        $price = floatval($row['price'] ?? ($row['PRICE'] ?? ($row['Price'] ?? 5000)));

        if (!$name) {
            $errors[] = "Row {$rowNum}: Product Name / TITLE is required.";
            continue;
        }
        if (!$sku) {
            $sku = "FJ-ETSY-" . time() . "-" . ($idx + 1);
        }

        // Extract ALL images (IMAGE1 through IMAGE10)
        $images = [];
        for ($i = 1; $i <= 10; $i++) {
            $u = trim($row["IMAGE{$i}"] ?? ($row["image{$i}"] ?? ''));
            if (!empty($u) && (str_starts_with($u, 'http://') || str_starts_with($u, 'https://'))) {
                $images[] = $u;
            }
        }

        // Duplicate Title / SKU Check
        $rowWarnings = [];
        $isDuplicate = false;
        $normTitle = strtolower(trim($name));
        $normSku   = strtolower(trim($sku));

        if (isset($existingTitles[$normTitle])) {
            $isDuplicate = true;
            $rowWarnings[] = "Duplicate title detected (already in catalog). Will update existing listing.";
        } elseif (isset($existingSkus[$normSku])) {
            $isDuplicate = true;
            $rowWarnings[] = "Duplicate SKU detected (already in catalog). Will update existing listing.";
        } elseif (isset($seenTitlesBatch[$normTitle])) {
            $isDuplicate = true;
            $rowWarnings[] = "Duplicate title in CSV batch (Row {$seenTitlesBatch[$normTitle]}).";
        } elseif (isset($seenSkusBatch[$normSku])) {
            $isDuplicate = true;
            $rowWarnings[] = "Duplicate SKU in CSV batch (Row {$seenSkusBatch[$normSku]}).";
        }

        $seenTitlesBatch[$normTitle] = $rowNum;
        $seenSkusBatch[$normSku]     = $rowNum;

        if ($isDuplicate) {
            $warnings[] = "Row {$rowNum}: {$rowWarnings[0]}";
        }

        $jewelryType = $row['jewelry_type'] ?? 'Ring';
        if (stripos($name, 'earring') !== false) $jewelryType = 'Earrings';
        elseif (stripos($name, 'necklace') !== false || stripos($name, 'pendant') !== false) $jewelryType = 'Necklace';
        elseif (stripos($name, 'ring') !== false || stripos($name, 'band') !== false) $jewelryType = 'Ring';

        $p = [
            'rowNum'          => $rowNum,
            'name'            => $name,
            'sku'             => $sku,
            'slug'            => $row['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $name), '-')),
            'categoryName'    => $row['category'] ?? 'Rings',
            'jewelryType'     => $jewelryType,
            'status'          => strtoupper($row['status'] ?? 'ACTIVE'),
            'description'     => $row['description'] ?? ($row['DESCRIPTION'] ?? ($row['Description'] ?? '')),
            'price'           => $price,
            'images'          => $images,
            'image1'          => $images[0] ?? '',
            'image2'          => $images[1] ?? '',
            'currency'        => $row['CURRENCY_CODE'] ?? 'USD',
            'seoTitle'        => $row['seo_title'] ?? "{$name} | Aura Diamond Atelier",
            'metaDescription' => $row['meta_description'] ?? '',
            'isDuplicate'     => $isDuplicate,
            'isValid'         => true,
            'errors'          => [],
            'warnings'        => $rowWarnings
        ];

        $parsedProducts[] = $p;

        $preview[] = [
            'rowNum'        => $rowNum,
            'name'          => $name,
            'sku'           => $sku,
            'category'      => $row['category'] ?? 'Rings',
            'jewelleryType' => $jewelryType,
            'metal'         => '14K Gold / Silver',
            'shape'         => 'Round/Custom',
            'carat'         => 1.0,
            'price'         => $price,
            'status'        => $p['status'],
            'imageCount'    => count($images),
            'isDuplicate'   => $isDuplicate,
            'isValid'       => true,
            'errors'        => [],
            'warnings'      => $rowWarnings
        ];
    }

    jsonResponse([
        'isValid'       => count($errors) === 0,
        'totalRows'     => count($parsedProducts),
        'validRows'     => count($parsedProducts),
        'errorRows'     => count($errors),
        'warningRows'   => count($warnings),
        'duplicateRows' => count(array_filter($parsedProducts, fn($item) => !empty($item['isDuplicate']))),
        'summary'       => [
            'totalProducts'   => count($parsedProducts),
            'mediaFilesFound' => count(array_merge(...array_column($parsedProducts, 'images')))
        ],
        'errors'        => $errors,
        'warnings'      => $warnings,
        'products'      => $parsedProducts,
        'preview'       => $preview
    ], 200);
}

/**
 * POST /api/v1/admin/products/bulk-upload/execute
 */
function handleExecuteProductBulkUpload(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;
    $products = $body['products'] ?? [];

    if (empty($products) && (!empty($_FILES['excelFile']['tmp_name']) || !empty($_FILES['file']['tmp_name']))) {
        $tmp = $_FILES['excelFile']['tmp_name'] ?? $_FILES['file']['tmp_name'];
        $origName = $_FILES['excelFile']['name'] ?? ($_FILES['file']['name'] ?? '');
        $rawRows = parseSpreadsheetFileToRows($tmp, $origName);
        foreach ($rawRows as $idx => $row) {
            $name = $row['product_name'] ?? ($row['TITLE'] ?? ($row['Title'] ?? ''));
            $sku  = $row['sku'] ?? ($row['SKU'] ?? '');

            $imgs = [];
            for ($i = 1; $i <= 10; $i++) {
                $u = trim($row["IMAGE{$i}"] ?? ($row["image{$i}"] ?? ''));
                if (!empty($u) && (str_starts_with($u, 'http://') || str_starts_with($u, 'https://'))) {
                    $imgs[] = $u;
                }
            }

            if (!empty($name)) {
                $products[] = [
                    'name'         => $name,
                    'sku'          => $sku ?: ("FJ-ETSY-" . time() . "-" . rand(100, 999)),
                    'slug'         => $row['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $name), '-')),
                    'categoryName' => $row['category'] ?? 'Rings',
                    'jewelryType'  => $row['jewelry_type'] ?? 'Ring',
                    'status'       => strtoupper($row['status'] ?? 'ACTIVE'),
                    'description'  => $row['description'] ?? ($row['DESCRIPTION'] ?? ($row['Description'] ?? '')),
                    'price'        => floatval($row['price'] ?? ($row['PRICE'] ?? ($row['Price'] ?? 5000))),
                    'images'       => $imgs,
                    'image1'       => $imgs[0] ?? '',
                    'image2'       => $imgs[1] ?? '',
                    'seoTitle'     => $row['seo_title'] ?? "{$name} | Aura Diamond Atelier",
                    'metaDescription' => $row['meta_description'] ?? ''
                ];
            }
        }
    }

    try {
        $pdo = getDatabaseConnection();
        $createdCount = 0;
        $updatedCount = 0;
        $totalImagesSaved = 0;

        foreach ($products as $p) {
            $name = trim($p['name'] ?? 'Jewellery Item');
            $sku  = trim($p['sku'] ?? ('AD-BLK-' . rand(1000, 9999)));
            $slug = trim($p['slug'] ?? strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $name), '-')));
            $categoryName = trim($p['categoryName'] ?? ($p['category'] ?? 'Rings'));
            $status = strtoupper($p['status'] ?? 'ACTIVE');
            $description = $p['description'] ?? '';
            $price = floatval($p['price'] ?? 5000);

            // Extract all image URLs (IMAGE1 through IMAGE10)
            $extractedImages = [];
            if (!empty($p['images']) && is_array($p['images'])) {
                $extractedImages = array_values(array_filter($p['images']));
            } else {
                for ($i = 1; $i <= 10; $i++) {
                    $u = $p["image{$i}"] ?? ($p["IMAGE{$i}"] ?? '');
                    if (!empty($u) && (str_starts_with($u, 'http://') || str_starts_with($u, 'https://'))) {
                        $extractedImages[] = $u;
                    }
                }
            }
            if (empty($extractedImages)) {
                if (!empty($p['image1'])) $extractedImages[] = $p['image1'];
                if (!empty($p['image2'])) $extractedImages[] = $p['image2'];
                if (!empty($p['mainImage'])) $extractedImages[] = $p['mainImage'];
            }

            $mainImage = !empty($extractedImages[0]) ? $extractedImages[0] : '/assets/gem_rings_cat.png';
            $secImage = !empty($extractedImages[1]) ? $extractedImages[1] : null;

            // Find or create Category
            $cStmt = $pdo->prepare("SELECT `id` FROM `category` WHERE `name` = ? OR `slug` = ? LIMIT 1");
            $cStmt->execute([$categoryName, strtolower($categoryName)]);
            $cat = $cStmt->fetch();
            $catId = $cat['id'] ?? null;

            if (!$catId) {
                $catId = 'cat_' . bin2hex(random_bytes(6));
                $insC = $pdo->prepare("INSERT INTO `category` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, NOW(), NOW())");
                $insC->execute([$catId, $categoryName, strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $categoryName), '-')), "{$categoryName} Collection"]);
            }

            // Check if product exists by SKU OR Title (name) OR Slug
            $chk = $pdo->prepare("SELECT `id` FROM `product` WHERE `sku` = ? OR `name` = ? OR `slug` = ? LIMIT 1");
            $chk->execute([$sku, $name, $slug]);
            $exists = $chk->fetch();

            if ($exists) {
                $productId = $exists['id'];
                $upd = $pdo->prepare("UPDATE `product` SET `name` = ?, `slug` = ?, `categoryId` = ?, `status` = ?, `shortDescription` = ?, `fullDescription` = ?, `price` = ?, `mainImage` = ?, `secondaryImage` = ?, `updatedAt` = NOW() WHERE `id` = ?");
                $upd->execute([$name, $slug, $catId, $status, $description, $description, $price, $mainImage, $secImage, $productId]);
                $updatedCount++;
            } else {
                $productId = 'prod_' . bin2hex(random_bytes(8));
                $ins = $pdo->prepare("INSERT INTO `product` (`id`, `name`, `sku`, `slug`, `categoryId`, `status`, `shortDescription`, `fullDescription`, `price`, `mainImage`, `secondaryImage`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
                $ins->execute([$productId, $name, $sku, $slug, $catId, $status, $description, $description, $price, $mainImage, $secImage]);
                $createdCount++;
            }

            // Clear and insert ALL images (IMAGE1 through IMAGE10) into productimage table
            if (count($extractedImages) > 0) {
                $pdo->prepare("DELETE FROM `productimage` WHERE `productId` = ?")->execute([$productId]);
                $imgIns = $pdo->prepare("INSERT INTO `productimage` (`id`, `productId`, `url`, `position`, `imageType`, `createdAt`) VALUES (?, ?, ?, ?, ?, NOW())");
                foreach ($extractedImages as $pos => $imgUrl) {
                    $imgId = 'img_' . bin2hex(random_bytes(8));
                    $imgType = ($pos === 0) ? 'primary' : (($pos === 1) ? 'secondary' : 'GALLERY');
                    $imgIns->execute([$imgId, $productId, $imgUrl, $pos + 1, $imgType]);
                    $totalImagesSaved++;
                }
            }
        }

        jsonResponse([
            'message'          => 'Bulk product upload executed successfully!',
            'createdCount'     => $createdCount,
            'updatedCount'     => $updatedCount,
            'totalImagesSaved' => $totalImagesSaved
        ], 200);

    } catch (Throwable $e) {
        error_log("handleExecuteProductBulkUpload error: " . $e->getMessage());
        jsonError('Database error during bulk upload execution: ' . $e->getMessage(), 500);
    }
}

/**
 * POST /api/v1/admin/products/bulk-sale-update
 */
function handleBulkSaleUpdate(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];

    $productIds = $body['productIds'] ?? [];
    if (empty($productIds) || !is_array($productIds)) {
        jsonError('No product IDs selected for bulk sale update.', 400);
    }

    $action = $body['action'] ?? 'SET_ON_SALE';
    $discountPercent = floatval($body['discountPercent'] ?? 0);
    $fixedSalePrice = floatval($body['fixedSalePrice'] ?? 0);
    $saleDurationHours = isset($body['saleDurationHours']) ? intval($body['saleDurationHours']) : 0;
    $customSaleEndsAt = !empty($body['saleEndsAt']) ? trim($body['saleEndsAt']) : null;

    try {
        $pdo = getDatabaseConnection();
        try {
            $pdo->exec("ALTER TABLE `product` ADD COLUMN `saleEndsAt` DATETIME NULL AFTER `onSale`");
        } catch (Throwable $e) {}

        $inClause = implode(',', array_fill(0, count($productIds), '?'));

        // Compute saleEndsAt date string
        $saleEndsAtVal = null;
        if (!empty($customSaleEndsAt)) {
            $saleEndsAtVal = date('Y-m-d H:i:s', strtotime($customSaleEndsAt));
        } else if ($saleDurationHours > 0) {
            $saleEndsAtVal = date('Y-m-d H:i:s', strtotime("+{$saleDurationHours} hours"));
        }

        if ($action === 'SET_ON_SALE') {
            $stmt = $pdo->prepare("UPDATE `product` SET `onSale` = 1, `saleEndsAt` = ?, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $params = array_merge([$saleEndsAtVal], $productIds);
            $stmt->execute($params);
        } else if ($action === 'SET_OFF_SALE') {
            $stmt = $pdo->prepare("UPDATE `product` SET `onSale` = 0, `saleEndsAt` = NULL, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        } else if ($action === 'APPLY_DISCOUNT_PERCENT') {
            if ($discountPercent <= 0 || $discountPercent >= 100) {
                jsonError('Discount percentage must be between 1 and 99.', 400);
            }
            $factor = (100 - $discountPercent) / 100.0;
            $stmt = $pdo->prepare("UPDATE `product` SET `comparePrice` = `price`, `salePrice` = ROUND(`price` * {$factor}, 2), `onSale` = 1, `saleEndsAt` = ?, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $params = array_merge([$saleEndsAtVal], $productIds);
            $stmt->execute($params);
        } else if ($action === 'SET_FIXED_SALE_PRICE') {
            if ($fixedSalePrice <= 0) {
                jsonError('Fixed sale price must be greater than 0.', 400);
            }
            $stmt = $pdo->prepare("UPDATE `product` SET `comparePrice` = `price`, `salePrice` = ?, `onSale` = 1, `saleEndsAt` = ?, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $params = array_merge([$fixedSalePrice, $saleEndsAtVal], $productIds);
            $stmt->execute($params);
        } else if ($action === 'CLEAR_SALE') {
            $stmt = $pdo->prepare("UPDATE `product` SET `onSale` = 0, `salePrice` = NULL, `comparePrice` = NULL, `saleEndsAt` = NULL, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        }

        jsonResponse([
            'message' => 'Bulk sale options updated successfully!',
            'updatedCount' => count($productIds)
        ], 200);

    } catch (Throwable $e) {
        error_log("handleBulkSaleUpdate error: " . $e->getMessage());
        jsonError('Database error updating bulk sale options: ' . $e->getMessage(), 500);
    }
}

/**
 * PUT /api/v1/admin/products/:id/sale-price
 */
function handleInlineProductSaleUpdate(string $id): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];

    $onSale = isset($body['onSale']) ? ($body['onSale'] ? 1 : 0) : 0;
    $salePrice = isset($body['salePrice']) && $body['salePrice'] !== '' && $body['salePrice'] !== null ? floatval($body['salePrice']) : null;
    $comparePrice = isset($body['comparePrice']) && $body['comparePrice'] !== '' && $body['comparePrice'] !== null ? floatval($body['comparePrice']) : null;
    $saleEndsAt = !empty($body['saleEndsAt']) ? date('Y-m-d H:i:s', strtotime($body['saleEndsAt'])) : null;

    try {
        $pdo = getDatabaseConnection();
        try {
            $pdo->exec("ALTER TABLE `product` ADD COLUMN `saleEndsAt` DATETIME NULL AFTER `onSale`");
        } catch (Throwable $e) {}

        $stmt = $pdo->prepare("UPDATE `product` SET `onSale` = ?, `salePrice` = ?, `comparePrice` = ?, `saleEndsAt` = ?, `updatedAt` = NOW() WHERE `id` = ? OR `sku` = ?");
        $stmt->execute([$onSale, $salePrice, $comparePrice, $saleEndsAt, $id, $id]);

        jsonResponse(['message' => 'Product sale pricing updated successfully'], 200);
    } catch (Throwable $e) {
        error_log("handleInlineProductSaleUpdate error: " . $e->getMessage());
        jsonError('Failed to update product sale pricing', 500);
    }
}

/**
 * POST /api/v1/admin/products/bulk-price-update
 */
function handleBulkPriceUpdate(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];

    $productIds = $body['productIds'] ?? [];
    if (empty($productIds) || !is_array($productIds)) {
        jsonError('No product IDs selected for bulk price update.', 400);
    }

    $action = $body['action'] ?? 'INCREASE_PERCENT';
    $percentValue = floatval($body['percentValue'] ?? 0);
    $flatAmount = floatval($body['flatAmount'] ?? 0);
    $fixedPrice = floatval($body['fixedPrice'] ?? 0);

    try {
        $pdo = getDatabaseConnection();
        $inClause = implode(',', array_fill(0, count($productIds), '?'));

        if ($action === 'INCREASE_PERCENT') {
            if ($percentValue <= 0) {
                jsonError('Percentage must be greater than 0.', 400);
            }
            $factor = (100.0 + $percentValue) / 100.0;
            $stmt = $pdo->prepare("UPDATE `product` SET `price` = ROUND(`price` * {$factor}, 2), `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        } else if ($action === 'DECREASE_PERCENT') {
            if ($percentValue <= 0 || $percentValue >= 100) {
                jsonError('Percentage must be between 1 and 99.', 400);
            }
            $factor = (100.0 - $percentValue) / 100.0;
            $stmt = $pdo->prepare("UPDATE `product` SET `price` = ROUND(`price` * {$factor}, 2), `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        } else if ($action === 'INCREASE_FLAT') {
            if ($flatAmount <= 0) {
                jsonError('Flat amount must be greater than 0.', 400);
            }
            $stmt = $pdo->prepare("UPDATE `product` SET `price` = ROUND(`price` + {$flatAmount}, 2), `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        } else if ($action === 'DECREASE_FLAT') {
            if ($flatAmount <= 0) {
                jsonError('Flat amount must be greater than 0.', 400);
            }
            $stmt = $pdo->prepare("UPDATE `product` SET `price` = GREATEST(1.0, ROUND(`price` - {$flatAmount}, 2)), `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $stmt->execute($productIds);
        } else if ($action === 'SET_UNIFORM_PRICE') {
            if ($fixedPrice <= 0) {
                jsonError('Fixed price must be greater than 0.', 400);
            }
            $stmt = $pdo->prepare("UPDATE `product` SET `price` = ?, `updatedAt` = NOW() WHERE `id` IN ({$inClause})");
            $params = array_merge([$fixedPrice], $productIds);
            $stmt->execute($params);
        }

        jsonResponse([
            'message' => 'Bulk product prices updated successfully!',
            'updatedCount' => count($productIds)
        ], 200);

    } catch (Throwable $e) {
        error_log("handleBulkPriceUpdate error: " . $e->getMessage());
        jsonError('Database error updating bulk prices: ' . $e->getMessage(), 500);
    }
}

/**
 * POST /api/v1/admin/products/bulk-upload/error-report
 */
function handleDownloadBulkImportErrorReport(): void {
    jsonError('No import errors reported.', 404);
}

/**
 * DELETE /api/v1/admin/products/:id
 */
function handleDeleteProduct(string $id): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    $pdo = getDatabaseConnection();
    try {
        $stmt = $pdo->prepare("SELECT `id`, `name`, `sku` FROM `product` WHERE `id` = ? OR `sku` = ? OR `slug` = ? LIMIT 1");
        $stmt->execute([$id, $id, $id]);
        $prod = $stmt->fetch();
        if (!$prod) {
            jsonError('Product not found', 404);
        }

        $pId = $prod['id'];
        $pdo->prepare("DELETE FROM `productimage` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `productvideo` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `productvariant` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `wishlistitem` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `cartitem` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `review` WHERE `productId` = ?")->execute([$pId]);
        $pdo->prepare("DELETE FROM `product` WHERE `id` = ?")->execute([$pId]);

        jsonResponse(['success' => true, 'message' => 'Product deleted successfully', 'deletedId' => $pId], 200);
    } catch (Throwable $e) {
        error_log("handleDeleteProduct error: " . $e->getMessage());
        jsonError("Error deleting product: " . $e->getMessage(), 500);
    }
}

/**
 * POST /api/v1/admin/products/reset-database-single-product
 * POST /api/v1/admin/products/purge-all
 */
function handleResetDatabaseToSingleDemoProduct(): void {
    requireRole(['PRODUCT_MANAGER', 'ADMIN', 'SUPER_ADMIN']);
    $pdo = getDatabaseConnection();
    try {
        $tablesToClear = ['review', 'cartitem', 'wishlistitem', 'customerspecificprice', 'productimage', 'productvideo', 'productvariant', 'product'];
        $deletedTotal = 0;
        foreach ($tablesToClear as $tbl) {
            try {
                $stmt = $pdo->query("DELETE FROM `{$tbl}`");
                if ($tbl === 'product') {
                    $deletedTotal = $stmt->rowCount();
                }
            } catch (Throwable $e) {}
        }

        jsonResponse([
            'success' => true,
            'message' => 'Database purged successfully! 0 products remaining in catalog.',
            'deletedCount' => $deletedTotal,
            'productId' => null
        ], 200);
    } catch (Throwable $e) {
        error_log("handleResetDatabaseToSingleDemoProduct error: " . $e->getMessage());
        jsonError("Database reset failed: " . $e->getMessage(), 500);
    }
}


