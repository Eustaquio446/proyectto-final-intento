const redirect = () => {
    window.location.href = "index.html";
};

const addAlbum = async(e)=>{
    e.preventDefault()

    const titulo = document.getElementById('titulo')
    const descripcion = document.getElementById('descripcion')
    const año = document.getElementById('año')
    const url = document.getElementById('url')

    try{
        const response = await axios.post('/band', {
            titulo: titulo.value,
            descripcion: descripcion.value,
            añoSalida: año.value,
            url: url.value
        });
        swal({
            title: "Success!",
            text: "You add a album",
            icon: "success",
            confirmButtonText: "Ok",
          });
        redirect()
    }catch(error){
        swal({
            title: "Error!",
            text: "Failed to add this album",
            icon: "error",
            confirmButtonText: "Cool",
          });
    }

}

document.querySelector('form').addEventListener('submit', addAlbum)