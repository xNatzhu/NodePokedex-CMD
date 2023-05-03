import { inquirerInput, inquirerMenu, inquirerPause, inquirerTareaListadoCheck} from "./helpers/inquirer.js"
import colors from "colors";
import Busqueda from "./models/busqueda.js";
import terminalImage from 'terminal-image';
import got from 'got';
import Listado from "./models/listado.js";
import Table from 'cli-table';
import boxen from 'boxen';

const main = async()=>{
    let opt;

    //Instancia

    const busqueda = new Busqueda();
    const listado = new Listado()

    busqueda.leerDb()

    const table = new Table({
        head: ["ID", "Nombre", "Tipo", "Peso", "Altura", "Descripción"],
        style: {
            head: ["cyan"],
            border: ["cyan"],
        }
    });
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostar Mensaje:
                /*Por medio de un input leera que tipo de pokemon esta buscando*/

                const pokemonNombre = await inquirerInput("Pokemon: ")
                const poke = await busqueda.nombrePokemon(pokemonNombre)
                
                if(poke){
                    busqueda.agregarHistorial(poke)
                    const body = await got(`${poke.img}`).buffer();
                    //Mostrar Resultados:
                    
                    console.log(await terminalImage.buffer(body))
                    console.log(boxen('Informacion de pokemon', {padding: 1}));
                    table.push(
                        [poke.id.toString().green, poke.name, poke.type, poke.weight, poke.height, poke.description]
                      );
                    console.log(table.toString());
                    table.length = 0;
                }
                break;
        
            case 2:
                busqueda.historial.forEach((pokemon,id)=>{
                    const idx = `${id + 1}.`.green
                    console.log(`${idx} ${pokemon.name}`);
                })
                break;

            case 3:
                const listadoPokemon = await listado.listadoPokemon()
                const listadoOpcionesPokemon = await inquirerTareaListadoCheck(listadoPokemon)
                const pokemonListadoResultado = await busqueda.nombrePokemon(listadoOpcionesPokemon.id)

                busqueda.agregarHistorial(pokemonListadoResultado);

                const bodyPokemonListado = await got(`${pokemonListadoResultado.img}`).buffer();

                //Mostrar Resultados:
                
                console.log(await terminalImage.buffer(bodyPokemonListado))
                console.log(boxen('Informacion de pokemon', {padding: 1}));
                table.push(
                    [pokemonListadoResultado.id.toString().green, pokemonListadoResultado.name, pokemonListadoResultado.type, pokemonListadoResultado.weight, pokemonListadoResultado.height, pokemonListadoResultado.description]
                  );
                console.log(table.toString());
                table.length = 0;
                break
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()