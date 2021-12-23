var dados = [];

function apagaRegistro(id) {
  let _confirm = confirm("Deseja realmente excluir esse registro?");
  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].id == id) {
        dados.splice(i, 1);
      }
    }
    populaTabela();
  }
}

function editaRegistro(id) {
  $("#modalRegistro").modal("show");
  dados.forEach((item) => {
    if (item.id == id) {
      $("#hdID").val(item.id);
      $("#txtNome").val(item.nome);
      $("#txtSobrenome").val(item.sobreNome);
      $("#txtDtNascimento").val(
        item.dtNascimento.substr(6, 4) +
          "-" +
          item.dtNascimento.substr(3, 2) +
          "-" +
          item.dtNascimento.substr(0, 2)
      );
      $("#txtFormacao").val(item.formacao);
    }
  });
}

function populaTabela() {
  if (Array.isArray(dados)) {
    localStorage.setItem("__dados__", JSON.stringify(dados));
    // usando jquery para limpar a tabela
    $("#tblDados tbody").html("");
    dados.forEach((item) => {
      $("#tblDados tbody").append(`<tr>
      <td>${item.id}</td>
      <td>${item.nome}</td>
      <td>${item.sobreNome}</td>
      <td>${item.dtNascimento}</td>
      <td>${item.formacao}</td>
      <td><button type="button" class="btn btn-primary" onclick="editaRegistro(${item.id})"><i class="far fa-edit"></i></button></td>
      <td><button type="button" class="btn btn-danger" onclick="apagaRegistro(${item.id})"><i class="fas fa-trash"></i></button></td>
      </tr>`);
    });
  }
}

$(function () {
  //dados = JSON.parse(localStorage.getItem("__dados__"));
  //console.log(dados);
  if (dados) {
    populaTabela();
  }

  $("#btnSalvar").on("click", function () {
    // Evento click do botão salvar
    // Pegando valores das variáveis digitadas no modal.
    let _id = $("#hdID").val();
    let nome = $("#txtNome").val();
    let sobreNome = $("#txtSobrenome").val();
    let dtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString(
      "pt-br",
      { timeZone: "UTC" }
    );
    let formacao = $("#txtFormacao").val();

    if (!_id || _id == "0") {
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
    } else {
      dados.forEach((item) => {
        if (item.id == _id) {
          item.nome = nome;
          item.sobreNome = sobreNome;
          item.dtNascimento = dtNascimento;
          item.formacao = formacao;
        }
      });
    }
    // Alerta depois de salvar
    alert("Registro salvo com sucesso!");
    // Esconder o modal depois do alerta
    $("#modalRegistro").modal("hide");
    // Limpeza dos campos para caso o modal seja acessado novamente não apareça os dados digitados anteriormente.
    $("#hdID").val("0");
    $("#txtNome").val("");
    $("#txtSobrenome").val("");
    $("#txtDtNascimento").val("");
    $("#txtFormacao").val("");
    // Chamando a função novamente para criar a tabela.
    populaTabela();
  });
});
