let personajes = [];
let personajesMostrados = [];
let numeroPagina = 1;
let ultimaPagina = 0;

function buscarPersonajes(numeroPagina) {
  let url = "https://rickandmortyapi.com/api/character";
  document.getElementById("pagina-actual").innerText =
    "Página actual: " + numeroPagina;
  if (numeroPagina > 1) {
    url = url + "?page=" + numeroPagina;
  }
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      ultimaPagina = response.info.pages;
      personajes = cargarPersonajes(response.results);
    });
  document.getElementById("btn-anterior").disabled = false;
  document.getElementById("btn-primero").disabled = false;
  document.getElementById("btn-siguiente").disabled = false;
  document.getElementById("btn-ultimo").disabled = false;

  if (numeroPagina === 1) {
    document.getElementById("btn-anterior").disabled = true;
    document.getElementById("btn-primero").disabled = true;
  }
  if (numeroPagina === ultimaPagina) {
    document.getElementById("btn-siguiente").disabled = true;
    document.getElementById("btn-ultimo").disabled = true;
  }
}

document.getElementById("btn-mujeres").addEventListener("click", function () {
  const personajesMujeres = personajes.filter(function (personaje) {
    return personaje.gender === "Female";
  });

  cargarPersonajes(personajesMujeres);
  document.getElementById("btn-anterior").disabled = true;
  document.getElementById("btn-primero").disabled = true;
  document.getElementById("btn-siguiente").disabled = true;
  document.getElementById("btn-ultimo").disabled = true;
});

document.getElementById("btn-hombres").addEventListener("click", function () {
  const personajesHombres = personajes.filter(function (personaje) {
    return personaje.gender === "Male";
  });

  cargarPersonajes(personajesHombres);
  document.getElementById("btn-anterior").disabled = true;
  document.getElementById("btn-primero").disabled = true;
  document.getElementById("btn-siguiente").disabled = true;
  document.getElementById("btn-ultimo").disabled = true;
});

document.getElementById("btn-todos").addEventListener("click", function () {
  cargarPersonajes(personajes);
  document.getElementById("btn-anterior").disabled = false;
  document.getElementById("btn-primero").disabled = false;
  document.getElementById("btn-siguiente").disabled = false;
  document.getElementById("btn-ultimo").disabled = false;
});
document.getElementById("btn-siguiente").addEventListener("click", function () {
  numeroPagina = numeroPagina + 1;
  buscarPersonajes(numeroPagina);
});
document.getElementById("btn-anterior").addEventListener("click", function () {
  numeroPagina = numeroPagina - 1;
  buscarPersonajes(numeroPagina);
});

document.getElementById("btn-primero").addEventListener("click", function () {
  numeroPagina = 1;
  buscarPersonajes(numeroPagina);
});
document.getElementById("btn-ultimo").addEventListener("click", function () {
  numeroPagina = ultimaPagina;
  buscarPersonajes(numeroPagina);
});
function cargarPersonajes(personajes) {
  let resultadoFinal = "";
  for (const personaje of personajes) {
    let nombre = personaje.name;
    let genero = personaje.gender;
    let especie = personaje.species;
    let estado = personaje.status;
    let origen = personaje.origin.name;
    let ubicacion = personaje.location.name;
    let imagen = personaje.image;
    let resultado = `<div class="card">
    <img src="${imagen}" alt="" class="avatar" />
    <div class="info">
      <h3>${nombre}</h3>
      <p>${especie}</p>
      <p>${genero}</p>
      <p>${estado}</p>
      <p>${origen}</p>
      <p>${ubicacion}</p>
      <button class="btn-ver-mas">Ver más</button>
    </div>
  </div>`;

    resultadoFinal += resultado;
  }
  let container = document.getElementById("lista");
  let cantidad = document.getElementById("total");
  cantidad.innerText = "Total de personajes: " + personajes.length;
  container.innerHTML = resultadoFinal;
  return personajes;
}
buscarPersonajes(numeroPagina);
