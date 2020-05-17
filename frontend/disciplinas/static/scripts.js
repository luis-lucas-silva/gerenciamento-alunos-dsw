const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));;
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

const dataTable = mdc.dataTable.MDCDataTable.attachTo(document.querySelector('.mdc-data-table'));

const dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
    return mdc.textField.MDCTextField.attachTo(el);
});

function listarDisciplinas() {
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
            var tbody = document.querySelector("#disciplinas-tbody");
            tbody.innerHTML = "";
            var datarowid = 0;
            var aluno = data.map((item) => {
                datarowid += 1;
                tbody.innerHTML += '<tr data-row-id="u' + datarowid + '" class="mdc-data-table__row">' +
                    '<td class="mdc-data-table__cell">' + item.idDisciplina + '</td>' +
                    '<td class="mdc-data-table__cell">' + item.nomeDisciplina + '</td>';
            });
        });
};

function openDialog() {
    dialog.open();

    cadastrarDisciplinaBtn = document.querySelector("#cadastrar-disciplina");
    cadastrarDisciplinaBtn.addEventListener("click", function (event) {
        event.preventDefault();
        nomeDisciplina = String(document.querySelector("#nomedisciplina-input").value);

        if (!nomeDisciplina) {
            alert("Por favor, preencha o campo");
        }
        else {

            if (nomeDisciplina.length < 3 || nomeDisciplina.length > 99) {
                alert("O campo precisa conter entre 3 e 100 caracteres");
            }
            else {
                var url = "http://localhost/atividadefinal2/backend/disciplinas/criar.php";
                const options = {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nome: nomeDisciplina })
                };
                fetch(url, options).then((res) => res.json())
                    .then(function (data) {
                        if (data.message == "Sucess to create disciplina") {
                            listarDisciplinas();
                            dialog.close();
                            alert("A disciplina foi cadastrada com sucesso");
                        }
                        else if (data.message == "Disciplina ja existe") {
                            listarDisciplinas();
                            dialog.close();
                            alert("A disciplina já está cadastrada");
                        }
                        else {
                            dialog.close();
                            alert("Não foi possivel cadastrar a disciplina");
                        }
                    })
            }

        }
    })
}



