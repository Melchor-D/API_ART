async function buscar() {
  const texto = document.getElementById("search").value;

  if (!texto) return;

  const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${texto}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const canciones = data.data;
    let html = "";

    canciones.forEach(song => {
      html += `
        <div class="card">
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

  } catch (error) {
    document.getElementById("resultado").innerHTML =
      "<p>Error al cargar datos.</p>";
  }
}

document.getElementById("search").addEventListener("input", buscar);