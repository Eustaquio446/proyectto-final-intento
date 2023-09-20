const redirect = () => {
  window.location.href = "index.html";
};

const logear = async(e)=>{
  e.preventDefault()
  const email = document.getElementById('email')
  const contraseña = document.getElementById('contraseña')

  try{
    const response = await axios.post('/user/login', {
        email: email.value,
        contraseña: contraseña.value
    });
    if (response.data.status === "success") {
      await swal({
          title: "Success!",
          text: "Successful login",
          icon: "success",
          confirmButtonText: "Ok",
      })
          redirect();
      
  } else {
      await swal({
          title: "Error!",
          text: "Failed to login: " + error,
          icon: "error",
          confirmButtonText: "Cool",
      });
  }
}catch(error){
    swal({
        title: "Error!",
        text: "Failed to login",
        icon: "error",
        confirmButtonText: "Cool",
      });
}
}

document.querySelector('form').addEventListener('submit', logear)