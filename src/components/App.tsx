import {
  useEffect,
  useRef,
  unref,
  useMemo
} from '@tacopie/taco';
import Editor from './Editor';
import Frame from './Frame';
import defaultScript from '../defaultScript.txt';
import * as Taco from '@tacopie/taco';

import {
  useLocalState,
  useStyle,
} from '../hooks';

import {
  MaterialIcon as Icon
} from '@tacopie/ui';

const TopBtn = (props) => {
  const { color, children } = props || {};

  const styleRef = useStyle(() => ({
    color: `${unref(color) || '#cccbcc'}`,
    border: '0',
    outline: 'none',
    padding: '.25rem .5rem',
    cursor: 'pointer',
    'background-color': 'transparent',
    transition: '.1s all',
    '&:active': {
      color: '#fff',
      background: '#37373f',
    },
    '&:hover': {
      background: '#37373f',
    },
  }));

  return (<button ref={styleRef} {...props}>
  {children[0] || 'options'}
</button>);
};

const TopLinkBtn = ({ link = '', title = '' , children = []} = {}) =>  (<TopBtn
  title={title || link}
  onclick={() => window.open(link, '_blank')}
>
  {children[0]}
</TopBtn>);

const GithubBtn = () => {
  const elem = useRef(null);
  useEffect(() => {
    const [el] = [elem.value];
    if (!el) {
      return;
    }
    el.innerHTML = `<svg class="octicon octicon-mark-github v-align-middle" height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true" style="fill:#fff;"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`;
  });
  return <div ref={elem} />;
};

export const App = (props) => {
  const styleRef  = useStyle(() => ({
    width: '100vw',
    height: '100vh',
    'min-width': '640px',
    display: 'flex',
    'flex-flow': 'column',
    '& > header': {
      'background-color': 'rgb(30, 30, 30)',
      display: 'flex',
    },
    '& > div': {
      flex: 'auto',
      overflow: 'hidden',
      display: 'flex',
    },
  }));
  const content = useLocalState<string>('@tacopia/taco-playground', defaultScript);
  const editContent = useMemo(() => content.value);
  const syncContent = () =>
    // 这里是为了截断依赖捕获的逻辑，后续会提供 skip 元语
    setTimeout(() => (content.value = editContent.value), 1);
  const refrash = syncContent;

  return (<div ref={styleRef}>
      <header>
        <TopBtn title="Tacojs-playground"><Icon name="whatshot" /></TopBtn>
        <TopBtn>File</TopBtn>
        <TopBtn>Edit</TopBtn>
        <TopBtn color={'rgb(45, 181, 93)'} onclick={refrash}>Run</TopBtn>
        <TopBtn>Help</TopBtn>
        <div style={{ flex: 1, margin: 'auto' }}></div>
        <TopLinkBtn link="https://github.com/zhzLuke96/TacoJs">
          🌮
        </TopLinkBtn>
        <TopLinkBtn link="https://github.com/zhzLuke96/tacojs-playground">
          <GithubBtn />
        </TopLinkBtn>
      </header>
      <div>
        <Editor
          saveHandler={refrash}
          defaultValue={content}
          onchange={(t) => (editContent.value = t)}
        />
        <Frame content={content} />
      </div>
    </div>)
  ;
};

export default App;
