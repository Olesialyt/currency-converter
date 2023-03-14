const fromCurrency = document.querySelector('[name="from_currency"]');
const toCurrency = document.querySelector('[name="to_currency"]');
const form = document.querySelector(".app form");

const textResultAmount = document.querySelector(".to_amount");
const ratesByBase = {};

const currencies = {
  "Select Currecy": "",
  USD: "United States Dollar",
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  GBP: "British Pound Sterling",
  HKD: "Hong Kong Dollar",
  HRK: "Croatian Kuna",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  RUB: "Russian Ruble",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  ZAR: "South African Rand",
  EUR: "Euro",
};

////найти рейт добавить в обьект и после умножить на данную сумму

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyKey, currencyValue]) =>
        `<option value="${currencyKey}">${currencyKey} - ${currencyValue}</option>`
    )
    .join("");
}

/////
async function fetchExchangeRateData(to, from, amount) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      apikey: "HCa4CB3agDUWEaqJHNQiDXwN5OLXPKWu",
    },
  };

  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    const result = data.result;
    const toDisplay = formatCurrency(to, result);
    resultAmount(toDisplay);
    ///call a func
    // resultAmount(result);
  } catch (error) {
    console.log("error", error);
  }
}
let from = "";
let to = "";
let amount = "";
function handleInput(e) {
  if (e.target.name === "from_currency") {
    from = e.target.value;
  } else if (e.target.name === "to_currency") {
    to = e.target.value;
  } else if (e.target.name === "from_amount") {
    amount = e.target.value;
  }
  if (to && from && amount) {
    fetchExchangeRateData(to, from, amount);
  }
}

function formatCurrency(to, amount) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: to,
  }).format(amount);
}

function resultAmount(result) {
  textResultAmount.innerHTML = result;
}
const optionsDisplay = generateOptions(currencies);

fromCurrency.innerHTML = optionsDisplay;
toCurrency.innerHTML = optionsDisplay;

form.addEventListener("input", handleInput);
