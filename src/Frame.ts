import { html, useEffect, useRef, useState, useStyle } from "@tacopie/taco";
import { makeBlobFromTree, onWindowClose, revokeBlob } from "./utils";

const unpkgURL = "https://unpkg.com/@tacopie/taco";

export const Frame = (props, children) => {
    const { content } = props || {};
    const {
        styleRef,
    } = useStyle({
        "width": "50%",
        "height": "100%",
        "display": "flex",
        "flex-flow": "column",
        "border": "0",
        "background": "#fff",
    });

    const iframe = useRef(null as null | HTMLIFrameElement);

    onWindowClose(() => {
        const [ifr] = [iframe?.value];
        if (!ifr) {
            return;
        }
        if ((ifr.src || "").startsWith("blob:")) {
            revokeBlob(ifr.src);
        }
    });

    useEffect(() => {
        const [ifr, innerScript] = [iframe?.value, content?.value];
        if (!ifr) {
            return;
        }
        if ((ifr.src || "").startsWith("blob:")) {
            revokeBlob(ifr.src);
        }
        ifr.src = makeBlobFromTree({
            tag: "html",
            lang: "en",
            children: [{
                tag: "head",
                children: [{
                    tag: "script",
                    src: unpkgURL,
                    children: [""],
                }],
            }, {
                tag: "body",
                children: [{
                    tag: "div",
                    id: "root",
                    children: [""],
                }, {
                    tag: "script",
                    type: "text/javascript",
                    children: [innerScript || ""],
                }],
            }],
        });
    });

    return html`<div ref=${[styleRef]}>
    <iframe ref=${[iframe]} style=${{
            width: "100%",
            flex: 1,
            display: "inline-block",
            border: "0",
        }}></iframe>
        <footer>
            [TODO]: console / mocker / loading / something link
        </footer>
    </div>`;
};

export default Frame;
