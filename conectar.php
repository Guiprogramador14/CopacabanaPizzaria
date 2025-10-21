<?php 

$login = $_POST['login'];
$senha = $_POST['senha'];
$host = "sql113.infinityfree.com";                                      
$user = "if0_39035047";                           
$pass = "Gui14123456789";                                     
$banco = "if0_39035047_bd_clientes";  
               
$conexao = mysqli_connect($host, $user, $pass, $banco);  

if (!$conexao) {                                          
 echo "Connection Error". PHP_EOL;
 echo "Error Code: ".mysqli_connect_error().PHP_EOL;
 echo "Error: Description".mysqli_connect_error().PHP_EOL;
 exit;
}
?>