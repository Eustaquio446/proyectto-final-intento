const redirect = () => {
    window.location.href = "login.html";
  };
  
  const register = async(e)=>{
    e.preventDefault()
  
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const email = document.getElementById('email')
    const contraseña = document.getElementById('contraseña')
  
    try{
        const response = await axios.post('/user', {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            contraseña: contraseña.value
        });
        await swal({
            title: "Success!",
            text: "You have registered",
            icon: "success",
            confirmButtonText: "Ok",
          });
          redirect()
    }catch(error){
        swal({
            title: "Error!",
            text: "Error registering",
            icon: "error",
            confirmButtonText: "Cool",
          });
    }
  }
  
  document.querySelector('form').addEventListener('submit', register)