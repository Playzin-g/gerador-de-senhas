// Captura os elementos da tela
const passwordDisplay = document.getElementById('password-display');
const lengthEl = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

// Banco de caracteres para as opções
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Mostra a quantidade de caracteres mudando em tempo real na tela
lengthEl.addEventListener('input', (e) => {
    lengthVal.innerText = e.target.value;
});

// Lógica de geração da senha baseada nas escolhas
function generatePassword() {
    let allowedChars = '';
    let password = '';

    // Verifica quais opções o usuário deixou marcadas
    if (uppercaseEl.checked) allowedChars += uppercaseChars;
    if (lowercaseEl.checked) allowedChars += lowercaseChars;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;

    // Se o usuário desmarcar absolutamente tudo
    if (allowedChars === '') {
        passwordDisplay.innerText = 'Selecione uma opção!';
        passwordDisplay.style.color = '#ef4444';
        return;
    }

    passwordDisplay.style.color = '#f8fafc';
    const passwordLength = parseInt(lengthEl.value);

    // Sorteia os caracteres um por um até dar o tamanho escolhido
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordDisplay.innerText = password;
}

// Função para copiar para a área de transferência
function copyToClipboard() {
    const password = passwordDisplay.innerText;
    
    if (!password || password === 'Sua senha aparecerá aqui' || password === 'Selecione uma opção!') {
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copiado!';
        copyBtn.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = '#38bdf8';
        }, 1500);
    });
}

// Ativa os botões de Gerar e Copiar
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Já cria uma senha inicial assim que a página abre
generatePassword();
