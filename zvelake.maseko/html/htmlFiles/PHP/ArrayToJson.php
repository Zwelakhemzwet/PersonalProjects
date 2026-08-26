<?php
$myIndexKeyArray = ["Content-Disposition", "Content-Type", "Content-Length", "Accept"];
$myKeyArray = ["Content-Type" => "application/json", "Accept" => "text/html"];

echo json_encode($myIndexKeyArray) . "\n";
echo json_encode($myKeyArray) . "\n";

$numbersArr = range(0, 6);
$iterator = new LimitIterator(new ArrayIterator($numbersArr), 2, 3);
echo bin2hex(pack("c*",...$iterator)) . "\n";

?>
