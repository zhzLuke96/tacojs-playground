import { html, useState, useStyle, useEffect, useRef } from '@tacopie/taco';
import debounce from 'lodash/debounce';

const injectScript = debounce((body: HTMLElement, script: string) => {
    body.innerHTML = `<div id='root'></div>`;
    const scriptElem = document.createElement('script');
    scriptElem.type = 'text/javascript';
    scriptElem.text = script;
    body.appendChild(scriptElem);
}, 500)

export const Frame = (props, children) => {
    const { content } = props || {};
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
        const [ifr, script] = [iframe?.value, content?.value];
        if (!ifr) {
            return
        }
        if (ifr.contentDocument?.body) {
            injectScript(ifr.contentDocument.body, script);
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
