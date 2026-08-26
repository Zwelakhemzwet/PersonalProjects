<?php
if(isset($_REQUEST["root"], $_REQUEST["ServerName"], $_REQUEST["Content-Type"])){
    $response = "the server '" . $_REQUEST["ServerName"] . "' has root the directory " . $_REQUEST["root"];
    $response .= ". and you gave the header 'Content-Type' : " . $_REQUEST["Content-Type"];
    echo $response;
}
else{
    echo "SOME PARAMETERS ARE MISSING";
}
?>