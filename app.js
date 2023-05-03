import { inquirerInput, inquirerMenu, inquirerPause, inquirerTareaListadoCheck} from "./helpers/inquirer.js"
import colors from "colors";
import Busqueda from "./models/busqueda.js";
import terminalImage from 'terminal-image';
import got from 'got';
import Listado from "./models/listado.js";

const main = async()=>{
    let opt;

    //Instancia

    const busqueda = new Busqueda();
    const listado = new Listado()

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostar Mensaje:
                /*Por medio de un input leera que tipo de pokemon esta buscando*/

                const pokemonNombre = await inquirerInput("Pokemon: ")
                const poke = await busqueda.nombrePokemon(pokemonNombre)
                const body = await got(`${poke.img}`).buffer();

                //Mostrar Resultados:
                
                console.log(await terminalImage.buffer(body))
                console.log("         Informacion de Pokemon      \n".cyan);
                console.log(colors.cyan("Nombre: "), colors.green(poke.name));
                console.log(colors.cyan("Id: "), colors.green(poke.id));
                console.log(colors.cyan("Peso: "), colors.green(poke.weight));
                console.log(colors.cyan("Tamaño: "), colors.green(poke.height));
                console.log(colors.cyan("Tipo: "), colors.green(poke.type));
                console.log(colors.cyan("Descripcion: "), colors.green(poke.description));
                break;
        
            case 2:
                console.log("Segunda opcion");
                break;
            case 3:
                const listadoPokemon = await listado.listadoPokemon()
                const listadoOpcionesPokemon = await inquirerTareaListadoCheck(listadoPokemon)
                const pokemonListadoResultado = await busqueda.nombrePokemon(listadoOpcionesPokemon.id)
                const bodyPokemonListado = await got(`${pokemonListadoResultado.img}`).buffer();

                //Mostrar Resultados:
                
                console.log(await terminalImage.buffer(bodyPokemonListado))
                console.log("         Informacion de Pokemon      \n".cyan);
                console.log(colors.cyan("Nombre: "), colors.green(pokemonListadoResultado.name));
                console.log(colors.cyan("Id: "), colors.green(pokemonListadoResultado.id));
                console.log(colors.cyan("Peso: "), colors.green(pokemonListadoResultado.weight));
                console.log(colors.cyan("Tamaño: "), colors.green(pokemonListadoResultado.height));
                console.log(colors.cyan("Tipo: "), colors.green(pokemonListadoResultado.type));
                console.log(colors.cyan("Descripcion: "), colors.green(pokemonListadoResultado.description));
                break
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()