const Keyboard = {
  capsLock: false,
  shift: false,
  alt: false,
  lang: 'eng',

  alphabet: {
    rus: [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL'], ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'Up', 'Shift'], ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']],
    eng: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL'], ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift'], ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']],
  },

  symbols: {
    rus: ['ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    eng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  },

  properties: {
    capsLock: false,
    rusLang: true,
  },

  addElements() {
    const input = document.createElement('textarea');
    const section = document.createElement('section');
    const keyboard = document.createElement('div');
    section.className = 'main';
    input.className = 'input';
    keyboard.className = 'keyboard';
    document.body.append(section);
    document.querySelector('.main').appendChild(input);
    document.querySelector('.main').appendChild(keyboard);
  },

  createKeys(alphabet) {
    for (let i = 0; i < alphabet.length; i = 1 + i) {
      const row = document.createElement('div');
      row.className = `keyboard__row row-${i + 1}`;
      document.querySelector('.keyboard').appendChild(row);
      for (let j = 0; j < alphabet[i].length; j = 1 + j) {
        const btn = document.createElement('div');
        if (i === 0 && j !== 13) {
          btn.className = `btn btn-${i + 1}-${j + 1} sym sym-${alphabet[i][j]}`;
          btn.id = `${alphabet[i][j]}`;
        } else {
          btn.className = `btn btn-${i + 1}-${j + 1} ${alphabet[i][j]}`;
          btn.id = `${alphabet[i][j]}`;
        }
        document.querySelector(`.row-${i + 1}`).append(btn);
        btn.innerHTML = alphabet[i][j];
        this.createMainKeys(btn, alphabet[i][j]);
      }
    }
  },

  createMainKeys(element, name) {
    const el = element;
    const className = name.toLowerCase();
    const mainKeys = ['backspace', 'del', 'capslock', 'space', 'shift', 'enter', 'alt', 'ctrl', 'win', 'tab', 'up', 'down', 'left', 'right'];
    for (let i = 0; i < mainKeys.length; i = 1 + i) {
      if (this.isFind(className, mainKeys[i]) && this.isFind(el.className, mainKeys[0]) === false) {
        el.className += ` sys-btn ${mainKeys[i]}`;
      }
    }
  },

  isFind(className, word) {
    const name = className;
    if (name.indexOf(word) !== -1) {
      return true;
    } return false;
  },

  virtualKeyboard(output, className) {
    const out = output;
    const elemClass = `.${className}`;
    const buttons = document.querySelectorAll(elemClass);
    for (let i = 0; i < buttons.length; i = 1 + i) {
      buttons[i].addEventListener('mousedown', (e) => {
        const keyMessage = e.target.innerHTML;
        if (this.isFind(e.target.className, 'space')) {
          out.value += ' ';
        }
        if (this.isFind(e.target.className, 'backspace')) {
          const value = out.value.split('');
          value.pop();
          value.pop();
          out.value = value.join('');
        }
        if (!this.isFind(e.target.className, 'sys-btn')) {
          if (this.capsLock) {
            out.value += keyMessage.toUpperCase();
          } else {
            out.value += keyMessage;
          }
        }
        this.animation(e.target);
        e.target.addEventListener('mouseup', () => {
          this.defaultStyle(e.target);
        });
      });
    }
  },

  animation(el) {
    const element = el;
    element.style.backgroundColor = 'rgb(129, 61, 255)';
    element.style.borderRadius = '12px';
  },

  defaultStyle(element) {
    const currElement = element;
    currElement.style.backgroundColor = '';
    currElement.style.borderRadius = '';
  },

  isUpperMode() {
    const capsLock = document.getElementById('CapsLock');
    const shift = document.getElementById('Shift');
    capsLock.addEventListener('click', () => {
      if (this.capsLock) {
        this.capsLock = false;
      } else {
        this.capsLock = true;
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'CapsLock') {
        if (this.capsLock) {
          this.capsLock = false;
        } else {
          this.capsLock = true;
        }
      }
    });
    shift.addEventListener('mousedown', (e) => {
      this.capsLock = true;
      e.target.addEventListener('mouseup', () => {
        this.capsLock = false;
      });
    });
  },

  isActiveShift() {
    document.addEventListener('keydown', (e) => {
      if (this.isFind(e.target.className, 'shift') || e.key === 'Shift') {
        if (this.capsLock) {
          this.capsLock = false;
        } else {
          this.capsLock = true;
        }
        const symbols = document.querySelectorAll('.row-1 .btn');
        for (let i = 0; i < symbols.length; i = 1 + i) {
          if (this.lang === 'rus') {
            symbols[i].innerHTML = this.symbols.rus[i];
            symbols[i].id = this.symbols.rus[i];
          } else {
            symbols[i].innerHTML = this.symbols.eng[i];
            symbols[i].id = this.symbols.eng[i];
          }
        }
        e.target.addEventListener('keyup', () => {
          if (this.capsLock) {
            this.capsLock = false;
          } else {
            this.capsLock = true;
          }
          for (let i = 0; i < symbols.length; i = 1 + i) {
            if (this.lang === 'rus') {
              symbols[i].innerHTML = this.alphabet.rus[0][i];
              symbols[i].id = this.alphabet.rus[0][i];
            } else {
              symbols[i].innerHTML = this.alphabet.eng[0][i];
              symbols[i].id = this.alphabet.eng[0][i];
            }
          }
        });
      }
    });
    document.addEventListener('mousedown', (e) => {
      if (this.isFind(e.target.className, 'shift') || e.key === 'Shift') {
        const symbols = document.querySelectorAll('.row-1 .btn');
        for (let i = 0; i < symbols.length; i = 1 + i) {
          if (this.lang === 'rus') {
            symbols[i].innerHTML = this.symbols.rus[i];
            if (!this.isFind(symbols[i].className, symbols[i].innerHTML)) {
              symbols[i].className += ` ${symbols[i].innerHTML}`;
            }
          } else {
            symbols[i].innerHTML = this.symbols.eng[i];
            if (!this.isFind(symbols[i].className, symbols[i].innerHTML)) {
              symbols[i].className += ` ${symbols[i].innerHTML}`;
            }
          }
        }
        e.target.addEventListener('mouseup', () => {
          for (let i = 0; i < symbols.length; i = 1 + i) {
            if (this.lang === 'rus') {
              symbols[i].innerHTML = this.alphabet.rus[0][i];
              if (this.isFind(symbols[i].className, symbols[i].innerHTML)) {
                const currClass = symbols[i].className;
                symbols[i].className = currClass.replace(symbols[i].innerHTML, '');
              }
            } else {
              symbols[i].innerHTML = this.alphabet.eng[0][i];
              if (this.isFind(symbols[i].className, symbols[i].innerHTML)) {
                const currClass = symbols[i].className;
                symbols[i].className = currClass.replace(symbols[i].innerHTML, '');
              }
            }
          }
        });
      }
    });
  },

  listenRealKeyboard() {
    window.addEventListener('keydown', (e) => {
      const currId = e.key.toLowerCase();
      let btn = '';
      if (currId === ' ') {
        btn = document.getElementById('Space');
        this.printMessage(btn, document.querySelector('.input'));
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'control') {
        btn = document.getElementById('Ctrl');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'alt') {
        btn = document.getElementById('Alt');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'meta') {
        btn = document.getElementById('Win');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'shift') {
        btn = document.getElementById('Shift');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'capslock') {
        btn = document.getElementById('CapsLock');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'tab') {
        btn = document.getElementById('Tab');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'delete') {
        btn = document.getElementById('DEL');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'enter') {
        btn = document.getElementById('Enter');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'backspace') {
        btn = document.getElementById('Backspace');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'arrowup') {
        btn = document.getElementById('Up');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'arrowdown') {
        btn = document.getElementById('Down');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'arrowleft') {
        btn = document.getElementById('Left');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else if (currId === 'arrowright') {
        btn = document.getElementById('Right');
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      } else {
        btn = document.getElementById(currId);
        this.printMessage(btn, document.querySelector('.input'));
        this.animation(btn);
        e.target.addEventListener('keyup', () => {
          this.defaultStyle(btn);
        });
      }
    });
  },

  printMessage(button, output) {
    const out = output;
    const currElement = button;
    if (this.isFind(currElement.id.toLowerCase(), 'space')) {
      out.value += ' ';
    } else if (this.isFind(currElement.className, 'backspace')) {
      const value = out.value.split('');
      value.pop();
      value.pop();
      out.value = value.join('');
    } else if (this.capsLock) {
      out.value += currElement.innerHTML.toUpperCase();
    } else {
      out.value += currElement.innerHTML;
    }
  },

  changeLanguage() {
    document.addEventListener('keydown', (e) => {
      if ((e.keyCode === 16 && e.ctrlKey) || (e.keyCode === 17 && e.shiftKey)) {
        const delElem = document.querySelectorAll('.keyboard__row');
        for (let i = 0; i < delElem.length; i = 1 + i) {
          delElem[i].remove();
        }
        if (this.lang === 'rus') {
          this.lang = 'eng';
          this.createKeys(this.alphabet.eng);
        } else {
          this.lang = 'rus';
          this.createKeys(this.alphabet.rus);
        }
        localStorage.setItem('lang', this.lang);
      }
    });
  },

  getCurrentAlphabet() {
    const storageLang = localStorage.getItem('lang');
    if (storageLang === 'rus') {
      return this.alphabet.rus;
    } return this.alphabet.eng;
  },
};

window.addEventListener('load', () => {
  Keyboard.addElements();
  Keyboard.createKeys(Keyboard.getCurrentAlphabet());
  Keyboard.virtualKeyboard(document.querySelector('.input'), 'btn');
  Keyboard.isUpperMode();
  Keyboard.isActiveShift();
  Keyboard.listenRealKeyboard();
  Keyboard.changeLanguage();
});
