import { render } from "@tacopie/taco";
import * as Taco from "@tacopie/taco";
import { App } from "./components/App";

window.onload = async () => {
  // if (
  //   1 ===
  //   (await loadScript(
  //     "https://unpkg.com/monaco-editor@latest/min/vs/loader.js",
  //     "https://unpkg.com/favicon.ico"
  //   ))
  // ) {
  //   await loadScript(
  //     "https://unpkg.zhimg.com/monaco-editor@latest/min/vs/loader.js"
  //   );
  // }
  // if (!(window as any).require) {
  //   return;
  // }
  // (window as any).require.config({
  //   paths: {
  //     vs: "https://unpkg.com/monaco-editor@latest/min/vs",
  //   },
  // });
  if ((window as any).loadScriptError !== 0) {
    return;
  }
  (document.querySelector(".spinner-mask") as HTMLDivElement).style.cssText =
    "display:none;";
  render(<App />, document.querySelector("#app"));
};
