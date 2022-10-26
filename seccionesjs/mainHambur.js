fetch("../datos/hamburguesa.json")
.then((respuesta) => respuesta.json())
.then((datos) =>{
    console.log(datos);
    for (const dato of datos) {
        productos.push(new Producto(dato.id,dato.nombre,dato.precio,dato.descripcion,dato.img,dato.cantidad));
    }
    productosHTML(productos);
})
.catch((mensaje) => console.log(mensaje));

productosHTML(productos);

confirmar.onclick = () =>{
    
    carrito.splice(0,carrito.length);
    localStorage.clear();

    let saldo = totalCompraProducto();
    saldoCliente -= saldo;

    comprarProductos(carrito);

    saldoCompra(saldoCliente)
    .then((mensaje) =>{
        alertaMensaje(mensaje,"success")
    })
    .catch((mensaje) =>{
        alertaMensaje(mensaje,"error")
    })
}