// Esta función busca canciones cuando el usuario escribe y toca "Buscar"
async function buscar() {
  const texto = document.getElementById("search").value;
  const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${texto}`;
  

  // Mostramos el CARGANDO ANTES de pedir los datos
  document.getElementById("loader").style.display = "block";


  // Esperamos a que Deezer responda y convertimos la respuesta a JSON
  try {
    const res = await fetch(url);
    const data = await res.json();
    const canciones = data.data;
    let html = "";

    // Recorremos cada canción y creamos una card, Una card es solo una cajita que encierra, en este caso, la imagen, el título, el artista y el audio
    canciones.forEach(song => {
      html += `
        <div class="card" onclick="mostrarDetalle('${song.artist.name}', '${song.title}', '${song.album.cover_medium}', '${song.preview}')">
          <img src="${song.album.cover_medium}">
          <h3>${song.title}</h3>
          <p>${song.artist.name}</p>
          <audio controls>
            <source src="${song.preview}" type="audio/mp3">
          </audio>
        </div>
      `;
    });
    document.getElementById("resultado").innerHTML = html;
  } 
 

   // Si algo falla mostramos un mensaje humano,  se quita el "loader" para que no quede dando vueltas para siempre
  catch (error) {
    document.getElementById("resultado").innerHTML =
      "<p>No se pudo cargar la información. Intenta de nuevo.</p>";
  }
  document.getElementById("loader").style.display = "none";
}


// FUNCIÓN DE DETALLE — Muestra una tarjeta con toda la info
function mostrarDetalle(artista, titulo, imagen, audio) {
  const detalle = document.getElementById("detalle");

  detalle.innerHTML = `
    <div class="detalle-card">
      <button onclick="cerrarDetalle()">Cerrar</button>
      <img src="${imagen}">
      <h2>${titulo}</h2>
      <h3>${artista}</h3>
      <audio controls>
        <source src="${audio}" type="audio/mp3">
      </audio>
    </div>
  `;
  
  detalle.style.display = "block";
}
// Esta función es para ocultar la pantalla de detalle
function cerrarDetalle() {
  document.getElementById("detalle").style.display = "none";
}