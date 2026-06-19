import { useNavigation } from '@react-navigation/native';
import { requestGet } from '../api/api';

export async function getMonthlySales(){
	const sales = await requestGet('sales')
	return sales;

};
export function saveNewSale(saleData){
	return ;
};

export function deleteSale(id) {

}
export function createSaleScreen() {
	console.log('Botão pressionado!');
	navigation = useNavigation;
	navigation.navigate('NewSale');
};
