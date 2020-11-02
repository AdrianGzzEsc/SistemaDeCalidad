function addRecepcionFetch( folio, inspector, fecha, entrada, Doc_Pro, OC, Proveedor, Material, Cantidad, Unidad, Inspeccion ) {
    let url = '/addRecepcion/';

    let data = {
        folio : folio,
        inspector : inspector,
        fecha : fecha,
        entrada : entrada,
        Doc_Pro : Doc_Pro,
        OC : OC,
        Proveedor : Proveedor,
        Material : Material,
        Cantidad : Cantidad,
        Unidad : Unidad,
        Inspeccion : Inspeccion
    }

    let settings = {
        method : 'POST',
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
    alert( "Se hizo inspeccion con exito." );
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
    let btn = document.getElementById( 'btnSubmit' );
    btn.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let folio = document.getElementById( 'foliorecepcion' );
        let inspector = `${data.fName} ${data.lName}`;
        let fecha = document.getElementById( 'fecharecepcion' );
        let entrada = document.getElementById( 'entrada' );
        let Doc_Pro = document.getElementById( 'docprov' );
        let OC = document.getElementById( 'ocrecepcion' );
        let Proveedor = document.getElementById( 'select-state' );
        let Material = document.getElementById( 'materialrecepcion' );
        let Cantidad = document.getElementById( 'cantidadrecepcion' );
        let Unidad = document.getElementById( 'unidadrecepcion' );
        let Inspeccion = document.getElementById( 'inspeccionrecepcion' );
        console.log( folio );
        console.log( inspector );
        console.log( fecha );
        console.log( entrada );
        console.log( Doc_Pro );
        console.log( OC );
        console.log( Proveedor );
        console.log( Material );
        console.log( Cantidad );
        console.log( Unidad );
        console.log( Inspeccion );
        console.log( "Fin." );
    })
}

function init() {
    validate();
}

init()