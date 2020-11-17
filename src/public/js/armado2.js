function addInspArmado2(folio, fecha, inspector, hora, modelo, pieza, ins1, def1) {
    let url = '/addArmado2/';

    let data = {
        folio: folio,
        fecha: fecha,
        inspector: inspector,
        hora : hora,
        modelo : modelo,
        pieza : pieza,
        ins1 : ins1,
        def1 : def1,
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
    window.location.href = "/armado3/";
}

function validateArm2() {
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
            userEmailArm2(responseJSON);
        })
        .catch(err => {
            console.log(err.message);
            window.location.href = "/";
        });
}

function userEmailArm2(data) {
    const folio = localStorage.getItem( 'folio' );
    const fecha = localStorage.getItem( 'fecha' );
    const hora = localStorage.getItem( 'hora' );
    submitArm2( data, folio, fecha, hora );
}

function submitArm2(data, folio, fecha, hora) {
    let fName = String(data.fName);
    let lName = String(data.lName);
    let inspector = fName + ' ' + lName;
    let btn = document.getElementById('btnSubmit');
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        let modelo = document.getElementById('modelo');
        let pieza = document.getElementById('pieza');
        let ins1 = document.getElementById('ins1');
        let def1 = document.getElementById('def1');
        var def1Selected = [...def1.options]
            .filter(option => option.selected)
            .map(option => option.value);
        addInspArmado2(folio, fecha, String(inspector), hora, modelo.value, pieza.value, ins1.value, def1Selected);
    })
}

function initArm2() {
    validateArm2();
}

initArm2();