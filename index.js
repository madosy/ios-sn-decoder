//make all lowercase
//charcode
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
  console.log(myMonth);
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
      return "3700";
      break;
    case "NK":
      return "3800";
      break;
    default:
      throw new Error(
        `Invalid product string entered! \n User entered: "${productStringLower}"`
      );
  }
}

function getDeviceInfo(productSerial) {
  const year = getYear(productSerial[0]);
  const month = getMonth(productSerial[1]);
  const productLength = productSerial.length - 6;
  const product = getProduct(productSerial.substring(2, 2 + productLength));
  return { year, month, product };
}
