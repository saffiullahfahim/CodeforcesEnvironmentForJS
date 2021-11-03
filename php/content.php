<?php

if($_POST){
echo file_get_contents($_POST["url"]);
}
else{
echo "404";
}
?>