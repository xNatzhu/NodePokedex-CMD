import { inquirerInput, inquirerMenu, inquirerPause} from "./helpers/inquirer.js"
import colors from "colors";
import Busqueda from "./models/busqueda.js";

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

                //Mostrar Resultados:

                console.log("\nInformacion de Pokemon\n".cyan);
                console.log("Imagen: ", poke.img);
                console.log("Nombre: ",poke.name);
                console.log("Id: ", poke.id);
                console.log("Peso: ", poke.weight);
                console.log("Tamaño: ", poke.height);
                console.log("Tipo: ", poke.type);
                console.log("Descripcion: ", poke.description);
                break;
        
            case 2:
                console.log("Segunda opcion");
                break;
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()