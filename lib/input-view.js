'use babel';

import { TextEditor, CompositeDisposable } from 'atom'

export default class InputView {

  constructor(q) {
    // Create root element
    this.q = q;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'core:cancel': () => this.close(),
      'core:confirm': () => this.confirm()
    }));

    this.element = document.createElement('div');
    this.element.classList.add('atom-questions');

    this.miniEditor = new TextEditor({mini: true});
    this.miniEditor.setText(q.default ? q.default : "");
    this.element.appendChild(this.miniEditor.element);

    // Create message element
    const message = document.createElement('div');
    message.textContent = q.message;
    message.classList.add('message');
    this.element.appendChild(message);

    this.panel = atom.workspace.addModalPanel({
      item: this.element,
      visible: true
    });
    this.miniEditor.element.focus();
    this.miniEditor.selectAll();
  }

  close() {
    this.panel.hide();
  }

  confirm() {
    this.resolve(this.miniEditor.getText());
    this.close();
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
