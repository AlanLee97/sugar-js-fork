import {Core} from "./types";
import {mountHandleList, clearMounted} from "../hooks/onMounted";
import {clearReactive} from "../reactive/reactive";
import {guid} from "../utils/guid";
import {sugarRender} from "@sugar/sugar-render";
import {baseCompile} from "@sugar/compiler-core";

function makeSugar(options: Core) {


    let data = options.bulk();
    const {mounted, updateComponent} = sugarRender();
    const vm = {
        _vnode: null,
        data: data,
        $el: null as any
    }

    function mount(el) {
        vm.$el = document.querySelector(`${el}`)
        mounted(vm, vm.$el, data);
    }

    return {
        mount,
        ...data
    }

}


export default makeSugar