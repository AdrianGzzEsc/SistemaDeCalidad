function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}

function count_duplicate(a) {
    let counts = {}

    for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
            counts[a[i]] += 1
        } else {
            counts[a[i]] = 1
        }
    }
    for (let prop in counts) {
        if (counts[prop] >= 2) {
            //console.log(prop + " counted: " + counts[prop] + " times.")
        }
    }
    //console.log(counts)
    return counts;
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

    var Arr_defEsc = new Array();
    var Arr_numEsc = new Array();
    var Arr_defEnc = new Array();
    var Arr_numEnc = new Array();
    var Arr_defSac = new Array();
    var Arr_numSac = new Array();
    var Arr_defTal = new Array();
    var Arr_numTal = new Array();
    var Arr_defAr1 = new Array();
    var Arr_numAr1 = new Array();
    var Arr_defAr2 = new Array();
    var Arr_numAr2 = new Array();
    var Arr_defAr3 = new Array();
    var Arr_numAr3 = new Array();
    var Arr_defAca = new Array();
    var Arr_numAca = new Array();
    //var EscCanvas = document.getElementId('tablaEsc').getContext('2d');
    //66EscCanvas.clearRect(0, 0, canvas.width, canvas.height);


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
                var ArrayEscAp = {};
                var ArrayEscRe = {};
                var ArrayEscDef = new Array();

                for (var key in responseJSON.escuad) {
                    var obj = responseJSON.escuad[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayEscAp)) {
                        ArrayEscAp[keyNew] = 0;
                        ArrayEscRe[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayEscDef.push(obj.def1);
                    if (obj.def2.length > 0)
                        ArrayEscDef.push(obj.def2);
                    if (obj.def3.length > 0)
                        ArrayEscDef.push(obj.def3);

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

                var mergedEsc = [].concat.apply([], ArrayEscDef);
                mergedEsc.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayEscT = count_duplicate(mergedEsc);
                for (var key in ArrayEscT) {
                    Arr_defEsc.push(key);
                    var temp = parseInt(ArrayEscT[key])
                    Arr_numEsc.push(temp);
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
                // chartEsc.render();
                //chartEsc.clear();
                //chartEsc = null;
                var chtEsc = document.getElementById('tablaEsc').getContext('2d');

                var chartEsc = new Chart(chtEsc, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defEsc),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numEsc
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defEsc = [];
                Arr_numEsc = [];



                //Enchapadora
                var ContEncAp = 0;
                var ContEncRe = 0;
                var ContEncAT = 0;
                var ContEncRT = 0;
                var fechasEnc = [0, 0, 0, 0, 0];
                var fechasEncRe = [0, 0, 0, 0, 0];
                var fechasEncT = [0, 0, 0, 0, 0];
                var iEnc = 0;
                var ArrayEncAp = {};
                var ArrayEncRe = {};
                var ArrayEncDef = new Array();

                for (var key in responseJSON.enchap) {
                    var obj = responseJSON.enchap[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayEncAp)) {
                        ArrayEncAp[keyNew] = 0;
                        ArrayEncRe[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayEncDef.push(obj.def1);
                    if (obj.def2.length > 0)
                        ArrayEncDef.push(obj.def2);
                    if (obj.def3.length > 0)
                        ArrayEncDef.push(obj.def3);

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

                var mergedEnc = [].concat.apply([], ArrayEncDef);

                mergedEnc.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayEncT = count_duplicate(mergedEnc);
                for (var key in ArrayEncT) {
                    Arr_defEnc.push(key);
                    var temp = parseInt(ArrayEncT[key])
                    Arr_numEnc.push(temp);
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
                // chartEnc.render();
                //chartEnc.clear();
                //chartEnc = null;
                var chtEnc = document.getElementById('tablaEnc').getContext('2d');

                var chartEnc = new Chart(chtEnc, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defEnc),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numEnc
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defEnc = [];
                Arr_numEnc = [];



                //Taladro
                var ContTalAp = 0;
                var ContTalRe = 0;
                var ContTalAT = 0;
                var ContTalRT = 0;
                var fechasTal = [0, 0, 0, 0, 0];
                var fechasTalRe = [0, 0, 0, 0, 0];
                var fechasTalT = [0, 0, 0, 0, 0];
                var iTal = 0;
                var ArrayTalAp = {};
                var ArrayTalRe = {};
                var ArrayTalDef = new Array();

                for (var key in responseJSON.talad) {
                    var obj = responseJSON.talad[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayTalAp)) {
                        ArrayTalAp[keyNew] = 0;
                        ArrayTalRe[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayTalDef.push(obj.def1);
                    if (obj.def2.length > 0)
                        ArrayTalDef.push(obj.def2);
                    if (obj.def3.length > 0)
                        ArrayTalDef.push(obj.def3);

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



                var mergedTal = [].concat.apply([], ArrayTalDef);
                mergedTal.sort(function(a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return a.length - b.length;
                });
                var ArrayTalT = count_duplicate(mergedTal);
                for (var key in ArrayTalT) {
                    Arr_defTal.push(key);
                    var temp = parseInt(ArrayTalT[key])
                    Arr_numTal.push(temp);
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
                // chartTal.render();
                //chartTal.clear();
                //chartTal = null;
                var chtTal = document.getElementById('tablaTal').getContext('2d');

                var chartTal = new Chart(chtTal, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defTal),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numTal
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defTal = [];
                Arr_numTal = [];


                //Sacabocados

                var ContSacAp = 0;
                var ContSacRe = 0;
                var ContSacAT = 0;
                var ContSacRT = 0;
                var fechasSac = [0, 0, 0, 0, 0];
                var fechasSacRe = [0, 0, 0, 0, 0];
                var fechasSacT = [0, 0, 0, 0, 0];
                var iSac = 0;
                var ArraySacAp = {};
                var ArraySacRe = {};
                var ArraySacDef = new Array();

                for (var key in responseJSON.sacab) {
                    var obj = responseJSON.sacab[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArraySacAp)) {
                        ArraySacAp[keyNew] = 0;
                        ArraySacRe[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArraySacDef.push(obj.def1);
                    if (obj.def2.length > 0)
                        ArraySacDef.push(obj.def2);
                    if (obj.def3.length > 0)
                        ArraySacDef.push(obj.def3);

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

                var mergedSac = [].concat.apply([], ArraySacDef);
                mergedSac.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArraySacT = count_duplicate(mergedSac);
                for (var key in ArraySacT) {
                    Arr_defSac.push(key);
                    var temp = parseInt(ArraySacT[key])
                    Arr_numSac.push(temp);
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
                // chartSac.render();
                //chartSac.clear();
                //chartSac = null;
                var chtSac = document.getElementById('tablaSac').getContext('2d');

                var chartSac = new Chart(chtSac, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defSac),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numSac
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defSac = [];
                Arr_numSac = [];


                //Armado1

                var ContAr1Ap = 0;
                var ContAr1Re = 0;
                var ContAr1AT = 0;
                var ContAr1RT = 0;
                var fechasAr1 = [0, 0, 0, 0, 0];
                var fechasAr1Re = [0, 0, 0, 0, 0];
                var fechasAr1T = [0, 0, 0, 0, 0];
                var iAr1 = 0;
                var ArrayAr1Ap = {};
                var ArrayAr1Re = {};
                var ArrayAr1Def = new Array();

                for (var key in responseJSON.arm1) {
                    var obj = responseJSON.arm1[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr1Ap)) {
                        ArrayAr1Ap[keyNew] = 0;
                        ArrayAr1Re[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayAr1Def.push(obj.def1);


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

                var mergedAr1 = [].concat.apply([], ArrayAr1Def);
                mergedAr1.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayAr1T = count_duplicate(mergedAr1);
                for (var key in ArrayAr1T) {
                    Arr_defAr1.push(key);
                    var temp = parseInt(ArrayAr1T[key])
                    Arr_numAr1.push(temp);
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
                // chartAr1.render();
                //chartAr1.clear();
                //chartAr1 = null;
                var chtAr1 = document.getElementById('tablaAr1').getContext('2d');

                var chartAr1 = new Chart(chtAr1, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defAr1),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numAr1
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defAr1 = [];
                Arr_numAr1 = [];


                //Armado2

                var ContAr2Ap = 0;
                var ContAr2Re = 0;
                var ContAr2AT = 0;
                var ContAr2RT = 0;
                var fechasAr2 = [0, 0, 0, 0, 0];
                var fechasAr2Re = [0, 0, 0, 0, 0];
                var fechasAr2T = [0, 0, 0, 0, 0];
                var iAr2 = 0;
                var ArrayAr2Ap = {};
                var ArrayAr2Re = {};
                var ArrayAr2Def = new Array();

                for (var key in responseJSON.arm2) {
                    var obj = responseJSON.arm2[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr2Ap)) {
                        ArrayAr2Ap[keyNew] = 0;
                        ArrayAr2Re[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayAr2Def.push(obj.def1);


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

                var mergedAr2 = [].concat.apply([], ArrayAr2Def);
                mergedAr2.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayAr2T = count_duplicate(mergedAr2);
                for (var key in ArrayAr2T) {
                    Arr_defAr2.push(key);
                    var temp = parseInt(ArrayAr2T[key])
                    Arr_numAr2.push(temp);
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
                // chartAr2.render();
                //chartAr2.clear();
                //chartAr2 = null;
                var chtAr2 = document.getElementById('tablaAr2').getContext('2d');

                var chartAr2 = new Chart(chtAr2, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defAr2),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numAr2
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defAr2 = [];
                Arr_numAr2 = [];

                //Armado3
                var ContAr3Ap = 0;
                var ContAr3Re = 0;
                var ContAr3AT = 0;
                var ContAr3RT = 0;
                var fechasAr3 = [0, 0, 0, 0, 0];
                var fechasAr3Re = [0, 0, 0, 0, 0];
                var fechasAr3T = [0, 0, 0, 0, 0];
                var iAr3 = 0;
                var ArrayAr3Ap = {};
                var ArrayAr3Re = {};
                var ArrayAr3Def = new Array();

                for (var key in responseJSON.arm3) {
                    var obj = responseJSON.arm3[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAr3Ap)) {
                        ArrayAr3Ap[keyNew] = 0;
                        ArrayAr3Re[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayAr3Def.push(obj.def1);


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

                var mergedAr3 = [].concat.apply([], ArrayAr3Def);
                mergedAr3.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayAr3T = count_duplicate(mergedAr3);
                for (var key in ArrayAr3T) {
                    Arr_defAr3.push(key);
                    var temp = parseInt(ArrayAr3T[key])
                    Arr_numAr3.push(temp);
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
                // chartAr3.render();
                //chartAr3.clear();
                //chartAr3 = null;
                var chtAr3 = document.getElementById('tablaAr3').getContext('2d');

                var chartAr3 = new Chart(chtAr3, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defAr3),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numAr3
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defAr3 = [];
                Arr_numAr3 = [];


                //Acabados

                var ContAcaAp = 0;
                var ContAcaRe = 0;
                var ContAcaAT = 0;
                var ContAcaRT = 0;
                var fechasAca = [0, 0, 0, 0, 0];
                var fechasAcaRe = [0, 0, 0, 0, 0];
                var fechasAcaT = [0, 0, 0, 0, 0];
                var iAca = 0;
                var ArrayAcaAp = {};
                var ArrayAcaRe = {};
                var ArrayAcaDef = new Array();

                for (var key in responseJSON.acab) {
                    var obj = responseJSON.acab[key];
                    var keyNew = obj.fecha;
                    if (!(keyNew in ArrayAcaAp)) {
                        ArrayAcaAp[keyNew] = 0;
                        ArrayAcaRe[keyNew] = 0;
                    }

                    if (obj.def1.length > 0)
                        ArrayAcaDef.push(obj.def1);


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

                var mergedAca = [].concat.apply([], ArrayAcaDef);
                mergedAca.sort(function(a, b) {
                    return a.length - b.length;
                });
                var ArrayAcaT = count_duplicate(mergedAca);
                for (var key in ArrayAcaT) {
                    Arr_defAca.push(key);
                    var temp = parseInt(ArrayAcaT[key])
                    Arr_numAca.push(temp);
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

                var chtAca = document.getElementById('tablaAca').getContext('2d');
                //chtAca.render();
                // chtAca.clear();
                //chtAca = null;
                var chartAca = new Chart(chtAca, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: Array.from(Arr_defAca),
                        datasets: [{
                            label: 'Defectos',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: Arr_numAca
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0
                                }
                            }]
                        }
                    }
                });
                Arr_defAca = [];
                Arr_numAca = [];






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
        options: {

        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    });


};


init();