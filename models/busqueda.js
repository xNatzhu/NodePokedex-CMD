import axios from 'axios';

class Busqueda{
    constructor(){

    }
    async nombrePokemon(pokemon){
        //Va recibir el HTTP. https://pokeapi.co/api/v2/pokemon/ -- https://pokeapi.co/api/v2/berry/{id or name}/

        /*La libreria de axios nos permite una funcionalidad llamada create, que nos permite subdividir el url que estamos teniendo. 
        
        Algunas de las funcionalidades que ofrece axios.create son:

        - Configurar una URL base para todas las solicitudes HTTP que se realicen con la instancia creada.
        - Configurar cabeceras personalizadas que se añadirán a todas las solicitudes HTTP que se realicen con la instancia creada.
        - Configurar un tiempo de espera por defecto para todas las solicitudes HTTP que se realicen con la instancia creada.
        - Configurar la autenticación por defecto para todas las solicitudes HTTP que se realicen con la instancia creada.
        - Compartir una instancia de Axios personalizada entre distintos módulos de una aplicación para evitar la duplicación de código.
        
        */


        console.log(pokemon);
        try {
            const instancia = axios.create({
                baseURL:`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`,//En este se añadira la base del url estatico.
                //Este sirve para añadir los parametros de la url que puede contener.
                /*
                para los parametros --"params"-- sirve para añadir todo los parametros de la url que va tener, por ejemplo limite, token, lenguaje.
                params{
                    "limit":25,
                }
                */

            })
            const url = await instancia.get();
            //const pokemonDescription = pokemonSpeciesData.data.flavor_text_entries[0].flavor_text;

            console.log(url.data);
        } catch (error) {
            console.log(error);
        }

        return []; //Va retonar un arreglo de todo los pokemones que cohicidan con la busqueda.
    }
}

export default Busqueda