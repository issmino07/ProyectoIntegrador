function ingresarSistema(usuario, clave, sesionIniciada = false) {
    for (let i = 0; i < usuariosRegistrados.length; i++) {
        if (
            usuario == usuariosRegistrados[i].usuario &&
            clave == usuariosRegistrados[i].clave
        ) {
            usuariosRegistrados[i].sesionIniciada = sesionIniciada;
            localStorage.setItem(
                "usuarioLogueado",
                JSON.stringify(usuariosRegistrados[i])
            );
            redireccionar();
            return;
        }
    }

    swal.fire('Usuario y/o Contraseña no son validos', '', 'error');
}

function verificarInicioSesion() {
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado != null && usuarioLogueado.sesionIniciada == true) {
        swal.fire('Ya tiene una sesión activa, redireccionando...','','warning');
        setTimeout(redireccionar, 3000);
    }
}

function redireccionar() {
    window.location = "../index.html";
}
function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    swal.fire('Sesion Cerrada Correctamente', '', 'success');
    setTimeout(redireccionarLogin, 3000);
}

function redireccionarLogin() {
    window.location = "pages/login.html";
}  
function obtenerUsuarios() {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));

    if (usuariosRegistrados == null) {
        usuariosRegistrados = [
            {
                usuario: "admin",
                clave: "1234",
                nombre: "joshtyn",
                apellido: "zambrano",
                sesionIniciada: false,
            },
        ];
    }
}

var usuariosRegistrados = [];
obtenerUsuarios();
verificarInicioSesion();
