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
            window.location.href = "/inicio/";
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

function init(){
    let loginBtn = document.getElementById( 'loginBtn' );

    loginBtn.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let email = document.getElementById( 'email' ).value;
        let password = document.getElementById( 'password' ).value;

        userLoginFetch( email, password );
    })
}

init();