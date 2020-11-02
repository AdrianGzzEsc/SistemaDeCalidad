function addRecepcionFetch( folio, fecha, inspector, entrada, OC, Doc_Pro, Proveedor, Material, Cantidad, Unidad, Inspeccion ) {
    let url = '/addRecepcion/';

    let data = {
        folio : folio,
        inspector : inspector,
        fecha : fecha,
        entrada : entrada,
        OC : OC,
        Doc_Pro : Doc_Pro,
        Proveedor : Proveedor,
        Material : Material,
        Cantidad : Cantidad,
        Unidad : Unidad,
        Inspeccion : Inspeccion
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
    alert( "Se hizo inspeccion con exito." );
    window.location.href = "/inicio/";
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
        let folio = document.getElementById( 'foliorecepcion' );
        let fecha = document.getElementById( 'fecharecepcion' );
        let entrada = document.getElementById( 'entrada' );
        let Doc_Pro = document.getElementById( 'docprov' );
        let OC = document.getElementById( 'ocrecepcion' );
        let Proveedor = document.getElementById( 'select-state' );
        let Material = document.getElementById( 'materialrecepcion' );
        let Cantidad = document.getElementById( 'cantidadrecepcion' );
        let Unidad = document.getElementById( 'unidadrecepcion' );
        let Inspeccion = document.getElementById( 'inspeccionrecepcion' );
        addRecepcionFetch( Number(folio.value), fecha.value, String(inspector), Number(entrada.value), Number(OC.value), Number(Doc_Pro.value), Proveedor.value, Material.value, Number(Cantidad.value), Unidad.value, Inspeccion.value );
    })
}

function init() {
    validate();
}

init()