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
    var res = getDateOfWeek(week, year);
    var month = (res.getMonth() + 1);
    var day = (res.getDate()) - 2;
    if (day < 10) {
        day = "0" + day;
    }
    var year = (res.getFullYear());
    var fechaFiltro = String(year + "-" + month + "-" + day + "T00:00:00.000+00:00");

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




    let url = `/GraficasByDate/${fechaFiltro}/${fechaFiltro5}/`;


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
            //Escuadradora
            var ContEscAp = 0;
            var ContEscRe = 0;
            var ContEscAT = 0;
            var ContEscRT = 0;
            var fechasEsc = [0, 0, 0, 0, 0];
            var fechasEscRe = [0, 0, 0, 0, 0];
            var fechasEscT = [0, 0, 0, 0, 0];
            var iEsc = 0;

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                if (obj.ins1 == "Aceptado")
                    ContEscAp++;
                else
                    ContEscRe++;
                if (obj.ins2 == "Aceptado")
                    ContEscAp++;
                else
                    ContEscRe++;
                if (obj.ins3 == "Aceptado")
                    ContEscAp++;
                else
                    ContEscRe++;

                fechasEsc[iEsc] = ContEscAp;
                fechasEscRe[iEsc] = ContEscRe;
                fechasEscT[iEsc] = ContEscRe + ContEscAp;
                ContEscRT = ContEscRT + ContEscRe;
                ContEscAT = ContEscAT + ContEscAp;
                ContEscAp = 0;
                ContEscRe = 0;
                iEsc++;
            }
            fechasEsc[5] = ContEscAT;
            fechasEscRe[5] = ContEscRT;
            fechasEscT[5] = ContEscAT + ContEscRT;

            var EscAp = ["EscAp", "EscAp1", "EscAp2", "EscAp3", "EscAp4", "EscAp5"];
            var EscRe = ["EscRe", "EscRe1", "EscRe2", "EscRe3", "EscRe4", "EscRe5"];
            var EscT = ["EscT", "EscT1", "EscT2", "EscT3", "EscT4", "EscT5"];

            for (var i = 0; i < EscAp.length; i++) {
                document.getElementById(EscAp[i]).innerHTML = fechasEsc[i];
                document.getElementById(EscRe[i]).innerHTML = fechasEscRe[i];
                document.getElementById(EscT[i]).innerHTML = fechasEscT[i];
            }

            //Enchapadora
            var ContEncAp = 0;
            var ContEncRe = 0;
            var ContEncAT = 0;
            var ContEncRT = 0;
            var fechasEnc = [0, 0, 0, 0, 0];
            var fechasEncRe = [0, 0, 0, 0, 0];
            var fechasEncT = [0, 0, 0, 0, 0];
            var iEnc = 0;

            for (var key in responseJSON.enchap) {
                var obj = responseJSON.enchap[key];
                if (obj.ins1 == "Aceptado")
                    ContEncAp++;
                else
                    ContEncRe++;
                if (obj.ins2 == "Aceptado")
                    ContEncAp++;
                else
                    ContEncRe++;
                if (obj.ins3 == "Aceptado")
                    ContEncAp++;
                else
                    ContEncRe++;

                fechasEnc[iEnc] = ContEncAp;
                fechasEncRe[iEnc] = ContEncRe;
                fechasEncT[iEnc] = ContEncRe + ContEncAp;
                ContEncRT = ContEncRT + ContEncRe;
                ContEncAT = ContEncAT + ContEncAp;
                ContEncAp = 0;
                ContEncRe = 0;
                iEnc++;
            }
            fechasEnc[5] = ContEncAT;
            fechasEncRe[5] = ContEncRT;
            fechasEncT[5] = ContEncAT + ContEncRT;

            var EncAp = ["EncAp", "EncAp1", "EncAp2", "EncAp3", "EncAp4", "EncAp5"];
            var EncRe = ["EncRe", "EncRe1", "EncRe2", "EncRe3", "EncRe4", "EncRe5"];
            var EncT = ["EncT", "EncT1", "EncT2", "EncT3", "EncT4", "EncT5"];

            for (var i = 0; i < EncAp.length; i++) {
                document.getElementById(EncAp[i]).innerHTML = fechasEnc[i];
                document.getElementById(EncRe[i]).innerHTML = fechasEncRe[i];
                document.getElementById(EncT[i]).innerHTML = fechasEncT[i];
            }

            //Taladro
            var ContTalAp = 0;
            var ContTalRe = 0;
            var ContTalAT = 0;
            var ContTalRT = 0;
            var fechasTal = [0, 0, 0, 0, 0];
            var fechasTalRe = [0, 0, 0, 0, 0];
            var fechasTalT = [0, 0, 0, 0, 0];
            var iTal = 0;

            for (var key in responseJSON.talad) {
                var obj = responseJSON.talad[key];
                if (obj.ins1 == "Aceptado")
                    ContTalAp++;
                else
                    ContTalRe++;
                if (obj.ins2 == "Aceptado")
                    ContTalAp++;
                else
                    ContTalRe++;
                if (obj.ins3 == "Aceptado")
                    ContTalAp++;
                else
                    ContTalRe++;

                fechasTal[iTal] = ContTalAp;
                fechasTalRe[iTal] = ContTalRe;
                fechasTalT[iTal] = ContTalRe + ContTalAp;
                ContTalRT = ContTalRT + ContTalRe;
                ContTalAT = ContTalAT + ContTalAp;
                ContTalAp = 0;
                ContTalRe = 0;
                iTal++;
            }
            fechasTal[5] = ContTalAT;
            fechasTalRe[5] = ContTalRT;
            fechasTalT[5] = ContTalAT + ContTalRT;

            var TalAp = ["TalAp", "TalAp1", "TalAp2", "TalAp3", "TalAp4", "TalAp5"];
            var TalRe = ["TalRe", "TalRe1", "TalRe2", "TalRe3", "TalRe4", "TalRe5"];
            var TalT = ["TalT", "TalT1", "TalT2", "TalT3", "TalT4", "TalT5"];

            for (var i = 0; i < TalAp.length; i++) {
                document.getElementById(TalAp[i]).innerHTML = fechasTal[i];
                document.getElementById(TalRe[i]).innerHTML = fechasTalRe[i];
                document.getElementById(TalT[i]).innerHTML = fechasTalT[i];
            }

            //Sacabocados

            var ContSacAp = 0;
            var ContSacRe = 0;
            var ContSacAT = 0;
            var ContSacRT = 0;
            var fechasSac = [0, 0, 0, 0, 0];
            var fechasSacRe = [0, 0, 0, 0, 0];
            var fechasSacT = [0, 0, 0, 0, 0];
            var iSac = 0;

            for (var key in responseJSON.talad) {
                var obj = responseJSON.talad[key];
                if (obj.ins1 == "Aceptado")
                    ContSacAp++;
                else
                    ContSacRe++;
                if (obj.ins2 == "Aceptado")
                    ContSacAp++;
                else
                    ContSacRe++;
                if (obj.ins3 == "Aceptado")
                    ContSacAp++;
                else
                    ContSacRe++;

                fechasSac[iSac] = ContSacAp;
                fechasSacRe[iSac] = ContSacRe;
                fechasSacT[iSac] = ContSacRe + ContSacAp;
                ContSacRT = ContSacRT + ContSacRe;
                ContSacAT = ContSacAT + ContSacAp;
                ContSacAp = 0;
                ContSacRe = 0;
                iSac++;
            }
            fechasSac[5] = ContSacAT;
            fechasSacRe[5] = ContSacRT;
            fechasSacT[5] = ContSacAT + ContSacRT;

            var SacAp = ["SacAp", "SacAp1", "SacAp2", "SacAp3", "SacAp4", "SacAp5"];
            var SacRe = ["SacRe", "SacRe1", "SacRe2", "SacRe3", "SacRe4", "SacRe5"];
            var SacT = ["SacT", "SacT1", "SacT2", "SacT3", "SacT4", "SacT5"];

            for (var i = 0; i < SacAp.length; i++) {
                document.getElementById(SacAp[i]).innerHTML = fechasSac[i];
                document.getElementById(SacRe[i]).innerHTML = fechasSacRe[i];
                document.getElementById(SacT[i]).innerHTML = fechasSacT[i];
            }

            //Armado1

            var ContAr1Ap = 0;
            var ContAr1Re = 0;
            var ContAr1AT = 0;
            var ContAr1RT = 0;
            var fechasAr1 = [0, 0, 0, 0, 0];
            var fechasAr1Re = [0, 0, 0, 0, 0];
            var fechasAr1T = [0, 0, 0, 0, 0];
            var iAr1 = 0;

            for (var key in responseJSON.arm1) {
                var obj = responseJSON.arm1[key];
                if (obj.ins1 == "Aceptado")
                    ContAr1Ap++;
                else
                    ContAr1Re++;
                if (obj.ins2 == "Aceptado")
                    ContAr1Ap++;
                else
                    ContAr1Re++;
                if (obj.ins3 == "Aceptado")
                    ContAr1Ap++;
                else
                    ContAr1Re++;

                fechasAr1[iAr1] = ContAr1Ap;
                fechasAr1Re[iAr1] = ContAr1Re;
                fechasAr1T[iAr1] = ContAr1Re + ContAr1Ap;
                ContAr1RT = ContAr1RT + ContAr1Re;
                ContAr1AT = ContAr1AT + ContAr1Ap;
                ContAr1Ap = 0;
                ContAr1Re = 0;
                iAr1++;
            }
            fechasAr1[5] = ContAr1AT;
            fechasAr1Re[5] = ContAr1RT;
            fechasAr1T[5] = ContAr1AT + ContAr1RT;

            var Ar1Ap = ["Ar1Ap", "Ar1Ap1", "Ar1Ap2", "Ar1Ap3", "Ar1Ap4", "Ar1Ap5"];
            var Ar1Re = ["Ar1Re", "Ar1Re1", "Ar1Re2", "Ar1Re3", "Ar1Re4", "Ar1Re5"];
            var Ar1T = ["Ar1T", "Ar1T1", "Ar1T2", "Ar1T3", "Ar1T4", "Ar1T5"];

            for (var i = 0; i < Ar1Ap.length; i++) {
                document.getElementById(Ar1Ap[i]).innerHTML = fechasAr1[i];
                document.getElementById(Ar1Re[i]).innerHTML = fechasAr1Re[i];
                document.getElementById(Ar1T[i]).innerHTML = fechasAr1T[i];
            }

            //Armado2

            var ContAr2Ap = 0;
            var ContAr2Re = 0;
            var ContAr2AT = 0;
            var ContAr2RT = 0;
            var fechasAr2 = [0, 0, 0, 0, 0];
            var fechasAr2Re = [0, 0, 0, 0, 0];
            var fechasAr2T = [0, 0, 0, 0, 0];
            var iAr2 = 0;

            for (var key in responseJSON.arm2) {
                var obj = responseJSON.arm2[key];
                if (obj.ins1 == "Aceptado")
                    ContAr2Ap++;
                else
                    ContAr2Re++;
                if (obj.ins2 == "Aceptado")
                    ContAr2Ap++;
                else
                    ContAr2Re++;
                if (obj.ins3 == "Aceptado")
                    ContAr2Ap++;
                else
                    ContAr2Re++;

                fechasAr2[iAr2] = ContAr2Ap;
                fechasAr2Re[iAr2] = ContAr2Re;
                fechasAr2T[iAr2] = ContAr2Re + ContAr2Ap;
                ContAr2RT = ContAr2RT + ContAr2Re;
                ContAr2AT = ContAr2AT + ContAr2Ap;
                ContAr2Ap = 0;
                ContAr2Re = 0;
                iAr2++;
            }
            fechasAr2[5] = ContAr2AT;
            fechasAr2Re[5] = ContAr2RT;
            fechasAr2T[5] = ContAr2AT + ContAr2RT;

            var Ar2Ap = ["Ar2Ap", "Ar2Ap1", "Ar2Ap2", "Ar2Ap3", "Ar2Ap4", "Ar2Ap5"];
            var Ar2Re = ["Ar2Re", "Ar2Re1", "Ar2Re2", "Ar2Re3", "Ar2Re4", "Ar2Re5"];
            var Ar2T = ["Ar2T", "Ar2T1", "Ar2T2", "Ar2T3", "Ar2T4", "Ar2T5"];

            for (var i = 0; i < Ar2Ap.length; i++) {
                document.getElementById(Ar2Ap[i]).innerHTML = fechasAr2[i];
                document.getElementById(Ar2Re[i]).innerHTML = fechasAr2Re[i];
                document.getElementById(Ar2T[i]).innerHTML = fechasAr2T[i];
            }

            //Armado3

            var ContAr3Ap = 0;
            var ContAr3Re = 0;
            var ContAr3AT = 0;
            var ContAr3RT = 0;
            var fechasAr3 = [0, 0, 0, 0, 0];
            var fechasAr3Re = [0, 0, 0, 0, 0];
            var fechasAr3T = [0, 0, 0, 0, 0];
            var iAr3 = 0;

            for (var key in responseJSON.arm3) {
                var obj = responseJSON.arm3[key];
                if (obj.ins1 == "Aceptado")
                    ContAr3Ap++;
                else
                    ContAr3Re++;
                if (obj.ins2 == "Aceptado")
                    ContAr3Ap++;
                else
                    ContAr3Re++;
                if (obj.ins3 == "Aceptado")
                    ContAr3Ap++;
                else
                    ContAr3Re++;

                fechasAr3[iAr3] = ContAr3Ap;
                fechasAr3Re[iAr3] = ContAr3Re;
                fechasAr3T[iAr3] = ContAr3Re + ContAr3Ap;
                ContAr3RT = ContAr3RT + ContAr3Re;
                ContAr3AT = ContAr3AT + ContAr3Ap;
                ContAr3Ap = 0;
                ContAr3Re = 0;
                iAr3++;
            }
            fechasAr3[5] = ContAr3AT;
            fechasAr3Re[5] = ContAr3RT;
            fechasAr3T[5] = ContAr3AT + ContAr3RT;

            var Ar3Ap = ["Ar3Ap", "Ar3Ap1", "Ar3Ap2", "Ar3Ap3", "Ar3Ap4", "Ar3Ap5"];
            var Ar3Re = ["Ar3Re", "Ar3Re1", "Ar3Re2", "Ar3Re3", "Ar3Re4", "Ar3Re5"];
            var Ar3T = ["Ar3T", "Ar3T1", "Ar3T2", "Ar3T3", "Ar3T4", "Ar3T5"];

            for (var i = 0; i < Ar3Ap.length; i++) {
                document.getElementById(Ar3Ap[i]).innerHTML = fechasAr3[i];
                document.getElementById(Ar3Re[i]).innerHTML = fechasAr3Re[i];
                document.getElementById(Ar3T[i]).innerHTML = fechasAr3T[i];
            }

            //Acabados

            var ContAcaAp = 0;
            var ContAcaRe = 0;
            var ContAcaAT = 0;
            var ContAcaRT = 0;
            var fechasAca = [0, 0, 0, 0, 0];
            var fechasAcaRe = [0, 0, 0, 0, 0];
            var fechasAcaT = [0, 0, 0, 0, 0];
            var iAca = 0;

            for (var key in responseJSON.acab) {
                var obj = responseJSON.acab[key];
                if (obj.ins1 == "Aceptado")
                    ContAcaAp++;
                else
                    ContAcaRe++;
                if (obj.ins2 == "Aceptado")
                    ContAcaAp++;
                else
                    ContAcaRe++;
                if (obj.ins3 == "Aceptado")
                    ContAcaAp++;
                else
                    ContAcaRe++;

                fechasAca[iAca] = ContAcaAp;
                fechasAcaRe[iAca] = ContAcaRe;
                fechasAcaT[iAca] = ContAcaRe + ContAcaAp;
                ContAcaRT = ContAcaRT + ContAcaRe;
                ContAcaAT = ContAcaAT + ContAcaAp;
                ContAcaAp = 0;
                ContAcaRe = 0;
                iAca++;
            }
            fechasAca[5] = ContAcaAT;
            fechasAcaRe[5] = ContAcaRT;
            fechasAcaT[5] = ContAcaAT + ContAcaRT;

            var AcaAp = ["AcaAp", "AcaAp1", "AcaAp2", "AcaAp3", "AcaAp4", "AcaAp5"];
            var AcaRe = ["AcaRe", "AcaRe1", "AcaRe2", "AcaRe3", "AcaRe4", "AcaRe5"];
            var AcaT = ["AcaT", "AcaT1", "AcaT2", "AcaT3", "AcaT4", "AcaT5"];

            for (var i = 0; i < AcaAp.length; i++) {
                document.getElementById(AcaAp[i]).innerHTML = fechasAca[i];
                document.getElementById(AcaRe[i]).innerHTML = fechasAcaRe[i];
                document.getElementById(AcaT[i]).innerHTML = fechasAcaT[i];
            }




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
        var res = getDateOfWeek(week, year);
        var month = (res.getMonth() + 1);
        var day = (res.getDate()) - 2;
        if (day < 10) {
            day = "0" + day;
        }
        var year = (res.getFullYear());
        var fechaFiltro = String(year + "-" + month + "-" + day + "T00:00:00.000+00:00");

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




        let url = `/GraficasByDate/${fechaFiltro}/${fechaFiltro5}/`;


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
                //Escuadradora
                var ContEscAp = 0;
                var ContEscRe = 0;
                var ContEscAT = 0;
                var ContEscRT = 0;
                var fechasEsc = [0, 0, 0, 0, 0];
                var fechasEscRe = [0, 0, 0, 0, 0];
                var fechasEscT = [0, 0, 0, 0, 0];
                var iEsc = 0;

                for (var key in responseJSON.escuad) {
                    var obj = responseJSON.escuad[key];
                    if (obj.ins1 == "Aceptado")
                        ContEscAp++;
                    else
                        ContEscRe++;
                    if (obj.ins2 == "Aceptado")
                        ContEscAp++;
                    else
                        ContEscRe++;
                    if (obj.ins3 == "Aceptado")
                        ContEscAp++;
                    else
                        ContEscRe++;

                    fechasEsc[iEsc] = ContEscAp;
                    fechasEscRe[iEsc] = ContEscRe;
                    fechasEscT[iEsc] = ContEscRe + ContEscAp;
                    ContEscRT = ContEscRT + ContEscRe;
                    ContEscAT = ContEscAT + ContEscAp;
                    ContEscAp = 0;
                    ContEscRe = 0;
                    iEsc++;
                }
                fechasEsc[5] = ContEscAT;
                fechasEscRe[5] = ContEscRT;
                fechasEscT[5] = ContEscAT + ContEscRT;

                var EscAp = ["EscAp", "EscAp1", "EscAp2", "EscAp3", "EscAp4", "EscAp5"];
                var EscRe = ["EscRe", "EscRe1", "EscRe2", "EscRe3", "EscRe4", "EscRe5"];
                var EscT = ["EscT", "EscT1", "EscT2", "EscT3", "EscT4", "EscT5"];

                for (var i = 0; i < EscAp.length; i++) {
                    document.getElementById(EscAp[i]).innerHTML = fechasEsc[i];
                    document.getElementById(EscRe[i]).innerHTML = fechasEscRe[i];
                    document.getElementById(EscT[i]).innerHTML = fechasEscT[i];
                }

                //Enchapadora
                var ContEncAp = 0;
                var ContEncRe = 0;
                var ContEncAT = 0;
                var ContEncRT = 0;
                var fechasEnc = [0, 0, 0, 0, 0];
                var fechasEncRe = [0, 0, 0, 0, 0];
                var fechasEncT = [0, 0, 0, 0, 0];
                var iEnc = 0;

                for (var key in responseJSON.enchap) {
                    var obj = responseJSON.enchap[key];
                    if (obj.ins1 == "Aceptado")
                        ContEncAp++;
                    else
                        ContEncRe++;
                    if (obj.ins2 == "Aceptado")
                        ContEncAp++;
                    else
                        ContEncRe++;
                    if (obj.ins3 == "Aceptado")
                        ContEncAp++;
                    else
                        ContEncRe++;

                    fechasEnc[iEnc] = ContEncAp;
                    fechasEncRe[iEnc] = ContEncRe;
                    fechasEncT[iEnc] = ContEncRe + ContEncAp;
                    ContEncRT = ContEncRT + ContEncRe;
                    ContEncAT = ContEncAT + ContEncAp;
                    ContEncAp = 0;
                    ContEncRe = 0;
                    iEnc++;
                }
                fechasEnc[5] = ContEncAT;
                fechasEncRe[5] = ContEncRT;
                fechasEncT[5] = ContEncAT + ContEncRT;

                var EncAp = ["EncAp", "EncAp1", "EncAp2", "EncAp3", "EncAp4", "EncAp5"];
                var EncRe = ["EncRe", "EncRe1", "EncRe2", "EncRe3", "EncRe4", "EncRe5"];
                var EncT = ["EncT", "EncT1", "EncT2", "EncT3", "EncT4", "EncT5"];

                for (var i = 0; i < EncAp.length; i++) {
                    document.getElementById(EncAp[i]).innerHTML = fechasEnc[i];
                    document.getElementById(EncRe[i]).innerHTML = fechasEncRe[i];
                    document.getElementById(EncT[i]).innerHTML = fechasEncT[i];
                }

                //Taladro
                var ContTalAp = 0;
                var ContTalRe = 0;
                var ContTalAT = 0;
                var ContTalRT = 0;
                var fechasTal = [0, 0, 0, 0, 0];
                var fechasTalRe = [0, 0, 0, 0, 0];
                var fechasTalT = [0, 0, 0, 0, 0];
                var iTal = 0;

                for (var key in responseJSON.talad) {
                    var obj = responseJSON.talad[key];
                    if (obj.ins1 == "Aceptado")
                        ContTalAp++;
                    else
                        ContTalRe++;
                    if (obj.ins2 == "Aceptado")
                        ContTalAp++;
                    else
                        ContTalRe++;
                    if (obj.ins3 == "Aceptado")
                        ContTalAp++;
                    else
                        ContTalRe++;

                    fechasTal[iTal] = ContTalAp;
                    fechasTalRe[iTal] = ContTalRe;
                    fechasTalT[iTal] = ContTalRe + ContTalAp;
                    ContTalRT = ContTalRT + ContTalRe;
                    ContTalAT = ContTalAT + ContTalAp;
                    ContTalAp = 0;
                    ContTalRe = 0;
                    iTal++;
                }
                fechasTal[5] = ContTalAT;
                fechasTalRe[5] = ContTalRT;
                fechasTalT[5] = ContTalAT + ContTalRT;

                var TalAp = ["TalAp", "TalAp1", "TalAp2", "TalAp3", "TalAp4", "TalAp5"];
                var TalRe = ["TalRe", "TalRe1", "TalRe2", "TalRe3", "TalRe4", "TalRe5"];
                var TalT = ["TalT", "TalT1", "TalT2", "TalT3", "TalT4", "TalT5"];

                for (var i = 0; i < TalAp.length; i++) {
                    document.getElementById(TalAp[i]).innerHTML = fechasTal[i];
                    document.getElementById(TalRe[i]).innerHTML = fechasTalRe[i];
                    document.getElementById(TalT[i]).innerHTML = fechasTalT[i];
                }

                //Sacabocados

                var ContSacAp = 0;
                var ContSacRe = 0;
                var ContSacAT = 0;
                var ContSacRT = 0;
                var fechasSac = [0, 0, 0, 0, 0];
                var fechasSacRe = [0, 0, 0, 0, 0];
                var fechasSacT = [0, 0, 0, 0, 0];
                var iSac = 0;

                for (var key in responseJSON.talad) {
                    var obj = responseJSON.talad[key];
                    if (obj.ins1 == "Aceptado")
                        ContSacAp++;
                    else
                        ContSacRe++;
                    if (obj.ins2 == "Aceptado")
                        ContSacAp++;
                    else
                        ContSacRe++;
                    if (obj.ins3 == "Aceptado")
                        ContSacAp++;
                    else
                        ContSacRe++;

                    fechasSac[iSac] = ContSacAp;
                    fechasSacRe[iSac] = ContSacRe;
                    fechasSacT[iSac] = ContSacRe + ContSacAp;
                    ContSacRT = ContSacRT + ContSacRe;
                    ContSacAT = ContSacAT + ContSacAp;
                    ContSacAp = 0;
                    ContSacRe = 0;
                    iSac++;
                }
                fechasSac[5] = ContSacAT;
                fechasSacRe[5] = ContSacRT;
                fechasSacT[5] = ContSacAT + ContSacRT;

                var SacAp = ["SacAp", "SacAp1", "SacAp2", "SacAp3", "SacAp4", "SacAp5"];
                var SacRe = ["SacRe", "SacRe1", "SacRe2", "SacRe3", "SacRe4", "SacRe5"];
                var SacT = ["SacT", "SacT1", "SacT2", "SacT3", "SacT4", "SacT5"];

                for (var i = 0; i < SacAp.length; i++) {
                    document.getElementById(SacAp[i]).innerHTML = fechasSac[i];
                    document.getElementById(SacRe[i]).innerHTML = fechasSacRe[i];
                    document.getElementById(SacT[i]).innerHTML = fechasSacT[i];
                }

                //Armado1

                var ContAr1Ap = 0;
                var ContAr1Re = 0;
                var ContAr1AT = 0;
                var ContAr1RT = 0;
                var fechasAr1 = [0, 0, 0, 0, 0];
                var fechasAr1Re = [0, 0, 0, 0, 0];
                var fechasAr1T = [0, 0, 0, 0, 0];
                var iAr1 = 0;

                for (var key in responseJSON.arm1) {
                    var obj = responseJSON.arm1[key];
                    if (obj.ins1 == "Aceptado")
                        ContAr1Ap++;
                    else
                        ContAr1Re++;
                    if (obj.ins2 == "Aceptado")
                        ContAr1Ap++;
                    else
                        ContAr1Re++;
                    if (obj.ins3 == "Aceptado")
                        ContAr1Ap++;
                    else
                        ContAr1Re++;

                    fechasAr1[iAr1] = ContAr1Ap;
                    fechasAr1Re[iAr1] = ContAr1Re;
                    fechasAr1T[iAr1] = ContAr1Re + ContAr1Ap;
                    ContAr1RT = ContAr1RT + ContAr1Re;
                    ContAr1AT = ContAr1AT + ContAr1Ap;
                    ContAr1Ap = 0;
                    ContAr1Re = 0;
                    iAr1++;
                }
                fechasAr1[5] = ContAr1AT;
                fechasAr1Re[5] = ContAr1RT;
                fechasAr1T[5] = ContAr1AT + ContAr1RT;

                var Ar1Ap = ["Ar1Ap", "Ar1Ap1", "Ar1Ap2", "Ar1Ap3", "Ar1Ap4", "Ar1Ap5"];
                var Ar1Re = ["Ar1Re", "Ar1Re1", "Ar1Re2", "Ar1Re3", "Ar1Re4", "Ar1Re5"];
                var Ar1T = ["Ar1T", "Ar1T1", "Ar1T2", "Ar1T3", "Ar1T4", "Ar1T5"];

                for (var i = 0; i < Ar1Ap.length; i++) {
                    document.getElementById(Ar1Ap[i]).innerHTML = fechasAr1[i];
                    document.getElementById(Ar1Re[i]).innerHTML = fechasAr1Re[i];
                    document.getElementById(Ar1T[i]).innerHTML = fechasAr1T[i];
                }

                //Armado2

                var ContAr2Ap = 0;
                var ContAr2Re = 0;
                var ContAr2AT = 0;
                var ContAr2RT = 0;
                var fechasAr2 = [0, 0, 0, 0, 0];
                var fechasAr2Re = [0, 0, 0, 0, 0];
                var fechasAr2T = [0, 0, 0, 0, 0];
                var iAr2 = 0;

                for (var key in responseJSON.arm2) {
                    var obj = responseJSON.arm2[key];
                    if (obj.ins1 == "Aceptado")
                        ContAr2Ap++;
                    else
                        ContAr2Re++;
                    if (obj.ins2 == "Aceptado")
                        ContAr2Ap++;
                    else
                        ContAr2Re++;
                    if (obj.ins3 == "Aceptado")
                        ContAr2Ap++;
                    else
                        ContAr2Re++;

                    fechasAr2[iAr2] = ContAr2Ap;
                    fechasAr2Re[iAr2] = ContAr2Re;
                    fechasAr2T[iAr2] = ContAr2Re + ContAr2Ap;
                    ContAr2RT = ContAr2RT + ContAr2Re;
                    ContAr2AT = ContAr2AT + ContAr2Ap;
                    ContAr2Ap = 0;
                    ContAr2Re = 0;
                    iAr2++;
                }
                fechasAr2[5] = ContAr2AT;
                fechasAr2Re[5] = ContAr2RT;
                fechasAr2T[5] = ContAr2AT + ContAr2RT;

                var Ar2Ap = ["Ar2Ap", "Ar2Ap1", "Ar2Ap2", "Ar2Ap3", "Ar2Ap4", "Ar2Ap5"];
                var Ar2Re = ["Ar2Re", "Ar2Re1", "Ar2Re2", "Ar2Re3", "Ar2Re4", "Ar2Re5"];
                var Ar2T = ["Ar2T", "Ar2T1", "Ar2T2", "Ar2T3", "Ar2T4", "Ar2T5"];

                for (var i = 0; i < Ar2Ap.length; i++) {
                    document.getElementById(Ar2Ap[i]).innerHTML = fechasAr2[i];
                    document.getElementById(Ar2Re[i]).innerHTML = fechasAr2Re[i];
                    document.getElementById(Ar2T[i]).innerHTML = fechasAr2T[i];
                }

                //Armado3

                var ContAr3Ap = 0;
                var ContAr3Re = 0;
                var ContAr3AT = 0;
                var ContAr3RT = 0;
                var fechasAr3 = [0, 0, 0, 0, 0];
                var fechasAr3Re = [0, 0, 0, 0, 0];
                var fechasAr3T = [0, 0, 0, 0, 0];
                var iAr3 = 0;

                for (var key in responseJSON.arm3) {
                    var obj = responseJSON.arm3[key];
                    if (obj.ins1 == "Aceptado")
                        ContAr3Ap++;
                    else
                        ContAr3Re++;
                    if (obj.ins2 == "Aceptado")
                        ContAr3Ap++;
                    else
                        ContAr3Re++;
                    if (obj.ins3 == "Aceptado")
                        ContAr3Ap++;
                    else
                        ContAr3Re++;

                    fechasAr3[iAr3] = ContAr3Ap;
                    fechasAr3Re[iAr3] = ContAr3Re;
                    fechasAr3T[iAr3] = ContAr3Re + ContAr3Ap;
                    ContAr3RT = ContAr3RT + ContAr3Re;
                    ContAr3AT = ContAr3AT + ContAr3Ap;
                    ContAr3Ap = 0;
                    ContAr3Re = 0;
                    iAr3++;
                }
                fechasAr3[5] = ContAr3AT;
                fechasAr3Re[5] = ContAr3RT;
                fechasAr3T[5] = ContAr3AT + ContAr3RT;

                var Ar3Ap = ["Ar3Ap", "Ar3Ap1", "Ar3Ap2", "Ar3Ap3", "Ar3Ap4", "Ar3Ap5"];
                var Ar3Re = ["Ar3Re", "Ar3Re1", "Ar3Re2", "Ar3Re3", "Ar3Re4", "Ar3Re5"];
                var Ar3T = ["Ar3T", "Ar3T1", "Ar3T2", "Ar3T3", "Ar3T4", "Ar3T5"];

                for (var i = 0; i < Ar3Ap.length; i++) {
                    document.getElementById(Ar3Ap[i]).innerHTML = fechasAr3[i];
                    document.getElementById(Ar3Re[i]).innerHTML = fechasAr3Re[i];
                    document.getElementById(Ar3T[i]).innerHTML = fechasAr3T[i];
                }

                //Acabados

                var ContAcaAp = 0;
                var ContAcaRe = 0;
                var ContAcaAT = 0;
                var ContAcaRT = 0;
                var fechasAca = [0, 0, 0, 0, 0];
                var fechasAcaRe = [0, 0, 0, 0, 0];
                var fechasAcaT = [0, 0, 0, 0, 0];
                var iAca = 0;

                for (var key in responseJSON.acab) {
                    var obj = responseJSON.acab[key];
                    if (obj.ins1 == "Aceptado")
                        ContAcaAp++;
                    else
                        ContAcaRe++;
                    if (obj.ins2 == "Aceptado")
                        ContAcaAp++;
                    else
                        ContAcaRe++;
                    if (obj.ins3 == "Aceptado")
                        ContAcaAp++;
                    else
                        ContAcaRe++;

                    fechasAca[iAca] = ContAcaAp;
                    fechasAcaRe[iAca] = ContAcaRe;
                    fechasAcaT[iAca] = ContAcaRe + ContAcaAp;
                    ContAcaRT = ContAcaRT + ContAcaRe;
                    ContAcaAT = ContAcaAT + ContAcaAp;
                    ContAcaAp = 0;
                    ContAcaRe = 0;
                    iAca++;
                }
                fechasAca[5] = ContAcaAT;
                fechasAcaRe[5] = ContAcaRT;
                fechasAcaT[5] = ContAcaAT + ContAcaRT;

                var AcaAp = ["AcaAp", "AcaAp1", "AcaAp2", "AcaAp3", "AcaAp4", "AcaAp5"];
                var AcaRe = ["AcaRe", "AcaRe1", "AcaRe2", "AcaRe3", "AcaRe4", "AcaRe5"];
                var AcaT = ["AcaT", "AcaT1", "AcaT2", "AcaT3", "AcaT4", "AcaT5"];

                for (var i = 0; i < AcaAp.length; i++) {
                    document.getElementById(AcaAp[i]).innerHTML = fechasAca[i];
                    document.getElementById(AcaRe[i]).innerHTML = fechasAcaRe[i];
                    document.getElementById(AcaT[i]).innerHTML = fechasAcaT[i];
                }




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