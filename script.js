apiKey = 'fca_live_AfFDGZYfIgh60P9AxKhxtlKuZxBaa2xa7Q1m90pJ';
// Select elements
const firstCurrency = document.getElementById('first-currency');
const secondCurrency = document.getElementById('second-currency');
// Inputs
const firstNumber = document.getElementById('first-number');
const secondNumber = document.getElementById('second-number');
// Calculated number
const cost = document.getElementById('cost');
const num = document.querySelector('.num');
// Spans
const firstCurrencyName = document.getElementById('first-currency-name');
const secondCurrencyName = document.getElementById('second-currency-name');

let curr = '';
firstNumber.value = 1;
// Fetch Data from freecurrencyapi.com API
async function fetchData() {
	const res = await fetch(
		'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_AfFDGZYfIgh60P9AxKhxtlKuZxBaa2xa7Q1m90pJ'
	);
	const data = await res.json();
	renderCurrency(data.data);
	curr = data.data;
	secondCurrency.value = 'EUR';
	calculate();
}
// Render Currencies in select elements
function renderCurrency(currencies) {
	const arrayCurrencies = Object.keys(currencies);
	arrayCurrencies.forEach((currency) => {
		secondCurrency.appendChild(optionMaker(currency));
		firstCurrency.appendChild(optionMaker(currency));
	});
}
// Create Option elements
const optionMaker = (currency) => {
	const option = document.createElement('option');
	option.value = currency;
	option.innerText = currency;
	return option;
};
// Calculate numbers
function calculate() {
	const firstValueCurr = firstCurrency.value;
	const secondValueCurr = secondCurrency.value;

	const costNum =
		parseInt(firstNumber.value) *
		parseFloat(curr[firstValueCurr]).toFixed(2);

	// num.innerText = firstNumber.value;

	cost.innerText = (curr[secondValueCurr] / curr[firstValueCurr]).toFixed(8);

	secondNumber.value = costNum;
}
// Events
firstNumber.addEventListener('change', calculate);
firstCurrency.addEventListener('change', (e) => {
	calculate();
	firstCurrencyName.innerText = e.target.value;
});
secondCurrency.addEventListener('change', (e) => {
	calculate();
	secondCurrencyName.innerText = e.target.value;
});
window.addEventListener('DOMContentLoaded', () => {
	fetchData();
});
