function userSignupFetch(email, fName, lName, password, superuser, planta) {
    let url = '/registrar';

    let data = {
        fName,
        lName,
        password,
        email,
        superuser,
        planta
    }

    let settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            // console.log( responseJSON );
            // alert("Se ha regitrado el usuario con éxito.");
            // Muestra alerta de bootstrap de exito

            var mensaje = "Se ha regitrado el usuario con éxito.";

            $('#agregar-error').html(`
                <div class="alert alert-success alert-dismissible fade show msg-error" role="alert">
                    ${mensaje}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            borraAlerta();
            espera()
        })
        .catch(err => {
            // alert(err.message);
            // Muestra alerta de bootstrap de error
            var mensaje = err.message;
            $('#agregar-error').html(`
                <div class="alert alert-danger alert-dismissible fade show msg-error" role="alert">
                    ${mensaje}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            borraAlerta();
        });
}

// Funcion que borra la alerta de bootstrap despues de 5000ms
function borraAlerta() {
    setTimeout(function() {
        $('#agregar-error').html('');
    }, 5000);
}

function espera() {
    setTimeout(() => { console.log("World!"); }, 5000);
    location.reload();
}

function validateFromAdd() {
    let url = "/user/validate-user";
    let settings = {
        method: 'GET',
        headers: {
            sessiontoken: localStorage.getItem('token')
        }
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            userEmailFromAdd(responseJSON);
        })
        .catch(err => {
            console.log(err.message);
            window.location.href = "/";
        });
}

function userEmailFromAdd(data) {
    if (!data.superuser) {
        window.location.href = "/inspeccionProceso/" + data.id;
    } else {
        console.log('si es superusuario');
    }
}

function init() {
    validateFromAdd()

    let registerBtn = document.getElementById('registerBtn');

    registerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let fName = document.getElementById('fName').value;
        let lName = document.getElementById('lName').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirm = document.getElementById('confirm').value;
        let select = document.getElementById('superuser').value;
        let planta = document.getElementById('planta').value;

        let superuser;
        if (select == 'true')
            superuser = true;
        else
            superuser = false;
        if (confirm == password) {
            userSignupFetch(email, fName, lName, password, superuser, planta);

        } else {
            alert("Las contraseñas no coinciden.");
        }
    })

    let confirm = document.getElementById('confirm');

    confirm.addEventListener('change', function() {
        let password = document.getElementById('password').value;
        if (password != confirm.value) {
            confirm.classList.add('false');
            confirm.classList.remove('correct');
        } else {
            confirm.classList.add('correct');
            confirm.classList.remove('false');
        }
    })
}

init();