class Mountain {
    constructor(marca, rodado, precio) {
        this.marca = marca;
        this.rodado = rodado;
        this.precio = precio;
        this.imagen = "";
    }
}

const mountains = [
    new Mountain("RAPTOR", 29, 150000),
    new Mountain("CRAZY", 26, 145000),
    new Mountain("BMZ", 29, 200000),
    new Mountain("REDM", 29, 500000),
    new Mountain("ORANG", 26, 400000),
    new Mountain("WONF", 29, 350000)
]

const carrito = [];

let botonAñadir = document.getElementsByClassName("btn-add-cart");

let price = document.getElementsByClassName("price");
let rodado = document.getElementsByClassName("rodado");






let raptor = document.getElementById("raptor-bike");

raptor.onclick = () => {
    
    carrito.push(mountains[0]);
    guardarCarritoEnLocalStorage();
   

};



let crazy = document.getElementById('crazy-bike');

crazy.onclick = () => {
    carrito.push(mountains[1]);
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

    let bmz = document.getElementById('bmz-bike');
    
    bmz.onclick = () => {
        carrito.push(mountains[2]);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    let redm = document.getElementById('redm-bike');

    redm.onclick = () => {
        carrito.push(mountains[3]);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    let orang = document.getElementById('orang-bike');
    orang.onclick = () => {
        carrito.push(mountains[4]);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }

    let wonf = document.getElementById('wonf-bike');
    wonf.onclick = () => {
        carrito.push(mountains[5]);
        guardarCarritoEnLocalStorage();
        actualizarCarrito();
    }



document.addEventListener("DOMContentLoaded", function () {
    let carrito = [];


   if (localStorage.getItem('carrito').length === null) {
    let carrito = [];
   } else {
    carrito = JSON.parse(localStorage.getItem('carrito')) 
    calcularTotal();
   }
    let totalCarrito = 0;

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }


    
    function actualizarCarrito() {
       
      
    
        carrito.forEach((producto) => {
            const listItem = document.createElement("li");
    
            const nombreProducto = document.createElement("span");
            nombreProducto.textContent = `${producto.marca}`;
    
            const precioProducto = document.createElement("span");
            precioProducto.textContent = ` - $${producto.precio.toFixed(2)}`;
    
            listItem.appendChild(nombreProducto);
            listItem.appendChild(precioProducto);

            calcularTotal();
            
        });
    
       
    }
    
    let botonVaciar = document.getElementById('limpiar-carrito');
botonVaciar.onclick = () => {
    carrito = [];
    localStorage.clear();
    localStorage.removeItem('carrito');
    const totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.textContent = `Total: $0.00`;
    carritoContenedor.innerHTML = "";
    carritoContenedor.textContent = "El carrito está vacío";

    Toastify({
        text: "¡haz vaciado tu carrito!",
        duration: 1500,
        gravity: 'top',
        position: 'right'
    }).showToast();
}

    
    
   

    
    const botonesAgregarAlCarrito = document.querySelectorAll(".btn-add-cart");
    botonesAgregarAlCarrito.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const producto = mountains[index];
            agregarAlCarrito(producto);
        });
    });
});

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
}



function mostrarCarritoEnDOM() {
    const carritoLista = document.getElementById("carrito-lista");
 

    if (carrito.length === 0) {
        
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "El carrito está vacío";
        
    } else {
       
        carrito.forEach((producto) => {
            const listItem = document.createElement("li");

            const nombreProducto = document.createElement("span");
            nombreProducto.textContent = `${producto.marca}`;

            const precioProducto = document.createElement("span");
            precioProducto.textContent = ` - $${producto.precio.toFixed(2)}`;

            listItem.appendChild(nombreProducto);
            listItem.appendChild(precioProducto);

            carritoLista.appendChild(listItem);
            calcularTotal();
            actualizarCarrito();
        });
    }
}


mostrarCarritoEnDOM();


let iconoCarrito = document.getElementById("icono-carrito");
let carritoModal = document.getElementById("carritoModal");


let carritoContenedor = document.getElementById("carritoContenedor");


let cerrarModalIcono = document.getElementById("cerrarModal");



iconoCarrito.addEventListener("click", function() {
 
  carritoModal.style.display = "block";

 
  let productosGuardados = localStorage.getItem('carrito');
  let productosRecuperados = JSON.parse(productosGuardados);
  
  
  

  
  carritoContenedor.innerHTML = "";
    
  if (productosRecuperados) {
    
    productosRecuperados.forEach(function(producto) {
        let productoDiv = document.createElement("div");
        productoDiv.textContent = producto.marca + " - Precio: $" + producto.precio;
        carritoContenedor.appendChild(productoDiv);
        calcularTotal();
    });
  } else {
    
    carritoContenedor.textContent = "El carrito está vacío";
  }

});


cerrarModalIcono.addEventListener("click", function() {
 
  carritoModal.style.display = "none";
});

function calcularTotal() {
    let total = 0;
    carrito.forEach(function(producto) {
        total += producto.precio;

       
    });

    const totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.textContent = `Total: $${total.toFixed(2)}`;
}

let botonTitle = document.getElementById("toastyBike");

botonTitle.onclick = () => {
    Toastify({

        text: "COMPRÁ EN BIKESHOP, COMPRÁ CALIDAD!",
        position: 'center',
        gravity: 'top',
        duration: 3000,
        backgroundColor: "green",
        
        }).showToast();
}

fetch('/data.json')
    .then(response => response.json())
    .then(data => {

      mountains.length = 0; 
      data.forEach(item => {
        const mountain = new Mountain(item.marca, item.rodado, item.precio);
        mountains.push(mountain);
      });

      
      actualizarCarrito();
    })
    