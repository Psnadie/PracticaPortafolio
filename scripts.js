const albumItems = document.querySelectorAll('.albums-titulo ul li');

albumItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remover la clase 'selected' de todos los items
        albumItems.forEach(i => i.classList.remove('selected'));
        
        // Añadir la clase 'selected' al item clickeado
        this.classList.add('selected');
    });
});