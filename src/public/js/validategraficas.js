function validatefromRep() {
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
            userEmailRep( responseJSON );
        })
        .catch( err => {
            console.log( err.message );
            window.location.href = "/";
        });
}

function userEmailRep( data ) {
    if( !data.superuser ) {
        window.location.href = "/inicio/";
    }
    else {
        window.location.href = "/super/";
    }
}

function init() {
    let link = document.getElementById( 'btnSalir' );
    link.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        validatefromRep()
    })
}

init();