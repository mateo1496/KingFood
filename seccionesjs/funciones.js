function productosHTML(productos) {
    productoContenedor.innerHTML="";
    for (const producto of productos) {
        let divProd = document.createElement("div");
        divProd.classList.add("col");
        divProd.innerHTML=`<div class="cardFuncion" style="width: 25rem; margin-bottom: 35px; margin-left: 120px;">
                               <img src="${producto.img}" class="card-img-top" alt="...">
                               <div class="card-body">
                                  <h5 class="card-title text-center nombre">${producto.nombre}</h5>
                                  <p class="card-text text-center descripcionIndex">${producto.descripcion}</p>
                                  <p class="card-text text-center precio">$ ${producto.precio}</p>
                                  <button id="${producto.id}" class="btnCompra boton">COMPRAR</button>
                               </div>
                           </div>`;
        productoContenedor.append(divProd);
    }
    botonHTML();
}



const botones = document.getElementsByClassName("btnCompra");

function botonHTML() {
    for (const boton of botones) {
        boton.addEventListener("click",function () {
            let seleccion = carrito.find(producto => producto.id == this.id)

            if (seleccion) {
                seleccion.addCantidad();
            } else {
                seleccion = productos.find(producto => producto.id == this.id);
                carrito.push(seleccion);
            }
            console.log(carrito);

            comprarProductos(carrito);

            localStorage.setItem("listaCarrito", JSON.stringify(carrito));

            Toastify({
                text: `Hizo click en el producto ${seleccion.nombre}`,
                duration: 3000,
                style: {
                    background: "orange",
                  },
                }).showToast();
        })
    }
}

function totalCompraProducto() {
    let total = carrito.reduce((compraTotal, producto) => compraTotal += producto.subTotal(),0);
    totalCompra.innerHTML= "Total: $" + total;
    return total;
}

function comprarProductos(lista) {
    cantidadCarrito.innerHTML = lista.length;

    productoInterfaz.innerHTML="";
    for (const producto of lista) {
        let divCarrito = document.createElement("div");
        divCarrito.innerHTML=`
                              <table class="table table-dark">
                                 <thead>
                                    <h2 class="nombreModal">Producto: ${producto.nombre}</h2>
                                    <tr><span class="badge rounded-pill bg-dark botonModal">Precio $ ${producto.precio}</span></tr>
                                    <tr><span class="badge rounded-pill bg-dark botonModal">Cantidad: ${producto.cantidad}</span></tr>
                                    <tr><span class="badge rounded-pill bg-dark botonModal">SubTotal: ${producto.subTotal()}</span></tr>
                                </thead>
                              </table>      
                              <a id=${producto.id} class="btn btn-outline-warning btn-add">+</a>
                              <a id=${producto.id} class="btn btn-outline-warning btn-sub">-</a>
                              <a id=${producto.id} class="btn btn-outline-warning btn-delete">X</a>
                              </table>
                             `;
        productoInterfaz.append(divCarrito);
    }
    document.querySelectorAll(".btn-add").forEach(boton => boton.onclick = agregarProducto);
    document.querySelectorAll(".btn-sub").forEach(boton => boton.onclick = restarProducto);
    document.querySelectorAll(".btn-delete").forEach(boton => boton.onclick = eliminarProducto);
    totalCompraProducto();
}

function agregarProducto() {
    let producto = carrito.find(producto => producto.id == this.id)
    producto.agregarCantidad(1);
    this.parentNode.children[1].innerHTML="Cantidad: " + producto.cantidad;
    this.parentNode.children[2].innerHTML="SubTotal: " + producto.subTotal();
    comprarProductos(carrito);
    localStorage.setItem("listaCarrito", JSON.stringify(carrito));
}

function restarProducto() {
    let producto = carrito.find(producto => producto.id == this.id);
    if (producto.cantidad > 1) {
        producto.agregarCantidad(-1);
        this.parentNode.children[1].innerHTML="Cantidad: " + producto.cantidad;
        this.parentNode.children[2].innerHTML="SubTotal: " + producto.subTotal();
        localStorage.setItem("listaCarrito", JSON.stringify(carrito));
    }
    comprarProductos(carrito);
}

function eliminarProducto(e) {
    let ubicacion = carrito.findIndex(producto => producto.id == e.target.id);
    carrito.splice(ubicacion,1);
    comprarProductos(carrito);
    localStorage.setItem("listaCarrito", JSON.stringify(carrito));    
}

function saldoCompra(saldo) {
    return new Promise(function (aceptado, rechazado) {
        if (saldo > 0) {
            aceptado ("ACEPTADO")
        } else {
            rechazado ("RECHAZADO")
        }
    })
}

function alertaMensaje(mensaje,tipo) {
    Swal.fire(
        "Estado de compra",
        mensaje,
        tipo
      )
}

function vaciarCarrito() {
    localStorage.clear()

    carrito.splice(0,carrito.length);

    comprarProductos(carrito);

    totalCompra.innerHTML="Total: $" + 0;
}