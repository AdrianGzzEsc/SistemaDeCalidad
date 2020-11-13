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
            //Inspeccion Final
            var ContInsFAp = 0;
            var ContInsFRe = 0;
            var ContInsFAT = 0;
            var ContInsFRT = 0;
            var fechasInsF = [0, 0, 0, 0, 0];
            var fechasInsFRe = [0, 0, 0, 0, 0];
            var fechasInsFT = [0, 0, 0, 0, 0];
            var iInsF = 0;
            var previousObj;
            var ArrayInsFAp = {};
            var ArrayInsFRe = {};

            for (var key in responseJSON.inspF) {
                var obj = responseJSON.inspF[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayInsFAp)) {
                    ArrayInsFAp[keyNew] = 0;
                    ArrayInsFRe[keyNew] = 0;
                }
                if (obj.estatus == "Aceptado")
                    ContInsFAp++;
                else
                    ContInsFRe++;


                fechasInsF[iInsF] = ContInsFAp;
                fechasInsFRe[iInsF] = ContInsFRe;
                fechasInsFT[iInsF] = ContInsFRe + ContInsFAp;
                ContInsFRT += ContInsFRe;
                ContInsFAT += ContInsFAp;
                previousObj = obj;
                ArrayInsFAp[keyNew] += ContInsFAp;
                ArrayInsFRe[keyNew] += ContInsFRe;
                ContInsFAp = 0;
                ContInsFRe = 0;
                iInsF++;

            }

            fechasInsF[5] = ContInsFAT;
            fechasInsFRe[5] = ContInsFRT;
            fechasInsFT[5] = ContInsFAT + ContInsFRT;

            var InsFAp = ["InsFAp", "InsFAp1", "InsFAp2", "InsFAp3", "InsFAp4", "InsFAp5"];
            var InsFRe = ["InsFRe", "InsFRe1", "InsFRe2", "InsFRe3", "InsFRe4", "InsFRe5"];
            var InsFT = ["InsFT", "InsFT1", "InsFT2", "InsFT3", "InsFT4", "InsFT5"];

            for (var i = 0; i < InsFAp.length; i++) {
                document.getElementById(InsFAp[i]).innerHTML = 0;
                document.getElementById(InsFRe[i]).innerHTML = 0;
                document.getElementById(InsFT[i]).innerHTML = 0;
            }

            document.getElementById(InsFAp[5]).innerHTML = fechasInsF[5];
            document.getElementById(InsFRe[5]).innerHTML = fechasInsFRe[5];
            document.getElementById(InsFT[5]).innerHTML = fechasInsFT[5];

            var x = 0;
            for (var key in ArrayInsFAp) {
                var obj = ArrayInsFAp[key];
                var obj2 = ArrayInsFRe[key];
                document.getElementById(InsFAp[x]).innerHTML = obj;
                document.getElementById(InsFRe[x]).innerHTML = obj2;
                document.getElementById(InsFT[x]).innerHTML = obj + obj2;
                x++;
            }
            //Escuadradora
            var ContEscAp = 0;
            var ContEscRe = 0;
            var ContEscAT = 0;
            var ContEscRT = 0;
            var fechasEsc = [0, 0, 0, 0, 0];
            var fechasEscRe = [0, 0, 0, 0, 0];
            var fechasEscT = [0, 0, 0, 0, 0];
            var iEsc = 0;
            var previousObj;
            var ArrayEscAp = {};
            var ArrayEscRe = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayEscAp)) {
                    ArrayEscAp[keyNew] = 0;
                    ArrayEscRe[keyNew] = 0;
                }


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
                ContEscRT += ContEscRe;
                ContEscAT += ContEscAp;
                previousObj = obj;
                ArrayEscAp[keyNew] += ContEscAp;
                ArrayEscRe[keyNew] += ContEscRe;
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
                document.getElementById(EscAp[i]).innerHTML = 0;
                document.getElementById(EscRe[i]).innerHTML = 0;
                document.getElementById(EscT[i]).innerHTML = 0;
            }

            document.getElementById(EscAp[5]).innerHTML = fechasEsc[5];
            document.getElementById(EscRe[5]).innerHTML = fechasEscRe[5];
            document.getElementById(EscT[5]).innerHTML = fechasEscT[5];

            var x = 0;
            for (var key in ArrayEscAp) {
                var obj = ArrayEscAp[key];
                var obj2 = ArrayEscRe[key];
                document.getElementById(EscAp[x]).innerHTML = obj;
                document.getElementById(EscRe[x]).innerHTML = obj2;
                document.getElementById(EscT[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayEncAp = {};
            var ArrayEncRe = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayEncAp)) {
                    ArrayEncAp[keyNew] = 0;
                    ArrayEncRe[keyNew] = 0;
                }


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
                ContEncRT += ContEncRe;
                ContEncAT += ContEncAp;
                previousObj = obj;
                ArrayEncAp[keyNew] += ContEncAp;
                ArrayEncRe[keyNew] += ContEncRe;
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
                document.getElementById(EncAp[i]).innerHTML = 0;
                document.getElementById(EncRe[i]).innerHTML = 0;
                document.getElementById(EncT[i]).innerHTML = 0;
            }

            document.getElementById(EncAp[5]).innerHTML = fechasEnc[5];
            document.getElementById(EncRe[5]).innerHTML = fechasEncRe[5];
            document.getElementById(EncT[5]).innerHTML = fechasEncT[5];

            var x = 0;
            for (var key in ArrayEncAp) {
                var obj = ArrayEncAp[key];
                var obj2 = ArrayEncRe[key];
                document.getElementById(EncAp[x]).innerHTML = obj;
                document.getElementById(EncRe[x]).innerHTML = obj2;
                document.getElementById(EncT[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayTalAp = {};
            var ArrayTalRe = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayTalAp)) {
                    ArrayTalAp[keyNew] = 0;
                    ArrayTalRe[keyNew] = 0;
                }


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
                ContTalRT += ContTalRe;
                ContTalAT += ContTalAp;
                previousObj = obj;
                ArrayTalAp[keyNew] += ContTalAp;
                ArrayTalRe[keyNew] += ContTalRe;
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
                document.getElementById(TalAp[i]).innerHTML = 0;
                document.getElementById(TalRe[i]).innerHTML = 0;
                document.getElementById(TalT[i]).innerHTML = 0;
            }

            document.getElementById(TalAp[5]).innerHTML = fechasTal[5];
            document.getElementById(TalRe[5]).innerHTML = fechasTalRe[5];
            document.getElementById(TalT[5]).innerHTML = fechasTalT[5];

            var x = 0;
            for (var key in ArrayTalAp) {
                var obj = ArrayTalAp[key];
                var obj2 = ArrayTalRe[key];
                document.getElementById(TalAp[x]).innerHTML = obj;
                document.getElementById(TalRe[x]).innerHTML = obj2;
                document.getElementById(TalT[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArraySacAp = {};
            var ArraySacRe = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArraySacAp)) {
                    ArraySacAp[keyNew] = 0;
                    ArraySacRe[keyNew] = 0;
                }


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
                ContSacRT += ContSacRe;
                ContSacAT += ContSacAp;
                previousObj = obj;
                ArraySacAp[keyNew] += ContSacAp;
                ArraySacRe[keyNew] += ContSacRe;
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
                document.getElementById(SacAp[i]).innerHTML = 0;
                document.getElementById(SacRe[i]).innerHTML = 0;
                document.getElementById(SacT[i]).innerHTML = 0;
            }

            document.getElementById(SacAp[5]).innerHTML = fechasSac[5];
            document.getElementById(SacRe[5]).innerHTML = fechasSacRe[5];
            document.getElementById(SacT[5]).innerHTML = fechasSacT[5];

            var x = 0;
            for (var key in ArraySacAp) {
                var obj = ArraySacAp[key];
                var obj2 = ArraySacRe[key];
                document.getElementById(SacAp[x]).innerHTML = obj;
                document.getElementById(SacRe[x]).innerHTML = obj2;
                document.getElementById(SacT[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayAr1Ap = {};
            var ArrayAr1Re = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayAr1Ap)) {
                    ArrayAr1Ap[keyNew] = 0;
                    ArrayAr1Re[keyNew] = 0;
                }


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
                ContAr1RT += ContAr1Re;
                ContAr1AT += ContAr1Ap;
                previousObj = obj;
                ArrayAr1Ap[keyNew] += ContAr1Ap;
                ArrayAr1Re[keyNew] += ContAr1Re;
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
                document.getElementById(Ar1Ap[i]).innerHTML = 0;
                document.getElementById(Ar1Re[i]).innerHTML = 0;
                document.getElementById(Ar1T[i]).innerHTML = 0;
            }

            document.getElementById(Ar1Ap[5]).innerHTML = fechasAr1[5];
            document.getElementById(Ar1Re[5]).innerHTML = fechasAr1Re[5];
            document.getElementById(Ar1T[5]).innerHTML = fechasAr1T[5];

            var x = 0;
            for (var key in ArrayAr1Ap) {
                var obj = ArrayAr1Ap[key];
                var obj2 = ArrayAr1Re[key];
                document.getElementById(Ar1Ap[x]).innerHTML = obj;
                document.getElementById(Ar1Re[x]).innerHTML = obj2;
                document.getElementById(Ar1T[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayAr2Ap = {};
            var ArrayAr2Re = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayAr2Ap)) {
                    ArrayAr2Ap[keyNew] = 0;
                    ArrayAr2Re[keyNew] = 0;
                }


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
                ContAr2RT += ContAr2Re;
                ContAr2AT += ContAr2Ap;
                previousObj = obj;
                ArrayAr2Ap[keyNew] += ContAr2Ap;
                ArrayAr2Re[keyNew] += ContAr2Re;
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
                document.getElementById(Ar2Ap[i]).innerHTML = 0;
                document.getElementById(Ar2Re[i]).innerHTML = 0;
                document.getElementById(Ar2T[i]).innerHTML = 0;
            }

            document.getElementById(Ar2Ap[5]).innerHTML = fechasAr2[5];
            document.getElementById(Ar2Re[5]).innerHTML = fechasAr2Re[5];
            document.getElementById(Ar2T[5]).innerHTML = fechasAr2T[5];

            var x = 0;
            for (var key in ArrayAr2Ap) {
                var obj = ArrayAr2Ap[key];
                var obj2 = ArrayAr2Re[key];
                document.getElementById(Ar2Ap[x]).innerHTML = obj;
                document.getElementById(Ar2Re[x]).innerHTML = obj2;
                document.getElementById(Ar2T[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayAr3Ap = {};
            var ArrayAr3Re = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayAr3Ap)) {
                    ArrayAr3Ap[keyNew] = 0;
                    ArrayAr3Re[keyNew] = 0;
                }


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
                ContAr3RT += ContAr3Re;
                ContAr3AT += ContAr3Ap;
                previousObj = obj;
                ArrayAr3Ap[keyNew] += ContAr3Ap;
                ArrayAr3Re[keyNew] += ContAr3Re;
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
                document.getElementById(Ar3Ap[i]).innerHTML = 0;
                document.getElementById(Ar3Re[i]).innerHTML = 0;
                document.getElementById(Ar3T[i]).innerHTML = 0;
            }

            document.getElementById(Ar3Ap[5]).innerHTML = fechasAr3[5];
            document.getElementById(Ar3Re[5]).innerHTML = fechasAr3Re[5];
            document.getElementById(Ar3T[5]).innerHTML = fechasAr3T[5];

            var x = 0;
            for (var key in ArrayAr3Ap) {
                var obj = ArrayAr3Ap[key];
                var obj2 = ArrayAr3Re[key];
                document.getElementById(Ar3Ap[x]).innerHTML = obj;
                document.getElementById(Ar3Re[x]).innerHTML = obj2;
                document.getElementById(Ar3T[x]).innerHTML = obj + obj2;
                x++;
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
            var previousObj;
            var ArrayAcaAp = {};
            var ArrayAcaRe = {};

            for (var key in responseJSON.escuad) {
                var obj = responseJSON.escuad[key];
                var keyNew = obj.fecha;
                if (!(keyNew in ArrayAcaAp)) {
                    ArrayAcaAp[keyNew] = 0;
                    ArrayAcaRe[keyNew] = 0;
                }


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
                ContAcaRT += ContAcaRe;
                ContAcaAT += ContAcaAp;
                previousObj = obj;
                ArrayAcaAp[keyNew] += ContAcaAp;
                ArrayAcaRe[keyNew] += ContAcaRe;
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
                document.getElementById(AcaAp[i]).innerHTML = 0;
                document.getElementById(AcaRe[i]).innerHTML = 0;
                document.getElementById(AcaT[i]).innerHTML = 0;
            }

            document.getElementById(AcaAp[5]).innerHTML = fechasAca[5];
            document.getElementById(AcaRe[5]).innerHTML = fechasAcaRe[5];
            document.getElementById(AcaT[5]).innerHTML = fechasAcaT[5];

            var x = 0;
            for (var key in ArrayAcaAp) {
                var obj = ArrayAcaAp[key];
                var obj2 = ArrayAcaRe[key];
                document.getElementById(AcaAp[x]).innerHTML = obj;
                document.getElementById(AcaRe[x]).innerHTML = obj2;
                document.getElementById(AcaT[x]).innerHTML = obj + obj2;
                x++;
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
                //Inspeccion Final
                var ContInsFAp = 0;
                var ContInsFRe = 0;
                var ContInsFAT = 0;
                var ContInsFRT = 0;
                var fechasInsF = [0, 0, 0, 0, 0];
                var fechasInsFRe = [0, 0, 0, 0, 0];
                var fechasInsFT = [0, 0, 0, 0, 0];
                var iInsF = 0;
                var previousObj;
                var ArrayInsFAp = {};
                var ArrayInsFRe = {};

                for (var key in responseJSON.inspF) {
                    var obj = responseJSON.inspF[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayInsFAp)) {
                        ArrayInsFAp[keyNew] = 0;
                        ArrayInsFRe[keyNew] = 0;
                    }
                    if (obj.estatus == "Aceptado")
                        ContInsFAp++;
                    else
                        ContInsFRe++;


                    fechasInsF[iInsF] = ContInsFAp;
                    fechasInsFRe[iInsF] = ContInsFRe;
                    fechasInsFT[iInsF] = ContInsFRe + ContInsFAp;
                    ContInsFRT += ContInsFRe;
                    ContInsFAT += ContInsFAp;
                    previousObj = obj;
                    ArrayInsFAp[keyNew] += ContInsFAp;
                    ArrayInsFRe[keyNew] += ContInsFRe;
                    ContInsFAp = 0;
                    ContInsFRe = 0;
                    iInsF++;

                }

                fechasInsF[5] = ContInsFAT;
                fechasInsFRe[5] = ContInsFRT;
                fechasInsFT[5] = ContInsFAT + ContInsFRT;

                var InsFAp = ["InsFAp", "InsFAp1", "InsFAp2", "InsFAp3", "InsFAp4", "InsFAp5"];
                var InsFRe = ["InsFRe", "InsFRe1", "InsFRe2", "InsFRe3", "InsFRe4", "InsFRe5"];
                var InsFT = ["InsFT", "InsFT1", "InsFT2", "InsFT3", "InsFT4", "InsFT5"];

                for (var i = 0; i < InsFAp.length; i++) {
                    document.getElementById(InsFAp[i]).innerHTML = 0;
                    document.getElementById(InsFRe[i]).innerHTML = 0;
                    document.getElementById(InsFT[i]).innerHTML = 0;
                }

                document.getElementById(InsFAp[5]).innerHTML = fechasInsF[5];
                document.getElementById(InsFRe[5]).innerHTML = fechasInsFRe[5];
                document.getElementById(InsFT[5]).innerHTML = fechasInsFT[5];

                var x = 0;
                for (var key in ArrayInsFAp) {
                    var obj = ArrayInsFAp[key];
                    var obj2 = ArrayInsFRe[key];
                    document.getElementById(InsFAp[x]).innerHTML = obj;
                    document.getElementById(InsFRe[x]).innerHTML = obj2;
                    document.getElementById(InsFT[x]).innerHTML = obj + obj2;
                    x++;
                }


                //Escuadradora
                var ContEscAp = 0;
                var ContEscRe = 0;
                var ContEscAT = 0;
                var ContEscRT = 0;
                var fechasEsc = [0, 0, 0, 0, 0];
                var fechasEscRe = [0, 0, 0, 0, 0];
                var fechasEscT = [0, 0, 0, 0, 0];
                var iEsc = 0;
                var previousObj;
                var ArrayEscAp = {};
                var ArrayEscRe = {};

                for (var key in responseJSON.escuad) {
                    var obj = responseJSON.escuad[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayEscAp)) {
                        ArrayEscAp[keyNew] = 0;
                        ArrayEscRe[keyNew] = 0;
                    }


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
                    ContEscRT += ContEscRe;
                    ContEscAT += ContEscAp;
                    previousObj = obj;
                    ArrayEscAp[keyNew] += ContEscAp;
                    ArrayEscRe[keyNew] += ContEscRe;
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
                    document.getElementById(EscAp[i]).innerHTML = 0;
                    document.getElementById(EscRe[i]).innerHTML = 0;
                    document.getElementById(EscT[i]).innerHTML = 0;
                }

                document.getElementById(EscAp[5]).innerHTML = fechasEsc[5];
                document.getElementById(EscRe[5]).innerHTML = fechasEscRe[5];
                document.getElementById(EscT[5]).innerHTML = fechasEscT[5];

                var x = 0;
                for (var key in ArrayEscAp) {
                    var obj = ArrayEscAp[key];
                    var obj2 = ArrayEscRe[key];
                    document.getElementById(EscAp[x]).innerHTML = obj;
                    document.getElementById(EscRe[x]).innerHTML = obj2;
                    document.getElementById(EscT[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayEncAp = {};
                var ArrayEncRe = {};

                for (var key in responseJSON.enchap) {
                    var obj = responseJSON.enchap[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayEncAp)) {
                        ArrayEncAp[keyNew] = 0;
                        ArrayEncRe[keyNew] = 0;
                    }


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
                    ContEncRT += ContEncRe;
                    ContEncAT += ContEncAp;
                    previousObj = obj;
                    ArrayEncAp[keyNew] += ContEncAp;
                    ArrayEncRe[keyNew] += ContEncRe;
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
                    document.getElementById(EncAp[i]).innerHTML = 0;
                    document.getElementById(EncRe[i]).innerHTML = 0;
                    document.getElementById(EncT[i]).innerHTML = 0;
                }

                document.getElementById(EncAp[5]).innerHTML = fechasEnc[5];
                document.getElementById(EncRe[5]).innerHTML = fechasEncRe[5];
                document.getElementById(EncT[5]).innerHTML = fechasEncT[5];

                var x = 0;
                for (var key in ArrayEncAp) {
                    var obj = ArrayEncAp[key];
                    var obj2 = ArrayEncRe[key];
                    document.getElementById(EncAp[x]).innerHTML = obj;
                    document.getElementById(EncRe[x]).innerHTML = obj2;
                    document.getElementById(EncT[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayTalAp = {};
                var ArrayTalRe = {};

                for (var key in responseJSON.talad) {
                    var obj = responseJSON.talad[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayTalAp)) {
                        ArrayTalAp[keyNew] = 0;
                        ArrayTalRe[keyNew] = 0;
                    }


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
                    ContTalRT += ContTalRe;
                    ContTalAT += ContTalAp;
                    previousObj = obj;
                    ArrayTalAp[keyNew] += ContTalAp;
                    ArrayTalRe[keyNew] += ContTalRe;
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
                    document.getElementById(TalAp[i]).innerHTML = 0;
                    document.getElementById(TalRe[i]).innerHTML = 0;
                    document.getElementById(TalT[i]).innerHTML = 0;
                }

                document.getElementById(TalAp[5]).innerHTML = fechasTal[5];
                document.getElementById(TalRe[5]).innerHTML = fechasTalRe[5];
                document.getElementById(TalT[5]).innerHTML = fechasTalT[5];

                var x = 0;
                for (var key in ArrayTalAp) {
                    var obj = ArrayTalAp[key];
                    var obj2 = ArrayTalRe[key];
                    document.getElementById(TalAp[x]).innerHTML = obj;
                    document.getElementById(TalRe[x]).innerHTML = obj2;
                    document.getElementById(TalT[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArraySacAp = {};
                var ArraySacRe = {};

                for (var key in responseJSON.sacab) {
                    var obj = responseJSON.sacab[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArraySacAp)) {
                        ArraySacAp[keyNew] = 0;
                        ArraySacRe[keyNew] = 0;
                    }


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
                    ContSacRT += ContSacRe;
                    ContSacAT += ContSacAp;
                    previousObj = obj;
                    ArraySacAp[keyNew] += ContSacAp;
                    ArraySacRe[keyNew] += ContSacRe;
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
                    document.getElementById(SacAp[i]).innerHTML = 0;
                    document.getElementById(SacRe[i]).innerHTML = 0;
                    document.getElementById(SacT[i]).innerHTML = 0;
                }

                document.getElementById(SacAp[5]).innerHTML = fechasSac[5];
                document.getElementById(SacRe[5]).innerHTML = fechasSacRe[5];
                document.getElementById(SacT[5]).innerHTML = fechasSacT[5];

                var x = 0;
                for (var key in ArraySacAp) {
                    var obj = ArraySacAp[key];
                    var obj2 = ArraySacRe[key];
                    document.getElementById(SacAp[x]).innerHTML = obj;
                    document.getElementById(SacRe[x]).innerHTML = obj2;
                    document.getElementById(SacT[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayAr1Ap = {};
                var ArrayAr1Re = {};

                for (var key in responseJSON.arm1) {
                    var obj = responseJSON.arm1[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr1Ap)) {
                        ArrayAr1Ap[keyNew] = 0;
                        ArrayAr1Re[keyNew] = 0;
                    }


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
                    ContAr1RT += ContAr1Re;
                    ContAr1AT += ContAr1Ap;
                    previousObj = obj;
                    ArrayAr1Ap[keyNew] += ContAr1Ap;
                    ArrayAr1Re[keyNew] += ContAr1Re;
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
                    document.getElementById(Ar1Ap[i]).innerHTML = 0;
                    document.getElementById(Ar1Re[i]).innerHTML = 0;
                    document.getElementById(Ar1T[i]).innerHTML = 0;
                }

                document.getElementById(Ar1Ap[5]).innerHTML = fechasAr1[5];
                document.getElementById(Ar1Re[5]).innerHTML = fechasAr1Re[5];
                document.getElementById(Ar1T[5]).innerHTML = fechasAr1T[5];

                var x = 0;
                for (var key in ArrayAr1Ap) {
                    var obj = ArrayAr1Ap[key];
                    var obj2 = ArrayAr1Re[key];
                    document.getElementById(Ar1Ap[x]).innerHTML = obj;
                    document.getElementById(Ar1Re[x]).innerHTML = obj2;
                    document.getElementById(Ar1T[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayAr2Ap = {};
                var ArrayAr2Re = {};

                for (var key in responseJSON.arm2) {
                    var obj = responseJSON.arm2[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr2Ap)) {
                        ArrayAr2Ap[keyNew] = 0;
                        ArrayAr2Re[keyNew] = 0;
                    }


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
                    ContAr2RT += ContAr2Re;
                    ContAr2AT += ContAr2Ap;
                    previousObj = obj;
                    ArrayAr2Ap[keyNew] += ContAr2Ap;
                    ArrayAr2Re[keyNew] += ContAr2Re;
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
                    document.getElementById(Ar2Ap[i]).innerHTML = 0;
                    document.getElementById(Ar2Re[i]).innerHTML = 0;
                    document.getElementById(Ar2T[i]).innerHTML = 0;
                }

                document.getElementById(Ar2Ap[5]).innerHTML = fechasAr2[5];
                document.getElementById(Ar2Re[5]).innerHTML = fechasAr2Re[5];
                document.getElementById(Ar2T[5]).innerHTML = fechasAr2T[5];

                var x = 0;
                for (var key in ArrayAr2Ap) {
                    var obj = ArrayAr2Ap[key];
                    var obj2 = ArrayAr2Re[key];
                    document.getElementById(Ar2Ap[x]).innerHTML = obj;
                    document.getElementById(Ar2Re[x]).innerHTML = obj2;
                    document.getElementById(Ar2T[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayAr3Ap = {};
                var ArrayAr3Re = {};

                for (var key in responseJSON.arm3) {
                    var obj = responseJSON.arm3[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr3Ap)) {
                        ArrayAr3Ap[keyNew] = 0;
                        ArrayAr3Re[keyNew] = 0;
                    }


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
                    ContAr3RT += ContAr3Re;
                    ContAr3AT += ContAr3Ap;
                    previousObj = obj;
                    ArrayAr3Ap[keyNew] += ContAr3Ap;
                    ArrayAr3Re[keyNew] += ContAr3Re;
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
                    document.getElementById(Ar3Ap[i]).innerHTML = 0;
                    document.getElementById(Ar3Re[i]).innerHTML = 0;
                    document.getElementById(Ar3T[i]).innerHTML = 0;
                }

                document.getElementById(Ar3Ap[5]).innerHTML = fechasAr3[5];
                document.getElementById(Ar3Re[5]).innerHTML = fechasAr3Re[5];
                document.getElementById(Ar3T[5]).innerHTML = fechasAr3T[5];

                var x = 0;
                for (var key in ArrayAr3Ap) {
                    var obj = ArrayAr3Ap[key];
                    var obj2 = ArrayAr3Re[key];
                    document.getElementById(Ar3Ap[x]).innerHTML = obj;
                    document.getElementById(Ar3Re[x]).innerHTML = obj2;
                    document.getElementById(Ar3T[x]).innerHTML = obj + obj2;
                    x++;
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
                var previousObj;
                var ArrayAcaAp = {};
                var ArrayAcaRe = {};

                for (var key in responseJSON.acab) {
                    var obj = responseJSON.acab[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAcaAp)) {
                        ArrayAcaAp[keyNew] = 0;
                        ArrayAcaRe[keyNew] = 0;
                    }


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
                    ContAcaRT += ContAcaRe;
                    ContAcaAT += ContAcaAp;
                    previousObj = obj;
                    ArrayAcaAp[keyNew] += ContAcaAp;
                    ArrayAcaRe[keyNew] += ContAcaRe;
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
                    document.getElementById(AcaAp[i]).innerHTML = 0;
                    document.getElementById(AcaRe[i]).innerHTML = 0;
                    document.getElementById(AcaT[i]).innerHTML = 0;
                }

                document.getElementById(AcaAp[5]).innerHTML = fechasAca[5];
                document.getElementById(AcaRe[5]).innerHTML = fechasAcaRe[5];
                document.getElementById(AcaT[5]).innerHTML = fechasAcaT[5];

                var x = 0;
                for (var key in ArrayAcaAp) {
                    var obj = ArrayAcaAp[key];
                    var obj2 = ArrayAcaRe[key];
                    document.getElementById(AcaAp[x]).innerHTML = obj;
                    document.getElementById(AcaRe[x]).innerHTML = obj2;
                    document.getElementById(AcaT[x]).innerHTML = obj + obj2;
                    x++;
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