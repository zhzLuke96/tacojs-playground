import { html, useState, useStyle, useEffect, useRef } from '@tacopie/taco';
import debounce from 'lodash/debounce';

const unpkgURL = 'https://unpkg.com/@tacopie/taco';

const injectScript = debounce((body: HTMLElement, script: string) => {
    body.innerHTML = `<div id='root'></div>`;
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.text = script;
    body.appendChild(scriptElem);
}, 500)

const injectImportScript = (head: HTMLHeadElement, src: string) => {
    const scripts = Array.from(head.querySelectorAll('script'));
    for (const scr of scripts) {
        if (scr.src === src) {
            return
        }
    }
    const scriptElem = document.createElement('script');
    scriptElem.src = src;
    scriptElem.type = 'text/javascript';
    head.appendChild(scriptElem);
}

export const Frame = (props, children) => {
    const { refrashHandler } = props || {};
    const {
        styleRef
    } = useStyle({
        width: '50%',
        height: '100%',
        display: 'flex',
        'flex-flow': 'column',
        border: '0',
    })

    const iframe = useRef(null as null | HTMLIFrameElement);

    useEffect(() => {
        const [ifr] = [iframe?.value];
        if (!ifr) {
            return
        }
        if (ifr.contentDocument?.head) {
            injectImportScript(ifr.contentDocument.head, unpkgURL);
        }
        refrashHandler.value = (script) => {
            ifr.src = 'about:blank'; // refrash
            setTimeout(() => {
                injectImportScript(ifr.contentDocument.head, unpkgURL);
                injectScript(ifr.contentDocument.body, script);
            }, 1)
        }
    })

    return html`<div ref=${[styleRef]}>
    <iframe ref=${[iframe]} style=${{
            width: '100%',
            flex: 1,
            display: 'inline-block',
            border: '0'
        }}></iframe>
        <footer>
            [TODO]: console / mocker / loading / something link
        </footer>
    </div>`;
};

export default Frame;
