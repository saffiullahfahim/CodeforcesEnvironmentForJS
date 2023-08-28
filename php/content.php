<?php

if ($_POST) {
  if (is_dir("../problems/CF-" . str_replace('/', '', $_POST['p']))) {
    echo file_get_contents("../problems/CF-" .  str_replace('/', '', $_POST['p']) . '/problem');
  } else {
    $data = file_get_contents("https://codeforces.com/problemset/problem/" . $_POST["p"]);
    $start = substr($data, strpos($data, '<div class="problem-statement">'));
    $end = substr($start, strpos($start, '<script>'));
    mkdir("../problems/CF-" .  str_replace('/', '', $_POST['p']));

    $fh = fopen("../problems/CF-" .  str_replace('/', '', $_POST['p']) . "/problem", 'w');
    fwrite($fh, str_replace($end, '', $start));
    fclose($fh);

    // copy ../js/template.js to ../problems/CF-<problem number>/CF-<problem number>.js

    $newfile = fopen("../problems/CF-" .  str_replace('/', '', $_POST['p']) . "/CF-" . str_replace('/', '', $_POST['p']) . ".js", "w");

    $template = file_get_contents("../js/template.js");

    echo $template;
    fwrite($newfile, $template);

    fclose($newfile);

    echo file_get_contents("../problems/CF-" .  str_replace('/', '', $_POST['p']) . '/problem');
  }
} else {
  echo "404";
}
