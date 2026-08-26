<?php
$externalVariable = "con.setRequestMethod(\"POST\")";
$secondExternalVariable = "con.setDoInput(true)";

$func = function () use($externalVariable, $secondExternalVariable){
    var_dump($externalVariable, $secondExternalVariable);
};

$func();

//i am an anonymous function
$imagePixels = [
    ["red" => 154, "greed" => 74, "blue" => 132, "alpha" => NULL],
    ["red" => 71, "greed" => 83, "blue" => 233, "alpha" => 50],
    ["red" => 255, "greed" => 255, "blue" => 255, "alpha" => 11]
];

$modImage = array_map(function($pixel){
    return $pixel["red"] * .075 - 0.55;
}, $imagePixels);

//var_dump($modImage);

$numbers = array();
for($i = 0; $i < 5; $i++){
    $numbers[] = random_int(0, 255);
}
echo "initial numbers: \n";
var_dump($numbers) . "\n";
//carry - предыущее значение массива, number - текущее

echo "after array_reduce\n";
var_dump(array_reduce($numbers, function ($carry, $number){ return $carry + $number; }));

$filterName = "Больше 100";
echo "числа $filterName\n";
var_dump(array_filter($numbers, function ($number){
    return $number > 100;
}));
?>