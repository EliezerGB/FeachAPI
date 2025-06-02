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