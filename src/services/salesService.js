import { requestGet, requestPost, requestDelete, requestUpdate } from '../api/api';
import { converterMonthToNumber } from '../utils/utils'; 

export async function saveNewSale(monthName, rawValue) {
  try {
      const monthNumber = converterMonthToNumber(monthName);
       const formattedValue = parseFloat(rawValue.replace(',', '.'));

    if (isNaN(formattedValue)) {
      throw new Error('Por favor, informe um valor numérico válido.');
    }

    const newSale = {
      month: monthNumber,
      value: formattedValue,
    };

    const response = await requestPost('sales', newSale);
    return response;

  } catch (error) {
    console.error("====== ERRO DETALHADO NO SERVIÇO ======");
    console.error("Mensagem:", error.message);
    console.error("=======================================");
    throw error;
  }
}export async function getMonthlySales(){
	const sales = await requestGet('sales');
	return sales;

};

export async function updateSale(id, updatedData) {
  try {
    if (!id) throw new Error('ID da venda é obrigatório para atualização.');

    
    if (updatedData.month && typeof updatedData.month === 'string') {
      updatedData.month = converterMonthToNumber(updatedData.month);
    }

    if (updatedData.value && typeof updatedData.value === 'string') {
      updatedData.value = parseFloat(updatedData.value.replace(',', '.'));
    }

    const response = await requestUpdate(`sales/${id}`, updatedData);
    return response;
  } catch (error) {
    console.error(`====== ERRO AO ATUALIZAR VENDA ======`, error.message);
    throw error;
  }
}



export async function deleteSale(id) {
	try {
    if (!id) throw new Error('ID da venda é obrigatório para exclusão.');
    
    const response = await requestDelete(id);
    return response;
  } catch (error) {
    console.error(`Erro ao deletar venda com ID ${id}:`, error.message);
    throw error;
  }
}
