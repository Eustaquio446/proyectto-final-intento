const albumId = window.location.href.split("album=")[1]; 


const redirect = (albumId) => {
    window.location.href = `/album.html?album=${albumId}`;
  };

const addSong = async(e)=>{
    e.preventDefault()

    const titulo = document.getElementById('titulo')
    const duracion = document.getElementById('duracion')

    try{
        const response = await axios.post(`/band/${albumId}/agregarCancion`, {
            nombreCancion: titulo.value,
            duracionCancion: duracion.value
        });
        swal({
            title: "Success!",
            text: "You add a song",
            icon: "success",
            confirmButtonText: "Ok",
          });
        redirect(albumId)

    }catch(error){
        swal({
            title: "Error!",
            text: "Failed to delete this song",
            icon: "error",
            confirmButtonText: "Cool",
          });
    }
}

document.querySelector('form').addEventListener('submit', addSong)