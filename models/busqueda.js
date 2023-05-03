import axios from 'axios';
import colors from "colors";

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
        const esLetra = /^[a-zA-Z]+$/.test(pokemon);
        const pokemonNombre = esLetra ? pokemon.toLowerCase() : pokemon;

        try {
            const instancia = axios.create({
                baseURL:`https://pokeapi.co/api/v2/pokemon/${pokemonNombre}/`,//En este se añadira la base del url estatico.
                //Este sirve para añadir los parametros de la url que puede contener.
                /*
                para los parametros --"params"-- sirve para añadir todo los parametros de la url que va tener, por ejemplo limite, token, lenguaje.
                params{
                    "limit":25,
                }
                */
            })
            
            const url = await instancia.get();
            const pokemonDescription = await axios.get(url.data.species.url);

            const idPokemon = url.data.id;
            const typePokemon = url.data.types.map(typeObj => typeObj.type.name);
            const phrasePokemon = pokemonDescription.data.flavor_text_entries.filter(phrase=> phrase.language.name == "es")


            const objPokemon = {
                name:url.data.name,
                id:idPokemon,
                img:url.data.sprites.front_default,
                weight:`${url.data.weight} Kg`,
                height:`${url.data.height} Cm`,
                type:typePokemon.join(" - "),
                description:phrasePokemon[Math.floor(Math.random() * phrasePokemon.length)].flavor_text
            }
            return objPokemon

            

        } catch (error) {
            console.log(error);
        }

        return []; //Va retonar un arreglo de todo los pokemones que cohicidan con la busqueda.
    }
}

export default Busqueda