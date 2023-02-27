const productos = [
    // Actron
    {
        id: "actron-01",
        titulo: "Actron 400",
        imagen: "./img/Actron/Actron-400.png",
        categoria: {
            nombre: "Actron",
            id: "actron",
        },
        precio: 430
    },
    {
        id: "actron-02",
        titulo: "Actron 600",
        imagen: "./img/Actron/Actron-600.png",
        categoria: {
            nombre: "Actron",
            id: "actron",
        },
        precio: 685
    },
    {
        id: "actron-03",
        titulo: "Actron Plus",
        imagen: "./img/Actron/Actron-plus.png",
        categoria: {
            nombre: "Actron",
            id: "actron",
        },
        precio: 550
    },
    {
        id: "actron-04",
        titulo: "Actron Gel",
        imagen: "./img/Actron/Actron-gel.png",
        categoria: {
            nombre: "Actron",
            id: "actron",
        },
        precio: 925
    },
    {
        id: "actron-05",
        titulo: "Actron Pediatrico 2%",
        imagen: "./img/Actron/Actron-pediatrico.png",
        categoria: {
            nombre: "Actron",
            id: "actron",
        },
        precio: 1030
    },
    // Ibupirac
    {
        id: "ibupirac-01",
        titulo: "Ibupirac 400",
        imagen: "./img/Ibupirac/Ibupirac-400.png",
        categoria: {
            nombre: "Ibupirac",
            id: "ibupirac",
        },
        precio: 530
    },
    {
        id: "ibupirac-02",
        titulo: "Ibupirac 600",
        imagen: "./img/Ibupirac/Ibupirac-600.png",
        categoria: {
            nombre: "Ibupirac",
            id: "ibupirac",
        },
        precio: 785
    },
    {
        id: "ibupirac-03",
        titulo: "Ibupirac Fem",
        imagen: "./img/Ibupirac/Ibupirac-fem.png",
        categoria: {
            nombre: "Ibupirac",
            id: "ibupirac",
        },
        precio: 550
    },
    {
        id: "ibupirac-04",
        titulo: "Ibupirac Flex 600",
        imagen: "./img/Ibupirac/Ibupirac-flex-600.png",
        categoria: {
            nombre: "Ibupirac",
            id: "ibupirac",
        },
        precio: 830
    },
    {
        id: "ibupirac-05",
        titulo: "Ibupirac Plus Max",
        imagen: "./img/Ibupirac/Ibupirac-plus-max.png",
        categoria: {
            nombre: "Ibupirac",
            id: "ibupirac",
        },
        precio: 1080
    },
    // Ibu
    {
        id: "ibu-01",
        titulo: "Ibu 400",
        imagen: "./img/Ibu/Ibu-400.png",
        categoria: {
            nombre: "Ibu",
            id: "ibu",
        },
        precio: 330
    },
    {
        id: "ibu-02",
        titulo: "Ibu 600",
        imagen: "./img/Ibu/Ibu-600.png",
        categoria: {
            nombre: "Ibu",
            id: "ibu",
        },
        precio: 462
    },
    {
        id: "ibu-03",
        titulo: "IbuEvanbol",
        imagen: "./img/Ibu/IbuEvanol.png",
        categoria: {
            nombre: "Ibu",
            id: "ibu",
        },
        precio: 500
    },
    {
        id: "ibu-04",
        titulo: "IbuEvanol Forte",
        imagen: "./img/Ibu/IbuEvanol-forte.png",
        categoria: {
            nombre: "Ibu",
            id: "ibu",
        },
        precio: 635
    },
    {
        id: "ibu-05",
        titulo: "IbuEvanol Max",
        imagen: "./img/Ibu/IbuEvanol-max.png",
        categoria: {
            nombre: "Ibu",
            id: "ibu",
        },
        precio: 840
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
        cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }
    });
})


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}