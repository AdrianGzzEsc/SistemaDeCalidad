function init() {


    names = ['Defectos en Proceso - Escuadradora', 'Defectos en Proceso - Enchapadora', 'Defectos en Proceso - Taladro', 'Defectos en Proceso - Sacabocas', 'Defectos en Proceso - Armado1', 'Defectos en Proceso - Armado2', 'Defectos en Proceso - Armado3', 'Defectos en Proceso - Acabados'];
    fechas = ["Fecha-1", "Fecha-2", "Fecha-3", "Fecha-4", "Fecha-5", "Total"]

    for (var iI = 0; iI < 8; iI++) {

        const sec = document.createElement('section');
        const container = document.createElement('div');
        const row = document.createElement('div');
        const col = document.createElement('div');
        const card = document.createElement('div');
        const cardTitle = document.createElement('h3');
        container.classList.add("container");
        row.classList.add('row');
        col.classList.add("col", "mb-2", "mt-4", "border-light");
        card.classList.add("card", "rounded-0", "border-0", "mt-2");
        cardTitle.classList.add("card-title", "pl-1");
        cardTitle.style.backgroundColor = "gray";
        cardTitle.style.color = "white";
        cardTitle.appendChild(document.createTextNode(names[iI]));
        card.appendChild(cardTitle);
        col.appendChild(card);
        row.appendChild(col);
        container.appendChild(row);
        sec.appendChild(container);
        document.body.appendChild(sec);

        const thVacio = document.createElement('th');
        const thCont = document.createElement('th');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const trTotal = document.createElement('tr');
        const trApr = document.createElement('tr');
        const trRch = document.createElement('tr');
        const table = document.createElement('table');
        const section2 = document.createElement('section');
        const container2 = document.createElement('div');
        const row2 = document.createElement('div');
        const col2 = document.createElement('div');
        const tableResp = document.createElement('div');
        //thVacio.scope('col')
        thVacio.style.borderRadius = "0px";
        thCont.style.borderRadius = "0px";
        //thCont.scope("col");
        table.classList.add('table');
        container2.classList.add("container");
        row2.classList.add('row');
        col2.classList.add("col-lg-7", "my-3", "pb-0");
        tableResp.classList.add("table-responsive-md");

        thCont.appendChild(thVacio);

        for (var iJ = 0; iJ < 6; iJ++) {
            const thCol = document.createElement('th');
            //thCol.scope.add("col");
            thCol.style.backgroundColor = "orangered";
            thCol.style.borderRadius = "1px";
            thCol.style.borderColor = "black";
            thCol.appendChild(document.createTextNode(fechas[iJ]));
            thCont.appendChild(thCol);
        }
        thead.appendChild(thCont);
        table.appendChild(thead);
        const thTotal = document.createElement('th');
        //thTotal.scope('row');
        thTotal.style.borderRadius = "0px";
        const bold = document.createElement('b');
        bold.appendChild(document.createTextNode("Total"))
        thTotal.appendChild(bold);
        const tdVacio = document.createElement('td');
        tdVacio.style.border = "0px";
        trTotal.appendChild(tdVacio);
        /*
        for (var iJ = 0; iJ < 6; iJ++) {
            const thCol = document.createElement('th');
            //thCol.scope.add("col");
            thCol.style.backgroundColor = "orangered";
            thCol.style.borderRadius = "1px";
            thCol.style.borderColor = "black";
            thCol.appendChild(document.createTextNode(fechas[iJ]));
            thCont.appendChild(thCol);
        }*/
        tbody.appendChild(trTotal);
        table.appendChild(tbody);

        tableResp.appendChild(table);
        col2.appendChild(tableResp);
        row2.appendChild(col2);
        container2.appendChild(row2);
        section2.appendChild(container2);
        document.body.appendChild(section2);

    }



    var data = [1, 2, 3, 4, 5, 6, 7];
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data
            }]
        },

        // Configuration options go here
        options: {}
    });
    var ctx = document.getElementById('tablaDos').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
};

init();