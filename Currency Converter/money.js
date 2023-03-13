const optionContainer = document.querySelector(".option-container");
const addText = document.getElementById("select");
const fromContainer = document.querySelector(".from-container");
const toContainer = document.querySelector(".to-container");
const selected = document.querySelector('.selected');


const memory = {};

// const endpoint = "https://api.exchangeratesapi.oi/latest";
console.log(select);

const currencies = {
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

function generateOptions(option) {
  let index = 0;
  return Object.entries(option).forEach(([key, value]) => {
    /////change id declaration.....
    const options = `
    <div class="option" id=${index} name=${key}>
      <input type="radio" class="currencies" name=${key}>
      <label for="currencies" name=${key}>${key} - ${value}</label>
    </div>
    `;
    index++;
    optionContainer.insertAdjacentHTML("beforeend", options);
  });
}

const optionsDisplay = generateOptions(currencies);
console.log(optionsDisplay);

// toContainer.addEventListener("click", event => {
//   const clickedElement = event.target;
//   const key = clickedElement.getAttribute("name");

//   const text = clickedElement.textContent;
//   console.log(key);

//   select.innerHTML = text;
// });
//////////////////////////////////////
let from = "";
fromContainer.addEventListener("click", event => {
  const clickedElement = event.target;
  from = clickedElement.getAttribute("name");
  const text = clickedElement.textContent;

  select.innerHTML = text;
});

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
    const result = data.result;
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

///(to, from, amount)
fetchExchangeRateData("USD", "EUR", 100);

function convert(to, from, amount) {
  if (!memory[from]) {
    console.log("oh no");
  }
  // const data = await fetchExchangeRateData(from);
}

selected.addEventListener("click", () => {
  optionContainer.classList.toggle("active");
  // selectedArrow.style.transform = 'rotate(180deg)';
  // selectedArrow.style.top = '-1.2rem';
})