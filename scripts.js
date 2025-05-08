// Reemplaza este token por un token válido de Spotify (necesitarás usar el proceso de autenticación de Spotify).
const accessToken = 'TU_TOKEN_DE_ACCESO_DE_SPOTIFY';  // Obtén este token desde Spotify API

// Función que se ejecuta cada vez que el usuario escribe algo en el campo de búsqueda
async function searchSpotifySongs() {
  const query = document.getElementById('search-input').value;
  if (query.length < 3) {
    return;  // Evitar hacer la búsqueda si el input tiene menos de 3 caracteres
  }

  // Hacer la solicitud a la API de Spotify
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  const data = await response.json();
  displaySearchResults(data.tracks.items);
}

// Función para mostrar los resultados de la búsqueda
function displaySearchResults(tracks) {
  const resultsContainer = document.getElementById('song-results');
  resultsContainer.innerHTML = '';  // Limpiar resultados anteriores

  if (tracks.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  tracks.forEach(track => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    
    // Mostrar nombre de la canción y artista
    songItem.innerHTML = `
      <div class="song-result">
        <p><strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(', ')}</p>
        <button onclick="playSong('${track.uri}')">Reproducir</button>
      </div>
    `;
    
    resultsContainer.appendChild(songItem);
  });
}

// Función para reproducir la canción seleccionada
function playSong(trackUri) {
  const iframe = document.getElementById('spotify-iframe');
  iframe.src = `https://open.spotify.com/embed/track/${trackUri.split(":")[2]}`;
}
