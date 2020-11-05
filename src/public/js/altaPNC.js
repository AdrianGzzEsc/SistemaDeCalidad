function addAltaPNC( folio, Fecha, Orden, Proceso, Modelo, Defectos, Cantidad, Comentarios, Retrabajo, inspector ) {
    let url = '/addAltaPnc/';

    let data = {
        folio : folio,
        Fecha : Fecha,
        Orden : Orden,
        Proceso : Proceso,
        Modelo : Modelo,
        Defectos : Defectos,
        Cantidad : Cantidad,
        Comentarios : Comentarios,
        Retrabajo : Retrabajo,
        inspector : inspector
    }

    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    fetch( url, settings )
        .then( response => {
            if( response.ok )
                return response.json();
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayPost( responseJSON );
        })
        .catch( err => {
            alert( err );
        })
}

function displayPost( data ) {
    console.log( data );
    alert( "Se dio de alta con exito.");
    window.location.href = "/inicio/"
}

function validate() {
    let url = "/user/validate-user";
    let settings = {
        method : 'GET',
        headers : {
            sessiontoken : localStorage.getItem( 'token' )
        }
    };

    fetch( url, settings )
        .then( response => {
            if( response.ok ) {
                return response.json();
            }
            throw new Error( response.statusText ); 
        })
        .then( responseJSON => {
            userEmail( responseJSON );
        })
        .catch( err => {
            console.log( err.message );
            window.location.href = "/";
        });
}

function userEmail( data ) {
    submit( data );
}

function submit( data ) {
    let fName = String(data.fName);
    let lName = String(data.lName);
    let inspector = fName + ' ' + lName;
    let btn = document.getElementById( 'btnSubmit' );
    btn.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        let Proceso = document.getElementById( 'proceso' );
        let Fecha = document.getElementById( 'fechaform' );
        let folio = document.getElementById( 'folio' );
        let Modelo = document.getElementById( 'modelo' );
        let Defectos = document.getElementById( 'seleccion' );
        let Cantidad = document.getElementById( 'cantidad' );
        let Comentarios = document.getElementById( 'comentarios' );
        let Retrabajo = document.getElementById( 'seleccionRet' );
        let Orden = document.getElementById( 'orden' );
        var selected = [...Defectos.options]
                    .filter(option => option.selected)
                    .map(option => option.value);
        addAltaPNC( folio.value, Fecha.value, Orden.value, Proceso.value, Modelo.value, selected, Number(Cantidad.value), Comentarios.value, Retrabajo.value, String(inspector) );
    })
}

function init() {
    validate();
}

init();