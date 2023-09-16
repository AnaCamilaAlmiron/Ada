let personajes = [];

fetch("https://rickandmortyapi.com/api/character")
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    personajes = cargarPersonajes(response.results);
  });

document.getElementById("btn-mujeres").addEventListener("click", function () {
  const personajesMujeres = personajes.filter(function (personaje) {
    return personaje.gender === "Female";
  });

  cargarPersonajes(personajesMujeres);
});

function cargarPersonajes(personajes) {
  for (const personaje of personajes) {
    let nombre = personaje.name;
    let genero = personaje.gender;
    let especie = personaje.species;
    let estado = personaje.status;
    let origen = personaje.origin.name;
    let ubicacion = personaje.location.name;
    let imagen = personaje.image;
    let container = document.getElementById("lista");
    let resultado = `<div class="card">
    <div
      style="background-image: url('${imagen}')"
      alt=""
      class="avatar"
    ></div>
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

    container.innerHTML = resultado;
  }
  return personajes;
}
