class Contacto{
    constructor(id,nombre,apellido,telefono,email){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }
}

const contactos = [];

const formulario = document.getElementById("registroContactos");
const enviar = document.getElementById("enviar");

formulario.onsubmit = (e) =>{
    e.preventDefault();

    let hijos = formulario.children;
    contactos.push(new Contacto(hijos[0].value,hijos[1].value,hijos[2].value,hijos[3].value,hijos[4].value));

    e.target.reset();

    localStorage.setItem("listaContactos",JSON.stringify(contactos));
}

enviar.onclick= () =>{
    Swal.fire(
        'Gracias por registrarse',
        'Recibiras nuestras ultimas noticias',
        'success'
      )
}

const logo = document.getElementById("logo")