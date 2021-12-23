var dados = [];

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
      <td><button type="button" class="btn btn-primary"><i class="far fa-edit"></i></button></td>
      <td><button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>
      </tr>`);
    });
  }
}

$(function () {
  //dados = JSON.parse(localStorage.getItem("__dados__"));
  console.log(dados);
  if (dados) {
    populaTabela();
  }

  $("#btnSalvar").on("click", function () {
    // Evento click do botão salvar
    // Pegando valores das variáveis digitadas no modal.
    let nome = $("#txtNome").val();
    let sobreNome = $("#txtSobrenome").val();
    let dtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString(
      "pt-br",
      { timeZone: "UTC" }
    );
    let formacao = $("#txtFormacao").val();
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
    // Alerta depois de salvar
    alert("Registro salvo com sucesso!");
    // Esconder o modal depois do alerta
    $("#modalRegistro").modal("hide");
    // Limpeza dos campos para caso o modal seja acessado novamente não apareça os dados digitados anteriormente.
    $("#txtNome").val("");
    $("#txtSobrenome").val("");
    $("#txtDtNascimento").val("");
    $("#txtFormacao").val("");
    // Chamando a função novamente para criar a tabela.
    populaTabela();
  });
});
