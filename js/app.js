const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listarProducto = document.querySelector('#lista-productos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas al carrito presiondo "Agregar al carrito"
    listarProducto.addEventListener('click', agregarProducto);

    //Elimina elementos del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Vaciar el carrito
    /*vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHtml();
    });*/
    vaciarCarrito.addEventListener('click', limpiarHtml);
}

//Funciones
// funcion que añade elementos al carrito
function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
     const productoSelecionado = e.target.parentElement.parentElement;
     leerDatos(productoSelecionado);
        console.log(e.target);
    }
}

//lee el contenido del html al click
function leerDatos(producto) {
    console.log(producto);

    //crear un objeto con el contenido actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //revisar si el elemento existe en el carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id);
    if (existe){

        //Actualiuzamos la cantidad
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; //retorna el objeto actualizado
            }else {
                return producto; //retorna el objeto anterior
            }
        })
        articulosCarrito = [...productos];

    } else {

        //Agregando elementos al arreglo del carrito
         articulosCarrito = [...articulosCarrito, infoProducto]
        
    }
    console.log(articulosCarrito);
    carritoHtml();
}

//Elimina elemento del carrito
function eliminarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const productoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);
        console.log(articulosCarrito);
        console.log("elimina"); 
        carritoHtml(); //itera sobre el carrito y muestra el Html
    }
}

//Muestra el carrito de compras en el Html
function carritoHtml() {

    //Limpiar el Html
    limpiarHtml();

    //recorre el carrito y genera Html
    articulosCarrito.forEach( producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td> 
                ${producto.titulo}
            </td> 
            <td>
                ${producto.precio}
            </td>
            <td>
                ${producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${producto.id}">X</a>
            </td>
        `; 

        //Agregar el Html del carrito en el body
        contenedorCarrito.appendChild(row);
    });

} 

//Eliminar los cursos del tbody
function limpiarHtml() {
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}