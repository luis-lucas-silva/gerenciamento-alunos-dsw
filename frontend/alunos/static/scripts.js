
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));;
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const dataTable = mdc.dataTable.MDCDataTable.attachTo(document.querySelector('.mdc-data-table'));




function listarAlunos() {
  var url = "http://localhost/atividadefinal2/backend/alunos/";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(url + "ler.php", options).then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      var data = data.data;
      var tbody = document.querySelector("#aluno-tbody");
      tbody.innerHTML = "";
      var datarowid = 0;
      var aluno = data.map((item) => {
        datarowid += 1;
        tbody.innerHTML += '<tr data-row-id="u' + datarowid + '" class="mdc-data-table__row">' +
          '<td class="mdc-data-table__cell">' + item.idAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.nomeAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.emailAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.telAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.cepAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.ruaAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.numAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.bairroAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.cidadeAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.estadoAluno + '</td>' +
          '<td class="mdc-data-table__cell">' + item.nomeDisciplina + '</td>';
      });
    });
};
listarAlunos();

const dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
  return mdc.textField.MDCTextField.attachTo(el);
});

const select = mdc.select.MDCSelect.attachTo(document.querySelector('.mdc-select'));

select.listen('MDCSelect:change', () => {
  document.querySelector("#iddisciplina-input").value = select.value;
});

function openDialog() {

  var url = "http://localhost/atividadefinal2/backend/disciplinas/";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(url + "ler.php", options).then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      var data = data.data;
      var selectdisc = document.querySelector("#select-disciplina");
      selectdisc.innerHTML = "";
      tempInnerHTML = ";"
      data.map((item) => {
        tempInnerHTML += '<li class="mdc-list-item" data-value="' + item.idDisciplina + '">' +
          '<span class="mdc-list-item__text">' + item.nomeDisciplina + '</span>' +
          '</li>';
      })
      selectdisc.innerHTML = '<li class="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true"></li>' + tempInnerHTML;
    })

  var cepButton = document.querySelector('#cep-button');
  cepButton.addEventListener('click', event => {
    event.preventDefault();
    var cep = document.querySelector('#cep-input').value;

    if (!cep) {
      alert("Por favor, preencha o CEP");
    }
    else {
      const options = {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "cep": cep })
      };
      var url = `http://localhost/atividadefinal2/backend/alunos/cep.php`;

      fetch(url, options).then((res) => res.json())
        .then(function (data) {
          if (!data.erro) {
            seconddiv = document.querySelector("#second-block-form");
            seconddiv.innerHTML = '<label class="mdc-text-field mdc-text-field--filled"> ' +
              '<span class="mdc-text-field__ripple"></span> ' +
              '<input class="mdc-text-field__input" id="rua-input" disabled type="text" value="' + data.logradouro + '" required aria-labelledby="nota2-input"> ' +
              '<span class="mdc-floating-label" id="nota2-input">Rua</span>' +
              '<span class="mdc-line-ripple"></span> ' +
              '</label>' +
              '<label class="mdc-text-field mdc-text-field--filled"> ' +
              '<span class="mdc-text-field__ripple"></span> ' +
              '<input class="mdc-text-field__input" type="text" pattern="[0-9]{1,5}" placeholder="Até 5 dígitos" id="numero-input" required aria-labelledby="numeroaluno-input-lb"> ' +
              '<span class="mdc-floating-label" id="numeroaluno-input-lb">Número</span>' +
              '<span class="mdc-line-ripple"></span> ' +
              '</label> ' +
              '<label class="mdc-text-field mdc-text-field--filled"> ' +
              '<span class="mdc-text-field__ripple"></span> ' +
              '<input class="mdc-text-field__input" type="text" id="bairro-input" value="' + data.bairro + '" disabled required aria-labelledby="nota3-input"> ' +
              '<span class="mdc-floating-label" id="nota3-input">Bairro</span> ' +
              '<span class="mdc-line-ripple"></span> ' +
              '</label> ' +
              '<label class="mdc-text-field mdc-text-field--filled"> ' +
              '<span class="mdc-text-field__ripple"></span> ' +
              '<input class="mdc-text-field__input" type="text" id="cidade-input" disabled value="' + data.localidade + '" required aria-labelledby="nota3-input"> ' +
              '<span class="mdc-floating-label" id="nota3-input">Cidade</span> ' +
              '<span class="mdc-line-ripple"></span> ' +
              '</label> ' +
              '<label class="mdc-text-field mdc-text-field--filled"> ' +
              '<span class="mdc-text-field__ripple"></span> ' +
              '<input class="mdc-text-field__input" type="text" id="estado-input" disabled required value="' + data.uf + '" aria-labelledby="nota3-input"> ' +
              '<span class="mdc-floating-label" id="nota3-input">Estado</span> ' +
              '<span class="mdc-line-ripple"></span> ' +
              '</label>'
            const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
              return mdc.textField.MDCTextField.attachTo(el);
            });

          }
          else {
            alert("Informações referente ao CEP não encontradas, tente novamente");
          }

        })
    }
  })

  var cadastrarAlunoButton = document.querySelector('#cadastrar-aluno');
  cadastrarAlunoButton.addEventListener('click', event => {
    nomeAluno = document.querySelector('#nomealuno-input').value;
    emailAluno = document.querySelector('#emailaluno-input').value;
    telAluno = document.querySelector('#telaluno-input').value;
    cepAluno = document.querySelector('#cep-input').value;
    idDisciplina = document.querySelector('#iddisciplina-input').value;
    ruaAluno = document.querySelector('#rua-input').value;
    numAluno = document.querySelector('#numero-input').value;
    bairroAluno = document.querySelector('#bairro-input').value;
    cidadeAluno = document.querySelector('#cidade-input').value;
    estadoAluno = document.querySelector('#estado-input').value;

    if ((!nomeAluno) || (!emailAluno) || (!telAluno) || (!cepAluno) || (!idDisciplina)) {
      if (!document.querySelector('#estado-input')) {
        alert("Por favor, busque o seu cep");
      }
      alert("Por favor, preencha os campos obrigatórios");
    }
    else {
      var alunoInfo = {
        nome: nomeAluno,
        email: emailAluno,
        telefone: telAluno,
        cep: cepAluno,
        rua: ruaAluno,
        numero: numAluno,
        bairro: bairroAluno,
        cidade: cidadeAluno,
        estado: estadoAluno,
        id_disciplina: idDisciplina
      }
      console.log(String(alunoInfo));
      const options = {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(alunoInfo)
      };
      var url = `http://localhost/atividadefinal2/backend/alunos/criar.php`;
      fetch(url, options).then((res) => res.json())
        .then(function (data) {
          if (data.message == "Sucess to create aluno") {
            dialog.close();
            listarAlunos();
            setTimeout(function () {
              alert("Sucesso para criar o aluno");
            }, 500);

          }

        });

    }

  })
  dialog.open();

}



