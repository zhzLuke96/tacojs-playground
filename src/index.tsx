import {render} from '@tacopie/taco';
import * as Taco from '@tacopie/taco';
import {App} from './components/App';

const $ = document.querySelector.bind(document);

render(<App />, $('#app'));
