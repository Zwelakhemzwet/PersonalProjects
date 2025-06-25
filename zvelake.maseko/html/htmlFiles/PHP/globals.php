<?php
$someglobal = "global";

function redefineGlobal(){
    global $someglobal;
    $someglobal = 4;
    echo "new global value:" . $someglobal;
}

if(isset($_POST["terms"])){
    echo $_POST["terms"] . "<br>";
}
else{
    echo "attribute not defined<br>";
}

var_dump($_FILES);
?>
