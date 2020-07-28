import { html, useEffect, useRef, hox } from "@tacopie/taco";
import { Memo } from "./utils";

const {
    useStyle
} = hox;

const loadEditor = () => new Promise((resolve, reject) => {
    (window as any).require(["vs/editor/editor.main"], function () {
        resolve((window as any).monaco);
    });
});

export const Editor = (props, children) => {
    const { defaultValue = "", onchange, saveHandler } = props || {};
    const {
        styleRef,
    } = useStyle({
        "max-width": "640px",
        "width": "50%",
        "height": "100%",
        "display": "inline-block",
    });
    console.log()
    const editorRef = useRef(null as any);
    const elemRef = useRef(null as any);
    useEffect(async () => {
        const [editor, elem, defVal] = [editorRef?.value, elemRef?.value, defaultValue?.value];
        if (!elem || editor) {
            return;
        }
        const monaco = await loadEditor() as any;
        const $editor = monaco.editor.create(elem, {
            value: defVal,
            language: "javascript",
            theme: "vs-dark",
            automaticLayout: true,
            wordWrap: "on",
            wrappingIndent: "indent",
        });
        editorRef.value = $editor;
        onchange && $editor.onDidChangeModelContent(() => onchange($editor.getValue()));

        $editor.addAction({
            id: "save",
            label: "SAVE",
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
            ],
            precondition: null,
            keybindingContext: null,
            contextMenuGroupId: "navigation",
            contextMenuOrder: 1.5,
            run(ed) {
                saveHandler(ed);
                return null;
            },
        });
    });
    return html`<div ref=${[styleRef, elemRef]}></div>`;
};

export default Editor;
