document.querySelector('#filter-alunos').style.display = "none";

const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));;

topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

var globalIdDisciplinaSelected = 0;

const dataTable = mdc.dataTable.MDCDataTable.attachTo(document.querySelector('.mdc-data-table'));

const selectDisciplinas = mdc.select.MDCSelect.attachTo(document.querySelector('.disciplinas-filter'));

var selectAlunos = mdc.select.MDCSelect.attachTo(document.querySelector('.alunos-filter'));

const dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));

selectDisciplinas.listen('MDCSelect:change', () => {
    var idDisciplinaSelected = selectDisciplinas.value;
    globalIdDisciplinaSelected = idDisciplinaSelected;
    listarAlunos(idDisciplinaSelected);
    document.querySelector('#alunos-input').value = "";
    if (idDisciplinaSelected != 0) {
        document.querySelector('.filter-alunos').style.display = "block";    
    }
    else {

        document.querySelector('.filter-alunos').style.display = "none";
    }

});

function listarAlunos(idDisciplina = 0) {
    var url = 'http://localhost/atividadefinal2/backend/alunos/rellancarnota.php?type=alunos&idDisciplina=' + idDisciplina;

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

            var alunosList = document.querySelector("#filter-alunos");
            var alunosListInnerHTML = '<div class="mdc-select alunos-filter">' +
                '<div class="mdc-select__anchor demo-width-class">' +
                '<span class="mdc-select__ripple"></span>' +
                '<input type="text" disabled readonly class="mdc-select__selected-text" id="alunos-input">' +
                '<i class="mdc-select__dropdown-icon"></i>' +
                '<span class="mdc-floating-label">Escolha o aluno</span>' +
                '<span class="mdc-line-ripple"></span>' +
                '</div>' +
                '<div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">' +
                '<ul class="mdc-list" id="aluno-list">' +
                '<li class="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true"></li>';
            var datarowid = 0;

            data.map((item) => {
                datarowid += 1;

                var nota1 = !item.nota1 ? "Sem nota" : parseInt(item.nota1);
                var nota2 = !item.nota2 ? "Sem nota" : parseInt(item.nota2);
                var nota3 = !item.nota3 ? "Sem nota" : parseInt(item.nota3);
                var media = !item.media ? "Sem nota" : parseInt(item.media);

                datarowid += 1;

                tbody.innerHTML += '<tr data-row-id="u' + datarowid + '" class="mdc-data-table__row">' +
                    '<td class="mdc-data-table__cell">' + item.idAluno + '</td>' +
                    '<td class="mdc-data-table__cell">' + item.nome + '</td>' +
                    '<td class="mdc-data-table__cell" id-disciplina="' + item.idDisciplina + '">' + item.nomeDisciplina + '</td>' +
                    '<td class="mdc-data-table__cell">' + nota1 + '</td>' +
                    '<td class="mdc-data-table__cell">' + nota2 + '</td>' +
                    '<td class="mdc-data-table__cell">' + nota3 + '</td>' +
                    '<td class="mdc-data-table__cell">' + media + '</td>' +
                    '<td class="mdc-data-table__cell">' + (!item.conceito ? "Não definido" : item.conceito) + '</td>' +
                    '<td class="mdc-data-table__cell"> ' +
                    '<button id="edit-button" onclick="openDialog(' + item.idAluno + ',' + item.idDisciplina + ')" class="mdc-fab mdc-fab--mini" aria-label="Favorite">' +
                    '<div class="mdc-fab__ripple"></div>' +
                    '<span class="mdc-fab__icon material-icons">send</span>' +
                    '</button></td>' +
                    '</tr>';
                alunosListInnerHTML += '<li class="mdc-list-item" id-disciplina="' + item.idDisciplina + '" data-value="' + item.idAluno + '">' +
                    '<span class="mdc-list-item__text">' + item.nome + '</span>' +
                    '</li>;'

                const fabRipple = mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-fab'));

            });
            alunosList.innerHTML = alunosListInnerHTML; 
            selectAlunos = mdc.select.MDCSelect.attachTo(document.querySelector('.alunos-filter'));
            selectAlunos.listen('MDCSelect:change', (el) => {
                idAlunoSelected = selectAlunos.value;
                const elText = el.target.querySelector(`[data-value="${selectAlunos.value}"]`).innerText;
                var idDisciplinaSelected = selectDisciplinas.value;
                listarAluno(idAlunoSelected, idDisciplinaSelected);
            
            });
        });
        
};

function listarDisciplinas() {
    var url = "http://localhost/atividadefinal2/backend/alunos/rellancarnota.php?type=disciplinas&idDisciplina=0";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url, options).then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {

            var data = data.data;
            var disciplinaslist = document.querySelector("#disciplinas-list");
            disciplinaslist.innerHTML = '<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true"></li>';

            data.map((item) => {
                disciplinaslist.innerHTML += '<li class="mdc-list-item" data-value="' + item.idDisciplina + '">' +
                    '<span class="mdc-list-item__text">' + item.nomeDisciplina + '</span>' +
                    '</li>';
            })
        })
};

function activateSelectAlunos() {


}

function listarAluno(idAluno, idDisciplina) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    var url = "http://localhost/atividadefinal2/backend/alunos/" + "relatorio_um.php?idAluno=" + idAluno + "&idDisciplina=" + idDisciplina;

    fetch(url, options).then((resp) => resp.json()).then(function (data) {

        data = data.data;

        var tbody = document.querySelector("#disciplina-tbody");
        tbody.innerHTML = "";


        var datarowid = 0;

        data.map((item) => {
            datarowid += 1;

            var nota1 = !item.nota1 ? "Sem nota" : parseInt(item.nota1);
            var nota2 = !item.nota2 ? "Sem nota" : parseInt(item.nota2);
            var nota3 = !item.nota3 ? "Sem nota" : parseInt(item.nota3);
            var media = !item.media ? "Sem nota" : parseInt(item.media);

            datarowid += 1;

            tbody.innerHTML += '<tr data-row-id="u' + datarowid + '" class="mdc-data-table__row">' +
                '<td class="mdc-data-table__cell">' + item.idAluno + '</td>' +
                '<td class="mdc-data-table__cell">' + item.nome + '</td>' +
                '<td class="mdc-data-table__cell" id-disciplina="' + item.idDisciplina + '">' + item.nomeDisciplina + '</td>' +
                '<td class="mdc-data-table__cell">' + nota1 + '</td>' +
                '<td class="mdc-data-table__cell">' + nota2 + '</td>' +
                '<td class="mdc-data-table__cell">' + nota3 + '</td>' +
                '<td class="mdc-data-table__cell">' + media + '</td>' +
                '<td class="mdc-data-table__cell">' + (!item.conceito ? "Não definido" : item.conceito) + '</td>' +
                '<td class="mdc-data-table__cell"> ' +
                '<button id="edit-button" onclick="openDialog(' + item.idAluno + ',' + item.idDisciplina + ')" class="mdc-fab mdc-fab--mini" aria-label="Favorite">' +
                '<div class="mdc-fab__ripple"></div>' +
                '<span class="mdc-fab__icon material-icons">send</span>' +
                '</button></td>' +
                '</tr>';

            const fabRipple = mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-fab'));

        })

    })
    activateSelectAlunos();
}
function openDialog(idAluno, idDisciplina) {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    var url = "http://localhost/atividadefinal2/backend/alunos/";
    fetch(url + "relatorio_um.php?idAluno=" + idAluno + "&idDisciplina=" + idDisciplina, options).then((resp) => resp.json()).then(function (data) {
        data = data.data[0];
        var nota1 = !data.nota1 ? "Sem nota" : parseInt(data.nota1);
        var nota2 = !data.nota2 ? "Sem nota" : parseInt(data.nota2);
        var nota3 = !data.nota3 ? "Sem nota" : parseInt(data.nota3);
        var media = !data.media ? "Sem nota" : parseInt(data.media);
        var dialogcontent = document.querySelector('#my-dialog-content');
        dialogcontent.innerHTML = '<form action="#" id="form-notas">' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" value="' + data.idAluno + '" disabled id="idaluno-input" aria-labelledby="idaluno-input-lb">' +
            '<span class="mdc-floating-label"  id="idaluno-input-lb">Código Aluno</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" disabled value="' + data.nome + '" id="nomealuno-input" aria-labelledby="nomealuno-input-lb">' +
            '<span class="mdc-floating-label" id="nomealuno-input">Nome Aluno</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '<div id="divHiddenInput" style="display: none;">' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" value="' + data.idDisciplina + '" id="iddisciplina-input" aria-labelledby="iddisciplina-input-lb">' +
            '<span class="mdc-floating-label" id="iddisciplina-input-lb">Código Disciplina</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '</div>' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" disabled value="' + data.nomeDisciplina + '" id="nomedisciplina-input" aria-labelledby="nomedisciplina-input-lb">' +
            '<span class="mdc-floating-label" id="nomedisciplina-input-lb">Nome Disciplina</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" value="' + parseInt(!data.nota1 ? "0" : data.nota1) + '" id="nota1-input" aria-labelledby="nota1-input-lb">' +
            '<span class="mdc-floating-label" id="nota1-input-lb">Avaliação 1</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" value="' + parseInt(!data.nota2 ? "0" : data.nota2) + '" id="nota2-input" aria-labelledby="nota2-input-lb">' +
            '<span class="mdc-floating-label" id="nota2-input-lb">Avaliação 2</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '<label class="mdc-text-field mdc-text-field--filled">' +
            '<span class="mdc-text-field__ripple"></span>' +
            '<input class="mdc-text-field__input" type="text" value="' + parseInt(!data.nota3 ? "0" : data.nota3) + '" id="nota3-input" aria-labelledby="nota3-input-lb">' +
            '<span class="mdc-floating-label" id="nota3-input-lb">Avaliação 3</span>' +
            '<span class="mdc-line-ripple"></span>' +
            '</label>' +
            '</form>';
        const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
            return mdc.textField.MDCTextField.attachTo(el);
        });
        var element = document.querySelector('#form-notas');
        element.addEventListener('submit', event => {

            event.preventDefault();

            var nota1 = parseInt(document.querySelector('#nota1-input').value);
            var nota2 = parseInt(document.querySelector('#nota2-input').value);
            var nota3 = parseInt(document.querySelector('#nota3-input').value);

            alunoInfo = {
                id: idAluno,
                id_disciplina: idDisciplina,
                nota1: nota1,
                nota2: nota2,
                nota3: nota3
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(alunoInfo)
            };
            var url = "http://localhost/atividadefinal2/backend/alunos/";
            fetch(url + "lancarNota.php", options).then((resp) => resp.json()).then(function (data) {

                listarAlunos(globalIdDisciplinaSelected);
            })

        })
    })
    dialog.open();

}

listarDisciplinas();


