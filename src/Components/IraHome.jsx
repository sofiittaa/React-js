import Swal from 'sweetalert2'
export const IraHome = () => {

 const handleClick = () => {
       
              Swal.fire({
                  title: "Cargando...",
                  text: "Un momento por favor",
                  icon: "info",
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 800,
                timerProgressBar: true,
                  customClass: {
                      title: "text",
                      htmlContainer: "text",
                  },
                  background: 'url(/fondoSweet.jpg)',
              }).then(() => {
                  window.location.href = '/home';
              })
  };

  return (
      <div>
        <img className='casa' onClick={handleClick} src="/public/casa.png" alt="" />
    </div>
  )
}
export default IraHome;

