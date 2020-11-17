function addInspeccionProc(folio, fecha, inspector, hora) {
    let url = '/addInspeccionProceso/';

    let data = {
        folio: folio,
        fecha: fecha,
        inspector: inspector,
        hora : hora
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
            if (response.ok)
                return response.json();
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            localStorage.setItem( 'folio', responseJSON.folio);
            localStorage.setItem( 'fecha', responseJSON.fecha);
            localStorage.setItem( 'hora', responseJSON.hora);
            var mensaje = "Se ha regitrado con éxito.";
            $('#agregar-error').html(`
                <div class="alert alert-success alert-dismissible fade show msg-error" role="alert">
                    ${mensaje}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            borraAlerta();
            displayPost(responseJSON);
        })
        .catch(err => {
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
        })
}

function borraAlerta() {
    setTimeout(function() {
        $('#agregar-error').html('');
    }, 5000);
}

function displayPost(data) {
    console.log(data);
    window.location.href = "/escuadradora/";
}

function validateInsp() {
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
            userEmailInsp(responseJSON);
        })
        .catch(err => {
            console.log(err.message);
            window.location.href = "/";
        });
}

function userEmailInsp(data) {
    submitInsp(data);
}

function submitInsp(data) {
    let fName = String(data.fName);
    let lName = String(data.lName);
    let inspector = fName + ' ' + lName;
    let btn = document.getElementById('btnSubmit');
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        let fecha = document.getElementById('fecha');
        let folio = document.getElementById('folio');
        let hora = document.getElementById('hora');
        addInspeccionProc(folio.value, fecha.value, String(inspector), hora.value);
    })
}

function initInsp() {
    localStorage.setItem( 'folio', null );
    localStorage.setItem( 'fecha', null );
    localStorage.setItem( 'hora', null );
    validateInsp();
}

initInsp();