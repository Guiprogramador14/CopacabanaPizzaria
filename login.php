<?php
session_start();

// Configurações do banco de dados
$host = "sql113.infinityfree.com"; // altere para o seu host
$db   = "if0_39035047_bd_clientes";      // altere para o nome do seu banco
$user = "if0_39035047";      // altere para seu usuário do banco
$pass = "Gui14123456789";           // altere para a senha do banco

$conn = new mysqli($host, $user, $pass, $db);

// Verifica conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Quando o formulário é enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $senha = trim($_POST["senha"]);

    // Prepara consulta para evitar SQL Injection
    $stmt = $conn->prepare("SELECT id, senha, nome FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hash_senha, $nome);
        $stmt->fetch();

        if (password_verify($senha, $hash_senha)) {
            // Login bem-sucedido
            $_SESSION["id"] = $id;
            $_SESSION["nome"] = $nome;
            header("Location: index.html"); // redireciona para a página inicial
            exit;
        } else {
            $erro = "Email ou senha incorretos!";
        }
    } else {
        $erro = "Email ou senha incorretos!";
    }
    $stmt->close();
}

$conn->close();
?>
