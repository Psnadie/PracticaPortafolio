const albumTitles = document.querySelectorAll('.albums-titulo li');
const albumDescriptions = document.querySelectorAll('.album-description');
const spotifyContainer = document.querySelector('.spotify');

// IDs de los álbumes de Spotify
const spotifyAlbums = {
    'astroworld': '41GuZcammIkupMPKH2OJ6I',
    'utopia': '18NOKLkZETa4sWwLMIm0UZ',
    'rodeo': '4PWBTB6NYSKQwfo79I3prg',
    'birds': '42WVQWuf1teDysXiOupIZt'
};

// Función para crear el iframe de Spotify
function loadSpotifyEmbed(albumId) {
    spotifyContainer.innerHTML = `
        <iframe 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0" 
            width="80%" 
            height="80%" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
    `;
}

albumTitles.forEach(title => {
    title.addEventListener('click', function () {
        const albumName = this.getAttribute('data-album');
        const description = document.querySelector(`.album-description[data-content="${albumName}"]`);
        const isActive = this.classList.contains('active');

        // Cerrar todos los títulos y descripciones
        albumTitles.forEach(t => t.classList.remove('active'));
        albumDescriptions.forEach(d => d.classList.remove('active'));

        // Si no estaba activo, activarlo
        if (!isActive) {
            this.classList.add('active');
            description.classList.add('active');

            // Cargar el embed de Spotify correspondiente
            const spotifyId = spotifyAlbums[albumName];
            if (spotifyId) {
                loadSpotifyEmbed(spotifyId);
            }
        } else {
            // Si se deselecciona, limpiar el contenedor de Spotify
            spotifyContainer.innerHTML = '';
        }
    });
});

albumTitles[0].classList.add('active');
albumDescriptions[0].classList.add('active');
loadSpotifyEmbed(spotifyAlbums['astroworld']);


/*scripts del video */
const video = document.querySelector('video');
const btn = document.getElementById('toggleSound');

btn.addEventListener('click', () => {
    video.muted = !video.muted;
    btn.textContent = video.muted ? '🔇 Muted' : '🔊 Unmuted';
});

/* politica de privacidad del formulario*/

function showAlert(e) {
    e.preventDefault(); // Prevenir el envío del formulario
    document.getElementById('customAlert').classList.add('show');
    document.getElementById('alertOverlay').classList.add('show');
}

function closeAlert() {
    const customAlert = document.getElementById('customAlert');
    const alertOverlay = document.getElementById('alertOverlay');
    
    customAlert.classList.remove('show');
    alertOverlay.classList.remove('show');
}

function acceptPrivacy() {
    const form = document.getElementById('contactForm');
    
    // Cerrar la alerta
    closeAlert();
    
    // Mostrar mensaje de confirmación
    setTimeout(() => {
        alert('¡Gracias por aceptar nuestra política de privacidad!');
        
        // Limpiar el formulario
        if (form) {
            form.reset();
        }
    }, 300);
}

// Agregar el evento al formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', showAlert);
    }
    
    // Cerrar alerta al hacer clic en el overlay
    const overlay = document.getElementById('alertOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeAlert);
    }
});