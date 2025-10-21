<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="estilo.css">
<title>Cadastrando Usuarios</title>
</head>
<body>

<?php
 
   include "conectar.php"; /* chama o arquivo conectar.php */
 
?>

<?php
/*Recuperamos as informações do formulario */
$nome = $_POST["nome"];  //variavel $nome recebe o campo nome enviado através do metodo Post
$dataNascimento = $_POST["dataNascimento"];
$cpf = $_POST["cpf"];
$rg = $_POST["rg"];
$email = $_POST["email"];
$telefone = $_POST["telefone"];
$cep = $_POST["cep"];
$endereco = $_POST["endereco"];
$numero = $_POST["numero"];
$complemento = $_POST["complemento"];
$bairro = $_POST["bairro"];
$cidade = $_POST["cidade"];
$estado = $_POST["estado"];
$senha = $_POST["senha"];
/*Inserindo as informações na tabela usuario */

mysqli_query($conexao, "INSERT INTO usuarios(nome, dataNascimento, cpf, rg, email, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, senha) VALUES ('$nome','$dataNascimento','$cpf','$rg','$email','$telefone','$cep','$endereco','$numero','$complemento','$bairro','$cidade','$estado','$senha')") or die("Usuário não cadastrado!"); 

//fecha conexão
mysqli_close($conexao);
/*exibindo mensagem de usuário cadastrado com sucesso */
echo"<script language='javascript' type='text/javascript'>
         alert('USUÁRIO CADASTRADO COM SUCESSO!!!');
         window.location.href='index.html';</script>";
?>

</body>
</html>