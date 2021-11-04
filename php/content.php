<?php

if($_POST){
if(is_dir("../problems/CF-" . str_replace('/', '', $_POST['p']))){
   echo shell_exec("cat ../problems/CF-" .  str_replace('/', '', $_POST['p']) . '/problem');
}
else{
  $data = file_get_contents("https://codeforces.com/problemset/problem/" . $_POST["p"]);
  $start = substr($data, strpos($data, '<div class="problem-statement">'));
  $end = substr($start, strpos($start, '<script>'));
  mkdir("../problems/CF-" .  str_replace('/', '', $_POST['p']));
  
  $fh = fopen("../problems/CF-" .  str_replace('/', '', $_POST['p']) . "/problem" , 'w');
  fwrite($fh, str_replace($end, '', $start));
  fclose($fh);
  
  shell_exec("cp ../js/template.js ../problems/CF-" .  str_replace('/', '', $_POST['p']) . "/CF-" .str_replace('/', '', $_POST['p']) . ".js");
  
  
  echo shell_exec("cat ../problems/CF-" .  str_replace('/', '', $_POST['p']) . '/problem');
}
}
else{
echo "404";
}
?>