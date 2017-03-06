'use babel';

import InputView from './input-view';
import { CompositeDisposable } from 'atom';

export default {

  ask(_questions) {
    if (!Array.isArray(_questions) || !_questions.length) {
      throw new Error('first argument should benon empty array of questions');
    }
    let resolve, reject;
    let promise = new Promise(function(_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    })
    let questions = _questions.slice();
    let answers = {};

    function singleAsk(q) {
      let v;
      if (q.type == 'input') {
        v = new InputView(q);
      }
      else {
        throw new Error(
          "Property 'type' is required, should be one of these: [input] ")
      }
      v.promise.then(function(a) {
        answers[q.name] = a;
        if (questions.length) {
          singleAsk(questions.shift());
        }
        else {
          resolve(answers);
        }
      })
    }

    singleAsk(questions.shift());
    return promise;
    //Tengo que chequear el tipo de cada uno y crear una vista acorde... podria renombrar el archivo que me dieron
  }
  /*
  atomQuestionsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomQuestionsView = new AtomQuestionsView(state.atomQuestionsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomQuestionsView.getElement(),
      visible: false1
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-questions:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomQuestionsView.destroy();
  },

  serialize() {
    return {
      atomQuestionsViewState: this.atomQuestionsView.serialize()
    };
  },

  toggle() {
    console.log('AtomQuestions was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }
  */

};
