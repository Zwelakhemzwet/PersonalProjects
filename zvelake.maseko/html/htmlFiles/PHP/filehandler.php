<?php
$destFolder = "receivedFiles";
if(!is_dir($destFolder)){
    mkdir($destFolder);
}
else{
    echo "folder " . $destFolder . " exists\n";
}

if(isset($_FILES["filename"])){
    print_r($_FILES["filename"]);
    move_uploaded_file($_FILES["filename"]["tmp_name"], $destFolder);
}
else{
    print_r("no entry 'filename' in _FILES");
}
?>