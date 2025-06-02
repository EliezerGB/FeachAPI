//URL de la API
const API_URL = 'https://retoolapi.dev/GDslAx/Expo';

//Funcion para llamar a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta de el servidor 
    const res = await fetch(API_URL);

    //respuesta de el servidor a formato JSON
    const data = await res.json(); //esto ya es JSON y ya podemos usar la funcion de crear la tabla

    CrearTabla(data); //Enviamos el JSON a la funcion "CrearTabla".
}

//crear funcion que creara las filas de la tabla en base a los registros que vinen de la API
function CrearTabla(datos){ //Datos que representa a el JSON que viene De la API
    //se llama "tbody" denytro de la tabla con id "tabla"

    const tabla = document.querySelector("#tabla tbody");
        //para inyectar codigo HTML usamos "innerHTML"
        tabla.innerHTML = "";

        datos.forEach(persona  => {
            tabla.innerHTML +=  `
                <tr>
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.apellido}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.correo}</td>

                    <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                    </td>
                </tr>
            `
        });     //por cada elemento de el JSON va a pasar algo (FOREACH  (para cada)) , el inner.HTML nos permite inyectar la tabla
}   

ObtenerPersonas();



//proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnagregar = document.getElementById("btnAbrirModal");
const cerrarFormulario = document.getElementById("btnCerrarModal");

btnagregar.addEventListener("click", ()=>{
    modal.showModal();
});


cerrarFormulario.addEventListener("click", ()=>{
    modal.close(); //cerrar modal
});

//agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e =>{
    e.preventDefault(); //"e" representa el evento submit que evita que el formulario se envie

    //capturamos los valores de el formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();



    //validacion basica
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos");
        return;
    }

    //llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado exitosamente");

        //limpiar formulario
        document.getElementById("frmAgregarIntegrante").reset();

        //cerrar el formulario despues de a verlo limpiado
        modal.close();

        //recargar tabla
        ObtenerPersonas();
    }
    else{
        alert("hubo un error al intentar agregar el integrante");
    }

});//fin de el formulario
