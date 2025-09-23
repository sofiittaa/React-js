import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const PerfilContainer = () => {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // 🔹 Ver si hay usuario activo en localStorage al cargar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user) setUsuarioActivo(user);
  }, []);

  const handleClick = async () => {
    if (usuarioActivo) {
      // 🔹 Usuario logueado → mostrar opción cerrar sesión
      Swal.fire({
        title: `¡Hola ${usuarioActivo.nombre}!`,
        html: `<p>Iniciaste sesión con el email: ${usuarioActivo.email}</p>`,
        showCancelButton: true,
        confirmButtonText: 'Cerrar sesión',
        cancelButtonText: 'Cancelar',
        customClass: { title: "text", htmlContainer: "text" },
        confirmButtonColor: 'rgba(123, 10, 91, 1)',
        cancelButtonColor: 'rgba(123, 10, 91, 1)',
        background: 'url(/fondoSweet.jpg)',
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem("usuarioActivo");
          setUsuarioActivo(null);
          Swal.fire({
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: { title: "text", htmlContainer: "text" },
            background: 'url(/fondoSweet.jpg)',
          });
        }
      });
    } else {
      // 🔹 Usuario no logueado → login o registro
      Swal.fire({
        title: 'Bienvenido',
        text: "Inicia sesión o regístrate",
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Registrarme',
        customClass: { title: "text", htmlContainer: "text" },
        confirmButtonColor: 'rgba(123, 10, 91, 1)',
        cancelButtonColor: 'rgba(123, 10, 91, 1)',
        background: 'url(/fondoSweet.jpg)',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // 🔹 LOGIN
          const loginRes = await Swal.fire({
            title: 'Inicia sesión',
            html: `
              <input id="swal-input1" class="swal2-input" placeholder="Email" type="email">
              <input id="swal-input2" class="swal2-input" placeholder="Contraseña" type="password">
            `,
            background: 'url(/fondoSweet.jpg)',
            confirmButtonText: 'Enviar',
            confirmButtonColor: 'rgba(123, 10, 91, 1)',
            customClass: { title: "text", htmlContainer: "text" },
            showCloseButton: true,
            allowOutsideClick: false,
            preConfirm: () => {
              const email = document.getElementById("swal-input1").value;
              const password = document.getElementById("swal-input2").value;
              if (!email || !password) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
                return;
              }
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                Swal.showValidationMessage("Ingresa un email válido");
                return;
              }
              return { email, password };
            }
          });

          if (loginRes.isConfirmed) {
            const { email, password } = loginRes.value;
            const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuariosGuardados.find(u => u.email === email && u.password === password);
            if (usuario) {
              localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
              setUsuarioActivo(usuario);
              Swal.fire({ title: `¡Bienvenid@ de nuevo, ${usuario.nombre}!`, icon: "success", confirmButtonColor: 'rgba(123, 10, 91, 1)' });
            } else {
              Swal.fire({
                title: "Email o contraseña incorrectos",
                text: "No existe este usuario, regístrate",
                icon: "warning",
                confirmButtonText: "Ok",
                confirmButtonColor: 'rgba(123, 10, 91, 1)',
                customClass: { title: "text", htmlContainer: "text" },
                background: 'url(/fondoSweet.jpg)',
              });
            }
          }

        } else if (result.isDismissed) {
          // 🔹 REGISTRO
          const registroRes = await Swal.fire({
            title: 'Regístrate',
            html: `
              <input id="swal-input1" class="swal2-input" placeholder="Nombre de usuario">
              <input id="swal-input3" class="swal2-input" placeholder="Email" type="email">
              <input id="swal-input4" class="swal2-input" placeholder="Contraseña" type="password">
            `,
            confirmButtonText: "Enviar",
            confirmButtonColor: 'rgba(123, 10, 91, 1)',
            customClass: { title: "text", htmlContainer: "text" },
            background: 'url(/fondoSweet.jpg)',
            showCloseButton: true,
            preConfirm: async () => {
              const nombre = document.getElementById("swal-input1").value;
              const email = document.getElementById("swal-input3").value;
              const password = document.getElementById("swal-input4").value;
              if (!nombre || !email || !password) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
                return;
              }

              // revisar en Firebase si ya existe
              const q = query(collection(db, "usuarios"), where("email", "==", email));
              const resultado = await getDocs(q);
              if (!resultado.empty) {
                Swal.showValidationMessage("Ese email ya está registrado");
                return;
              }

              return { nombre, email, password };
            }
          });

          if (registroRes.isConfirmed) {
            const nuevoUsuario = registroRes.value;
            await addDoc(collection(db, "usuarios"), { 
              nombre: nuevoUsuario.nombre, 
              email: nuevoUsuario.email, 
              password: nuevoUsuario.password, 
              fecha: new Date()
            });
            localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));
            setUsuarioActivo(nuevoUsuario);
            Swal.fire({
              title: `¡Registro exitoso!`,
              text: `Bienvenid@ ${nuevoUsuario.nombre}`,
              icon: "success",
              confirmButtonColor: 'rgba(123, 10, 91, 1)',
              customClass: { title: "text", htmlContainer: "text" },
              background: 'url(/fondoSweet.jpg)',
            });
          }
        }
      });
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
  );
};

export default PerfilContainer;
