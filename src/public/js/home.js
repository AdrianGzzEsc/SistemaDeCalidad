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
    console.log( "nothing." );
}

function logout() {
    localStorage.setItem('token', null );
    init();
    console.log("Logged out");
}

function init() {
    validate();
}

init();