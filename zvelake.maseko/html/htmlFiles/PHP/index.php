<?php
$paths = array();
$paths['3'] = "/opt/lampp/etc/extra/httpd-vhosts.conf";

$synthesizer = function ($p) use(&$paths){
    $paths[] = $p;
};

$synthesizer("/etc/hosts");
$synthesizer("/etc/opt/htdocs/index.php");
var_dump($paths);
?>
