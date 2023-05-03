import axios from 'axios';
import colors from "colors";

class Listado{

    constructor(){

    }
    async listadoPokemon(){
        try {
            const instancia = axios.create({
                baseURL:`https://pokeapi.co/api/v2/pokemon/`,//En este se añadira la base del url estatico.
                params:{
                    "limit":898,
                }

            })
            const response = await instancia.get();
            const pokemonListado = response.data.results

            return pokemonListado

        } catch (error) {
            console.error(error);
        }
    }
    

}

export default Listado
