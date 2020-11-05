function userLoginFetch( email, password ){
    let url = '/SignIn';

    let data = {
        email,
        password
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
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            localStorage.setItem( 'token', responseJSON.token );
            console.log( responseJSON );
            userByEmail( email );
        })
        .catch( err => {
            // alert(err.message);
            var mensaje = err.message;
            $('#msg-error').html(`
            <div class="alert alert-danger alert-dismissible fade show msg-error" role="alert">
                ${mensaje}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `);
        });
}

function userByEmail( email ) {
    let url = `/user/get-user-byemail/${email}`;

    let settings = {
        method : 'GET'
    }

    fetch( url, settings )
        .then( response => {
            if( response.ok ) {
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            userEmailLogin( responseJSON );
        })
        .catch( err => {
            console.log( err );
        })
    
}

function userEmailLogin( data ) {
    console.log( data );
    if( data.superuser ) {
        console.log('es un super usuario');
        window.location.href = "/super/";
    }
    else {
        window.location.href = "/inicio/";
    }
}

function init(){
    let loginBtn = document.getElementById( 'loginBtn' );

    loginBtn.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        let email = document.getElementById( 'email' ).value;
        let password = document.getElementById( 'password' ).value;

        userLoginFetch( email, password );
    })
}

init();