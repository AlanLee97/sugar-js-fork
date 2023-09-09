import { sugarCompiler } from '@sugar/sugar-compiler';
import { createEffect } from '../../../src/main';
import patchEx, { bindAttrAndEvent } from './patch';
import { escape2Html } from '@sugar/sugar-shared';

export function sugarRender () {
  let render = null;
  let components = [];

  function mounted (vm, el, data) {
    if (!(el instanceof HTMLElement)) {
      el = document.querySelector(el);
    }
    vm.$el = el;
    vm._vnode = el;
    components = vm.components;

    const serializer = new XMLSerializer();
    const htmlCode = escape2Html(serializer.serializeToString(vm.$el));

    render = sugarCompiler(htmlCode, components, data);
    updateComponent(vm, el, data);
  }

  function updateComponent (vm, el, data) {
    function update (vm, el) {
      Object.keys(data).forEach((key) => {
        vm[key] = data[key];
      });

      bindT(vm);

      createEffect(() => {
        const vnode = render.call(vm);
        bindAttrAndEvent(vm, vnode);
        patchEx(vm._vnode, vnode);
        vm._vnode = vnode;
      });
    }

    update(vm, el);
  }

  return {
    updateComponent,
    mounted
  };
}

function bindT (vm) {
  function _c (tag = 'div', data = {}, children = []) {
    return createElement(tag, data, children);
  }

  function _v (str) {
    // @ts-expect-error
    const vnode: any = new VNode();
    vnode.text = str;
    return vnode;
  }

  function _s (val) {
    return String(val);
  }

  function _e () {
    // @ts-expect-error
    return new VNode();
  }

  function _for (fun: Function, data: any) {
    const nodes = [];
    data.forEach((item, index) => {
      nodes.push({
        ...fun(item)
      });
    });
    return nodes;
  }

  vm._c = _c;
  vm._v = _v;
  vm._s = _s;
  vm._e = _e;
  vm._for = _for;
}

function createElement (tag = 'div', data = {}, children = []) {
  const createVNode = (tag = 'div', data = {}, children = []) => {
    const vnodeChildren = [];

    if (children && (children.length > 0)) {
      children.forEach((child) => {
        vnodeChildren.push(child);
      });
    }
    return new VNode(tag, data, vnodeChildren);
  };

  // render函数中执行_c，接收参数，创建vnode
  return createVNode(tag, data, children);
}

class VNode {
  private readonly tag: any;
  private readonly data: any;
  private readonly elm: undefined;
  private readonly context: undefined;
  private readonly text: undefined;
  private readonly key: undefined;

  constructor (tag?, data?, children?) {
    this.tag = tag;
    this.data = data;
    // @ts-expect-error
    this.children = children;
    this.elm = undefined;
    this.context = undefined;
    this.text = undefined;
    this.key = data?.attrs?.key;
  }
}
