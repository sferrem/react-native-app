const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function converterMonthToNumber(monthName){
	return MONTHS.indexOf(monthName) + 1;
}
export function converterNumberToMonth(monthNumber){
	return MONTHS[monthNumber - 1] || 0;
}
