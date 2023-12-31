// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
// cuando agregas un curso presioanando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

// elimina curos del carrito
    carrito.addEventListener('click', eliminarCurso);

// muestras los cursos del localStorage
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
})

// Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML(); /*limpia el HTML*/
    })
}

// funciones
    function agregarCurso(e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }  
}

// eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

// eliminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML(); /* iterar sobre el carrito y mostar su HTML */
    }
}

// lee el contenido del html
    function leerDatosCurso(curso) {
        // console.log(curso);

// crear un objeto con el contenido
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

// revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; /*retorna el objeto actulizado*/
            } else {
                return curso; /* retorna los objetos que no son los duplicados */
            }
        })
        articulosCarrito = [...cursos];
    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

// muestra el carrito de compras en el HTML
function carritoHTML() {

// Limpiar el HTML
    limpiarHTML();

// Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" "whidt= 100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </td>
        `;
// Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    });

    // agrega el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los cursos del tbody
function limpiarHTML() {

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}