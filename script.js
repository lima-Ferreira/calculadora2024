const inputCompra = document.querySelector(".compra");
const inputIpi = document.querySelector(".ipi");
const inputFrete = document.querySelector(".frete");
const vFrete = document.querySelector(".v-frete");
const inputOutros = document.querySelector(".outros");
const inputBase = document.querySelector(".base");
const inputIcms = document.querySelector(".icms");
const inputPreco1 = document.querySelector(".preco1");
const inputPreco2 = document.querySelector(".preco2");
const inputPreco4 = document.querySelector(".preco4");
const inputMargemPisCofins = document.querySelector(".margem-pis-cofins");
const inputValorPisCofins = document.querySelector(".valor-pis-cofins");
const inputValorCusto = document.querySelector(".v-custo");

const valorIpi = document.querySelector("#vlr-ipi");
const valorFrete = document.querySelector("#vlr-frete");
const v_Frete = document.querySelector("#v-frete");
const valorOutros = document.querySelector("#vlr-outros");
const valorIcms = document.querySelector("#vlr-icms");
const valorPreco4 = document.querySelector("#vlr-fiscal");
const mediaDeCusto = document.querySelector("#m-custo");
const valorCustoAvista = document.querySelector("#custo-avista");
const valorCustoAprazo = document.querySelector("#custo-aprazo");
const valorPisCofinsMedia = document.querySelector("#v-pisCofins");
const valorAvista = document.querySelector("#avista");
const valorAprazo = document.querySelector("#aprazo");

let button = document.querySelector(".btn");
let buttonClear = document.querySelector("#btn");

function calcularFrete() {
  const inputCompra = document.querySelector(".compra").value;
  const inputFrete = document.querySelector(".frete");
  const vFrete = document.querySelector(".v-frete").value;

  let frete = (vFrete * 100) / inputCompra;
  if (frete) {
    inputFrete.value = frete.toFixed(2);
  } else {
    frete = frete;
  }
}

function captureValue() {
  if (!inputCompra.value) return;

  const compra = +inputCompra.value;
  const ipi = +inputIpi.value / 100;
  const frete = +inputFrete.value / 100;
  const outros = +inputOutros.value / 100;
  const base = +inputBase.value / 100;
  const icms = +inputIcms.value / 100;
  const preco1 = +inputPreco1.value / 100;
  const preco2 = +inputPreco2.value / 100;
  const preco4 = +inputPreco4.value / 100;
  const margemPisCofins = +inputMargemPisCofins.value / 100;
  const valorPisCofins = inputValorPisCofins.value / 100;
  const valorCusto = +inputValorCusto.value / 100;

  return {
    compra,
    ipi,
    frete,
    outros,
    base,
    icms,
    preco1,
    preco2,
    preco4,
    margemPisCofins,
    valorPisCofins,
    valorCusto,
  };
}

document.addEventListener("click", function (e) {
  let eventTarget = e.target;

  if (eventTarget.classList.contains("select")) {
    inputIcms.value = eventTarget.innerText.replace("%", " ").replace(",", ".");
  }
});

function sectionValues(data) {
  if (data) {
    const novoIpi = data.compra * data.ipi;
    valorIpi.innerHTML = ` ${novoIpi.toFixed(2)}`;

    const novoFrete = data.compra * data.frete;
    valorFrete.innerHTML = ` ${novoFrete.toFixed(2)}`;

    const novoOutros = data.compra * data.outros;
    valorOutros.innerHTML = ` ${novoOutros.toFixed(2)}`;

    const pisCofins = Number(data.compra * data.margemPisCofins);
    inputValorPisCofins.value = ` ${pisCofins.toFixed(2)}`;
  }
}

const listaLi = [...document.querySelectorAll("li")];

for (let i = 0; i < listaLi.length; i++) {
  listaLi[i].addEventListener("click", (e) => {
    const itens = e.target.innerText;

    const listaArr = itens.split(" ");
    const arrItens = listaArr.length - 1;
    let valorItem = listaArr[arrItens];
    valorItem = valorItem.replace(",", ".");
    const vIcms = valorItem.replace("%", "");

    if (!vIcms) {
      return;
    } else {
      inputIcms.value = vIcms;
    }
  });
}

function calcularIcms(data) {
  if (data) {
    const valueIpi = data.compra * data.ipi + data.compra;
    const valueFrete = valueIpi * data.frete + valueIpi;
    const valueOutros = valueFrete * data.outros + valueFrete;
    const valueIcms = valueOutros * data.base + valueOutros;
    const novoIcms = valueIcms * data.icms;
    valorIcms.innerHTML = ` ${novoIcms.toFixed(2)}`;

    const custo = valueOutros + novoIcms;
    inputValorCusto.value = `R$ ${custo.toFixed(2)}`;

    const precoFiscal = custo * data.preco4 + custo;
    valorPreco4.innerHTML = `  ${precoFiscal.toFixed(2)}`;

    const precoAvista = data.preco1;
    const precoAprazo = data.preco2;
    const pisCofins = data.compra * data.margemPisCofins;

    precoDeCusto(custo, precoAvista, precoAprazo, pisCofins);
  }
}

function precoDeCusto(custo, precoAvista, precoAprazo, pisCofins) {
  const custoAvista = custo * precoAvista + custo;

  const custoAprazo = custo * precoAprazo + custo;

  let iFederal = (custoAvista + custoAprazo) / 2;
  iFederal = (iFederal * 9.25) / 100;

  const impostoFederal = iFederal - pisCofins;
  valorPisCofinsMedia.innerHTML = `${impostoFederal.toFixed(2)}`;

  const custoMedia = impostoFederal + custo;
  mediaDeCusto.innerHTML = `R$ ${custoMedia.toFixed(2)}`;

  const pAista = custo * precoAvista + custo;
  valorAvista.innerHTML = ` ${pAista.toFixed(2)}`;

  const pAprazo = custo * precoAprazo + custo;
  valorAprazo.innerHTML = `${pAprazo.toFixed(2)}`;

  const pisCofinsAvista = (pAista * 9.25) / 100;
  const pisCofinsAprazo = (pAprazo * 9.25) / 100;

  const custoAvistaComPisCpfins = pisCofinsAvista - pisCofins + custo;
  valorCustoAvista.innerHTML = `${custoAvistaComPisCpfins.toFixed(2)}`;

  const custoAprazoComPisCpfins = pisCofinsAprazo - pisCofins + custo;
  valorCustoAprazo.innerHTML = ` ${custoAprazoComPisCpfins.toFixed(2)}`;
}

function clearInputCompra() {
  inputCompra.value = "";
  vFrete.value = "";
}

function handleClick() {
  sectionValues(captureValue());
  calcularIcms(captureValue());
  calcularFrete();
  clearInputCompra();
}

function handleClearInputs() {
  valorIpi.innerHTML = "";
  valorFrete.innerHTML = "";
  valorOutros.innerHTML = "";
  valorIcms.innerHTML = "";
  valorPreco4.innerHTML = "";
  valorCustoAvista.innerHTML = "";
  valorCustoAprazo.innerHTML = "";
  valorPisCofinsMedia.innerHTML = "";
  mediaDeCusto.innerHTML = "";
  valorAvista.innerHTML = "";
  valorAprazo.innerHTML = "";
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    sectionValues(captureValue());
    calcularIcms(captureValue());
    calcularFrete();
    clearInputCompra();
  }
});

button.addEventListener("click", handleClick);
buttonClear.addEventListener("click", handleClearInputs);

const inputsNext = [...document.querySelectorAll("input")];
inputsNext.forEach((next) => {
  next.addEventListener("keyup", function (e) {
    if (e.keyCode === 39) {
      e.preventDefault();
      const previous =
        this.parentNode.nextElementSibling.querySelector("input");
      if (previous) previous.focus();
    }
    if (e.keyCode === 37) {
      e.preventDefault();
      const nextInput =
        this.parentNode.previousElementSibling.querySelector("input");
      if (nextInput) nextInput.focus();
    }
  });
});
