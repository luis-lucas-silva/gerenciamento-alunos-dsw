
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));;
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const dataTable = mdc.dataTable.MDCDataTable.attachTo(document.querySelector('.mdc-data-table'));




function gerarRelatorio() {
  var url = "http://localhost/atividadefinal2/backend/alunos/relatorio.php";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(url, options).then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      var data = data.data;
      var tbody = document.querySelector("#disciplina-tbody");
      tbody.innerHTML = "";
      var datarowid = 0;
      data.map((item) => {
        datarowid += 1;
        var nota1 = !item.nota1 ? "Sem nota" : parseInt(item.nota1);
        var nota2 = !item.nota2 ? "Sem nota" : parseInt(item.nota2);
        var nota3 = !item.nota3 ? "Sem nota" : parseInt(item.nota3);
        var media = !item.media ? "Sem nota" : parseInt(item.media);
        tbody.innerHTML += '<tr data-row-id="u' + datarowid + '" class="mdc-data-table__row">' +
          '<td class="mdc-data-table__cell">' + item.idAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.nome + '</td>' +
          '<td class="mdc-data-table__cell" id-disciplina="' + item.idDisciplina + '">' + item.nomeDisciplina + '</td>' +
          '<td class="mdc-data-table__cell">' + nota1 + '</td>' +
          '<td class="mdc-data-table__cell">' + nota2 + '</td>' +
          '<td class="mdc-data-table__cell">' + nota3 + '</td>' +
          '<td class="mdc-data-table__cell">' + media + '</td>' +
          '<td class="mdc-data-table__cell">' + (!item.conceito ? "Não definido" : item.conceito) + '</td>' +
          '<td class="mdc-data-table__cell"> ';
      });
    });
};






