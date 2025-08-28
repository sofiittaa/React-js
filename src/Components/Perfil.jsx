import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

export const Perfil = () => {
  const [usuarioActivo, setUsuarioActivo] = useState(null)


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"))
    if (user) {
      setUsuarioActivo(user)
    }
  }, [])

  const handleClick = () => {
    if (usuarioActivo) {

      Swal.fire({
        title: `¡Hola ${usuarioActivo.nombre}!`,
        html: `<p>Iniciaste sesion con el gmail: ${usuarioActivo.email}</p>`,
        showCancelButton: true,
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'Cancelar',
        customClass: {
          title: "text",
          htmlContainer: "text",
        },
        confirmButtonColor: 'rgba(123, 10, 91, 1)',
        cancelButtonColor: 'rgba(123, 10, 91, 1)',
        background: 'url(/fondoSweet.jpg)',
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem("usuarioActivo")
          setUsuarioActivo(null)
          Swal.fire({
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              title: "text",
              htmlContainer: "text",
            },
            background: 'url(/fondoSweet.jpg)',
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Bienvenido',
        text: "Inicia sesion o registrate",
        showCancelButton: true,
        customClass: {
          title: "text",
          htmlContainer: "text",
        },
        background: 'url(/fondoSweet.jpg)',
        confirmButtonText: 'Iniciar sesión',
        confirmButtonColor: 'rgba(123, 10, 91, 1)',
        cancelButtonText: 'Registrarme',
        cancelButtonColor: 'rgba(123, 10, 91, 1)',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          // LOGIN
          Swal.fire({
            title: 'Iniciá sesión',
            html: `
            <input id="swal-input1" class="swal2-input" placeholder="Email" type="email" required="@">
            <input id="swal-input2" type="password" class="swal2-input" placeholder="Contraseña">
          `,
            background: 'url(/fondoSweet.jpg)',
            confirmButtonColor: 'rgba(123, 10, 91, 1)',
            confirmButtonText: 'Enviar',
            customClass: {
              title: "text",
              htmlContainer: "text",
            },
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: () => {
              const email = document.getElementById("swal-input1").value
              const password = document.getElementById("swal-input2").value
              if (!email || !password) {
                Swal.showValidationMessage("Todos los campos son obligatorios")
                return
              }
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                Swal.showValidationMessage("Ingresa un email válido (debe tener @ y .)")
                return
              }
              return { email, password }
            }
          }).then((res) => {
            if (res.isConfirmed) {
              const { email, password } = res.value
              const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []
              const usuario = usuariosGuardados.find(u => u.email === email && u.password === password)

              if (usuario) {
                localStorage.setItem("usuarioActivo", JSON.stringify(usuario))
                setUsuarioActivo(usuario)
                Swal.fire({
                  title: `¡Bienvenid@ de nuevo, ${usuario.nombre}!`,
                  icon: "success",
                  confirmButtonColor: 'rgba(123, 10, 91, 1)',
                })
              } else {
                 Swal.fire({
                    title: "Email o contraseña incorrectos.",
                    text: "No existe este usuario, registrate para crear tu cuenta.",
                    icon: "warning",
                    confirmButtonText: "Ok",
                    confirmButtonColor: 'rgba(123, 10, 91, 1)',
                    customClass: {
                      title: "text",
                      htmlContainer: "text",
                   },
                    background: 'url(/fondoSweet.jpg)',

                  })
              }
            }
          })
        } else if (result.isDismissed) {
          // REGISTRO
          Swal.fire({
            title: 'Regístrate',
            background: 'url(/fondoSweet.jpg)',
            customClass: {
              title: "text",
              htmlContainer: "text",
            },
            html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nombre de usuario">
            <input id="swal-input3" class="swal2-input" placeholder="Email" type="email" required="@">
            <input id="swal-input4" type="password" class="swal2-input" placeholder="Contraseña">
          `,
            confirmButtonText: "Enviar",
            confirmButtonColor: 'rgba(123, 10, 91, 1)',
            showCloseButton: true,
            preConfirm: () => {
              const nombre = document.getElementById("swal-input1").value
              const email = document.getElementById("swal-input3").value
              const password = document.getElementById("swal-input4").value
              if (!nombre || !email || !password) {
                Swal.showValidationMessage("Todos los campos son obligatorios")
                return
              }
              const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []
              const existe = usuariosGuardados.some(u => u.email === email)
              if (existe) {
                Swal.showValidationMessage("Ese email ya está registrado")
                return
              }
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                Swal.showValidationMessage("Ingresa un email válido (debe tener @ y .)")
                return
              }
              const nuevoUsuario = { nombre, email, password }
              usuariosGuardados.push(nuevoUsuario)
              localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados))
              return nuevoUsuario
              
            }
          }).then((res) => {
            if (res.isConfirmed) {
              localStorage.setItem("usuarioActivo", JSON.stringify(res.value))
              setUsuarioActivo(res.value)
              Swal.fire({
                title: `¡Registro exitoso!`,
                text: `Bienvenid@ ${res.value.nombre}`,
                icon: "success",
                confirmButtonColor: 'rgba(123, 10, 91, 1)',
                customClass: {
                  title: "text",
                  htmlContainer: "text",
                },
                background: 'url(/fondoSweet.jpg)',
              })
            }
          })
        }
      })
    }

  }



    return (
      <div>
        <img
          className='perfil'
          onClick={handleClick}
          src="/public/usuario.png"
          alt="usuario"
        />
      </div>
    )
  }

  export default Perfil;

