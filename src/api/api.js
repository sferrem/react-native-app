const API_URL = 'https://api-crud-theta.vercel.app';

// Função auxiliar interna para centralizar a lógica do fetch e a junção da URL
async function baseRequest(path, options = {}) {
  // Garante que não haverá barras duplicadas ou faltando
  const cleanPath = path.replace(/^\//, '');
  const url = `${API_URL}/${cleanPath}`;

  const response = await fetch(url, options);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Erro na requisição (${response.status})`);
  }

  return data;
}

// 1. Função específica para requisições GET
async function requestGet(path, headers = {}) {
  return baseRequest(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// 2. Função específica para requisições POST
async function requestPost(path, body, headers = {}) {
	console.log("DADOS ENVIADOS NO BODY:", JSON.stringify(body));
  return baseRequest(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

export { API_URL, requestGet, requestPost };
