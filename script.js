document.addEventListener("DOMContentLoaded", () => {
    // BOTÓN DE BÚSQUEDA
    const searchButton = document.getElementById('searchButton');
    const songInput = document.getElementById('songSearch');
    const resultsContainer = document.getElementById('resultsContainer');

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const query = songInput.value.trim();
            if (query) {
                searchSong(query);
            }
        });
    }

    function searchSong(query) {
        const apiKey = 'AIzaSyCogHLrOkv5j1qIjAANBbTqETyqj7iMKc8';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.items))
            .catch(error => console.error('Error al buscar:', error));
    }

    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('result-card');

            const image = document.createElement('img');
            image.src = result.snippet.thumbnails.high.url;
            card.appendChild(image);

            const title = document.createElement('h3');
            title.textContent = result.snippet.title;
            card.appendChild(title);

            const link = document.createElement('a');
            link.href = `https://www.youtube.com/watch?v=${result.id.videoId}`;
            link.target = '_blank';
            link.textContent = 'Ver en YouTube';
            card.appendChild(link);

            resultsContainer.appendChild(card);
        });
    }

});

