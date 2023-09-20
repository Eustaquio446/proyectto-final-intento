
let nombre = '';
let nombreValido = false; 

while (!nombreValido) {
  nombre = prompt('Ingresa tu nombre:').toUpperCase();
  nombre = nombre ? nombre.trim() : '';

  if (nombre === '') {
    alert('Por favor, ingresa tu nombre antes de continuar.');
  } else if (nombre.length < 2) {
    alert('El nombre debe tener al menos 2 letras. Por favor, ingresa nuevamente tu nombre.');
  } else {
    nombreValido = true;
  }
}

let edad = parseInt(prompt('Ingrese su edad: '))
function menorEdad(edad){
  const botones = document.querySelectorAll('button')
  if (edad < 18){
    swal(
      'Lo sentimos',
      'No puedes comprar boletos porque eres menor de edad',
      'warning'
    )
    botones.forEach(button => {
      button.disabled = true
    })
  } 
}
menorEdad(edad)

const welcome = document.querySelector('#bienvenido');
welcome.innerHTML = 'Hola, ' + nombre

let entradas = {
  agosto5: 2,
  septiembre5: 1,
  septiembre8: 3,
  septiembre16: 1,
};

function comprado(lugarConcierto) {
  swal("Vendido!", `Tienes tickets para el concierto en ${lugarConcierto}`, "success");
}

function vendido() {
  swal("Ups!", "Ya has comprado un boleto. No puedes comprar otro.", "error");
}

function getTickets(button) {
  const lugarConcierto = button.getAttribute("data-location");
  const variableNombre = button.getAttribute("data-variable");

  entradas[variableNombre];

  if (entradas[variableNombre] > 0) {
    entradas[variableNombre] --;
    comprado(lugarConcierto);

    if (entradas[variableNombre] === 0) {
      button.textContent = "AGOTADAS";
      button.disabled = true;
    }
  } else {
    vendido();
  }
}
