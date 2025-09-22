import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"  

export const PerfilContainer = () => {
    const [usuarioActivo, setUsuarioActivo] = useState(null)

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"))
    if (user) setUsuarioActivo(user)
    }, [])

    const handleClick = () => {
        Swal.fire({
        title: 'Regístrate',
        html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre de usuario">
        <input id="email" class="swal2-input" placeholder="Email" type="email">
        <input id="password" class="swal2-input" placeholder="Contraseña" type="password">
        `,
        confirmButtonText: "Enviar",
        confirmButtonColor: 'rgb(181, 7, 91)',
        background: 'url(/fondoSweet.jpg)',
        customClass: { title: "text", htmlContainer: "text" },
        preConfirm: async () => {
        const nombre = document.getElementById("nombre").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (!nombre || !email || !password) {
        Swal.showValidationMessage("Todos los campos son obligatorios")
        return
        }
        const q = query(collection(db, "usuarios"), where("email", "==", email))
        const resultado = await getDocs(q)
        if (!resultado.empty) {
        Swal.showValidationMessage("Ese email ya está registrado")
        return
        }

        return { nombre, email, password }
        }
    }).then(async (res) => {
        if (res.isConfirmed) {
        const nuevoUsuario = res.value

        await addDoc(collection(db, "usuarios"), {
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        password: nuevoUsuario.password,
        fecha: new Date()
        })
        setUsuarioActivo(nuevoUsuario)
        Swal.fire({
        title: `¡Registro exitoso!`,
        text: `Bienvenid@ ${nuevoUsuario.nombre}`,
        icon: "success",
        confirmButtonColor: 'rgb(181, 7, 91)',
        customClass: { title: "text", text: "text" },
        background: 'url(/fondoSweet.jpg)',
        })
    }
    })
}

return (
    <div>
    <img
        className='perfil'onClick={handleClick} src="/public/usuario.png" alt="usuario"
    />
    </div>
    )
}

export default PerfilContainer;
