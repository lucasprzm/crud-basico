var dados = [];

function populaTabela() {
  if (Array.isArray(dados)) {
    // usando jquery para limpar a tabela
    $("#tblDados tbody").html("");
    dados.forEach((item) => {
      $("#tblDados tbody").append(`<tr>
      <td>${item.ID}</td>
      <td>${item.Nome}</td>
      <td>${item.Sobrenome}</td>
      <td>${item.DtNascimento}</td>
      <td>${item.Formacao}</td>
      </tr>`);
    });
  }
}

$(function () {
  dados = JSON.parse(localStorage.getItem("__dados__"));
  if (dados) {
    populaTabela();
  }
  $("#btnSalvar").click(() => {
    // Evento click do botão salvar
    // Pegando valores das variáveis digitadas no modal.
    let nome = $("#txtNome").value();
    let sobreNome = $("#txtSobrenome").value();
    let dtNascimento = new Date(
      $("#txtDtNascimento").value()
    ).toLocaleDateString("pt-br", { timeZone: "UTC" });
    let formacao = $("#txtFormacao").value();
    // Objeto para armazenar as informações
    let registro = {};
    // Atribuição das variáveis criadas para dentro do objeto
    registro.nome = nome;
    registro.sobreNome = sobreNome;
    registro.dtNascimento = dtNascimento;
    registro.formacao = formacao;
    // Determinar o id
    registro.id = dados.length + 1;
    // Adicionando o registro criado
    dados.push(registro);

    populaTabela();
  });
});
