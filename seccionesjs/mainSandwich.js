fetch("../datos/sandwich.json")
.then((respusta) => respusta.json())
.then((datos) =>{
    console.log(datos);
    for (const dato of datos) {
        productos.push(new Producto(dato.id,dato.nombre,dato.precio,dato.descripcion,dato.img,dato.cantidad))
    }
    productosHTML(productos)
})
.catch((mensaje) => console.log(mensaje));

productosHTML(productos);

confirmar.onclick = () =>{

    carrito.splice(0,carrito.length);
    localStorage.clear();

    comprarProductos(carrito);

    let saldo = totalCompraProducto();
    saldoCliente -= saldo;

    saldoCompra(saldoCliente)
    .then((mensaje) =>{
        alertaMensaje(mensaje,"success")
    })
    .catch((mensaje) =>{
        alertaMensaje(mensaje,"error")
    })
}