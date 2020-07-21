import {
  html,
  Icon,
  useEffect,
  useLocalState,
  useRef,
  useState,
  useStyle,
} from "@tacopie/taco";
import Editor from "./Editor";
import Frame from "./Frame";
import { _v } from "./utils";
import defaultScript from "./defaultScript.txt";

const RunBtn = (props, children) => {
  const { color } = props || {};

  const { styleRef } = useStyle({
    "font-weight": 100,
    "color": `${_v(color) || "#cccbcc"}`,
    "border": "0",
    "outline": "none",
    "padding": ".25rem .5rem",
    "cursor": "pointer",
    "background-color": "transparent",
    "transition": ".1s all",
    "&:active": {
      color: "#fff",
      background: "#37373f",
    },
    "&:hover": {
      background: "#37373f",
    },
  });

  return html`<button ref=${[styleRef]} ...${props}>
    ${children || "options"}
  </button>`;
};

export const App = (props, children) => {
  const { styleRef } = useStyle({
    "width": "100vw",
    "height": "100vh",
    "min-width": "640px",
    "display": "flex", "flex-flow": "column",
    "> header": {
      "background-color": "rgb(30, 30, 30)",
      "display": "flex",
    },
    "> div": {
      flex: "auto",
      overflow: "hidden",
      display: "flex",
    },
  });
  const content = useLocalState(
    "@tacopia/taco-playground",
    defaultScript,
  );
  const [, , editContent] = useState(() => content.value);
  const syncContent = () =>
    // 这里是为了截断依赖捕获的逻辑，后续会提供 skip 元语
    setTimeout(() => (content.value = editContent.value), 1);
  const refrash = syncContent;

  return html`
    <div ref=${[styleRef]}>
      <header>
        <${RunBtn}><${Icon} name="whatshot" /><//>
        <${RunBtn}>File<//>
        <${RunBtn}>Edit<//>
        <${RunBtn} color=${"rgb(45, 181, 93)"} onclick=${refrash}>Run<//>
        <${RunBtn}>Help<//>
      </header>
      <div>
        <${Editor}
          saveHandler=${refrash}
          defaultValue=${content}
          onchange=${(t) => (editContent.value = t)}
        />
        <${Frame} content=${content} />
      </div>
    </div>
  `;
};

export default App;
