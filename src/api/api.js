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
export async function requestGet(path, headers = {}) {
  return baseRequest(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// 2. Função específica para requisições POST
export async function requestPost(path, body, headers = {}) {
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

export async function requestDelete(saleId) {
  if (!saleId) throw new Error('ID da venda é obrigatório para exclusão.');
  
  // Faz a chamada para: /sales/id_da_venda
  return await baseRequest(`sales/${saleId}`, {
    method: 'DELETE',	  
  });
}
// Procure por requestUpdate no seu api.js e deixe exatamente assim:
export async function requestUpdate(path, body, headers = {}) {
  return baseRequest(path, {
    method: 'PUT', // mude para 'PATCH' se a sua API Express usar app.patch
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
