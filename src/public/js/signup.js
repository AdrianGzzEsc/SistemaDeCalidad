function userLoginFetch( email, password ){
    let url = '/singin';

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
            alert(err.message);
        });
}

function userSignupFetch( email, fName, lName, password ){
    let url = '/registrar';

    let data = {
        fName,
        lName,
        password,
        email,
        superuser : false
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
            console.log( responseJSON );
            userLoginFetch( email, password );
        })
        .catch( err => {
            alert(err.message);
        });
}

function init() {
    let registerBtn = document.getElementById( 'registerBtn' );

    registerBtn.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let fName = document.getElementById( 'fName' ).value;
        let lName = document.getElementById( 'lName' ).value;
        let email = document.getElementById( 'email' ).value;
        let password = document.getElementById( 'password' ).value;
        let confirm = document.getElementById( 'confirm' ).value;
        if( confirm == password ) {
            userSignupFetch( email, fName, lName, password );
        }
        else {
            alert("Confirm password should be the same as the Password field.");
        }
    })

    let confirm = document.getElementById( 'confirm' );

    confirm.addEventListener( 'change', function () {
        let password = document.getElementById( 'password' ).value;
        if( password != confirm.value ) {
            confirm.classList.add( 'false' );
            confirm.classList.remove( 'correct' );
        }
        else {
            confirm.classList.add( 'correct' );
            confirm.classList.remove( 'false' );
        }
    })
}

init();