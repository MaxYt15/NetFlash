<?php
header('Content-Type: application/json');
$ip = $_SERVER['REMOTE_ADDR'];
$info = @file_get_contents("https://ipinfo.io/{$ip}/json");
if ($info) {
    echo $info;
} else {
    echo json_encode([
        'ip' => $ip,
        'org' => 'Desconocido',
        'country' => 'Desconocido'
    ]);
} 