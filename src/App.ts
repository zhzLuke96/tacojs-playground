import { html, useState, useStyle, Icon, useLocalState } from '@tacopie/taco';
import Editor from './Editor';
import Frame from './Frame';

const _v = (v) => v?.value || v;

const RunBtn = (props, children) => {
  const { color } = props || {};

  const {
    styleRef
  } = useStyle({
    'font-weight': 100,
    color: `${_v(color) || '#cccbcc'}`,
    border: '0',
    outline: 'none',
    padding: '.25rem .5rem',
    cursor: 'pointer',
    'background-color': 'transparent',
    transition: '.1s all',
    '&:active': {
      color: '#fff',
      background: '#37373f'
    },
    '&:hover': {
      background: '#37373f',
    }
  })

  return html`<button ref=${[styleRef]} ...${props}>${children || 'options'}</button>`
}

export const App = (props, children) => {
  const {
    styleRef
  } = useStyle({
    width: '100vw',
    height: '100vh',
    'min-width': '640px',
    display: 'flex',
    'flex-flow': 'column',
    '> header': {
      'background-color': 'rgb(30, 30, 30)',
      display: 'flex',
    },
    '> div': {
      flex: 'auto',
      overflow: 'hidden',
      display: 'flex',
    }
  })
  const iframe_script = useLocalState('@tacopia/taco-playground', `console.log('hello world')`);
  const [, , content] = useState(() => iframe_script.value);
  return html`
    <div ref=${[styleRef]}>
      <header>
        <${RunBtn} ><${Icon} name='whatshot' /><//>
        <${RunBtn} >File<//>
        <${RunBtn} >Edit<//>
        <${RunBtn} color=${'rgb(45, 181, 93)'} onclick=${() => iframe_script.value = content.value}>Run<//>
        <${RunBtn} >Help<//>
      </header>
      <div>
        <${Editor} defaultValue=${content} onchange=${(t) => content.value = t} />
        <${Frame} content=${iframe_script} />
      </div>
    </div>
  `;
};

export default App;
