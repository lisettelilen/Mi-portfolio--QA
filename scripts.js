// Función para buscar canciones en Spotify
async function searchSpotifySongs() {
    const query = document.getElementById('search-input').value;
    if (query.length < 3) return;  // Solo hacer la búsqueda si el texto tiene más de 3 caracteres
  
    // Aquí deberías tener un token válido de Spotify (por ejemplo, usando OAuth)
    const token = 'YOUR_ACCESS_TOKEN';  // Necesitas obtener este token con OAuth
  
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`
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
      
      // Crear un enlace a la canción de Spotify
      songItem.innerHTML = `
        <a href="${track.external_urls.spotify}" target="_blank">
          ${track.name} - ${track.artists.map(artist => artist.name).join(', ')}
        </a>
      `;
      
      resultsContainer.appendChild(songItem);
    });
  }
  