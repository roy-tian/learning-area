<?php
  // 全局 $_POST 变量允许你按名称访问通过 POST 方法发送的数据
  // 要访问通过 GET 方法发送的数据，可以使用 $_GET
  $say = htmlspecialchars($_POST['say']);
  $to  = htmlspecialchars($_POST['to']);

  echo  $say, ' ', $to;
?>
