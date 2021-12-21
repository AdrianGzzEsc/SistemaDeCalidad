function validateSuper() {
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
            userEmailSuper(responseJSON);
        })
        .catch(err => {
            console.log(err.message);
            window.location.href = "/";
        });
}

function userEmailSuper(data) {
    console.log(data)
    if (!data.superuser) {
        window.location.href = "/inspeccionProceso/" + data.id;
    } else {
        console.log('si es superusuario');
    }
}

function init() {
    validateSuper();
}

init();