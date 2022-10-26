class Producto{
    constructor(id,nombre,img,description){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.description = description;
    }
}
const menus = [];
menus.push(new Producto(1,"Hamburguesas","ImgIndex/hamburguesa.jpg","Las mejores hamburguesas de la mano de KingFood"));
menus.push(new Producto(2,"Sandwich","ImgIndex/sandwich.jpg","Gran variedad de sandwich y los mejores sabores en KingFood"));
menus.push(new Producto(3,"Pizzas","ImgIndex/pizza.jpg","La mejor massa de pizza y los mejores sabores en KingFood"));
menus.push(new Producto(4,"Veggie","ImgIndex/ensalada.jpg","Las mejores ensaldas las encontras en KingFood"));


let espacioReservado = document.getElementById("categorias");

productosHTML(menus);

function productosHTML(menus) {
    espacioReservado.innerHTML="";
    for (const menu of menus) {
        let divProd = document.createElement("div");
        divProd.classList.add("col");
        divProd.innerHTML=` <div class="cardIndex text-dark bg-warning mb-3" style="width: 18rem;">
                              <img src="${menu.img}" width="200px" heigth="200px" class="card-img-top" alt="...">
                              <div class="card-body">
                                <h5 class="card-title nombre">${menu.nombre}</h5>
                                <p class="card-text">${menu.description}</p>
                              </div>
                              <button id=${menu.id} class="btnSeccion btn btn-dark rounded-pill botonIndex">Ver Opciones</button>
                            </div>`;
       espacioReservado.append(divProd);
    }
    botonHTML();
}

setTimeout(()=>{
    Toastify({
        text: "¿SUSCRIBITE PARA CONOCER LAS ULTIMAS NOVEDADES?",
        duration: 10000,
        destination: `../formulario.html`,
        newWindow: true,
        close: true,
        gravity: "bottom",
        style: {
            background: "radial-gradient(circle, rgba(228,81,13,0.9948354341736695) 0%, rgba(182,240,16,0.908000700280112) 95%)",
          }
        }).showToast()
},20000)

// setTimeout(() =>{
//     Toastify({
//         text: "¿NECESITAS AYUDA?",
//         duration: 3000,
//         onClick: function () {
//             console.log("AYUDA");
//         }
//         }).showToast();
// },20000)



function botonHTML() {
    const botones = document.getElementsByClassName("btnSeccion");
    for (const boton of botones) {
        boton.addEventListener("click", function () {
            console.log(this.id);
            let menu = menus.find(menu => menu.id == this.id)
            Toastify({
                text: `Click para ir a la categoria: ${menu.nombre}`,
                duration: 3000,
                destination: `../secciones/${menu.nombre}.html`,
                newWindow: true,
                close: true,
                style: {
                    background: "radial-gradient(circle, rgba(228,81,13,0.9948354341736695) 0%, rgba(182,240,16,0.908000700280112) 95%)",
                  }
                }).showToast()
        })
    }
}