function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}

function refresh() {

    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    dateWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    dateYear = date.getFullYear()
    defaultDate = dateYear + "-W" + dateWeek
    document.getElementById("filtro-semana").value = defaultDate
    var d = ((dateWeek - 1) * 7) - 1;

    var monthArray = new Array();
    monthArray[0] = "Ene";
    monthArray[1] = "Feb";
    monthArray[2] = "Mar";
    monthArray[3] = "Abr";
    monthArray[4] = "May";
    monthArray[5] = "Jun";
    monthArray[6] = "Jul";
    monthArray[7] = "Ago";
    monthArray[8] = "Sep";
    monthArray[9] = "Oct";
    monthArray[10] = "Nov";
    monthArray[11] = "Dic";



    var filtro = document.getElementById("filtro-semana").value;
    var year = String(filtro).substr(0, 4);
    var week = String(filtro).substr(6, String(filtro).length);
    console.log(year);
    console.log(week);
    var res = getDateOfWeek(week, year);
    console.log(res);
    var month = (res.getMonth() + 1);
    var day = (res.getDate()) - 2;
    if (day < 10) {
        day = "0" + day;
    }
    var year = (res.getFullYear());
    var fechaFiltro = String(year + "-" + month + "-" + day + "T00:00:00.000+00:00");

    var day2 = (parseInt(day) + 1)
    if (day2 < 10) {
        day2 = "0" + day2;
    }
    var fechaFiltro2 = String(year + "-" + month + "-" + day2 + "T00:00:00.000+00:00");

    var day5 = (parseInt(day) + 2)
    if (day5 < 10) {
        day5 = "0" + day5;
    }
    var fechaFiltro3 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");

    var day5 = (parseInt(day) + 3)
    if (day5 < 10) {
        day5 = "0" + day5;
    }
    var fechaFiltro4 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");

    var day5 = (parseInt(day) + 4)
    if (day5 < 10) {
        day5 = "0" + day5;
    }
    var fechaFiltro5 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");


    var FechaEsc = document.getElementsByClassName("FechaEsc");
    var FechaEsc1 = document.getElementsByClassName("FechaEsc1");
    var FechaEsc2 = document.getElementsByClassName("FechaEsc2");
    var FechaEsc3 = document.getElementsByClassName("FechaEsc3");
    var FechaEsc4 = document.getElementsByClassName("FechaEsc4");
    for (var i = 0; i < FechaEsc1.length; i++) {
        FechaEsc[i].innerHTML = String(parseInt(day)) + "-" + monthArray[month - 1];
        FechaEsc1[i].innerHTML = String(parseInt(day) + 1) + "-" + monthArray[month - 1];
        FechaEsc2[i].innerHTML = String(parseInt(day) + 2) + "-" + monthArray[month - 1];
        FechaEsc3[i].innerHTML = String(parseInt(day) + 3) + "-" + monthArray[month - 1];
        FechaEsc4[i].innerHTML = String(parseInt(day) + 4) + "-" + monthArray[month - 1];
    }




    let url = `/GraficasByDate/${fechaFiltro}/${fechaFiltro2}/${fechaFiltro3}/${fechaFiltro4}/${fechaFiltro5}/`;


    let settings = {
        method: 'GET'
    }

    fetch(url, settings)
        .then(response => {
            if (response.ok)
                return response.json();
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log("hola");
            console.log(responseJSON);
            // var escuad = document.getElementByID('esc');
            // console.log(escuad);
            document.getElementById("EscAp").innerHTML = responseJSON.escAp1;
            document.getElementById("EscAp1").innerHTML = responseJSON.escAp2;
            document.getElementById("EscAp2").innerHTML = responseJSON.escAp3;
            document.getElementById("EscAp3").innerHTML = responseJSON.escAp4;
            document.getElementById("EscAp4").innerHTML = responseJSON.escAp5;
            document.getElementById("EscAp5").innerHTML = responseJSON.escAp5 + responseJSON.escAp4 + responseJSON.escAp3 + responseJSON.escAp2 + responseJSON.escAp1;



        })
        .catch(err => {
            console.log(err);
        })

}


function init() {

    refresh();

    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    dateWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    dateYear = date.getFullYear()
    defaultDate = dateYear + "-W" + dateWeek
    document.getElementById("filtro-semana").value = defaultDate
    var d = ((dateWeek - 1) * 7) - 1;

    // primer dia de la semana en formato fecha
    dateFDW = new Date();

    //console.log(dateFDW.UTC();

    var monthArray = new Array();
    monthArray[0] = "Ene";
    monthArray[1] = "Feb";
    monthArray[2] = "Mar";
    monthArray[3] = "Abr";
    monthArray[4] = "May";
    monthArray[5] = "Jun";
    monthArray[6] = "Jul";
    monthArray[7] = "Ago";
    monthArray[8] = "Sep";
    monthArray[9] = "Oct";
    monthArray[10] = "Nov";
    monthArray[11] = "Dic";



    semana = document.getElementById("filtro-semana");

    semana.addEventListener("change", event => {
        event.preventDefault()
        var year = String(event.target.value).substr(0, 4);
        var week = String(event.target.value).substr(6, String(event.target.value).length);
        console.log(year);
        console.log(week);
        var res = getDateOfWeek(week, year);
        console.log(res);
        var month = (res.getMonth() + 1);
        var day = (res.getDate()) - 2;
        if (day < 10) {
            day = "0" + day;
        }
        var year = (res.getFullYear());
        var fechaFiltro = String(year + "-" + month + "-" + day + "T00:00:00.000+00:00");

        var day2 = (parseInt(day) + 1)
        if (day2 < 10) {
            day2 = "0" + day2;
        }
        var fechaFiltro2 = String(year + "-" + month + "-" + day2 + "T00:00:00.000+00:00");

        var day5 = (parseInt(day) + 2)
        if (day5 < 10) {
            day5 = "0" + day5;
        }
        var fechaFiltro3 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");

        var day5 = (parseInt(day) + 3)
        if (day5 < 10) {
            day5 = "0" + day5;
        }
        var fechaFiltro4 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");

        var day5 = (parseInt(day) + 4)
        if (day5 < 10) {
            day5 = "0" + day5;
        }
        var fechaFiltro5 = String(year + "-" + month + "-" + day5 + "T00:00:00.000+00:00");


        var FechaEsc = document.getElementsByClassName("FechaEsc");
        var FechaEsc1 = document.getElementsByClassName("FechaEsc1");
        var FechaEsc2 = document.getElementsByClassName("FechaEsc2");
        var FechaEsc3 = document.getElementsByClassName("FechaEsc3");
        var FechaEsc4 = document.getElementsByClassName("FechaEsc4");
        for (var i = 0; i < FechaEsc1.length; i++) {
            FechaEsc[i].innerHTML = String(parseInt(day)) + "-" + monthArray[month - 1];
            FechaEsc1[i].innerHTML = String(parseInt(day) + 1) + "-" + monthArray[month - 1];
            FechaEsc2[i].innerHTML = String(parseInt(day) + 2) + "-" + monthArray[month - 1];
            FechaEsc3[i].innerHTML = String(parseInt(day) + 3) + "-" + monthArray[month - 1];
            FechaEsc4[i].innerHTML = String(parseInt(day) + 4) + "-" + monthArray[month - 1];
        }




        let url = `/GraficasByDate/${fechaFiltro}/${fechaFiltro2}/${fechaFiltro3}/${fechaFiltro4}/${fechaFiltro5}/`;


        let settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => {
                if (response.ok)
                    return response.json();
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log("hola");
                console.log(responseJSON);
                // var escuad = document.getElementByID('esc');
                // console.log(escuad);
                document.getElementById("EscAp").innerHTML = responseJSON.escAp1;
                document.getElementById("EscAp1").innerHTML = responseJSON.escAp2;
                document.getElementById("EscAp2").innerHTML = responseJSON.escAp3;
                document.getElementById("EscAp3").innerHTML = responseJSON.escAp4;
                document.getElementById("EscAp4").innerHTML = responseJSON.escAp5;
                document.getElementById("EscAp5").innerHTML = responseJSON.escAp5 + responseJSON.escAp4 + responseJSON.escAp3 + responseJSON.escAp2 + responseJSON.escAp1;
                document.getElementById("EscRe").innerHTML = responseJSON.escRe1;
                document.getElementById("EscRe1").innerHTML = responseJSON.escRe2;
                document.getElementById("EscRe2").innerHTML = responseJSON.escRe3;
                document.getElementById("EscRe3").innerHTML = responseJSON.escRe4;
                document.getElementById("EscRe4").innerHTML = responseJSON.escRe5;
                document.getElementById("EscRe5").innerHTML = responseJSON.escRe5 + responseJSON.escRe4 + responseJSON.escRe3 + responseJSON.escRe2 + responseJSON.escRe1;
                document.getElementById("EscT").innerHTML = responseJSON.escRe1 + responseJSON.escAp1;
                document.getElementById("EscT1").innerHTML = responseJSON.escRe2 + responseJSON.escAp2;
                document.getElementById("EscT2").innerHTML = responseJSON.escRe3 + responseJSON.escAp3;
                document.getElementById("EscT3").innerHTML = responseJSON.escRe4 + responseJSON.escAp4;
                document.getElementById("EscT4").innerHTML = responseJSON.escRe5 + responseJSON.escAp5;
                document.getElementById("EscT5").innerHTML = responseJSON.escAp5 + responseJSON.escAp4 + responseJSON.escAp3 + responseJSON.escAp2 + responseJSON.escAp1 + responseJSON.escRe5 + responseJSON.escRe4 + responseJSON.escRe3 + responseJSON.escRe2 + responseJSON.escRe1;

                document.getElementById("EncAp").innerHTML = responseJSON.encAp1;
                document.getElementById("EncAp1").innerHTML = responseJSON.encAp2;
                document.getElementById("EncAp2").innerHTML = responseJSON.encAp3;
                document.getElementById("EncAp3").innerHTML = responseJSON.encAp4;
                document.getElementById("EncAp4").innerHTML = responseJSON.encAp5;
                document.getElementById("EncAp5").innerHTML = responseJSON.encAp5 + responseJSON.encAp4 + responseJSON.encAp3 + responseJSON.encAp2 + responseJSON.encAp1;
                document.getElementById("EncRe").innerHTML = responseJSON.encRe1;
                document.getElementById("EncRe1").innerHTML = responseJSON.encRe2;
                document.getElementById("EncRe2").innerHTML = responseJSON.encRe3;
                document.getElementById("EncRe3").innerHTML = responseJSON.encRe4;
                document.getElementById("EncRe4").innerHTML = responseJSON.encRe5;
                document.getElementById("EncRe5").innerHTML = responseJSON.encRe5 + responseJSON.encRe4 + responseJSON.encRe3 + responseJSON.encRe2 + responseJSON.encRe1;
                document.getElementById("EncT").innerHTML = responseJSON.encRe1 + responseJSON.encAp1;
                document.getElementById("EncT1").innerHTML = responseJSON.encRe2 + responseJSON.encAp2;
                document.getElementById("EncT2").innerHTML = responseJSON.encRe3 + responseJSON.encAp3;
                document.getElementById("EncT3").innerHTML = responseJSON.encRe4 + responseJSON.encAp4;
                document.getElementById("EncT4").innerHTML = responseJSON.encRe5 + responseJSON.encAp5;
                document.getElementById("EncT5").innerHTML = responseJSON.encAp5 + responseJSON.encAp4 + responseJSON.encAp3 + responseJSON.encAp2 + responseJSON.encAp1 + responseJSON.encRe5 + responseJSON.encRe4 + responseJSON.encRe3 + responseJSON.encRe2 + responseJSON.encRe1;

                document.getElementById("TalAp").innerHTML = responseJSON.talAp1;
                document.getElementById("TalAp1").innerHTML = responseJSON.talAp2;
                document.getElementById("TalAp2").innerHTML = responseJSON.talAp3;
                document.getElementById("TalAp3").innerHTML = responseJSON.talAp4;
                document.getElementById("TalAp4").innerHTML = responseJSON.talAp5;
                document.getElementById("TalAp5").innerHTML = responseJSON.talAp5 + responseJSON.talAp4 + responseJSON.talAp3 + responseJSON.talAp2 + responseJSON.talAp1;
                document.getElementById("TalRe").innerHTML = responseJSON.talRe1;
                document.getElementById("TalRe1").innerHTML = responseJSON.talRe2;
                document.getElementById("TalRe2").innerHTML = responseJSON.talRe3;
                document.getElementById("TalRe3").innerHTML = responseJSON.talRe4;
                document.getElementById("TalRe4").innerHTML = responseJSON.talRe5;
                document.getElementById("TalRe5").innerHTML = responseJSON.talRe5 + responseJSON.talRe4 + responseJSON.talRe3 + responseJSON.talRe2 + responseJSON.talRe1;
                document.getElementById("TalT").innerHTML = responseJSON.talRe1 + responseJSON.talAp1;
                document.getElementById("TalT1").innerHTML = responseJSON.talRe2 + responseJSON.talAp2;
                document.getElementById("TalT2").innerHTML = responseJSON.talRe3 + responseJSON.talAp3;
                document.getElementById("TalT3").innerHTML = responseJSON.talRe4 + responseJSON.talAp4;
                document.getElementById("TalT4").innerHTML = responseJSON.talRe5 + responseJSON.talAp5;
                document.getElementById("TalT5").innerHTML = responseJSON.talAp5 + responseJSON.talAp4 + responseJSON.talAp3 + responseJSON.talAp2 + responseJSON.talAp1 + responseJSON.talRe5 + responseJSON.talRe4 + responseJSON.talRe3 + responseJSON.talRe2 + responseJSON.talRe1;

                document.getElementById("SacAp").innerHTML = responseJSON.sacAp1;
                document.getElementById("SacAp1").innerHTML = responseJSON.sacAp2;
                document.getElementById("SacAp2").innerHTML = responseJSON.sacAp3;
                document.getElementById("SacAp3").innerHTML = responseJSON.sacAp4;
                document.getElementById("SacAp4").innerHTML = responseJSON.sacAp5;
                document.getElementById("SacAp5").innerHTML = responseJSON.sacAp5 + responseJSON.sacAp4 + responseJSON.sacAp3 + responseJSON.sacAp2 + responseJSON.sacAp1;
                document.getElementById("SacRe").innerHTML = responseJSON.sacRe1;
                document.getElementById("SacRe1").innerHTML = responseJSON.sacRe2;
                document.getElementById("SacRe2").innerHTML = responseJSON.sacRe3;
                document.getElementById("SacRe3").innerHTML = responseJSON.sacRe4;
                document.getElementById("SacRe4").innerHTML = responseJSON.sacRe5;
                document.getElementById("SacRe5").innerHTML = responseJSON.sacRe5 + responseJSON.sacRe4 + responseJSON.sacRe3 + responseJSON.sacRe2 + responseJSON.sacRe1;
                document.getElementById("SacT").innerHTML = responseJSON.sacRe1 + responseJSON.sacAp1;
                document.getElementById("SacT1").innerHTML = responseJSON.sacRe2 + responseJSON.sacAp2;
                document.getElementById("SacT2").innerHTML = responseJSON.sacRe3 + responseJSON.sacAp3;
                document.getElementById("SacT3").innerHTML = responseJSON.sacRe4 + responseJSON.sacAp4;
                document.getElementById("SacT4").innerHTML = responseJSON.sacRe5 + responseJSON.sacAp5;
                document.getElementById("SacT5").innerHTML = responseJSON.sacAp5 + responseJSON.sacAp4 + responseJSON.sacAp3 + responseJSON.sacAp2 + responseJSON.sacAp1 + responseJSON.sacRe5 + responseJSON.sacRe4 + responseJSON.sacRe3 + responseJSON.sacRe2 + responseJSON.sacRe1;

                document.getElementById("Ar1Ap").innerHTML = responseJSON.ar1Ap1;
                document.getElementById("Ar1Ap1").innerHTML = responseJSON.ar1Ap2;
                document.getElementById("Ar1Ap2").innerHTML = responseJSON.ar1Ap3;
                document.getElementById("Ar1Ap3").innerHTML = responseJSON.ar1Ap4;
                document.getElementById("Ar1Ap4").innerHTML = responseJSON.ar1Ap5;
                document.getElementById("Ar1Ap5").innerHTML = responseJSON.ar1Ap5 + responseJSON.ar1Ap4 + responseJSON.ar1Ap3 + responseJSON.ar1Ap2 + responseJSON.ar1Ap1;
                document.getElementById("Ar1Re").innerHTML = responseJSON.ar1Re1;
                document.getElementById("Ar1Re1").innerHTML = responseJSON.ar1Re2;
                document.getElementById("Ar1Re2").innerHTML = responseJSON.ar1Re3;
                document.getElementById("Ar1Re3").innerHTML = responseJSON.ar1Re4;
                document.getElementById("Ar1Re4").innerHTML = responseJSON.ar1Re5;
                document.getElementById("Ar1Re5").innerHTML = responseJSON.ar1Re5 + responseJSON.ar1Re4 + responseJSON.ar1Re3 + responseJSON.ar1Re2 + responseJSON.ar1Re1;
                document.getElementById("Ar1T").innerHTML = responseJSON.ar1Re1 + responseJSON.ar1Ap1;
                document.getElementById("Ar1T1").innerHTML = responseJSON.ar1Re2 + responseJSON.ar1Ap2;
                document.getElementById("Ar1T2").innerHTML = responseJSON.ar1Re3 + responseJSON.ar1Ap3;
                document.getElementById("Ar1T3").innerHTML = responseJSON.ar1Re4 + responseJSON.ar1Ap4;
                document.getElementById("Ar1T4").innerHTML = responseJSON.ar1Re5 + responseJSON.ar1Ap5;
                document.getElementById("Ar1T5").innerHTML = responseJSON.ar1Ap5 + responseJSON.ar1Ap4 + responseJSON.ar1Ap3 + responseJSON.ar1Ap2 + responseJSON.ar1Ap1 + responseJSON.ar1Re5 + responseJSON.ar1Re4 + responseJSON.ar1Re3 + responseJSON.ar1Re2 + responseJSON.ar1Re1;

                document.getElementById("Ar2Ap").innerHTML = responseJSON.ar2Ap1;
                document.getElementById("Ar2Ap1").innerHTML = responseJSON.ar2Ap2;
                document.getElementById("Ar2Ap2").innerHTML = responseJSON.ar2Ap3;
                document.getElementById("Ar2Ap3").innerHTML = responseJSON.ar2Ap4;
                document.getElementById("Ar2Ap4").innerHTML = responseJSON.ar2Ap5;
                document.getElementById("Ar2Ap5").innerHTML = responseJSON.ar2Ap5 + responseJSON.ar2Ap4 + responseJSON.ar2Ap3 + responseJSON.ar2Ap2 + responseJSON.ar2Ap1;
                document.getElementById("Ar2Re").innerHTML = responseJSON.ar2Re1;
                document.getElementById("Ar2Re1").innerHTML = responseJSON.ar2Re2;
                document.getElementById("Ar2Re2").innerHTML = responseJSON.ar2Re3;
                document.getElementById("Ar2Re3").innerHTML = responseJSON.ar2Re4;
                document.getElementById("Ar2Re4").innerHTML = responseJSON.ar2Re5;
                document.getElementById("Ar2Re5").innerHTML = responseJSON.ar2Re5 + responseJSON.ar2Re4 + responseJSON.ar2Re3 + responseJSON.ar2Re2 + responseJSON.ar2Re1;
                document.getElementById("Ar2T").innerHTML = responseJSON.ar2Re1 + responseJSON.ar2Ap1;
                document.getElementById("Ar2T1").innerHTML = responseJSON.ar2Re2 + responseJSON.ar2Ap2;
                document.getElementById("Ar2T2").innerHTML = responseJSON.ar2Re3 + responseJSON.ar2Ap3;
                document.getElementById("Ar2T3").innerHTML = responseJSON.ar2Re4 + responseJSON.ar2Ap4;
                document.getElementById("Ar2T4").innerHTML = responseJSON.ar2Re5 + responseJSON.ar2Ap5;
                document.getElementById("Ar2T5").innerHTML = responseJSON.ar2Ap5 + responseJSON.ar2Ap4 + responseJSON.ar2Ap3 + responseJSON.ar2Ap2 + responseJSON.ar2Ap1 + responseJSON.ar2Re5 + responseJSON.ar2Re4 + responseJSON.ar2Re3 + responseJSON.ar2Re2 + responseJSON.ar2Re1;

                document.getElementById("Ar3Ap").innerHTML = responseJSON.ar3Ap1;
                document.getElementById("Ar3Ap1").innerHTML = responseJSON.ar3Ap2;
                document.getElementById("Ar3Ap2").innerHTML = responseJSON.ar3Ap3;
                document.getElementById("Ar3Ap3").innerHTML = responseJSON.ar3Ap4;
                document.getElementById("Ar3Ap4").innerHTML = responseJSON.ar3Ap5;
                document.getElementById("Ar3Ap5").innerHTML = responseJSON.ar3Ap5 + responseJSON.ar3Ap4 + responseJSON.ar3Ap3 + responseJSON.ar3Ap2 + responseJSON.ar3Ap1;
                document.getElementById("Ar3Re").innerHTML = responseJSON.ar3Re1;
                document.getElementById("Ar3Re1").innerHTML = responseJSON.ar3Re2;
                document.getElementById("Ar3Re2").innerHTML = responseJSON.ar3Re3;
                document.getElementById("Ar3Re3").innerHTML = responseJSON.ar3Re4;
                document.getElementById("Ar3Re4").innerHTML = responseJSON.ar3Re5;
                document.getElementById("Ar3Re5").innerHTML = responseJSON.ar3Re5 + responseJSON.ar3Re4 + responseJSON.ar3Re3 + responseJSON.ar3Re2 + responseJSON.ar3Re1;
                document.getElementById("Ar3T").innerHTML = responseJSON.ar3Re1 + responseJSON.ar3Ap1;
                document.getElementById("Ar3T1").innerHTML = responseJSON.ar3Re2 + responseJSON.ar3Ap2;
                document.getElementById("Ar3T2").innerHTML = responseJSON.ar3Re3 + responseJSON.ar3Ap3;
                document.getElementById("Ar3T3").innerHTML = responseJSON.ar3Re4 + responseJSON.ar3Ap4;
                document.getElementById("Ar3T4").innerHTML = responseJSON.ar3Re5 + responseJSON.ar3Ap5;
                document.getElementById("Ar3T5").innerHTML = responseJSON.ar3Ap5 + responseJSON.ar3Ap4 + responseJSON.ar3Ap3 + responseJSON.ar3Ap2 + responseJSON.ar3Ap1 + responseJSON.ar3Re5 + responseJSON.ar3Re4 + responseJSON.ar3Re3 + responseJSON.ar3Re2 + responseJSON.ar3Re1;


                document.getElementById("AcaAp").innerHTML = responseJSON.acaAp1;
                document.getElementById("AcaAp1").innerHTML = responseJSON.acaAp2;
                document.getElementById("AcaAp2").innerHTML = responseJSON.acaAp3;
                document.getElementById("AcaAp3").innerHTML = responseJSON.acaAp4;
                document.getElementById("AcaAp4").innerHTML = responseJSON.acaAp5;
                document.getElementById("AcaAp5").innerHTML = responseJSON.acaAp5 + responseJSON.acaAp4 + responseJSON.acaAp3 + responseJSON.acaAp2 + responseJSON.acaAp1;
                document.getElementById("AcaRe").innerHTML = responseJSON.acaRe1;
                document.getElementById("AcaRe1").innerHTML = responseJSON.acaRe2;
                document.getElementById("AcaRe2").innerHTML = responseJSON.acaRe3;
                document.getElementById("AcaRe3").innerHTML = responseJSON.acaRe4;
                document.getElementById("AcaRe4").innerHTML = responseJSON.acaRe5;
                document.getElementById("AcaRe5").innerHTML = responseJSON.acaRe5 + responseJSON.acaRe4 + responseJSON.acaRe3 + responseJSON.acaRe2 + responseJSON.acaRe1;
                document.getElementById("AcaT").innerHTML = responseJSON.acaRe1 + responseJSON.acaAp1;
                document.getElementById("AcaT1").innerHTML = responseJSON.acaRe2 + responseJSON.acaAp2;
                document.getElementById("AcaT2").innerHTML = responseJSON.acaRe3 + responseJSON.acaAp3;
                document.getElementById("AcaT3").innerHTML = responseJSON.acaRe4 + responseJSON.acaAp4;
                document.getElementById("AcaT4").innerHTML = responseJSON.acaRe5 + responseJSON.acaAp5;
                document.getElementById("AcaT5").innerHTML = responseJSON.acaAp5 + responseJSON.acaAp4 + responseJSON.acaAp3 + responseJSON.acaAp2 + responseJSON.acaAp1 + responseJSON.acaRe5 + responseJSON.acaRe4 + responseJSON.acaRe3 + responseJSON.acaRe2 + responseJSON.acaRe1;

            })
            .catch(err => {
                console.log(err);
            })
    })




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