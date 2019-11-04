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
        // if (i === 0 && j !== 13 && j !== 0) {
        //   btn.className = `btn btn-${i + 1}-${j + 1} sym-${alphabet[i][j]}`;
        // } else {
        //   btn.className = `btn btn-${i + 1}-${j + 1} ${alphabet[i][j]}`;
        // }
        btn.className = `btn btn-${i + 1}-${j + 1} ${alphabet[i][j]}`;
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

  print(output, className) {
    const out = output;
    const elemClass = `.${className}`;
    const buttons = document.querySelectorAll(elemClass);
    // console.log(buttons);
    for (let i = 0; i < buttons.length; i = 1 + i) {
      buttons[i].addEventListener('mousedown', (e) => {
        // console.log(buttons);
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
    const capsLock = document.querySelector('.capslock');
    capsLock.addEventListener('click', () => {
      if (this.capsLock) {
        this.capsLock = false;
      } else {
        this.capsLock = true;
      }
    });
  },
  // Must be fixed
  isActiveShift() {
    document.addEventListener('keydown', (e) => {
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
        e.target.addEventListener('keyup', () => {
          const symbols = document.querySelectorAll('.row-1 .btn');
          for (let i = 0; i < symbols.length; i = 1 + i) {
            if (this.lang === 'rus') {
              symbols[i].innerHTML = this.alphabet.rus[0][i];
              if (this.isFind(symbols[i].className, symbols[i].innerHTML)) {
                const currClass = symbols[i].className;
                symbols[i].className = currClass.replace(symbols[i].innerHTML, '');
              }
              // symbols[i].className += ` ${symbols[i].innerHTML}`;
            } else {
              symbols[i].innerHTML = this.alphabet.eng[0][i];
              // symbols[i].className += ` ${symbols[i].innerHTML}`;
              if (this.isFind(symbols[i].className, symbols[i].innerHTML)) {
                const currClass = symbols[i].className;
                symbols[i].className = currClass.replace(symbols[i].innerHTML, '');
              }
            }
          }
        });
      }
    });
    document.addEventListener('mousedown', (e) => {
      // console.log(this.isFind(e.target.className, 'shift'));
      if (this.isFind(e.target.className, 'shift') || e.key === 'Shift') {
        const symbols = document.querySelectorAll('.row-1 .btn');
        for (let i = 0; i < symbols.length; i = 1 + i) {
          if (this.lang === 'rus') {
            symbols[i].innerHTML = this.symbols.rus[i];
            if (!this.isFind(symbols[i].className, symbols[i].innerHTML)) {
              symbols[i].className += ` ${symbols[i].innerHTML}`;
            }
            // symbols[i].className += ` ${symbols[i].innerHTML}`;
          } else {
            symbols[i].innerHTML = this.symbols.eng[i];
            if (!this.isFind(symbols[i].className, symbols[i].innerHTML)) {
              symbols[i].className += ` ${symbols[i].innerHTML}`;
            }
            // symbols[i].className += ` ${symbols[i].innerHTML}`;
          }
        }
        e.target.addEventListener('mouseup', () => {
          const symbols = document.querySelectorAll('.row-1 .btn');
          for (let i = 0; i < symbols.length; i = 1 + i) {
            if (this.lang === 'rus') {
              symbols[i].innerHTML = this.alphabet.rus[0][i];
              // symbols[i].className += ` ${symbols[i].innerHTML}`;
              if (this.isFind(symbols[i].className, symbols[i].innerHTML)) {
                const currClass = symbols[i].className;
                symbols[i].className = currClass.replace(symbols[i].innerHTML, '');
              }
            } else {
              symbols[i].innerHTML = this.alphabet.eng[0][i];
              // symbols[i].className += ` ${symbols[i].innerHTML}`;
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
  // Must be fixed
  listenRealKeyboard() {
    window.addEventListener('keydown', (e) => {
      const currClass = `.${e.key.toLowerCase()}`;
      console.log(currClass);
      console.log(document.querySelector(currClass));
      const btn = document.querySelector(currClass);
      if (btn) {
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
    const keyMessage = currElement.innerHTML;
    if (this.isFind(currElement.className, 'space')) {
      out.value += ' ';
    }
    if (this.isFind(currElement.className, 'backspace')) {
      const value = out.value.split('');
      value.pop();
      value.pop();
      out.value = value.join('');
    }
    if (!this.isFind(currElement.className, 'sys-btn')) {
      if (this.capsLock) {
        out.value += keyMessage.toUpperCase();
      } else {
        out.value += keyMessage;
      }
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
        this.print(document.querySelector('.input'), 'btn');
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
  const output = document.querySelector('.input');
  Keyboard.isUpperMode();
  Keyboard.isActiveShift();
  Keyboard.listenRealKeyboard();
  Keyboard.changeLanguage();
  Keyboard.print(output, 'btn');
});
