/**
 * eg
 *
*/

import { useRef, html, useEffect } from "@tacopie/taco";
import { isEqual } from "lodash";

// 简易的vdom
// tree2text({
//     tag: 'html',
//     lang: 'en',
//     children: [{
//         tag: 'head',
//         children: [{
//             tag: 'script',
//             src: 'https://unpkg.com/@tacopie/taco'
//         }]
//     },{
//         tag: 'body',
//         children: [{
//             tag: 'div',
//             id: 'root',
//             children: ['']
//         }, {
//             tag: 'script',
//             type: 'text/javascript'
//         }]
//     }]
// })
export const makeBlobFromTree = (tree) => {
    const html = tree2text(tree);
    return makeBlobFromText(html);
};

export const makeBlobFromText = (html, type = "text/html") => {
    const blob = new Blob([html], { type });
    return window.URL.createObjectURL(blob);
};

// 释放blob资源
export const revokeBlob = (uri) => window.URL.revokeObjectURL(uri);

// 挂在关闭标签事件
export const onWindowClose = (callback) => {
    if (typeof callback !== "function") {
        return;
    }
    window.addEventListener("beforeunload", callback);
    window.addEventListener("unload", callback);
};

const tree2text = (tree) => {
    const isNoEmpty = (o) => o && (o.length || Object.keys(o).length);
    const isEmpty = (o) => !isNoEmpty(o);
    const isStr = (o) => typeof o === "string" || o instanceof String;
    if (isStr(tree)) {
        return `${tree}`;
    }
    const { tag = "i", children = [], props = {}, ...otherProps } = tree;
    const propsText = Object
        .entries({ ...props, ...otherProps })
        .map(([k, v]) => v === false
            ? ""
            : `${k}${v
                ? `="${v}"`
                : ""}`)
        .join(" ")
        .trim();
    if (isEmpty(children)) {
        return `<${tag}${propsText ? " " : ""}${propsText}/>`;
    }
    return `<${tag}${propsText ? " " : ""}${propsText}>${children.map(tree2text).join("")}</${tag}>`;
};

export const _v = (v) => v?.value || v;

// like React.memo
export const Memo = (component, isEqual = (prev, curr) => true) => {
    return (props, children) => {
        const rendered = useRef(() => component(props, children));
        const prevProps = useRef(() => props);
        useEffect(() => {
            prevProps.value = props;
        })
        if (!isEqual(prevProps, props)) {
            return rendered.value = component(props, children);
        }
        return rendered.value;
    }
}
