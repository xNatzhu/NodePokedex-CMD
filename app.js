import { inquirerInput, inquirerMenu, inquirerPause} from "./helpers/inquirer.js"
import colors from "colors";


const main = async()=>{
    let opt;
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostar Mensaje:
                /*Por medio de un input leera que tipo de pokemon esta buscando*/

                const pokemonNombre = await inquirerInput("Pokemon: ")
                console.log(pokemonNombre);

                //Mostrar Resultados:

                console.log("\nInformacion de Pokemon\n".cyan);

                console.log("Nombre: ");
                console.log("Peso: ");
                console.log("Tamaño: ");
                console.log("Descripcion: ");
                break;
        
            case 2:
                console.log("Segunda opcion");
                break;
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()