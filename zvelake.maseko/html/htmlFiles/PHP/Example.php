<?php
echo "Stdout 1\n";
trigger_error("stderr 2\n");
print_r("stdout 3\n");
fwrite(STDERR, "Stderr4\n");
throw new RuntimeException("Stderr 5\n");
?>
