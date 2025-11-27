const textEl = document.getElementById('text');
const methodEl = document.getElementById('method');
const outputEl = document.getElementById('output');
const shiftEl = document.getElementById('shift');
const keyEl = document.getElementById('key');

document.getElementById('encBtn').addEventListener('click', () => {
  const text = textEl.value;
  const method = methodEl.value;
  const shift = parseInt(shiftEl.value);
  const key = keyEl.value;
  let result = '';

  if (method === 'base64') {
    result = btoa(unescape(encodeURIComponent(text)));
  } else if (method === 'caesar') {
    result = caesarEncrypt(text, shift);
  } else if (method === 'aes') {
    result = CryptoJS.AES.encrypt(text, key).toString();
  } else if (method === 'rot13') {
    result = caesarEncrypt(text, 13);
  }

  outputEl.value = result;
});

document.getElementById('decBtn').addEventListener('click', () => {
  const text = textEl.value;
  const method = methodEl.value;
  const shift = parseInt(shiftEl.value);
  const key = keyEl.value;
  let result = '';

  if (method === 'base64') {
    result = decodeURIComponent(escape(atob(text)));
  } else if (method === 'caesar') {
    result = caesarDecrypt(text, shift);
  } else if (method === 'aes') {
    const bytes = CryptoJS.AES.decrypt(text, key);
    result = bytes.toString(CryptoJS.enc.Utf8);
  } else if (method === 'rot13') {
    result = caesarDecrypt(text, 13);
  }

  outputEl.value = result;
});

function caesarEncrypt(text, shift) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (char.match(/[a-z]/i)) {
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode((code - base + shift) % 26 + base);
    }
    return char;
  }).join('');
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - shift);
}
