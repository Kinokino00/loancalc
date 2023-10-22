const loanAmountEl = document.querySelector("#loanAmount");
const insterestRateEl = document.querySelector("#insterestRate");
const loanYearEl = document.querySelector("#loanYear");
const principalPaymentEl = document.querySelector("#principalPayment");

const resultEl = document.querySelector("#result");

const tableTbodyEl = document.querySelector("#resultTable>tbody");

function roanCalc() {  //處理邏輯
  let loanAmount = loanAmountEl.value * 10000;
  let insterestRate = insterestRateEl.value;
  let loanYear = loanYearEl.value;
  let principalPayment = principalPaymentEl.checked;

  let amount = loanAmount;
  let months = loanYear * 12;
  let monthRate = insterestRate / 100 / 12;

  let monthPay = parseInt(amount / months);
  let resultPayment = [];

  console.log(amount, monthRate, months, monthPay);
  for (let i = 0; i < months; i++) {
    let interest = Math.round(amount * monthRate);
    amount -= monthPay;
    let text = "";
    if (i == months - 1) {
      resultPayment.push([i + 1, monthPay + amount, interest, monthPay + interest + amount, 0]);
    } else {
      resultPayment.push([i + 1, monthPay, interest, monthPay + interest, amount]);
    };
  };
  let totalInterest = 0;
  for (let i = 0; i < resultPayment.length; i++) {
    totalInterest += resultPayment[i][2];
  };
  resultEl.innerHTML = `期數: ${resultPayment.length} 總利息支出: ${totalInterest} 總還款金額: ${loanAmount + totalInterest}`;
  drawTable(resultPayment);
};

function drawTable(resultPayment) {  //負責繪製(table)
  let tableHtml = "";
  for (let i = 0; i < resultPayment.length; i++) {
    tableHtml += `<tr>`;
    for (let j = 0; j < resultPayment[i].length; j++) {
      tableHtml += `<td>${resultPayment[i][j]}</td>`;
    };
    tableHtml += `</tr>`;
  }
  if (tableHtml != '') {
    document.querySelector("#resultTable").style.display = 'table';
  }
  tableTbodyEl.innerHTML = tableHtml;
};