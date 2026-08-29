<?php
/**
 * Floksy Jewel — Business Hub & Operations Controller (PHP / MySQL PDO)
 * Handles Dashboard, Employees, Attendance, 46-column Sales Tracker, Commissions,
 * Targets, Customers, Suppliers, Excel Migration & Audit Trail on Hostinger / Apache.
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

function ensureBusinessTablesExist(PDO $pdo): void {
    // 1. Employee
    $pdo->exec("CREATE TABLE IF NOT EXISTS `employee` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeCode` VARCHAR(50) UNIQUE NOT NULL,
        `name` VARCHAR(191) NOT NULL,
        `email` VARCHAR(191) UNIQUE NOT NULL,
        `phone` VARCHAR(50) NULL,
        `department` VARCHAR(100) NOT NULL DEFAULT 'Sales',
        `designation` VARCHAR(100) NOT NULL DEFAULT 'Sales Executive',
        `role` VARCHAR(50) NOT NULL DEFAULT 'SALES_EMPLOYEE',
        `joiningDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        `monthlyTarget` DOUBLE NOT NULL DEFAULT 0,
        `commissionPlanId` VARCHAR(191) NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 2. Attendance
    $pdo->exec("CREATE TABLE IF NOT EXISTS `attendance` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeId` VARCHAR(191) NOT NULL,
        `date` VARCHAR(20) NOT NULL,
        `checkIn` DATETIME NULL,
        `checkOut` DATETIME NULL,
        `hoursWorked` DOUBLE NOT NULL DEFAULT 0,
        `status` VARCHAR(20) NOT NULL DEFAULT 'PRESENT',
        `lateStatus` VARCHAR(20) NOT NULL DEFAULT 'ON_TIME',
        `isManualEntry` TINYINT(1) NOT NULL DEFAULT 0,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY `emp_date_unique` (`employeeId`, `date`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 3. CommissionPlan & CommissionRule
    $pdo->exec("CREATE TABLE IF NOT EXISTS `commissionplan` (
        `id` VARCHAR(191) PRIMARY KEY,
        `name` VARCHAR(191) NOT NULL,
        `description` TEXT NULL,
        `defaultRate` DOUBLE NOT NULL DEFAULT 0.05,
        `basis` VARCHAR(50) NOT NULL DEFAULT 'NET_PROFIT',
        `minAmount` DOUBLE NOT NULL DEFAULT 0,
        `maxAmount` DOUBLE NULL,
        `isActive` TINYINT(1) NOT NULL DEFAULT 1,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 4. Supplier
    $pdo->exec("CREATE TABLE IF NOT EXISTS `supplier` (
        `id` VARCHAR(191) PRIMARY KEY,
        `name` VARCHAR(191) NOT NULL,
        `companyName` VARCHAR(191) NULL,
        `email` VARCHAR(191) NULL,
        `phone` VARCHAR(50) NULL,
        `country` VARCHAR(100) NULL,
        `address` TEXT NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 4b. Customer
    $pdo->exec("CREATE TABLE IF NOT EXISTS `customer` (
        `id` VARCHAR(191) PRIMARY KEY,
        `name` VARCHAR(191) NOT NULL,
        `country` VARCHAR(100) NULL,
        `companyName` VARCHAR(191) NULL,
        `company` VARCHAR(191) NULL,
        `email` VARCHAR(191) NULL,
        `phone` VARCHAR(50) NULL,
        `assignedStaff` VARCHAR(191) NULL DEFAULT 'Sales Team',
        `assignedEmployeeId` VARCHAR(191) NULL,
        `totalInvoicedDeals` INT NOT NULL DEFAULT 0,
        `lifetimeVolume` DOUBLE NOT NULL DEFAULT 0,
        `netProfit` DOUBLE NOT NULL DEFAULT 0,
        `lastSaleDate` DATETIME NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Self-healing columns for customer table (supports all legacy & prisma schemas)
    try { $pdo->exec("ALTER TABLE `customer` MODIFY COLUMN `email` VARCHAR(191) NULL DEFAULT NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` DROP INDEX `Customer_email_key`"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` DROP INDEX `email`"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `companyName` VARCHAR(191) NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `company` VARCHAR(191) NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `country` VARCHAR(100) NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `assignedStaff` VARCHAR(191) NULL DEFAULT 'Sales Team'"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `assignedEmployeeId` VARCHAR(191) NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `totalInvoicedDeals` INT NOT NULL DEFAULT 0"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `lifetimeVolume` DOUBLE NOT NULL DEFAULT 0"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `netProfit` DOUBLE NOT NULL DEFAULT 0"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `lastSaleDate` DATETIME NULL"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `customer` ADD COLUMN `notes` TEXT NULL"); } catch (\Throwable $e) {}

    // 5. InternalSale (46 Columns matching Excel)
    $pdo->exec("CREATE TABLE IF NOT EXISTS `internalsale` (
        `id` VARCHAR(191) PRIMARY KEY,
        `invoiceNo` VARCHAR(100) UNIQUE NOT NULL,
        `saleDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `customerName` VARCHAR(191) NOT NULL,
        `customerCountry` VARCHAR(100) NULL,
        `customerId` VARCHAR(191) NULL,
        `productType` VARCHAR(50) NOT NULL DEFAULT 'Diamond',
        `productDescription` TEXT NULL,
        `stoneType` VARCHAR(50) NULL,
        `shape` VARCHAR(50) NULL,
        `diamondColor` VARCHAR(50) NULL,
        `clarity` VARCHAR(50) NULL,
        `cut` VARCHAR(50) NULL,
        `polish` VARCHAR(50) NULL,
        `symmetry` VARCHAR(50) NULL,
        `fluorescence` VARCHAR(50) NULL,
        `measurement` VARCHAR(100) NULL,
        `pricePerCarat` DOUBLE NULL,
        `caratWeight` DOUBLE NULL,
        `quantity` DOUBLE NOT NULL DEFAULT 1,
        `certificate` VARCHAR(50) NULL,
        `certificateNo` VARCHAR(100) NULL,
        `supplierName` VARCHAR(191) NULL,
        `supplierId` VARCHAR(191) NULL,
        `purchasePrice` DOUBLE NOT NULL DEFAULT 0,
        `sellingPrice` DOUBLE NOT NULL DEFAULT 0,
        `discount` DOUBLE NOT NULL DEFAULT 0,
        `finalSaleAmount` DOUBLE NOT NULL DEFAULT 0,
        `shippingCost` DOUBLE NOT NULL DEFAULT 0,
        `gstPercent` DOUBLE NOT NULL DEFAULT 0,
        `gstAmount` DOUBLE NOT NULL DEFAULT 0,
        `finalPurchasePrice` DOUBLE NOT NULL DEFAULT 0,
        `paymentStatus` VARCHAR(50) NOT NULL DEFAULT 'Pending',
        `paymentMethod` VARCHAR(50) NULL,
        `amountReceived` DOUBLE NOT NULL DEFAULT 0,
        `pendingAmount` DOUBLE NOT NULL DEFAULT 0,
        `grossProfit` DOUBLE NOT NULL DEFAULT 0,
        `netProfit` DOUBLE NOT NULL DEFAULT 0,
        `salesPersonName` VARCHAR(191) NULL,
        `employeeId` VARCHAR(191) NULL,
        `commissionPercent` DOUBLE NOT NULL DEFAULT 0,
        `commissionAmount` DOUBLE NOT NULL DEFAULT 0,
        `profitAfterCommission` DOUBLE NOT NULL DEFAULT 0,
        `markupPercent` DOUBLE NOT NULL DEFAULT 0,
        `finalProfitPercent` DOUBLE NOT NULL DEFAULT 0,
        `orderStatus` VARCHAR(50) NOT NULL DEFAULT 'Delivered',
        `trackingNumber` VARCHAR(100) NULL,
        `trackingLink` TEXT NULL,
        `dollarRate` DOUBLE NULL,
        `saleMonth` VARCHAR(50) NULL,
        `isImported` TINYINT(1) NOT NULL DEFAULT 0,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 6. Commission
    $pdo->exec("CREATE TABLE IF NOT EXISTS `commission` (
        `id` VARCHAR(191) PRIMARY KEY,
        `saleId` VARCHAR(191) UNIQUE NOT NULL,
        `employeeId` VARCHAR(191) NOT NULL,
        `rateSnapshot` DOUBLE NOT NULL DEFAULT 0,
        `amount` DOUBLE NOT NULL DEFAULT 0,
        `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING',
        `approvedBy` VARCHAR(191) NULL,
        `approvedAt` DATETIME NULL,
        `paidBy` VARCHAR(191) NULL,
        `paidAt` DATETIME NULL,
        `paymentReference` VARCHAR(191) NULL,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 7. SalesTarget (Company Month-Wise)
    $pdo->exec("CREATE TABLE IF NOT EXISTS `salestarget` (
        `id` VARCHAR(191) PRIMARY KEY,
        `employeeId` VARCHAR(191) NULL DEFAULT 'COMPANY',
        `periodType` VARCHAR(50) NOT NULL DEFAULT 'MONTHLY',
        `periodYear` INT NOT NULL DEFAULT 2026,
        `periodMonth` INT NOT NULL DEFAULT 1,
        `year` INT NOT NULL DEFAULT 2026,
        `month` INT NOT NULL DEFAULT 1,
        `targetAmount` DOUBLE NOT NULL DEFAULT 0,
        `notes` TEXT NULL,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Self-healing columns for salestarget
    try { $pdo->exec("ALTER TABLE `salestarget` MODIFY COLUMN `employeeId` VARCHAR(191) NULL DEFAULT 'COMPANY'"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `salestarget` ADD COLUMN `periodType` VARCHAR(50) NOT NULL DEFAULT 'MONTHLY'"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `salestarget` ADD COLUMN `periodYear` INT NOT NULL DEFAULT 2026"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `salestarget` ADD COLUMN `periodMonth` INT NOT NULL DEFAULT 1"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `salestarget` ADD COLUMN `year` INT NOT NULL DEFAULT 2026"); } catch (\Throwable $e) {}
    try { $pdo->exec("ALTER TABLE `salestarget` ADD COLUMN `month` INT NOT NULL DEFAULT 1"); } catch (\Throwable $e) {}

    // 8. Business Backups
    $pdo->exec("CREATE TABLE IF NOT EXISTS `business_backups` (
        `id` VARCHAR(191) PRIMARY KEY,
        `backupName` VARCHAR(191) NOT NULL,
        `backupType` VARCHAR(50) NOT NULL DEFAULT 'AUTOMATIC_WEEKLY',
        `salesCount` INT NOT NULL DEFAULT 0,
        `employeesCount` INT NOT NULL DEFAULT 0,
        `customersCount` INT NOT NULL DEFAULT 0,
        `attendanceCount` INT NOT NULL DEFAULT 0,
        `commissionsCount` INT NOT NULL DEFAULT 0,
        `snapshotData` LONGTEXT NOT NULL,
        `fileSizeBytes` INT NOT NULL DEFAULT 0,
        `weekNumber` INT NOT NULL DEFAULT 0,
        `year` INT NOT NULL DEFAULT 2026,
        `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // 8. Seed initial requested employees: Rutu (Sales Manager), Jyoti (Sales Employee), Twinkle (Sales Employee)
    $employeesToSeed = [
        [
            'id' => 'emp-rutu-001',
            'employeeCode' => 'EMP-1001',
            'name' => 'Rutu',
            'email' => 'rutu@floksyjewel.com',
            'phone' => '+91 98765 43210',
            'department' => 'Sales',
            'designation' => 'Sales Manager',
            'role' => 'SALES_MANAGER',
            'status' => 'ACTIVE',
            'monthlyTarget' => 150000,
            'notes' => 'Sales Manager leading retail and high jewellery sales'
        ],
        [
            'id' => 'emp-jyoti-002',
            'employeeCode' => 'EMP-1002',
            'name' => 'Jyoti',
            'email' => 'jyoti@floksyjewel.com',
            'phone' => '+91 98765 43211',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive specializing in diamond and custom jewelry'
        ],
        [
            'id' => 'emp-twinkle-003',
            'employeeCode' => 'EMP-1003',
            'name' => 'Twinkle',
            'email' => 'twinkle@floksyjewel.com',
            'phone' => '+91 98765 43212',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive handling fine jewellery and solitaire sales'
        ]
    ];

    $seedStmt = $pdo->prepare("INSERT INTO `employee` (`id`, `employeeCode`, `name`, `email`, `phone`, `department`, `designation`, `role`, `status`, `monthlyTarget`, `notes`, `createdAt`, `updatedAt`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()) 
        ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `designation` = VALUES(`designation`), `monthlyTarget` = VALUES(`monthlyTarget`)");

    foreach ($employeesToSeed as $e) {
        $seedStmt->execute([
            $e['id'],
            $e['employeeCode'],
            $e['name'],
            $e['email'],
            $e['phone'],
            $e['department'],
            $e['designation'],
            $e['role'],
            $e['status'],
            $e['monthlyTarget'],
            $e['notes']
        ]);
    }
}

function computePhpFinancials(array $d): array {
    $sellingPrice = (float)($d['sellingPrice'] ?? 0);
    $discount = (float)($d['discount'] ?? 0);
    $finalSaleAmount = max(0, $sellingPrice - $discount);

    $purchasePrice = (float)($d['purchasePrice'] ?? 0);
    $gstPercent = (float)($d['gstPercent'] ?? 0);
    $gstAmount = $purchasePrice * $gstPercent;
    $finalPurchasePrice = $purchasePrice + $gstAmount;

    $shippingCost = (float)($d['shippingCost'] ?? 0);
    $grossProfit = $finalSaleAmount - $finalPurchasePrice;
    $netProfit = $grossProfit - $shippingCost;

    $commissionPercent = (float)($d['commissionPercent'] ?? 0);
    $commissionAmount = $netProfit > 0 ? ($netProfit * $commissionPercent) : 0;
    $profitAfterCommission = $netProfit - $commissionAmount;

    $markupPercent = $finalPurchasePrice > 0 ? ($netProfit / $finalPurchasePrice) : 0;
    $finalProfitPercent = $finalPurchasePrice > 0 ? ($profitAfterCommission / $finalPurchasePrice) : 0;

    $paymentStatus = $d['paymentStatus'] ?? 'Pending';
    $amountReceived = (float)($d['amountReceived'] ?? 0);
    if ($paymentStatus === 'Paid' && $amountReceived == 0) {
        $amountReceived = $finalSaleAmount;
    }
    $pendingAmount = ($paymentStatus === 'Paid') ? 0 : max(0, $finalSaleAmount - $amountReceived);

    return [
        'sellingPrice' => $sellingPrice,
        'discount' => $discount,
        'finalSaleAmount' => round($finalSaleAmount, 2),
        'purchasePrice' => $purchasePrice,
        'gstPercent' => $gstPercent,
        'gstAmount' => round($gstAmount, 4),
        'finalPurchasePrice' => round($finalPurchasePrice, 4),
        'shippingCost' => $shippingCost,
        'grossProfit' => round($grossProfit, 4),
        'netProfit' => round($netProfit, 4),
        'commissionPercent' => $commissionPercent,
        'commissionAmount' => round($commissionAmount, 4),
        'profitAfterCommission' => round($profitAfterCommission, 4),
        'markupPercent' => round($markupPercent, 6),
        'finalProfitPercent' => round($finalProfitPercent, 6),
        'amountReceived' => round($amountReceived, 2),
        'pendingAmount' => round($pendingAmount, 2),
        'paymentStatus' => $paymentStatus
    ];
}

// -------------------------------------------------------------
// CONTROLLER HANDLERS
// -------------------------------------------------------------

function parseFlexibleDate(?string $raw): string {
    if (empty($raw)) return date('Y-m-d H:i:s');
    $raw = trim($raw);

    // Check DD/MM/YYYY or DD.MM.YYYY
    if (preg_match('#^(\d{1,2})[/\.](\d{1,2})[/\.](\d{4})#', $raw, $m)) {
        $day = (int)$m[1];
        $month = (int)$m[2];
        $year = (int)$m[3];
        if ($day > 12 && $month <= 12) {
            return sprintf('%04d-%02d-%02d 00:00:00', $year, $month, $day);
        } else if ($month > 12 && $day <= 12) {
            return sprintf('%04d-%02d-%02d 00:00:00', $year, $day, $month);
        } else {
            return sprintf('%04d-%02d-%02d 00:00:00', $year, $month, $day);
        }
    }

    $ts = strtotime($raw);
    if ($ts !== false && $ts > 0) {
        return date('Y-m-d H:i:s', $ts);
    }

    return date('Y-m-d H:i:s');
}

function handleGetBusinessDashboard(): void {
    try {
        $pdo = getDatabaseConnection();
        ensureBusinessTablesExist($pdo);

        $year = trim($_GET['year'] ?? '');
        $month = trim($_GET['month'] ?? '');
        $period = $_GET['period'] ?? 'all';

        if ($period === 'today') {
            $where[] = "DATE(`saleDate`) = CURDATE()";
        } else if ($period === 'month' && empty($month)) {
            $where[] = "YEAR(`saleDate`) = YEAR(CURDATE()) AND MONTH(`saleDate`) = MONTH(CURDATE())";
        } else if ($period === 'year' && empty($year)) {
            $where[] = "YEAR(`saleDate`) = YEAR(CURDATE())";
        } else {
            // Apply Year filter
            if (!empty($year) && $year !== 'All Years' && is_numeric($year)) {
                $shortYear = substr($year, -2);
                $where[] = "(
                    (YEAR(`saleDate`) > 2000 AND YEAR(`saleDate`) = ?)
                    OR `saleDate` LIKE ?
                    OR `saleDate` LIKE ?
                    OR `saleMonth` LIKE ?
                    OR `saleMonth` LIKE ?
                )";
                $params[] = (int)$year;
                $params[] = $year . '%';
                $params[] = '%/' . $year . '%';
                $params[] = '%' . $year . '%';
                $params[] = '%' . $shortYear . '%';
            }

            // Apply Month filter
            if (!empty($month) && $month !== 'All Months') {
                $monthNum = (int)date('m', strtotime($month . ' 1 2026'));
                $shortMonth = date('M', strtotime($month . ' 1 2026'));
                $paddedMonth = sprintf('%02d', $monthNum);
                $where[] = "(
                    LOWER(TRIM(`saleMonth`)) = LOWER(?)
                    OR `saleMonth` LIKE ?
                    OR `saleMonth` LIKE ?
                    OR (YEAR(`saleDate`) > 2000 AND MONTH(`saleDate`) = ?)
                    OR `saleDate` LIKE ?
                    OR `saleDate` LIKE ?
                )";
                $params[] = $month;
                $params[] = $month . '%';
                $params[] = $shortMonth . '%';
                $params[] = $monthNum;
                $params[] = '%-' . $paddedMonth . '-%';
                $params[] = '%/' . $paddedMonth . '/%';
            }
        }

        $whereSql = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

        $stmt = $pdo->prepare("SELECT 
            COUNT(*) as totalOrders,
            COALESCE(SUM(finalSaleAmount), 0) as totalRevenue,
            COALESCE(SUM(finalPurchasePrice), 0) as totalPurchaseCost,
            COALESCE(SUM(grossProfit), 0) as totalGrossProfit,
            COALESCE(SUM(netProfit), 0) as totalNetProfit,
            COALESCE(SUM(commissionAmount), 0) as totalCommission,
            COALESCE(SUM(profitAfterCommission), 0) as totalProfitAfterCommission,
            COALESCE(SUM(gstAmount), 0) as totalGST,
            COALESCE(SUM(pendingAmount), 0) as totalPendingReceivables
        FROM `internalsale` {$whereSql}");
        $stmt->execute($params);
        $metrics = $stmt->fetch(PDO::FETCH_ASSOC) ?: [];

        $dollarRate = !empty($_GET['dollarRate']) ? (float)$_GET['dollarRate'] : 94.55;
        $metrics['dollarRate'] = $dollarRate;
        $metrics['totalRevenue'] = (float)($metrics['totalRevenue'] ?? 0);
        $metrics['totalPurchaseCost'] = (float)($metrics['totalPurchaseCost'] ?? 0);
        $metrics['totalGrossProfit'] = (float)($metrics['totalGrossProfit'] ?? 0);
        $metrics['totalNetProfit'] = (float)($metrics['totalNetProfit'] ?? 0);
        $metrics['totalCommission'] = (float)($metrics['totalCommission'] ?? 0);
        $metrics['totalProfitAfterCommission'] = round($metrics['totalNetProfit'] - $metrics['totalCommission'], 2);
        $metrics['totalGST'] = (float)($metrics['totalGST'] ?? 0);
        $metrics['totalPendingReceivables'] = (float)($metrics['totalPendingReceivables'] ?? 0);
        $metrics['totalOrders'] = (int)($metrics['totalOrders'] ?? 0);
        $metrics['averageMarkupPercent'] = $metrics['totalPurchaseCost'] > 0 
            ? round(($metrics['totalNetProfit'] / $metrics['totalPurchaseCost']) * 100, 1) 
            : 0;
        $metrics['totalGST'] = (float)($metrics['totalGST'] ?? 0);
        $metrics['totalPendingReceivables'] = (float)($metrics['totalPendingReceivables'] ?? 0);
        $metrics['totalOrders'] = (int)($metrics['totalOrders'] ?? 0);

        $metrics['totalNetProfitINR'] = round($metrics['totalNetProfit'] * $dollarRate, 2);
        $metrics['totalCommissionINR'] = round($metrics['totalCommission'] * $dollarRate, 2);
        $metrics['profitAfterCommissionINR'] = round($metrics['totalProfitAfterCommission'] * $dollarRate, 2);

        // SalesPerson Performance
        $spStmt = $pdo->prepare("SELECT 
            COALESCE(salesPersonName, 'Unassigned') as name,
            COUNT(*) as orders,
            COALESCE(SUM(finalSaleAmount), 0) as revenue,
            COALESCE(SUM(netProfit), 0) as netProfitUSD,
            COALESCE(SUM(commissionAmount), 0) as commissionUSD
        FROM `internalsale`
        {$whereSql}
        GROUP BY salesPersonName
        ORDER BY revenue DESC");
        $spStmt->execute($params);
        $salesPersonPerformance = [];
        while ($r = $spStmt->fetch(PDO::FETCH_ASSOC)) {
            $r['revenue'] = (float)$r['revenue'];
            $r['netProfitUSD'] = (float)$r['netProfitUSD'];
            $r['commissionUSD'] = (float)$r['commissionUSD'];
            $r['netProfitINR'] = round($r['netProfitUSD'] * $dollarRate, 2);
            $r['commissionINR'] = round($r['commissionUSD'] * $dollarRate, 2);
            $r['profitAfterCommission'] = round($r['netProfitUSD'] - $r['commissionUSD'], 2);
            $salesPersonPerformance[] = $r;
        }

        // Product Distribution
        $pStmt = $pdo->prepare("SELECT 
            productType,
            COUNT(*) as orders,
            COALESCE(SUM(finalSaleAmount), 0) as revenue,
            COALESCE(SUM(netProfit), 0) as netProfit
        FROM `internalsale`
        {$whereSql}
        GROUP BY productType");
        $pStmt->execute($params);
        $productDistribution = [
            'diamond' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0],
            'jewelry' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0]
        ];
        while ($p = $pStmt->fetch(PDO::FETCH_ASSOC)) {
            $k = strtolower($p['productType'] ?? '') === 'diamond' ? 'diamond' : 'jewelry';
            $productDistribution[$k] = [
                'orders' => (int)($p['orders'] ?? 0),
                'revenue' => (float)($p['revenue'] ?? 0),
                'netProfit' => (float)($p['netProfit'] ?? 0)
            ];
        }

        // Attendance stats
        $today = date('Y-m-d');
        $attStmt = $pdo->prepare("SELECT status, COUNT(*) as cnt FROM `attendance` WHERE `date` = ? GROUP BY status");
        $attStmt->execute([$today]);
        $attendanceToday = ['present' => 0, 'absent' => 0, 'late' => 0, 'onLeave' => 0, 'total' => 0];
        while ($a = $attStmt->fetch(PDO::FETCH_ASSOC)) {
            $st = strtolower($a['status']);
            if ($st === 'present') $attendanceToday['present'] += (int)$a['cnt'];
            else if ($st === 'absent') $attendanceToday['absent'] += (int)$a['cnt'];
            else if ($st === 'leave') $attendanceToday['onLeave'] += (int)$a['cnt'];
        }
        $totalEmpStmt = $pdo->query("SELECT COUNT(*) FROM `employee` WHERE `status` = 'ACTIVE'");
        $attendanceToday['total'] = (int)$totalEmpStmt->fetchColumn();

        // Company Monthly Sales Target
        $curYear = (int)date('Y');
        $curMonth = (int)date('n');
        $tgtStmt = $pdo->prepare("SELECT targetAmount FROM `salestarget` WHERE (`year` = ? OR `periodYear` = ?) AND (`month` = ? OR `periodMonth` = ?) LIMIT 1");
        $tgtStmt->execute([$curYear, $curYear, $curMonth, $curMonth]);
        $targetVal = (float)$tgtStmt->fetchColumn();
        if ($targetVal <= 0) $targetVal = 50000;

        $achieved = (float)$metrics['totalRevenue'];
        $achP = $targetVal > 0 ? min(100, round(($achieved / $targetVal) * 100)) : 0;

        jsonResponse([
            'metrics' => $metrics,
            'salesPersonPerformance' => $salesPersonPerformance,
            'productDistribution' => $productDistribution,
            'attendanceToday' => $attendanceToday,
            'attendance' => [
                'totalEmployees' => $attendanceToday['total'],
                'present' => $attendanceToday['present'],
                'absent' => $attendanceToday['absent'],
                'late' => $attendanceToday['late'],
                'onLeave' => $attendanceToday['onLeave']
            ],
            'targets' => [
                'totalTarget' => $targetVal,
                'actualSales' => $achieved,
                'achievementPercent' => $achP,
                'remaining' => max(0, $targetVal - $achieved)
            ],
            'salesTargetOverall' => ['target' => $targetVal, 'actual' => $achieved, 'achievementPercent' => $achP]
        ]);
    } catch (\Throwable $e) {
        error_log('Dashboard error: ' . $e->getMessage());
        jsonResponse([
            'metrics' => [
                'totalOrders' => 0,
                'totalRevenue' => 0,
                'totalPurchaseCost' => 0,
                'totalGrossProfit' => 0,
                'totalNetProfit' => 0,
                'totalCommission' => 0,
                'totalProfitAfterCommission' => 0,
                'totalGST' => 0,
                'totalPendingReceivables' => 0,
                'totalNetProfitINR' => 0,
                'totalCommissionINR' => 0,
                'profitAfterCommissionINR' => 0,
                'dollarRate' => 94.55
            ],
            'salesPersonPerformance' => [],
            'productDistribution' => [
                'diamond' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0],
                'jewelry' => ['orders' => 0, 'revenue' => 0, 'netProfit' => 0]
            ],
            'attendanceToday' => ['present' => 0, 'absent' => 0, 'late' => 0, 'onLeave' => 0, 'total' => 3],
            'attendance' => ['totalEmployees' => 3, 'present' => 0, 'absent' => 0, 'late' => 0, 'onLeave' => 0],
            'targets' => ['totalTarget' => 310000, 'actualSales' => 0, 'achievementPercent' => 0, 'remaining' => 310000],
            'salesTargetOverall' => ['target' => 310000, 'actual' => 0, 'achievementPercent' => 0]
        ]);
    }
}


function handleGetBusinessSales(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(500, max(10, (int)($_GET['limit'] ?? 50)));
    $offset = ($page - 1) * $limit;

    $where = [];
    $params = [];

    if (!empty($_GET['search'])) {
        $s = '%' . trim($_GET['search']) . '%';
        $where[] = "(`invoiceNo` LIKE ? OR `customerName` LIKE ? OR `productDescription` LIKE ? OR `certificateNo` LIKE ?)";
        $params = array_merge($params, [$s, $s, $s, $s]);
    }
    if (!empty($_GET['productType'])) {
        $where[] = "`productType` = ?";
        $params[] = $_GET['productType'];
    }
    if (!empty($_GET['paymentStatus'])) {
        $where[] = "`paymentStatus` = ?";
        $params[] = $_GET['paymentStatus'];
    }
    if (!empty($_GET['orderStatus'])) {
        $where[] = "`orderStatus` = ?";
        $params[] = $_GET['orderStatus'];
    }

    $whereSql = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM `internalsale` {$whereSql}");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    $sumStmt = $pdo->prepare("SELECT 
        COUNT(*) as totalOrders,
        COALESCE(SUM(finalSaleAmount), 0) as totalRevenue,
        COALESCE(SUM(finalPurchasePrice), 0) as totalPurchaseCost,
        COALESCE(SUM(grossProfit), 0) as totalGrossProfit,
        COALESCE(SUM(netProfit), 0) as totalNetProfit,
        COALESCE(SUM(commissionAmount), 0) as totalCommission,
        COALESCE(SUM(profitAfterCommission), 0) as totalProfitAfterCommission
    FROM `internalsale` {$whereSql}");
    $sumStmt->execute($params);
    $summary = $sumStmt->fetch(PDO::FETCH_ASSOC);

    $dataStmt = $pdo->prepare("SELECT * FROM `internalsale` {$whereSql} ORDER BY `saleDate` DESC, `createdAt` DESC LIMIT {$limit} OFFSET {$offset}");
    $dataStmt->execute($params);
    $sales = $dataStmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse([
        'sales' => $sales,
        'total' => $total,
        'page' => $page,
        'limit' => $limit,
        'summary' => $summary
    ]);
}

function handleCreateBusinessSale(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    if (empty($body['invoiceNo']) || empty($body['customerName'])) {
        jsonError('Invoice No and Customer Name are required', 400);
    }

    $fin = computePhpFinancials($body);
    $id = generateUuidV4();

    $stmt = $pdo->prepare("INSERT INTO `internalsale` (
        `id`, `invoiceNo`, `saleDate`, `customerName`, `customerCountry`, `customerId`, `productType`,
        `productDescription`, `stoneType`, `shape`, `diamondColor`, `clarity`, `cut`, `polish`,
        `symmetry`, `fluorescence`, `measurement`, `pricePerCarat`, `caratWeight`, `quantity`,
        `certificate`, `certificateNo`, `supplierName`, `supplierId`, `purchasePrice`, `sellingPrice`,
        `discount`, `finalSaleAmount`, `shippingCost`, `gstPercent`, `gstAmount`, `finalPurchasePrice`,
        `paymentStatus`, `paymentMethod`, `amountReceived`, `pendingAmount`, `grossProfit`, `netProfit`,
        `salesPersonName`, `employeeId`, `commissionPercent`, `commissionAmount`, `profitAfterCommission`,
        `markupPercent`, `finalProfitPercent`, `orderStatus`, `trackingNumber`, `trackingLink`, `dollarRate`,
        `saleMonth`, `createdAt`, `updatedAt`
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
    )");

    $saleDate = !empty($body['saleDate']) ? date('Y-m-d H:i:s', strtotime($body['saleDate'])) : date('Y-m-d H:i:s');
    $saleMonth = !empty($body['saleMonth']) ? $body['saleMonth'] : date('F', strtotime($saleDate));

    $stmt->execute([
        $id,
        $body['invoiceNo'],
        $saleDate,
        $body['customerName'],
        $body['customerCountry'] ?? null,
        $body['customerId'] ?? null,
        $body['productType'] ?? 'Diamond',
        $body['productDescription'] ?? null,
        $body['stoneType'] ?? null,
        $body['shape'] ?? null,
        $body['diamondColor'] ?? null,
        $body['clarity'] ?? null,
        $body['cut'] ?? null,
        $body['polish'] ?? null,
        $body['symmetry'] ?? null,
        $body['fluorescence'] ?? null,
        $body['measurement'] ?? null,
        $body['pricePerCarat'] ?? null,
        $body['caratWeight'] ?? null,
        $body['quantity'] ?? 1,
        $body['certificate'] ?? null,
        $body['certificateNo'] ?? null,
        $body['supplierName'] ?? null,
        $body['supplierId'] ?? null,
        $fin['purchasePrice'],
        $fin['sellingPrice'],
        $fin['discount'],
        $fin['finalSaleAmount'],
        $fin['shippingCost'],
        $fin['gstPercent'],
        $fin['gstAmount'],
        $fin['finalPurchasePrice'],
        $fin['paymentStatus'],
        $body['paymentMethod'] ?? null,
        $fin['amountReceived'],
        $fin['pendingAmount'],
        $fin['grossProfit'],
        $fin['netProfit'],
        $body['salesPersonName'] ?? null,
        $body['employeeId'] ?? null,
        $fin['commissionPercent'],
        $fin['commissionAmount'],
        $fin['profitAfterCommission'],
        $fin['markupPercent'],
        $fin['finalProfitPercent'],
        $body['orderStatus'] ?? 'Delivered',
        $body['trackingNumber'] ?? null,
        $body['trackingLink'] ?? null,
        $body['dollarRate'] ?? 94.55,
        $saleMonth
    ]);

    syncBusinessCustomersFromSales($pdo);
    jsonResponse(['message' => 'Sale created successfully', 'id' => $id], 201);
}

function handleGetBusinessSaleDetail(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->prepare("SELECT * FROM `internalsale` WHERE `id` = ? OR `invoiceNo` = ? LIMIT 1");
    $stmt->execute([$id, $id]);
    $sale = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$sale) {
        jsonError('Sale not found', 404);
    }
    jsonResponse(['sale' => $sale]);
}

function handleUpdateBusinessSale(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $stmt = $pdo->prepare("SELECT * FROM `internalsale` WHERE `id` = ? OR `invoiceNo` = ? LIMIT 1");
    $stmt->execute([$id, $id]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$existing) {
        jsonError('Sale not found', 404);
    }

    $actualId = $existing['id'];

    // If only dollarRate is being updated (live inline edit)
    if (isset($body['dollarRate']) && (count($body) === 1 || (count($body) === 2 && isset($body['id'])))) {
        $rate = (float)$body['dollarRate'];
        $up = $pdo->prepare("UPDATE `internalsale` SET `dollarRate` = ?, `updatedAt` = NOW() WHERE `id` = ?");
        $up->execute([$rate, $actualId]);
        recordBusinessAuditLog('UPDATE_RATE', 'Sale', "Updated Dollar Rate to {$rate} for invoice {$existing['invoiceNo']}");
        jsonResponse(['message' => 'Dollar rate updated successfully', 'dollarRate' => $rate, 'success' => true]);
        return;
    }

    $merged = array_merge($existing, $body);
    $fin = computePhpFinancials($merged);

    $saleDate = !empty($merged['saleDate']) ? parseFlexibleDate($merged['saleDate']) : $existing['saleDate'];
    $saleMonth = !empty($merged['saleMonth']) ? $merged['saleMonth'] : date('F', strtotime($saleDate));

    $updateStmt = $pdo->prepare("UPDATE `internalsale` SET
        `invoiceNo` = ?, `saleDate` = ?, `customerName` = ?, `customerCountry` = ?, `customerId` = ?, `productType` = ?,
        `productDescription` = ?, `stoneType` = ?, `shape` = ?, `diamondColor` = ?, `clarity` = ?, `cut` = ?, `polish` = ?,
        `symmetry` = ?, `fluorescence` = ?, `measurement` = ?, `pricePerCarat` = ?, `caratWeight` = ?, `quantity` = ?,
        `certificate` = ?, `certificateNo` = ?, `supplierName` = ?, `supplierId` = ?, `purchasePrice` = ?, `sellingPrice` = ?,
        `discount` = ?, `finalSaleAmount` = ?, `shippingCost` = ?, `gstPercent` = ?, `gstAmount` = ?, `finalPurchasePrice` = ?,
        `paymentStatus` = ?, `paymentMethod` = ?, `amountReceived` = ?, `pendingAmount` = ?, `grossProfit` = ?, `netProfit` = ?,
        `salesPersonName` = ?, `employeeId` = ?, `commissionPercent` = ?, `commissionAmount` = ?, `profitAfterCommission` = ?,
        `markupPercent` = ?, `finalProfitPercent` = ?, `orderStatus` = ?, `trackingNumber` = ?, `trackingLink` = ?, `dollarRate` = ?,
        `saleMonth` = ?, `updatedAt` = NOW()
        WHERE `id` = ?");

    $updateStmt->execute([
        $merged['invoiceNo'] ?? $existing['invoiceNo'],
        $saleDate,
        $merged['customerName'] ?? $existing['customerName'],
        $merged['customerCountry'] ?? null,
        $merged['customerId'] ?? null,
        $merged['productType'] ?? 'Diamond',
        $merged['productDescription'] ?? null,
        $merged['stoneType'] ?? null,
        $merged['shape'] ?? null,
        $merged['diamondColor'] ?? null,
        $merged['clarity'] ?? null,
        $merged['cut'] ?? null,
        $merged['polish'] ?? null,
        $merged['symmetry'] ?? null,
        $merged['fluorescence'] ?? null,
        $merged['measurement'] ?? null,
        $merged['pricePerCarat'] ?? null,
        $merged['caratWeight'] ?? null,
        $merged['quantity'] ?? 1,
        $merged['certificate'] ?? null,
        $merged['certificateNo'] ?? null,
        $merged['supplierName'] ?? null,
        $merged['supplierId'] ?? null,
        $fin['purchasePrice'],
        $fin['sellingPrice'],
        $fin['discount'],
        $fin['finalSaleAmount'],
        $fin['shippingCost'],
        $fin['gstPercent'],
        $fin['gstAmount'],
        $fin['finalPurchasePrice'],
        $fin['paymentStatus'],
        $merged['paymentMethod'] ?? null,
        $fin['amountReceived'],
        $fin['pendingAmount'],
        $fin['grossProfit'],
        $fin['netProfit'],
        $merged['salesPersonName'] ?? null,
        $merged['employeeId'] ?? null,
        $fin['commissionPercent'],
        $fin['commissionAmount'],
        $fin['profitAfterCommission'],
        $fin['markupPercent'],
        $fin['finalProfitPercent'],
        $merged['orderStatus'] ?? 'Delivered',
        $merged['trackingNumber'] ?? null,
        $merged['trackingLink'] ?? null,
        $merged['dollarRate'] ?? 94.55,
        $saleMonth,
        $actualId
    ]);

    syncBusinessCustomersFromSales($pdo);
    recordBusinessAuditLog('UPDATE', 'Sale', "Updated invoice {$merged['invoiceNo']}");
    jsonResponse(['message' => 'Sale updated successfully', 'id' => $actualId, 'success' => true]);
}

function handleBulkUpdateBusinessSales(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $ids = $body['ids'] ?? [];
    $updates = $body['updates'] ?? [];

    if (empty($ids) || !is_array($ids)) {
        jsonError('No sales IDs provided for bulk update', 400);
    }
    if (empty($updates) || !is_array($updates)) {
        jsonError('No update fields provided', 400);
    }

    $updatedCount = 0;
    foreach ($ids as $id) {
        $stmt = $pdo->prepare("SELECT * FROM `internalsale` WHERE `id` = ? OR `invoiceNo` = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$existing) continue;

        $merged = array_merge($existing, $updates);
        $fin = computePhpFinancials($merged);

        $updateStmt = $pdo->prepare("UPDATE `internalsale` SET 
            `paymentStatus` = ?, `paymentMethod` = ?, `orderStatus` = ?, `salesPersonName` = ?, 
            `dollarRate` = ?, `discount` = ?, `finalSaleAmount` = ?, `grossProfit` = ?, 
            `netProfit` = ?, `commissionPercent` = ?, `commissionAmount` = ?, 
            `profitAfterCommission` = ?, `trackingNumber` = ?, `updatedAt` = NOW()
            WHERE `id` = ?");

        $updateStmt->execute([
            $updates['paymentStatus'] ?? $existing['paymentStatus'],
            $updates['paymentMethod'] ?? $existing['paymentMethod'],
            $updates['orderStatus'] ?? $existing['orderStatus'],
            $updates['salesPersonName'] ?? $existing['salesPersonName'],
            !empty($updates['dollarRate']) ? (float)$updates['dollarRate'] : (float)$existing['dollarRate'],
            $fin['discount'],
            $fin['finalSaleAmount'],
            $fin['grossProfit'],
            $fin['netProfit'],
            $fin['commissionPercent'],
            $fin['commissionAmount'],
            $fin['profitAfterCommission'],
            $updates['trackingNumber'] ?? $existing['trackingNumber'],
            $existing['id']
        ]);
        $updatedCount++;
    }

    syncBusinessCustomersFromSales($pdo);
    recordBusinessAuditLog('BULK_UPDATE', 'Sale', "Bulk updated {$updatedCount} sales records");
    jsonResponse([
        'message' => "{$updatedCount} sales updated successfully",
        'updatedCount' => $updatedCount,
        'success' => true
    ]);
}

function handleMarkAllEmployeesPresentForMonth(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $monthStr = $body['month'] ?? ($_GET['month'] ?? date('Y-m'));
    $parts = explode('-', $monthStr);
    $year = (int)($parts[0] ?? date('Y'));
    $month = (int)($parts[1] ?? date('m'));

    $daysInMonth = (int)date('t', strtotime("{$year}-{$month}-01"));

    // Get all employees
    $empStmt = $pdo->query("SELECT id, name FROM `employee`");
    $employees = $empStmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($employees)) {
        ensureBusinessTablesExist($pdo);
        $employees = $pdo->query("SELECT id, name FROM `employee`")->fetchAll(PDO::FETCH_ASSOC);
    }

    $insertStmt = $pdo->prepare("INSERT INTO `attendance` (`id`, `employeeId`, `date`, `hoursWorked`, `status`, `lateStatus`, `isManualEntry`, `notes`, `createdAt`, `updatedAt`)
        VALUES (?, ?, ?, 8.0, 'PRESENT', 'ON_TIME', 1, 'Monthly Bulk Presence', NOW(), NOW())
        ON DUPLICATE KEY UPDATE `hoursWorked` = 8.0, `status` = 'PRESENT', `lateStatus` = 'ON_TIME', `isManualEntry` = 1");

    $count = 0;
    foreach ($employees as $emp) {
        for ($d = 1; $d <= $daysInMonth; $d++) {
            $dateStr = sprintf('%04d-%02d-%02d', $year, $month, $d);
            $id = generateUuidV4();
            $insertStmt->execute([$id, $emp['id'], $dateStr]);
            $count++;
        }
    }

    recordBusinessAuditLog('BULK_ATTENDANCE', 'Attendance', "Marked all employees present for {$monthStr} ({$count} entries)");
    jsonResponse([
        'message' => "Successfully marked all employees present for {$monthStr}",
        'entriesCount' => $count,
        'success' => true
    ]);
}

function handleExecuteSalesImport(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];
    $rows = $body['rows'] ?? [];
    $skipDuplicates = !empty($body['skipDuplicates']);

    if (empty($rows)) {
        jsonError('No rows provided for import', 400);
    }

    $importedCount = 0;
    $skippedCount = 0;

    $checkStmt = $pdo->prepare("SELECT id FROM `internalsale` WHERE `invoiceNo` = ? LIMIT 1");

    foreach ($rows as $r) {
        $inv = trim($r['invoiceNo'] ?? '');
        if (empty($inv)) continue;

        $checkStmt->execute([$inv]);
        if ($checkStmt->fetch()) {
            if ($skipDuplicates) {
                $skippedCount++;
                continue;
            }
        }

        $id = generateUuidV4();
        $stmt = $pdo->prepare("INSERT INTO `internalsale` (
            `id`, `invoiceNo`, `saleDate`, `customerName`, `customerCountry`, `productType`,
            `productDescription`, `stoneType`, `shape`, `diamondColor`, `clarity`, `cut`, `polish`,
            `symmetry`, `fluorescence`, `measurement`, `pricePerCarat`, `caratWeight`, `quantity`,
            `certificate`, `certificateNo`, `supplierName`, `purchasePrice`, `sellingPrice`,
            `discount`, `finalSaleAmount`, `shippingCost`, `gstPercent`, `gstAmount`, `finalPurchasePrice`,
            `paymentStatus`, `paymentMethod`, `amountReceived`, `pendingAmount`, `grossProfit`, `netProfit`,
            `salesPersonName`, `commissionPercent`, `commissionAmount`, `profitAfterCommission`,
            `markupPercent`, `finalProfitPercent`, `orderStatus`, `trackingNumber`, `trackingLink`, `dollarRate`,
            `saleMonth`, `isImported`, `createdAt`, `updatedAt`
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW()
        )");

        $saleDate = parseFlexibleDate($r['saleDate'] ?? '');
        $saleMonth = !empty($r['saleMonth']) ? $r['saleMonth'] : date('F', strtotime($saleDate));

        $stmt->execute([
            $id,
            $inv,
            $saleDate,
            $r['customerName'] ?? 'Walk-in Client',
            $r['customerCountry'] ?? null,
            $r['productType'] ?? 'Diamond',
            $r['productDescription'] ?? null,
            $r['stoneType'] ?? null,
            $r['shape'] ?? null,
            $r['diamondColor'] ?? null,
            $r['clarity'] ?? null,
            $r['cut'] ?? null,
            $r['polish'] ?? null,
            $r['symmetry'] ?? null,
            $r['fluorescence'] ?? null,
            $r['measurement'] ?? null,
            $r['pricePerCarat'] ?? null,
            $r['caratWeight'] ?? null,
            $r['quantity'] ?? 1,
            $r['certificate'] ?? null,
            $r['certificateNo'] ?? null,
            $r['supplierName'] ?? null,
            (float)($r['purchasePrice'] ?? 0),
            (float)($r['sellingPrice'] ?? 0),
            (float)($r['discount'] ?? 0),
            (float)($r['finalSaleAmount'] ?? 0),
            (float)($r['shippingCost'] ?? 0),
            (float)($r['gstPercent'] ?? 0),
            (float)($r['gstAmount'] ?? 0),
            (float)($r['finalPurchasePrice'] ?? 0),
            $r['paymentStatus'] ?? 'Paid',
            $r['paymentMethod'] ?? null,
            (float)($r['amountReceived'] ?? 0),
            (float)($r['pendingAmount'] ?? 0),
            (float)($r['grossProfit'] ?? 0),
            (float)($r['netProfit'] ?? 0),
            $r['salesPersonName'] ?? null,
            (float)($r['commissionPercent'] ?? 0),
            (float)($r['commissionAmount'] ?? 0),
            (float)($r['profitAfterCommission'] ?? 0),
            (float)($r['markupPercent'] ?? 0),
            (float)($r['finalProfitPercent'] ?? 0),
            $r['orderStatus'] ?? 'Delivered',
            $r['trackingNumber'] ?? null,
            $r['trackingLink'] ?? null,
            $r['dollarRate'] ?? 94.55,
            $saleMonth
        ]);

        $importedCount++;
    }

    syncBusinessCustomersFromSales($pdo);

    jsonResponse([
        'message' => 'Import executed successfully',
        'importedCount' => $importedCount,
        'skippedCount' => $skippedCount,
        'totalCount' => count($rows)
    ]);
}

function handleGetBusinessEmployees(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT * FROM `employee` ORDER BY `name` ASC");
    $raw = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $employees = [];
    foreach ($raw as $e) {
        $e['fullName'] = $e['name'];
        $e['monthlySalesTarget'] = (float)$e['monthlyTarget'];
        $e['targetAmount'] = (float)$e['monthlyTarget'];
        $employees[] = $e;
    }
    jsonResponse(['employees' => $employees]);
}

function handleGetBusinessEmployeeDetail(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $stmt = $pdo->prepare("SELECT * FROM `employee` WHERE `id` = ? OR `employeeCode` = ? OR LOWER(`name`) = LOWER(?) LIMIT 1");
    $stmt->execute([$id, $id, $id]);
    $emp = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$emp) {
        jsonError('Employee not found', 404);
    }

    $emp['fullName'] = $emp['name'];
    $emp['monthlySalesTarget'] = (float)$emp['monthlyTarget'];
    $emp['targetAmount'] = (float)$emp['monthlyTarget'];

    // Query employee sales statistics
    $salesStmt = $pdo->prepare("SELECT 
        COUNT(*) as totalOrders,
        COALESCE(SUM(finalSaleAmount), 0) as totalSalesAmount,
        COALESCE(SUM(netProfit), 0) as netProfit,
        COALESCE(SUM(commissionAmount), 0) as totalCommission
    FROM `internalsale`
    WHERE `employeeId` = ? OR LOWER(`salesPersonName`) = LOWER(?)");
    $salesStmt->execute([$emp['id'], $emp['name']]);
    $stats = $salesStmt->fetch(PDO::FETCH_ASSOC);

    // Recent orders
    $ordersStmt = $pdo->prepare("SELECT * FROM `internalsale` WHERE `employeeId` = ? OR LOWER(`salesPersonName`) = LOWER(?) ORDER BY `saleDate` DESC LIMIT 10");
    $ordersStmt->execute([$emp['id'], $emp['name']]);
    $recentOrders = $ordersStmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse([
        'employee' => $emp,
        'stats' => $stats,
        'recentOrders' => $recentOrders,
        'sales' => $recentOrders
    ]);
}


function handleGetBusinessAttendance(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $date = $_GET['date'] ?? date('Y-m-d');
    $stmt = $pdo->prepare("SELECT a.*, e.name as employeeName, e.employeeCode, e.department 
        FROM `attendance` a 
        JOIN `employee` e ON a.employeeId = e.id 
        WHERE a.date = ?");
    $stmt->execute([$date]);
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(['attendance' => $records, 'records' => $records]);
}

function handleGetBusinessAttendanceToday(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $today = date('Y-m-d');
    $attStmt = $pdo->prepare("SELECT status, COUNT(*) as cnt FROM `attendance` WHERE `date` = ? GROUP BY status");
    $attStmt->execute([$today]);
    $summary = ['present' => 0, 'absent' => 0, 'late' => 0, 'onLeave' => 0, 'totalEmployees' => 0];
    while ($a = $attStmt->fetch(PDO::FETCH_ASSOC)) {
        $st = strtolower($a['status']);
        if ($st === 'present') $summary['present'] += (int)$a['cnt'];
        else if ($st === 'absent') $summary['absent'] += (int)$a['cnt'];
        else if ($st === 'leave') $summary['onLeave'] += (int)$a['cnt'];
    }
    $totalEmpStmt = $pdo->query("SELECT COUNT(*) FROM `employee` WHERE `status` = 'ACTIVE'");
    $summary['totalEmployees'] = (int)$totalEmpStmt->fetchColumn();
    jsonResponse($summary);
}

function handleGetBusinessAttendanceReport(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $monthStr = $_GET['month'] ?? date('Y-m');
    $parts = explode('-', $monthStr);
    $year = (int)($parts[0] ?? date('Y'));
    $month = (int)($parts[1] ?? date('m'));

    $daysInMonth = (int)date('t', strtotime("{$year}-{$month}-01"));

    // Get all active employees (fallback to all employees if none marked active)
    $empStmt = $pdo->query("SELECT * FROM `employee` ORDER BY `name` ASC");
    $employees = $empStmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($employees)) {
        ensureBusinessTablesExist($pdo);
        $empStmt = $pdo->query("SELECT * FROM `employee` ORDER BY `name` ASC");
        $employees = $empStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get all attendance records for this month
    $startDate = sprintf('%04d-%02d-01 00:00:00', $year, $month);
    $endDate = sprintf('%04d-%02d-%02d 23:59:59', $year, $month, $daysInMonth);
    $likeMonth = sprintf('%04d-%02d%%', $year, $month);

    $attStmt = $pdo->prepare("SELECT * FROM `attendance` WHERE (date >= ? AND date <= ?) OR date LIKE ?");
    $attStmt->execute([$startDate, $endDate, $likeMonth]);
    $records = $attStmt->fetchAll(PDO::FETCH_ASSOC);

    $recordsByEmp = [];
    foreach ($records as $r) {
        $day = (int)date('j', strtotime($r['date']));
        $recordsByEmp[$r['employeeId']][$day] = $r;
    }

    $report = [];
    foreach ($employees as $emp) {
        $empId = $emp['id'];
        $empRecords = $recordsByEmp[$empId] ?? [];
        $days = [];
        $pres = 0;
        $abs = 0;
        $late = 0;
        $totalHrs = 0;

        for ($d = 1; $d <= $daysInMonth; $d++) {
            if (isset($empRecords[$d])) {
                $rec = $empRecords[$d];
                $st = strtoupper($rec['status'] ?? 'PRESENT');
                $isLate = !empty($rec['lateStatus']) && ($rec['lateStatus'] === '1' || $rec['lateStatus'] === 'LATE' || $rec['lateStatus'] === 1 || $rec['lateStatus'] === true);
                $hrs = (float)($rec['workingHours'] ?? ($st === 'PRESENT' ? 8 : ($st === 'HALF_DAY' ? 4 : 0)));

                if ($st === 'PRESENT') $pres++;
                else if ($st === 'ABSENT') $abs++;
                if ($isLate) $late++;
                $totalHrs += $hrs;

                $days[$d] = [
                    'status' => $st,
                    'lateStatus' => $isLate,
                    'workingHours' => $hrs
                ];
            } else {
                $days[$d] = null;
            }
        }

        $report[] = [
            'employee' => [
                'id' => $emp['id'],
                'fullName' => $emp['name'],
                'name' => $emp['name'],
                'employeeCode' => $emp['employeeCode'],
                'department' => $emp['department'],
                'designation' => $emp['designation']
            ],
            'days' => $days,
            'summary' => [
                'present' => $pres,
                'absent' => $abs,
                'late' => $late,
                'totalHours' => $totalHrs
            ]
        ];
    }

    jsonResponse([
        'month' => $monthStr,
        'daysInMonth' => $daysInMonth,
        'report' => $report
    ]);
}


function handleBusinessCheckIn(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $empId = $body['employeeId'] ?? null;
    if (empty($empId)) {
        $firstEmp = $pdo->query("SELECT id FROM `employee` WHERE `status` = 'ACTIVE' LIMIT 1")->fetchColumn();
        $empId = $firstEmp ?: 'emp-rutu-001';
    }

    $today = date('Y-m-d');
    $id = generateUuidV4();
    $notes = $body['notes'] ?? 'Self Clock-In';

    $stmt = $pdo->prepare("INSERT INTO `attendance` (`id`, `employeeId`, `date`, `checkIn`, `status`, `lateStatus`, `notes`, `createdAt`, `updatedAt`)
        VALUES (?, ?, ?, NOW(), 'PRESENT', 'ON_TIME', ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE `checkIn` = COALESCE(`checkIn`, NOW()), `status` = 'PRESENT', `notes` = VALUES(`notes`)");
    $stmt->execute([$id, $empId, $today, $notes]);

    jsonResponse(['message' => 'Checked in successfully', 'success' => true]);
}

function handleBusinessCheckOut(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $empId = $body['employeeId'] ?? null;
    if (empty($empId)) {
        $firstEmp = $pdo->query("SELECT id FROM `employee` WHERE `status` = 'ACTIVE' LIMIT 1")->fetchColumn();
        $empId = $firstEmp ?: 'emp-rutu-001';
    }

    $today = date('Y-m-d');
    $notes = $body['notes'] ?? 'Self Clock-Out';

    $stmt = $pdo->prepare("UPDATE `attendance` 
        SET `checkOut` = NOW(), 
            `hoursWorked` = TIMESTAMPDIFF(MINUTE, `checkIn`, NOW()) / 60,
            `notes` = ?
        WHERE `employeeId` = ? AND `date` = ?");
    $stmt->execute([$notes, $empId, $today]);

    jsonResponse(['message' => 'Checked out successfully', 'success' => true]);
}

function handleBusinessManualAttendance(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $empId = $body['employeeId'] ?? '';
    $date = $body['date'] ?? date('Y-m-d');
    $status = $body['status'] ?? 'PRESENT';
    $lateStatus = !empty($body['lateStatus']) ? 'LATE' : 'ON_TIME';
    $hoursWorked = (float)($body['workingHours'] ?? ($body['hoursWorked'] ?? 8));
    $notes = $body['notes'] ?? null;

    if (empty($empId)) {
        jsonError('Employee ID is required', 400);
    }

    $id = generateUuidV4();
    $stmt = $pdo->prepare("INSERT INTO `attendance` (`id`, `employeeId`, `date`, `hoursWorked`, `status`, `lateStatus`, `isManualEntry`, `notes`, `createdAt`, `updatedAt`)
        VALUES (?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE `hoursWorked` = VALUES(`hoursWorked`), `status` = VALUES(`status`), `lateStatus` = VALUES(`lateStatus`), `isManualEntry` = 1, `notes` = VALUES(`notes`)");
    $stmt->execute([$id, $empId, $date, $hoursWorked, $status, $lateStatus, $notes]);

    jsonResponse(['message' => 'Attendance recorded successfully', 'success' => true]);
}


function syncBusinessCustomersFromSales(PDO $pdo): void {
    try {
        ensureBusinessTablesExist($pdo);
        $salesCustStmt = $pdo->query("SELECT 
            TRIM(customerName) as name,
            MAX(customerCountry) as country,
            COUNT(id) as totalInvoicedDeals,
            COALESCE(SUM(finalSaleAmount), 0) as lifetimeVolume,
            COALESCE(SUM(netProfit), 0) as netProfit,
            MAX(saleDate) as lastSaleDate,
            MAX(salesPersonName) as assignedStaff
        FROM `internalsale`
        WHERE customerName IS NOT NULL AND TRIM(customerName) != ''
        GROUP BY TRIM(customerName)");
        $salesCustomers = $salesCustStmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($salesCustomers)) {
            return;
        }

        $existStmt = $pdo->query("SELECT `id`, LOWER(TRIM(`name`)) as normName FROM `customer` WHERE `name` IS NOT NULL");
        $existingMap = [];
        while ($row = $existStmt->fetch(PDO::FETCH_ASSOC)) {
            $norm = $row['normName'];
            if (!empty($norm)) {
                $existingMap[$norm] = $row['id'];
            }
        }

        $updateStmt = $pdo->prepare("UPDATE `customer` SET 
            `country` = COALESCE(?, `country`),
            `companyName` = COALESCE(?, `companyName`),
            `company` = COALESCE(?, `company`),
            `assignedStaff` = COALESCE(?, `assignedStaff`),
            `totalInvoicedDeals` = ?,
            `lifetimeVolume` = ?,
            `netProfit` = ?,
            `lastSaleDate` = ?,
            `updatedAt` = NOW()
            WHERE `id` = ?");

        $insertStmt = $pdo->prepare("INSERT INTO `customer` (
            `id`, `name`, `email`, `country`, `companyName`, `company`, `assignedStaff`, `totalInvoicedDeals`, `lifetimeVolume`, `netProfit`, `lastSaleDate`, `createdAt`, `updatedAt`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

        foreach ($salesCustomers as $sc) {
            $rawName = trim($sc['name']);
            if ($rawName === '') continue;
            $norm = strtolower($rawName);

            $lastDate = !empty($sc['lastSaleDate']) ? parseFlexibleDate($sc['lastSaleDate']) : date('Y-m-d H:i:s');
            $country = !empty($sc['country']) ? trim($sc['country']) : null;
            $staff = !empty($sc['assignedStaff']) ? trim($sc['assignedStaff']) : 'Sales Team';
            $companyDesc = $country ? ($rawName . ' (' . $country . ')') : null;
            $dummyEmail = 'client.' . substr(md5($norm), 0, 8) . '@floksyjewel.internal';

            if (isset($existingMap[$norm])) {
                $custId = $existingMap[$norm];
                $updateStmt->execute([
                    $country,
                    $companyDesc,
                    $companyDesc,
                    $staff,
                    (int)$sc['totalInvoicedDeals'],
                    (float)$sc['lifetimeVolume'],
                    (float)$sc['netProfit'],
                    $lastDate,
                    $custId
                ]);
            } else {
                $custId = 'cust-' . substr(md5($norm), 0, 16);
                $insertStmt->execute([
                    $custId,
                    $rawName,
                    $dummyEmail,
                    $country,
                    $companyDesc,
                    $companyDesc,
                    $staff,
                    (int)$sc['totalInvoicedDeals'],
                    (float)$sc['lifetimeVolume'],
                    (float)$sc['netProfit'],
                    $lastDate
                ]);
                $existingMap[$norm] = $custId;
            }
        }
    } catch (\Throwable $e) {
        error_log('Sync customer error: ' . $e->getMessage());
    }
}

function handleGetBusinessCustomers(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    // Automatically sync distinct customers from sales without duplicates
    syncBusinessCustomersFromSales($pdo);

    $search = trim($_GET['search'] ?? '');
    $where = '';
    $params = [];
    if (!empty($search)) {
        $s = '%' . $search . '%';
        $where = "WHERE (`name` LIKE ? OR `country` LIKE ? OR `email` LIKE ? OR `phone` LIKE ? OR `companyName` LIKE ? OR `company` LIKE ?)";
        $params = [$s, $s, $s, $s, $s, $s];
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM `customer` {$where} ORDER BY `lifetimeVolume` DESC, `createdAt` DESC LIMIT 500");
        $stmt->execute($params);
        $rawCustomers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (\Throwable $e) {
        $stmt = $pdo->prepare("SELECT * FROM `customer` {$where} ORDER BY `createdAt` DESC LIMIT 500");
        $stmt->execute($params);
        $rawCustomers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $customers = array_map(function($c) {
        $cName = $c['name'] ?? $c['clientName'] ?? 'Client';
        $cEmail = $c['email'] ?? '';
        if (str_contains($cEmail, '@floksyjewel.internal')) {
            $cEmail = '-';
        }
        return [
            'id' => $c['id'],
            'name' => $cName,
            'clientName' => $cName,
            'fullName' => $cName,
            'customerName' => $cName,
            'email' => !empty($cEmail) && $cEmail !== '-' ? $cEmail : ($c['phone'] ?? '-'),
            'phone' => $c['phone'] ?? null,
            'company' => $c['company'] ?? $c['companyName'] ?? null,
            'companyName' => $c['companyName'] ?? $c['company'] ?? null,
            'country' => $c['country'] ?? '-',
            'customerCountry' => $c['country'] ?? '-',
            'assignedStaff' => $c['assignedStaff'] ?? 'Sales Team',
            'assignedEmployee' => ['name' => $c['assignedStaff'] ?? 'Sales Team', 'fullName' => $c['assignedStaff'] ?? 'Sales Team'],
            'totalInvoicedDeals' => (int)($c['totalInvoicedDeals'] ?? 0),
            'totalSales' => (float)($c['lifetimeVolume'] ?? 0),
            'lifetimeVolume' => (float)($c['lifetimeVolume'] ?? 0),
            'totalNetProfit' => (float)($c['netProfit'] ?? 0),
            'netProfit' => (float)($c['netProfit'] ?? 0),
            'lastSaleDate' => $c['lastSaleDate'] ?? null,
            '_count' => ['internalSales' => (int)($c['totalInvoicedDeals'] ?? 0)]
        ];
    }, $rawCustomers);

    jsonResponse(['customers' => $customers]);
}

function handleCreateBusinessCustomer(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $name = trim($body['name'] ?? '');
    if (empty($name)) {
        jsonError('Customer name is required', 400);
    }

    // Check duplicate
    $norm = strtolower($name);
    $checkStmt = $pdo->prepare("SELECT id FROM `customer` WHERE LOWER(TRIM(`name`)) = ? LIMIT 1");
    $checkStmt->execute([$norm]);
    if ($checkStmt->fetch()) {
        jsonError('A customer with this name already exists', 409);
    }

    $id = 'cust-' . substr(md5($norm), 0, 16);
    $stmt = $pdo->prepare("INSERT INTO `customer` (
        `id`, `name`, `country`, `companyName`, `email`, `phone`, `assignedStaff`, `notes`, `createdAt`, `updatedAt`
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

    $stmt->execute([
        $id,
        $name,
        $body['country'] ?? null,
        $body['company'] ?? $body['companyName'] ?? null,
        $body['email'] ?? null,
        $body['phone'] ?? null,
        $body['assignedStaff'] ?? 'Sales Executive',
        $body['notes'] ?? null
    ]);

    recordBusinessAuditLog('CREATE', 'Customer', "Created client profile for {$name}");
    jsonResponse(['message' => 'Customer created successfully', 'id' => $id, 'success' => true]);
}

function handleGetBusinessSuppliers(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT * FROM `supplier` ORDER BY `name` ASC");
    $suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(['suppliers' => $suppliers]);
}

function handleCreateBusinessSupplier(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $name = trim($body['name'] ?? '');
    if (empty($name)) {
        jsonError('Supplier name is required', 400);
    }

    $id = 'supp-' . substr(md5(uniqid()), 0, 12);
    $stmt = $pdo->prepare("INSERT INTO `supplier` (
        `id`, `name`, `contactPerson`, `email`, `phone`, `country`, `notes`, `createdAt`, `updatedAt`
    ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

    $stmt->execute([
        $id,
        $name,
        $body['contactPerson'] ?? null,
        $body['email'] ?? null,
        $body['phone'] ?? null,
        $body['country'] ?? 'India',
        $body['notes'] ?? null
    ]);

    recordBusinessAuditLog('CREATE', 'Supplier', "Created supplier {$name}");
    jsonResponse(['message' => 'Supplier created successfully', 'id' => $id, 'success' => true]);
}

function handleGetBusinessCommissionPlans(): void {
    $defaultPlan = [
        'id' => 'plan-default',
        'name' => 'Standard Executive Commission Matrix',
        'description' => '5.0% Net Profit Commission for Loose Diamonds & Finished Jewelry',
        'isDefault' => true,
        'rules' => [
            ['productType' => 'DIAMOND', 'commissionBasis' => 'NET_PROFIT', 'commissionRate' => 0.05],
            ['productType' => 'JEWELRY', 'commissionBasis' => 'NET_PROFIT', 'commissionRate' => 0.05],
        ]
    ];
    jsonResponse(['plans' => [$defaultPlan]]);
}

function handleGetBusinessCommissions(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->query("SELECT c.*, s.invoiceNo, s.customerName, s.finalSaleAmount, s.netProfit 
        FROM `commission` c 
        JOIN `internalsale` s ON c.saleId = s.id 
        ORDER BY c.createdAt DESC");
    jsonResponse(['commissions' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleGetBusinessTargets(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $year = (int)($_GET['year'] ?? date('Y'));

    $stmt = $pdo->prepare("SELECT * FROM `salestarget` WHERE `year` = ? OR `periodYear` = ? ORDER BY `month` ASC, `periodMonth` ASC, `createdAt` DESC");
    $stmt->execute([$year, $year]);
    $rawTargets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If no targets exist for the current month/year, create a default $50,000 company target
    if (empty($rawTargets)) {
        $defaultMonth = (int)date('n');
        $defaultYear = (int)date('Y');
        $defId = 'tgt-company-' . $defaultYear . '-' . $defaultMonth;

        $insDef = $pdo->prepare("INSERT INTO `salestarget` (`id`, `periodType`, `periodYear`, `periodMonth`, `year`, `month`, `targetAmount`, `notes`, `createdAt`, `updatedAt`)
            VALUES (?, 'MONTHLY', ?, ?, ?, ?, 50000, 'Company Monthly Revenue Target', NOW(), NOW())
            ON DUPLICATE KEY UPDATE `targetAmount` = VALUES(`targetAmount`)");
        $insDef->execute([$defId, $defaultYear, $defaultMonth, $defaultYear, $defaultMonth]);

        $stmt->execute([$year, $year]);
        $rawTargets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $targets = [];
    foreach ($rawTargets as $t) {
        $tMonth = (int)($t['month'] ?? $t['periodMonth'] ?? 8);
        $tYear = (int)($t['year'] ?? $t['periodYear'] ?? 2026);
        $targetAmt = (float)$t['targetAmount'];
        $monthName = date('F', mktime(0, 0, 0, $tMonth, 10));

        // Calculate actual company-wide closed sales for this month/year
        $salesStmt = $pdo->prepare("SELECT 
            COUNT(id) as orderCount,
            COALESCE(SUM(finalSaleAmount), 0) as actualRevenue,
            COALESCE(SUM(netProfit), 0) as netProfit
        FROM `internalsale`
        WHERE (YEAR(saleDate) = ? AND MONTH(saleDate) = ?) OR LOWER(TRIM(saleMonth)) = ?");
        $salesStmt->execute([$tYear, $tMonth, strtolower($monthName)]);
        $metrics = $salesStmt->fetch(PDO::FETCH_ASSOC);

        $actualRevenue = (float)($metrics['actualRevenue'] ?? 0);
        $netProfit = (float)($metrics['netProfit'] ?? 0);
        $orderCount = (int)($metrics['orderCount'] ?? 0);
        $achievementPercent = $targetAmt > 0 ? round(($actualRevenue / $targetAmt) * 100, 1) : 0;
        $remaining = max(0, $targetAmt - $actualRevenue);
        $status = $actualRevenue >= $targetAmt ? 'ACHIEVED' : ($actualRevenue > 0 ? 'IN_PROGRESS' : 'PENDING');

        $targets[] = [
            'id' => $t['id'],
            'periodType' => $t['periodType'] ?? 'MONTHLY',
            'periodYear' => $tYear,
            'periodMonth' => $tMonth,
            'monthName' => $monthName,
            'targetAmount' => $targetAmt,
            'actualSales' => $actualRevenue,
            'actualRevenue' => $actualRevenue,
            'netProfit' => $netProfit,
            'orderCount' => $orderCount,
            'achievementPercent' => $achievementPercent,
            'remaining' => $remaining,
            'status' => $status,
            'notes' => $t['notes'] ?? 'Company Monthly Target',
            'createdAt' => $t['createdAt'] ?? null,
            'updatedAt' => $t['updatedAt'] ?? null
        ];
    }

    jsonResponse(['targets' => $targets]);
}

function handleCreateBusinessTarget(): void {
    try {
        $pdo = getDatabaseConnection();
        ensureBusinessTablesExist($pdo);

        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true) ?? $_POST;

        $tYear = (int)($body['periodYear'] ?? $body['year'] ?? date('Y'));
        $tMonth = (int)($body['periodMonth'] ?? $body['month'] ?? date('n'));
        $targetAmt = (float)($body['targetAmount'] ?? 0);
        $notes = trim($body['notes'] ?? 'Company Monthly Sales Target');

        if ($targetAmt <= 0) {
            jsonError('Target amount must be greater than 0', 400);
            return;
        }

        $id = 'tgt-company-' . $tYear . '-' . $tMonth;

        try {
            $stmt = $pdo->prepare("INSERT INTO `salestarget` (
                `id`, `employeeId`, `periodType`, `periodYear`, `periodMonth`, `year`, `month`, `targetAmount`, `notes`, `createdAt`, `updatedAt`
            ) VALUES (?, 'COMPANY', 'MONTHLY', ?, ?, ?, ?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY UPDATE `targetAmount` = VALUES(`targetAmount`), `notes` = VALUES(`notes`), `updatedAt` = NOW()");

            $stmt->execute([
                $id,
                $tYear,
                $tMonth,
                $tYear,
                $tMonth,
                $targetAmt,
                $notes
            ]);
        } catch (\Throwable $err1) {
            $stmt = $pdo->prepare("INSERT INTO `salestarget` (
                `id`, `year`, `month`, `targetAmount`, `notes`, `createdAt`, `updatedAt`
            ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY UPDATE `targetAmount` = VALUES(`targetAmount`), `notes` = VALUES(`notes`), `updatedAt` = NOW()");

            $stmt->execute([
                $id,
                $tYear,
                $tMonth,
                $targetAmt,
                $notes
            ]);
        }

        recordBusinessAuditLog('SET_TARGET', 'SalesTarget', "Set company monthly sales target for {$tMonth}/{$tYear} to \${$targetAmt}");
        jsonResponse(['message' => 'Company monthly sales target saved successfully', 'id' => $id, 'success' => true]);
    } catch (\Throwable $e) {
        error_log('Target creation error: ' . $e->getMessage());
        jsonError('Failed to save target: ' . $e->getMessage(), 500);
    }
}

function handleDeleteBusinessTarget(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $stmt = $pdo->prepare("DELETE FROM `salestarget` WHERE `id` = ?");
    $stmt->execute([$id]);
    recordBusinessAuditLog('DELETE_TARGET', 'SalesTarget', "Deleted company target {$id}");
    jsonResponse(['message' => 'Target removed successfully', 'success' => true]);
}

function handleGetBusinessAuditLogs(): void {
    $pdo = getDatabaseConnection();
    $stmt = $pdo->query("SELECT * FROM `activitylog` ORDER BY `createdAt` DESC LIMIT 100");
    jsonResponse(['logs' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

function handleResetBusinessData(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    // 1. Delete all sales and commissions
    $pdo->exec("DELETE FROM `commission`");
    $pdo->exec("DELETE FROM `internalsale`");

    // 2. Delete all attendance and targets
    $pdo->exec("DELETE FROM `attendance`");
    $pdo->exec("DELETE FROM `salestarget`");

    // 3. Clear existing employees and reseed only Rutu, Jyoti, Twinkle
    $pdo->exec("DELETE FROM `employee`");

    $employeesToSeed = [
        [
            'id' => 'emp-rutu-001',
            'employeeCode' => 'EMP-1001',
            'name' => 'Rutu',
            'email' => 'rutu@floksyjewel.com',
            'phone' => '+91 98765 43210',
            'department' => 'Sales',
            'designation' => 'Sales Manager',
            'role' => 'SALES_MANAGER',
            'status' => 'ACTIVE',
            'monthlyTarget' => 150000,
            'notes' => 'Sales Manager leading retail and high jewellery sales'
        ],
        [
            'id' => 'emp-jyoti-002',
            'employeeCode' => 'EMP-1002',
            'name' => 'Jyoti',
            'email' => 'jyoti@floksyjewel.com',
            'phone' => '+91 98765 43211',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive specializing in diamond and custom jewelry'
        ],
        [
            'id' => 'emp-twinkle-003',
            'employeeCode' => 'EMP-1003',
            'name' => 'Twinkle',
            'email' => 'twinkle@floksyjewel.com',
            'phone' => '+91 98765 43212',
            'department' => 'Sales',
            'designation' => 'Sales Executive',
            'role' => 'SALES_EMPLOYEE',
            'status' => 'ACTIVE',
            'monthlyTarget' => 80000,
            'notes' => 'Sales Executive handling fine jewellery and solitaire sales'
        ]
    ];

    $seedStmt = $pdo->prepare("INSERT INTO `employee` (`id`, `employeeCode`, `name`, `email`, `phone`, `department`, `designation`, `role`, `status`, `monthlyTarget`, `notes`, `createdAt`, `updatedAt`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");

    foreach ($employeesToSeed as $e) {
        $seedStmt->execute([
            $e['id'],
            $e['employeeCode'],
            $e['name'],
            $e['email'],
            $e['phone'],
            $e['department'],
            $e['designation'],
            $e['role'],
            $e['status'],
            $e['monthlyTarget'],
            $e['notes']
        ]);
    }

    jsonResponse([
        'message' => 'All sales and old employees removed. Rutu (Sales Manager), Jyoti, and Twinkle re-seeded as fresh staff.',
        'success' => true
    ]);
}

function handleDeleteAllSales(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $pdo->exec("DELETE FROM `commission`");
    $pdo->exec("DELETE FROM `internalsale`");
    syncBusinessCustomersFromSales($pdo);
    jsonResponse(['message' => 'All sales removed successfully', 'success' => true]);
}

function handleDeleteSaleById(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $pdo->prepare("DELETE FROM `commission` WHERE `saleId` = ?")->execute([$id]);
    $stmt = $pdo->prepare("DELETE FROM `internalsale` WHERE `id` = ? OR `invoiceNo` = ?");
    $stmt->execute([$id, $id]);

    syncBusinessCustomersFromSales($pdo);
    jsonResponse(['message' => 'Sale deleted successfully', 'success' => true]);
}

function recordBusinessAuditLog(string $action, string $object, ?string $details = null): void {
    try {
        $pdo = getDatabaseConnection();
        $id = generateUuidV4();
        $stmt = $pdo->prepare("INSERT INTO `activitylog` (`id`, `action`, `object`, `newValue`, `createdAt`) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$id, $action, $object, $details]);
    } catch (\Throwable $e) {
        error_log('Audit log error: ' . $e->getMessage());
    }
}

function handleDeleteAllCustomers(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $pdo->exec("DELETE FROM `customer`");
    recordBusinessAuditLog('DELETE_ALL', 'Customer', 'Purged all client CRM records');
    jsonResponse(['message' => 'All customers removed successfully', 'success' => true]);
}

function handleDeleteCustomerById(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->prepare("DELETE FROM `customer` WHERE `id` = ?");
    $stmt->execute([$id]);
    recordBusinessAuditLog('DELETE', 'Customer', "Deleted customer ID {$id}");
    jsonResponse(['message' => 'Customer deleted successfully', 'success' => true]);
}

function handleDeleteCustomersBatch(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;
    $ids = $body['ids'] ?? [];

    if (empty($ids) || !is_array($ids)) {
        jsonError('No customer IDs provided', 400);
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $pdo->prepare("DELETE FROM `customer` WHERE `id` IN ($placeholders)");
    $stmt->execute($ids);
    recordBusinessAuditLog('DELETE_BATCH', 'Customer', "Deleted " . count($ids) . " customers");
    jsonResponse(['message' => count($ids) . ' customers deleted successfully', 'success' => true]);
}

function handleDeleteEmployeeById(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $stmt = $pdo->prepare("DELETE FROM `employee` WHERE `id` = ? OR `employeeCode` = ?");
    $stmt->execute([$id, $id]);
    recordBusinessAuditLog('DELETE', 'Employee', "Deleted employee ID {$id}");
    jsonResponse(['message' => 'Employee deleted successfully', 'success' => true]);
}

function handleDeleteEmployeesBatch(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;
    $ids = $body['ids'] ?? [];

    if (empty($ids) || !is_array($ids)) {
        jsonError('No employee IDs provided', 400);
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $pdo->prepare("DELETE FROM `employee` WHERE `id` IN ($placeholders)");
    $stmt->execute($ids);
    recordBusinessAuditLog('DELETE_BATCH', 'Employee', "Deleted " . count($ids) . " employees");
    jsonResponse(['message' => count($ids) . ' employees deleted successfully', 'success' => true]);
}

function performAutomatedWeeklyBackup(PDO $pdo): void {
    try {
        $weekNumber = (int)date('W');
        $year = (int)date('Y');

        $checkStmt = $pdo->prepare("SELECT id FROM `business_backups` WHERE `weekNumber` = ? AND `year` = ? AND `backupType` = 'AUTOMATIC_WEEKLY' LIMIT 1");
        $checkStmt->execute([$weekNumber, $year]);
        if ($checkStmt->fetch()) {
            return; // Backup for this week already exists
        }

        // Generate full snapshot of all operational data
        $sales = $pdo->query("SELECT * FROM `internalsale`")->fetchAll(PDO::FETCH_ASSOC);
        $employees = $pdo->query("SELECT * FROM `employee`")->fetchAll(PDO::FETCH_ASSOC);
        $customers = $pdo->query("SELECT * FROM `customer`")->fetchAll(PDO::FETCH_ASSOC);
        $attendance = $pdo->query("SELECT * FROM `attendance`")->fetchAll(PDO::FETCH_ASSOC);
        $commissions = $pdo->query("SELECT * FROM `commission`")->fetchAll(PDO::FETCH_ASSOC);
        $suppliers = $pdo->query("SELECT * FROM `supplier`")->fetchAll(PDO::FETCH_ASSOC);
        $targets = $pdo->query("SELECT * FROM `salestarget`")->fetchAll(PDO::FETCH_ASSOC);

        $snapshot = [
            'meta' => [
                'system' => 'Floksy Jewel Business Hub',
                'backupType' => 'AUTOMATIC_WEEKLY',
                'weekNumber' => $weekNumber,
                'year' => $year,
                'timestamp' => date('Y-m-d H:i:s'),
                'totalRecords' => count($sales) + count($employees) + count($customers) + count($attendance) + count($commissions)
            ],
            'sales' => $sales,
            'employees' => $employees,
            'customers' => $customers,
            'attendance' => $attendance,
            'commissions' => $commissions,
            'suppliers' => $suppliers,
            'targets' => $targets,
        ];

        $json = json_encode($snapshot, JSON_PRETTY_PRINT);
        $sizeBytes = strlen($json);
        $backupId = 'backup-week-' . $year . '-w' . $weekNumber . '-' . substr(md5(uniqid()), 0, 8);
        $backupName = "Weekly Archive — Week {$weekNumber} ({$year})";

        $insStmt = $pdo->prepare("INSERT INTO `business_backups` (
            `id`, `backupName`, `backupType`, `salesCount`, `employeesCount`, `customersCount`, 
            `attendanceCount`, `commissionsCount`, `snapshotData`, `fileSizeBytes`, `weekNumber`, `year`, `createdAt`
        ) VALUES (?, ?, 'AUTOMATIC_WEEKLY', ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

        $insStmt->execute([
            $backupId,
            $backupName,
            count($sales),
            count($employees),
            count($customers),
            count($attendance),
            count($commissions),
            $json,
            $sizeBytes,
            $weekNumber,
            $year
        ]);

        recordBusinessAuditLog('AUTO_BACKUP', 'System', "Created automated weekly database snapshot for Week {$weekNumber}, {$year}");
    } catch (\Throwable $e) {
        error_log('Weekly backup failed: ' . $e->getMessage());
    }
}

function handleGetBusinessBackups(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);
    performAutomatedWeeklyBackup($pdo);

    $stmt = $pdo->query("SELECT `id`, `backupName`, `backupType`, `salesCount`, `employeesCount`, `customersCount`, 
        `attendanceCount`, `commissionsCount`, `fileSizeBytes`, `weekNumber`, `year`, `createdAt` 
        FROM `business_backups` ORDER BY `createdAt` DESC");
    $backups = $stmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse(['backups' => $backups]);
}

function handleCreateManualBackup(): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $sales = $pdo->query("SELECT * FROM `internalsale`")->fetchAll(PDO::FETCH_ASSOC);
    $employees = $pdo->query("SELECT * FROM `employee`")->fetchAll(PDO::FETCH_ASSOC);
    $customers = $pdo->query("SELECT * FROM `customer`")->fetchAll(PDO::FETCH_ASSOC);
    $attendance = $pdo->query("SELECT * FROM `attendance`")->fetchAll(PDO::FETCH_ASSOC);
    $commissions = $pdo->query("SELECT * FROM `commission`")->fetchAll(PDO::FETCH_ASSOC);
    $suppliers = $pdo->query("SELECT * FROM `supplier`")->fetchAll(PDO::FETCH_ASSOC);
    $targets = $pdo->query("SELECT * FROM `salestarget`")->fetchAll(PDO::FETCH_ASSOC);

    $weekNumber = (int)date('W');
    $year = (int)date('Y');
    $dateStr = date('Y-m-d H:i');

    $snapshot = [
        'meta' => [
            'system' => 'Floksy Jewel Business Hub',
            'backupType' => 'MANUAL_SNAPSHOT',
            'timestamp' => date('Y-m-d H:i:s'),
            'totalRecords' => count($sales) + count($employees) + count($customers) + count($attendance) + count($commissions)
        ],
        'sales' => $sales,
        'employees' => $employees,
        'customers' => $customers,
        'attendance' => $attendance,
        'commissions' => $commissions,
        'suppliers' => $suppliers,
        'targets' => $targets,
    ];

    $json = json_encode($snapshot, JSON_PRETTY_PRINT);
    $sizeBytes = strlen($json);
    $backupId = 'backup-manual-' . date('Ymd-His');
    $backupName = "Manual Snapshot — " . $dateStr;

    $insStmt = $pdo->prepare("INSERT INTO `business_backups` (
        `id`, `backupName`, `backupType`, `salesCount`, `employeesCount`, `customersCount`, 
        `attendanceCount`, `commissionsCount`, `snapshotData`, `fileSizeBytes`, `weekNumber`, `year`, `createdAt`
    ) VALUES (?, ?, 'MANUAL_SNAPSHOT', ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

    $insStmt->execute([
        $backupId,
        $backupName,
        count($sales),
        count($employees),
        count($customers),
        count($attendance),
        count($commissions),
        $json,
        $sizeBytes,
        $weekNumber,
        $year
    ]);

    recordBusinessAuditLog('MANUAL_BACKUP', 'System', "Created manual database snapshot ({$backupName})");
    jsonResponse([
        'message' => 'Manual database snapshot backup created successfully',
        'backupId' => $backupId,
        'success' => true
    ]);
}

function handleDownloadBusinessBackup(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $stmt = $pdo->prepare("SELECT * FROM `business_backups` WHERE `id` = ? LIMIT 1");
    $stmt->execute([$id]);
    $backup = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$backup) {
        jsonError('Backup not found', 404);
    }

    $format = $_GET['format'] ?? 'json';
    if ($format === 'json') {
        header('Content-Type: application/json');
        header('Content-Disposition: attachment; filename="' . preg_replace('/[^a-zA-Z0-9_-]/', '_', $backup['backupName']) . '.json"');
        echo $backup['snapshotData'];
        exit;
    }

    jsonResponse(['backup' => $backup]);
}

function handleDeleteBusinessBackup(string $id): void {
    $pdo = getDatabaseConnection();
    ensureBusinessTablesExist($pdo);

    $stmt = $pdo->prepare("DELETE FROM `business_backups` WHERE `id` = ?");
    $stmt->execute([$id]);
    recordBusinessAuditLog('DELETE_BACKUP', 'System', "Deleted backup {$id}");
    jsonResponse(['message' => 'Backup deleted successfully', 'success' => true]);
}

