import { inquirerInput, inquirerMenu, inquirerPause} from "./helpers/inquirer.js"
import colors from "colors";


const main = async()=>{
    let opt;
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                console.log("Primera opcion");
                break;
        
            case 2:
                console.log("Segunda opcion");
                break;
        }
        
        await inquirerPause()
    } while (opt !== 0);
}

main()