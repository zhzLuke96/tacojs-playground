import { html, mount } from "@tacopie/taco";
import { App } from "./App";

const $ = document.querySelector.bind(document);

mount($("#app"), html`<${App}>Hello World.<//>`);
