import {excludeProcessing,KeyboardKeys} from './klassKey.js';


let head = window.document.getElementsByTagName('head')[0]

function includeCSS(File) {
  let style = window.document.createElement('link')
  style.href = File
  style.rel = 'stylesheet'
  head.appendChild(style)
}

includeCSS('style.css');


const keyProperties = new KeyboardKeys();
console.log(keyProperties)
const keys = Object.keys(keyProperties);
console.log(keys)
let language = 'En';
let capsFlag = false;
let shiftFlag = false;

const createKeyboard = () => {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const description = document.createElement('p');
  container.classList.add('container');
  document.body.append(container);
  title.classList.add('title');
  title.innerHTML = 'Virtual Keyboard';
  container.append(title);
  textarea.classList.add('textarea');
  container.append(textarea);
  keyboard.classList.add('keyboard');
  container.append(keyboard);
  description.classList.add('description');
  description.innerHTML = 'Клавиатура создана в операционной системе windows' +
    '<br>Клавиши переключения раскладки: left ctrl + left alt';
  container.append(description);
};

const initKeys = (langIndex) => {
  const keyboard = document.querySelector('.keyboard');
  keys.forEach((element) => {
    const key = document.createElement('div');
    key.classList.add(`${element}`, 'key');
    key.innerHTML = `${keyProperties[element][langIndex]}`;
    keyboard.append(key);
  });
};

const toggleSymbols = (langIndex) => {
  keys.forEach((element) => {
    const key = document.querySelector(`.${element}`);
    key.innerHTML = keyProperties[element][langIndex];
  });
};

const trackShift = () => {
  const controlActive = document.querySelector('.ShiftLeft').classList.contains('active') || document.querySelector('.ShiftRight').classList.contains('active');
  const capsLock = document.querySelector('.CapsLock');

  const noneCapsLockToUpper = () => {
    keys.forEach((element) => {
      if (!excludeProcessing .includes(element)) {
        const key = document.querySelector(`.${element}`);
        if (!capsLock.classList.contains('active')) {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  };

  const capsLockToUpper = () => {
    keys.forEach((element) => {
      if (!excludeProcessing .includes(element)) {
        const key = document.querySelector(`.${element}`);
        if (capsLock.classList.contains('active')) {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  };

  if (controlActive && language === 'En') {
    toggleSymbols(2);
    noneCapsLockToUpper();
  } else if (!controlActive && language === 'En') {
    toggleSymbols(0);
    capsLockToUpper();
  } else if (controlActive && language === 'Ru') {
    toggleSymbols(3);
    noneCapsLockToUpper();
  } else if (!controlActive && language === 'Ru') {
    toggleSymbols(1);
    capsLockToUpper();
  }
};

const capsLockHandler = () => {
  const capsLock = document.querySelector('.CapsLock');
  const shifts = document.querySelector('.ShiftLeft').classList.contains('active')
    || document.querySelector('.ShiftRight').classList.contains('active');

  keys.forEach((element) => {
    if (!excludeProcessing .includes(element)) {
      const key = document.querySelector(`.${element}`);
      if (capsLock.classList.contains('active')) {
        key.innerHTML = key.innerHTML.toUpperCase();
      } else if (!shifts) {
        key.innerHTML = key.innerHTML.toLowerCase();
      }
    }
  });
  trackShift();
};
const toggleLanguage = () => {
  const controlActive = document.querySelector('.ControlLeft').classList.contains('active')
    && document.querySelector('.AltLeft').classList.contains('active');
  if (controlActive && language === 'En') {
    language = 'Ru';
    toggleSymbols(1);
  } else if (controlActive && language === 'Ru') {
    language = 'En';
    toggleSymbols(0);
  }
  capsLockHandler();
};

const textareaMouseListener = (event) => {
  const textarea = document.querySelector('textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (event.target.classList[0] === 'Backspace') {
    const textareaText = textarea.value.substring(0, start > 0 ? start - 1 : start)
      + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = start > 0 ? end - 1 : end;
  }
  if (event.target.classList[0] === 'Delete') {
    const textareaText = textarea.value.substring(0, start) + textarea.value.substring(end + 1);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end;
  }
  if (event.target.classList[0] === 'Enter') {
    const enterSymbol = '\n';
    const textareaText = textarea.value.substring(0, start)
      + enterSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (event.target.classList[0] === 'Tab') {
    const tabSymbol = '\t';
    const textareaText = textarea.value.substring(0, start)
      + tabSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (keys.includes(event.target.classList[0])
    && !excludeProcessing .includes(event.target.classList[0])) {
    const textareaText = textarea.value.substring(0, start)
      + event.target.textContent + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = (start === end) ? (end + 1) : end;
  }
};

const textareaKeyboardListener = (event) => {
  const textarea = document.querySelector('textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const target = document.querySelector(`.${event.code}`);
  event.preventDefault();
  if (event.code === 'Backspace') {
    const textareaText = textarea.value.substring(0, start > 0 ? start - 1 : start)
      + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = start > 0 ? end - 1 : end;
  }
  if (event.code === 'Delete') {
    const textareaText = textarea.value.substring(0, start) + textarea.value.substring(end + 1);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end;
  }
  if (event.code === 'Enter') {
    const enterSymbol = '\n';
    const textareaText = textarea.value.substring(0, start)
      + enterSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (event.code === 'Tab') {
    const tabSymbol = '\t';
    const textareaText = textarea.value.substring(0, start)
      + tabSymbol + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = end + 1;
  }
  if (keys.includes(event.code)
    && !excludeProcessing .includes(event.code)) {
    const textareaText = textarea.value.substring(0, start)
      + target.textContent + textarea.value.substring(end);
    textarea.value = textareaText;
    textarea.focus();
    textarea.selectionEnd = (start === end) ? (end + 1) : end;
  }
};

const mouseListener = () => {
  document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
    textareaMouseListener(event);
    if (event.target.classList.contains('CapsLock')) {
      event.target.classList.toggle('active');
      capsLockHandler();
    } else if (event.target.classList.contains('ShiftLeft') && !shiftFlag) {
      event.target.classList.add('active');
      trackShift();
    } else if (event.target.classList.contains('ShiftRight') && !shiftFlag) {
      event.target.classList.add('active');
      trackShift();
    } else if (!event.target.classList.contains('ShiftRight')
      && !event.target.classList.contains('ShiftLeft')) {
      event.target.classList.add('active');
    }
  });
  document.addEventListener('mouseup', () => {
    if (document.querySelector('.ShiftLeft').classList.contains('active') && !shiftFlag) {
      document.querySelector('.ShiftLeft').classList.remove('active');
      trackShift();
    }
    if (document.querySelector('.ShiftRight').classList.contains('active') && !shiftFlag) {
      document.querySelector('.ShiftRight').classList.remove('active');
      trackShift();
    }
    keys.forEach((element) => {
      if (element !== 'CapsLock' && element !== 'ShiftRight' && element !== 'ShiftLeft') {
        document.querySelector(`.${element}`).classList.remove('active');
      }
    });
  });
};

const keyboardHandler = () => {
  document.addEventListener('keydown', (event) => {
    textareaKeyboardListener(event);
    if (document.querySelector(`.${event.code}`)) {
      if (event.code === 'CapsLock' && !capsFlag) {
        capsFlag = true;
        document.querySelector(`.${event.code}`).classList.toggle('active');
        capsLockHandler();
      } else if (event.code === 'ShiftLeft' && !shiftFlag) {
        shiftFlag = true;
        document.querySelector(`.${event.code}`).classList.add('active');
        trackShift();
      } else if (event.code === 'ShiftRight' && !shiftFlag) {
        shiftFlag = true;
        document.querySelector(`.${event.code}`).classList.add('active');
        trackShift();
      } else if (event.code !== 'ShiftLeft' && event.code !== 'ShiftRight') {
        document.querySelector(`.${event.code}`).classList.add('active');
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    toggleLanguage();
    if (document.querySelector(`.${event.code}`)) {
      if (event.code === 'CapsLock') {
        capsFlag = false;
      } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        shiftFlag = false;
        document.querySelector('.ShiftRight').classList.remove('active');
        document.querySelector('.ShiftLeft').classList.remove('active');
        trackShift();
      } else {
        document.querySelector(`.${event.code}`).classList.remove('active');
      }
    }
  });
};

const getLocalStorage = () => {
  if (localStorage.getItem('languge')) language = localStorage.getItem('languge');
  else language = 'En';
};

const setLocalStorage = () => {
  const setLanguage = () => {
    localStorage.setItem('languge', language);
  };
  window.addEventListener('beforeunload', setLanguage);
};


  getLocalStorage();
  createKeyboard();
  initKeys(language === 'En' ? 0 : 1);
  mouseListener();
  keyboardHandler();
  setLocalStorage();
