document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('cadastrar');
  const cpfInput = document.getElementById('cpf');
  const rgInput = document.getElementById('rg');
  const cepInput = document.getElementById('cep');
  const telInput = document.getElementById('telefone');
  const senhaInput = document.getElementById('senha');
  const confirmSenhaInput = document.getElementById('confirmSenha');
  const nascimentoInput = document.getElementById('dataNascimento');
  const toggleSenha = document.getElementById('toggleSenha');
  const toggleConfirmSenha = document.getElementById('toggleConfirmSenha');

  const cidadeInput = document.getElementById('cidade');
  const estadoSelect = document.getElementById('estado');
  const bairroInput = document.getElementById('bairro');
  const enderecoInput = document.getElementById('endereco');

  // ===== Função utilitária =====
  const onlyDigits = str => str.replace(/\D/g, '');

  // ===== Máscaras =====
  cpfInput.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });

  rgInput.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 9);
    v = v.replace(/(\d{2})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d{1})$/, '$1-$2');
    e.target.value = v;
  });

  cepInput.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 8);
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = v;
  });

  telInput.addEventListener('input', e => {
    let v = onlyDigits(e.target.value).slice(0, 11);
    v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, (m, g1, g2, g3) => 
      `(${g1}) ${g2}${g3 ? '-' + g3 : ''}`);
    e.target.value = v;
  });

  // ===== Validação CPF =====
  function validarCPF(cpf) {
    cpf = onlyDigits(cpf);
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11-i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf.substring(9,10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1,i)) * (12-i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    return resto === parseInt(cpf.substring(10,11));
  }

  // ===== ViaCEP automático =====
  cepInput.addEventListener('blur', async () => {
    const cepRaw = onlyDigits(cepInput.value);
    if (cepRaw.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepRaw}/json/`);
      const data = await res.json();
      if (data.erro) {
        alert('CEP não encontrado.');
        cidadeInput.value = '';
        estadoSelect.value = '';
        bairroInput.value = '';
        enderecoInput.value = '';
      } else {
        cidadeInput.value = data.localidade || '';
        estadoSelect.value = data.uf || '';
        bairroInput.value = data.bairro || '';
        enderecoInput.value = data.logradouro || '';
      }
    } catch (err) {
      console.error('Erro ViaCEP:', err);
      alert('Erro ao buscar CEP.');
    }
  });

  // ===== Mostrar / Ocultar senha =====
  toggleSenha.addEventListener('click', () => {
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
    toggleSenha.textContent = senhaInput.type === 'password' ? 'Mostrar' : 'Ocultar';
  });

  toggleConfirmSenha.addEventListener('click', () => {
    confirmSenhaInput.type = confirmSenhaInput.type === 'password' ? 'text' : 'password';
    toggleConfirmSenha.textContent = confirmSenhaInput.type === 'password' ? 'Mostrar' : 'Ocultar';
  });

  // ===== Validação final do formulário =====
  form.addEventListener('submit', e => {
    if (!validarCPF(cpfInput.value)) {
      alert('CPF inválido!');
      e.preventDefault();
      return;
    }

    // Verifica idade
    const hoje = new Date();
    const nascimento = new Date(nascimentoInput.value + 'T00:00:00');
    if (nascimento >= hoje) {
      alert('Data de nascimento inválida!');
      e.preventDefault();
      return;
    }

    // Verifica senhas
    if (senhaInput.value !== confirmSenhaInput.value) {
      alert('As senhas não coincidem!');
      e.preventDefault();
      return;
    }

    if (senhaInput.value.length < 8) {
      alert('Senha muito curta! Minimo 8 caracteres.');
      e.preventDefault();
      return;
    }
  });

});
