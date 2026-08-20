<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

$indexHtmlPath = __DIR__ . '/index.html';
$indexContent = file_exists($indexHtmlPath) ? file_get_contents($indexHtmlPath) : 'File Not Found';

// Match script tag src
preg_match('/src="\/assets\/index-[^"]+\.js"/', $indexContent, $matches);

echo json_encode([
    'server_time' => date('Y-m-d H:i:s'),
    'dir' => __DIR__,
    'index_exists' => file_exists($indexHtmlPath),
    'index_script' => $matches[0] ?? 'No match',
    'git_head' => file_exists(__DIR__ . '/.git/HEAD') ? file_get_contents(__DIR__ . '/.git/HEAD') : 'No git folder in public_html'
], JSON_PRETTY_PRINT);
