class Producto {
    constructor(id,nombre,precio,descripcion,img,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.img = img;
        this.cantidad = cantidad;
    }
    addCantidad(){
        this.cantidad++;
    }
    agregarCantidad(valor){
     this.cantidad += valor;
    }
    subTotal(){
       return this.precio * this.cantidad;
    }
}