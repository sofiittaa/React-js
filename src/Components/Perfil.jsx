import Swal from 'sweetalert2'

export const Perfil = () => {
       const handleClick = () => {
        Swal.fire({
            title: 'Bienvenido',
            text: "Inicia sesion o registrate",
            showCancelButton: true,
            customClass: {
                title: "text",
                text: "ola",
            },
           background: 'url(/fondoSweet.jpg)',
            confirmButtonText: 'Iniciar sesión',
            cancelButtonText: 'Registrarme'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login';
            } else if (result.isDismissed) {
                window.location.href = '/register';
            }
        });
    }
    return (
        <div>
            <img className='perfil' onClick={handleClick} src="/public/usuario.png" alt="" />
        </div>
    )
}



