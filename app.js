import { inquirerInput, inquirerMenu, inquirerPause} from "./helpers/inquirer.js"
import colors from "colors";
import Busqueda from "./models/busqueda.js";
import terminalImage from 'terminal-image';
import got from 'got';

const main = async()=>{
    let opt;
    const busqueda = new Busqueda();

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
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()