<?php
$filenames = array(
    "RewireMyBrain.md",
    "ReadMe.txt",
    "TheBestVersionOfMe.pdf"
);

echo "file extensions<br>";
/*
for($i = 0; $i < sizeof($filenames); $i++){
    $file = $filenames[$i];
    print_r(substr($file, strpos($file, ".") + 1) . "\n");
    //print_r(substr($file, -1 * (strlen($file) - strpos($file, ".") - 1)) . "\n");
}

foreach($filenames as $indx => $val){
    $file = $filenames[$indx];
    print_r(substr($file, strpos($file, ".") + 1) . "\n");
}
*/
echo "//functionalPogramming.php<br>";
$filename = "./functionalProgramming.php";
if(file_exists($filename)){
    $data = file_get_contents($filename);
    $data = explode("\n",$data);
    foreach($data as $indx => $line){
        if(strlen($line) == 0){
            continue;
        }
        echo $line . "<br>";
    }

}else{
    echo "file " . $filename . " does not exist.<br>";
}

echo "This is how you run an external process in python<br>";
echo "
from pathlib import path<br>
import subprocess<br>

output = subprocess.run([\"command\", \"arg1, arg2\"], catpure_output=True, text=True, check=False)<br>
print(output.stdout)<br>
print(output.stderr)<br>
<br>
#если ты будешь устанавливать check=True, то тебе нужно обрабатывать исключение CalledProcessError<br>
";
?>