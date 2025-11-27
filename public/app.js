const textEl = document.getElementById('text');
const methodEl = document.getElementById('method');
const outputEl = document.getElementById('output');

document.getElementById('encBtn').addEventListener('click', () => {
  const text = textEl.value;
  const method = methodEl.value;
  let result = '';

  if (method === 'base64') {
    result = btoa(unescape(encodeURIComponent(text)));
  }

  outputEl.value = result;
});

document.getElementById('decBtn').addEventListener('click', () => {
  const text = textEl.value;
  const method = methodEl.value;
  let result = '';

  if (method === 'base64') {
    result = decodeURIComponent(escape(atob(text)));
  }

  outputEl.value = result;
});
