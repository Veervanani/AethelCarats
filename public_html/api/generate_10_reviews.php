<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config/db.php';

try {
    $pdo = getDatabaseConnection();

    $stmt = $pdo->query("SELECT id, name, title, metal, shape, carat, jewelleryType FROM `product`");
    $products = $stmt->fetchAll();

    if (empty($products)) {
        echo json_encode(['error' => 'No products found']);
        exit;
    }

    $firstNames = [
        'Charlotte', 'Sophia', 'Gillian', 'Evelyn', 'Vivienne', 'James', 'Olivia',
        'Amelia', 'Harrison', 'Victoria', 'Isabelle', 'Julian', 'Clara', 'Nathaniel',
        'Beatrice', 'Marcus', 'Genevieve', 'Alexander', 'Cecilia', 'Damian', 'Eleanor',
        'Sebastian', 'Camilla', 'Dominic', 'Penelope', 'Tristan', 'Aria', 'Lucas',
        'Aurora', 'Julian', 'Seraphina', 'Oliver', 'Madeline', 'Benjamin', 'Rosalie',
        'Theodore', 'Geneva', 'Gabriel', 'Valentina', 'Maxwell', 'Florence', 'Arthur'
    ];

    $lastNames = [
        'Vance', 'Mercer', 'Thorne', 'St. Claire', 'Sterling', 'Crawford', 'Montgomery',
        'Wells', 'Dubois', 'Davenport', 'Cross', 'Ross', 'Knight', 'Rose', 'Croft',
        'Hayes', 'Wright', 'Sinclair', 'Fairfax', 'Ashford', 'Kingsley', 'Holloway',
        'Belmont', 'Kensington', 'Vanderbilt', 'Ellington', 'Pemberton', 'Somerset'
    ];

    $headlines = [
        'Exceptional Craftsmanship & Diamond Brilliance',
        'Exceeded Every Expectation!',
        'Pure Perfection & Unmatched Quality',
        'Bespoke Elegance & Timeless Beauty',
        'Stunning Sparkle & Flawless Finish',
        'An Absolute Masterpiece of Jewelry',
        'The Perfect Anniversary Ring',
        'Breathtaking Design & Fast Shipping',
        'Handcrafted Quality You Can Feel',
        'Unrivaled Brilliance & Presentation',
        'Truly Spectacular Diamond Fire!',
        'Beyond Happy With My Purchase',
        'Impeccable Quality & Fast Insured Delivery',
        'The Most Beautiful Ring I Have Ever Seen',
        'Outstanding Atelier Quality & Service',
        'Simply Breathtaking Artistry',
        'Worth Every Single Cent',
        'Flawless Diamond Setting & Fit',
        'A Lifetime Keepsake',
        'Captivating Elegance and Craft'
    ];

    $insStmt = $pdo->prepare("INSERT INTO `review` (`id`, `productId`, `author`, `email`, `rating`, `comment`, `isApproved`, `isFeatured`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)");

    $totalInserted = 0;

    foreach ($products as $pIdx => $product) {
        $pId = $product['id'];
        $pName = $product['title'] ?: ($product['name'] ?: 'Jewelry Item');
        $pMetal = $product['metal'] ?: '14K Gold';
        $pShape = $product['shape'] ?: 'Brilliant';
        $pCarat = !empty($product['carat']) ? "{$product['carat']}ct " : '';
        $pCat = strtolower($product['jewelleryType'] ?: 'fine jewelry');

        for ($rIdx = 0; $rIdx < 10; $rIdx++) {
            $uuid = sprintf(
                '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                mt_rand(0, 0xffff),
                mt_rand(0, 0x0fff) | 0x4000,
                mt_rand(0, 0x3fff) | 0x8000,
                mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
            );

            $seed = $pIdx * 10 + $rIdx;
            $fName = $firstNames[($seed * 7 + $rIdx * 3) % count($firstNames)];
            $lName = $lastNames[($seed * 11 + $rIdx * 5) % count($lastNames)];
            $author = "{$fName} {$lName}";
            $email = strtolower("{$fName}.{$lName}@example.com");
            $headline = $headlines[($seed * 13 + $rIdx * 2) % count($headlines)];
            $rating = ($seed + $rIdx) % 11 === 0 ? 4 : 5;
            $isFeatured = $rIdx < 3 ? 1 : 0;

            $commentsPool = [
                "Absolutely in love with my {$pName}! The {$pCarat}{$pShape} stone catches the light brilliantly in {$pMetal}. Arrived in discreet luxury packaging right on schedule.",
                "Exceeded my expectations in every way. The craftsmanship on this {$pCat} is flawless, and the {$pMetal} setting holds the {$pShape} diamond so elegantly.",
                "Bought the {$pName} for a special milestone and could not be happier. Superior craftsmanship, certified diamond clarity, and white-glove customer service!",
                "The brilliance of the {$pShape} diamond in person is unbelievable. Floksy Jewel's attention to detail on this {$pMetal} {$pCat} makes it a true heirloom piece.",
                "Outstanding quality! The {$pName} came beautifully presented with its certificate. Stunning {$pMetal} polish and mesmerizing diamond fire.",
                "I spent months searching for the right {$pCat} and {$pName} was the absolute perfect choice. The {$pMetal} setting is so refined!",
                "Words cannot express how gorgeous this {$pName} is in person. The {$pShape} diamond reflects light from every angle!",
                "The craftsmanship of Floksy Jewel atelier is top tier. This {$pMetal} {$pName} feels comfortable, solid, and looks extraordinarily opulent.",
                "My partner was completely speechless when opening the box! The {$pCarat}{$pShape} diamond in {$pMetal} is mesmerizing.",
                "Incredible quality and craftsmanship. The diamond certification was included and the parcel arrived quickly in discreet packaging."
            ];

            $body = $commentsPool[($seed * 17 + $rIdx * 4) % count($commentsPool)];
            $fullComment = "{$headline}\n\n{$body}";

            $daysAgo = mt_rand(1, 90);
            $createdAt = date('Y-m-d H:i:s', time() - ($daysAgo * 86400) - mt_rand(0, 3600));

            $insStmt->execute([$uuid, $pId, $author, $email, $rating, $fullComment, $isFeatured, $createdAt]);
            $totalInserted++;
        }
    }

    echo json_encode([
        'success' => true,
        'message' => "Successfully generated {$totalInserted} reviews across " . count($products) . " products!",
        'productCount' => count($products),
        'totalInserted' => $totalInserted
    ]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
