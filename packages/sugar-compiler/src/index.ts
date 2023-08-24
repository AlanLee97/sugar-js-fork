import {isArray} from "@sugar/sugar-shared";
import {baseCompile} from "./compile";


export function sugarCompiler(template) {

    function compile(template = '') {
        const astEX = baseCompile(template)
        return createFunction(astEX);
    }


    function createFunction(code = '') {
        return new Function(`
            with(this) {
              return ${code};
            }
        `)
    }

    return compile(template)

}