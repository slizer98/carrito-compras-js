// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso); 

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []
        limpiarHTML();
    });
}


// Funciones
function agregarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado =e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        cursoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}

// Lee el contenido del HTML al que dimos click y extraer info
function leerDatosCurso(curso){

    // Crear objeto con el contenido del curso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    // Agregar elementos al arreglo de carrito
    console.log(articulosCarrito);
    carritoHTML()
}

// Muestra el carrito de compras en el HTML y llo limpia
function carritoHTML(){
    // Limpiar HTML 
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
            <td>
                <img src='${imagen}' width = 120>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td><input type="number" min="1" max="1000" value="${cantidad}" ></td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>
            
        
        `;
        // agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}