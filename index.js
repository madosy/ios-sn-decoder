function getCharCode(letter) {
  const lowerCaseLetter = letter.toLowerCase();
  const charCode = lowerCaseLetter.charCodeAt(0);
  return charCode;
}

function charCodeToYear(num) {
  const CHARCODE_FOR_A = 97;
  const FIRST_BASE_YEAR = 2012;
  const ROLLOVER = 26;
  const currentYear = new Date().getFullYear();
  const yearToAdd = Math.abs(CHARCODE_FOR_A - num);
  let resultYear = FIRST_BASE_YEAR + yearToAdd;
  const rolloverCount = Math.floor((currentYear - resultYear) / ROLLOVER);
  let finalYear = ROLLOVER * rolloverCount + resultYear;

  //need to fix logic later?
  if (finalYear < 2012) finalYear += ROLLOVER;

  return finalYear;
}

function charCodeToMonthNum(num) {
  const CHARCODE_FOR_JAN = 97;
  const FIRST_BASE_MON = 1;
  const ROLLOVER = 26;
  const monthToAdd = Math.abs(CHARCODE_FOR_JAN - num);
  let resultMonth = FIRST_BASE_MON + monthToAdd;

  if (resultMonth == 13) return 12; // M == December (rarely used)
  else if (resultMonth > 13 || resultMonth < 0) {
    throw new Error(
      `Invalid month letter! \n User entered: "${String.fromCharCode(num)}"`
    );
  }

  return resultMonth;
}

function getYear(letter) {
  const myCharCode = getCharCode(letter);
  const myYear = charCodeToYear(myCharCode);
  return myYear;
}

function monthNumToLetter(num) {
  const myDate = new Date("2012-01-01T00:00:00");
  myDate.setMonth(num - 1);
  let monthName = myDate.toLocaleString("default", { month: "long" });
  return monthName;
}

function getMonth(letter) {
  const myCharCode = getCharCode(letter);
  const myMonth = charCodeToMonthNum(myCharCode);
  const myMonthName = monthNumToLetter(myMonth);
  return myMonthName;
}

function getProduct(productString) {
  const productStringLower = productString.toUpperCase();
  switch (productStringLower) {
    case "NA":
      return "3500";
      break;
    case "NB":
      return "3600";
      break;
    case "NBA":
      return "3600";
      break;
    case "ND":
      return "3600 Access";
      break;
    case "NH":
      return "3700 Arctic White";
      break;
    case "NI":
      return "3700 Carbon Gray";
      break;
    case "NK":
      return "3800 Wireless";
      break;
    case "NL":
      return "3800 Wired";
      break;
    default:
      throw new Error(
        `Invalid product string entered! \n User entered: "${productStringLower}"`
      );
  }
}

function getDeviceInfo(serialNumber) {
  const year = getYear(serialNumber[0]);
  const month = getMonth(serialNumber[1]);
  const product = getProduct(serialNumber.substring(2));
  return { year, month, product };
}

const serialInputs = Array.from(document.querySelectorAll("input"));
const form = document.querySelector("form");
serialInputs.forEach((input, ind) => {
  input.addEventListener("paste", (event) => {
    const clipboard = event.clipboardData.getData("text");
    serialInputs[0].value = clipboard[0];
    serialInputs[1].value = clipboard[1];
    serialInputs[2].value = clipboard[2];
    serialInputs[3].value = clipboard[3];
    event.preventDefault();
  });
  input.addEventListener("input", (event) => {
    input.value = event.data;
    let nextInput = serialInputs[ind + 1];
    if (nextInput && input.value.length > 0) nextInput.focus();
  });
});

const submitButton = document.querySelector("button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let serialNumber = "";
  serialInputs.forEach((input) => (serialNumber += input.value));
  try {
    const deviceInfo = getDeviceInfo(serialNumber);
    displayResult(deviceInfo);
  } catch (err) {
    console.log("Please enter a valid serialnumber");
    const error = document.querySelector(".error");
    const spans = document.querySelectorAll("span");
    error.innerText = "Please enter a valid serial number.";
    spans.forEach((item) => (item.innerText = ""));
  }
});

function displayResult(deviceInfo) {
  const error = document.querySelector(".error");
  const year = document.querySelector(".year span");
  const month = document.querySelector(".month span");
  const product = document.querySelector(".product span");
  error.innerText = "";
  year.innerText = deviceInfo.year;
  month.innerText = deviceInfo.month;
  product.innerText = `IS ${deviceInfo.product}`;
}
