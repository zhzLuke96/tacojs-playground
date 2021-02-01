import {useEffect, useRef, useWatch, useMemo} from '@tacopie/taco';

const VERSIONMAP = 'taco-playground-version-map';

const v = (x: any) => JSON.stringify(x);
const p = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (error) {
    return {};
  }
};

const isVersionExpired = (key: string, version?: number) => {
  if (localStorage.getItem(VERSIONMAP) === null) {
    localStorage.setItem(VERSIONMAP, v({}));
  }
  const vmap = p(localStorage.getItem(VERSIONMAP));
  return vmap[key] < version;
};
const updateVersion = (key:string, version: number) => {
  if (localStorage.getItem(VERSIONMAP) === null) {
    localStorage.setItem(VERSIONMAP, v({}));
  }
  const vmap = p(localStorage.getItem(VERSIONMAP));
  vmap[key] = version;
  localStorage.setItem(VERSIONMAP, v(vmap));
  return;
}

export const useLocalState = <T>(
  key: string,
  defaultValue: T,
  version?: number
) =>
  useRef(() => {
    if (isVersionExpired(key, version)) {
      localStorage.setItem(key, v(defaultValue));
      return defaultValue;
    }
    const localVal = localStorage.getItem(key);
    if (localVal === null) {
      localStorage.setItem(key, v(defaultValue));
      version && updateVersion(key, version);
      return defaultValue;
    }
    return p(localVal) as T;
  });

const style2css = (style: any, supperSelector: string) => {
  const styleArr = [[style, supperSelector]] as [object, string][];
  let styleText = '';
  while (styleArr.length !== 0) {
    const [curstyle, supSel] = styleArr.shift();
    styleText += `${supSel}{${
      Object.entries(curstyle)
        .map(([k, v]) => {
          if (k.includes('&')) {
            const sel = k.split('&').join(supSel);
            styleArr.push([v, sel]);
            return '';
          }
          return `${k}:${v}`;
        })
        .join(';') + ';'
    }}\n`;
  }
  return styleText;
};

export const useStyle = (styleFactory: () => any) => {
  const elem = useRef(null as null | HTMLElement);
  const styleIdx = useRef(() => Math.random().toString(36).substr(2));
  const styleSelector = useMemo(() => `[style-id="${styleIdx.value}"]`);

  const styleContainer = useRef(document.createElement('style'));
  useEffect(() => {
    document.body.appendChild(styleContainer.value);
  });
  useWatch(
    styleFactory,
    (currentStyle: any) =>
      (styleContainer.value.innerHTML = style2css(
        currentStyle,
        styleSelector.value
      ))
  );
  useWatch(elem, (currElem) => {
    if (currElem) currElem.setAttribute('style-id', styleIdx.value);
  });
  return elem;
};
