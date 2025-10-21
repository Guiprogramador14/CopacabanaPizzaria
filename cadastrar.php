<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="estilo.css">
  <title>Cadastrando Usuários</title>
</head>
<body>

<?php
include "conectar.php"; // conecta ao banco

// garante que o envio veio por POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  // configura charset para evitar erro em acentuação
  mysqli_set_charset($conexao, "utf8");

  // coleta e protege os dados do formulário
  $nome          = trim($_POST["nome"]);
  $dataNascimento = $_POST["dataNascimento"];
  $cpf           = trim($_POST["cpf"]);
  $rg            = trim($_POST["rg"]);
  $email         = trim($_POST["email"]);
  $telefone      = trim($_POST["telefone"]);
  $cep           = trim($_POST["cep"]);
  $endereco      = trim($_POST["endereco"]);
  $numero        = trim($_POST["numero"]);
  $complemento   = trim($_POST["complemento"]);
  $bairro        = trim($_POST["bairro"]);
  $cidade        = trim($_POST["cidade"]);
  $estado        = trim($_POST["estado"]);
  $senha         = $_POST["senha"];

  // criptografa a senha antes de salvar
  $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

  // prepara o comando SQL de forma segura
  $stmt = $conexao->prepare("INSERT INTO usuarios 
    (nome, dataNascimento, cpf, rg, email, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

  // vincula os parâmetros
  $stmt->bind_param("ssssssssssssss", 
    $nome, $dataNascimento, $cpf, $rg, $email, $telefone, 
    $cep, $endereco, $numero, $complemento, $bairro, $cidade, $estado, $senhaHash
  );

  // executa e verifica
  if ($stmt->execute()) {
    echo "<script>
      alert('USUÁRIO CADASTRADO COM SUCESSO!!!');
      window.location.href='index.html';
    </script>";
  } else {
    echo "<script>
      alert('Erro ao cadastrar: " . addslashes($stmt->error) . "');
      window.history.back();
    </script>";
  }

  $stmt->close();
  mysqli_close($conexao);

} else {
  // acesso direto ao arquivo (sem POST)
  echo "<script>
    alert('Acesso inválido!');
    window.location.href='index.html';
  </script>";
}
?>

</body>
</html>
