const modulosMultiplicaveis = ["R0000 - REDE", "PDV00 - PDV", "GMT00 - GOURMET", "GER00 - GOURMET DROID"];

const modulos = [
  { nome: "CRXPA - E-TRADE COMPLETO", adesao: 250, mensalidade: 40, adesoesExtras: [230, 180, 130, 100], mensalidadesExtras: [38, 40] },
  { nome: "CRXPA - E-TRADE BÁSICO", adesao: 50, mensalidade: 20 },
  { nome: "R0000 - REDE", adesao: 0, mensalidade: 11 },
  { nome: "PDV00 - PDV", adesao: 0, mensalidade: 11 },
  { nome: "GMT00 - GOURMET", adesao: 0, mensalidade: 11 },
  { nome: "GER00 - GOURMET DROID", adesao: 0, mensalidade: 11 },
  { nome: "CRWEB - E-TRADE WEB", adesao: 50, mensalidade: 20 },
  { nome: "CRIND - PRODUÇÃO", adesao: 0, mensalidade: 0 },
  { nome: "CROSX - ORDEM SERVIÇO", adesao: 0, mensalidade: 0 },
  { nome: "CRPOM - PROMOCAO", adesao: 0, mensalidade: 0 },
  { nome: "CRSPD - SPED", adesao: 150, mensalidade: 40 },
  { nome: "CRSIT - SINTEGRA", adesao: 40, mensalidade: 9 },
  { nome: "CRMER - MERCOS", adesao: 180, mensalidade: 9 },
  { nome: "CRIFD - IFOOD", adesao: 50, mensalidade: 30 },
  { nome: "CRCCM - CcmPedidos", adesao: 200, mensalidade: 180 },
  { nome: "CRGST - Gestor", adesao: 0, mensalidade: 15 },
  { nome: "CRMND - IMendes", adesao: 100, mensalidade: 40 },
  { nome: "CRNVS - Nuvem Shop", adesao: 50, mensalidade: 40 },
  { nome: "CRPED - VR Pedidos", adesao: 100, mensalidade: 30 },
  { nome: "CRPWP - VR Pedidos WhatsApp", adesao: 20, mensalidade: 16 },
  { nome: "CRSCA - Scanntech", adesao: 0, mensalidade: 0 },
  { nome: "CRTPO - Tef POS", adesao: 50, mensalidade: 15 },
  { nome: "CRCOT - Club Cotação", adesao: 15, mensalidade: 10 },
  { nome: "CRPCT - Portal Contador", adesao: 50, mensalidade: 20 },
  { nome: "CRXIA - IA", adesao: 20, mensalidade: 10 },
  { nome: "CRSOV - BOT XML DFe", adesao: 10, mensalidade: 5 }
];

const tbody = document.getElementById("modulos-body");
const lista = document.getElementById("selecionados");
const totalAdesaoEl = document.getElementById("total-adesao");
const totalMensalidadeEl = document.getElementById("total-mensalidade");
const sidebar = document.getElementById("sidebar");

function atualizarResumo() {
  let totalAdesao = 0;
  let totalMensalidade = 0;
  lista.innerHTML = "";

  let algumSelecionado = false;

  modulos.forEach((modulo, index) => {
    const checkbox = document.getElementById(`check-${index}`);
    const selectAdesao = document.getElementById(`select-adesao-${index}`);
    const selectMensalidadeExtra = document.getElementById(`select-mensalidade-${index}`);
    const inputQtd = document.getElementById(`quantidade-${index}`);

    if (checkbox && checkbox.checked) {
      algumSelecionado = true;

      let adesao = modulo.adesao;
      if (selectAdesao && !selectAdesao.classList.contains("hidden")) {
        adesao = parseInt(selectAdesao.value);
      }

      let mensalidade = modulo.mensalidade;
      if (modulo.nome === "CRXPA - E-TRADE COMPLETO" && selectMensalidadeExtra && !selectMensalidadeExtra.classList.contains("hidden")) {
        mensalidade = parseInt(selectMensalidadeExtra.value);
      }

      let quantidade = 1;
      if (inputQtd) {
        quantidade = parseInt(inputQtd.value) || 1;
      }

      totalAdesao += adesao;
      totalMensalidade += mensalidade * quantidade;

      const li = document.createElement("li");
      li.textContent = modulo.nome + (quantidade > 1 ? ` (x${quantidade})` : "");
      lista.appendChild(li);
    }
  });

  totalAdesaoEl.textContent = totalAdesao;
  totalMensalidadeEl.textContent = totalMensalidade;

  sidebar.classList.toggle("hidden", !algumSelecionado);
}

function montarTabela() {
  modulos.forEach((modulo, index) => {
    const row = document.createElement("tr");

    let selectAdesaoHTML = "";
    if (modulo.adesoesExtras) {
      selectAdesaoHTML = `
        <select id="select-adesao-${index}" class="hidden" onchange="atualizarResumo()">
          <option value="${modulo.adesao}">R$ ${modulo.adesao}</option>
          ${modulo.adesoesExtras.map(v => `<option value="${v}">R$ ${v}</option>`).join("")}
        </select>
      `;
    }

    let selectMensalidadeHTML = "";
    if (modulo.nome === "CRXPA - E-TRADE COMPLETO" && modulo.mensalidadesExtras) {
      selectMensalidadeHTML = `
        <select id="select-mensalidade-${index}" class="hidden" onchange="atualizarResumo()">
          ${modulo.mensalidadesExtras.map(v => `<option value="${v}">R$ ${v}</option>`).join("")}
        </select>
      `;
    }

    const quantidadeHTML = modulosMultiplicaveis.includes(modulo.nome)
      ? `<input type="number" min="1" value="1" id="quantidade-${index}" class="input-qtd" onchange="atualizarResumo()">`
      : "";

    row.innerHTML = `
      <td><input type="checkbox" id="check-${index}" onchange="toggleSelect(${index}); atualizarResumo()"></td>
      <td>${quantidadeHTML}${modulo.nome}</td>
      <td>R$ ${modulo.adesao} ${selectAdesaoHTML}</td>
      <td>R$ ${modulo.mensalidade} ${selectMensalidadeHTML}</td>
    `;

    tbody.appendChild(row);
  });
}

function toggleSelect(index) {
  const checkbox = document.getElementById(`check-${index}`);
  const selectAdesao = document.getElementById(`select-adesao-${index}`);
  const selectMensalidade = document.getElementById(`select-mensalidade-${index}`);

  if (selectAdesao) selectAdesao.classList.toggle("hidden", !checkbox.checked);
  if (selectMensalidade) selectMensalidade.classList.toggle("hidden", !checkbox.checked);
}

document.addEventListener("DOMContentLoaded", montarTabela);
