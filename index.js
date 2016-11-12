class Glv {
  constructor () {
    this.state = {};
    this.comps = {};
    this.entryPoints = {};

    this.initialState = obj => 
      this.state = Object.assign(this.state, obj);

    this.addListener = (id, type, fn) => {
      const node = document.getElementById(id);
      node.addEventListener(type, fn);
    }
  }

  render(name) {
    this.entryPoints[name] = document.getElementById(name);
    this.entryPoints[name].innerHTML = this.comps[name].render();
  }

  component(name, Klass) {
    this.comps[name] = new Klass();
    this.render(name);
    this.comps[name].listen();
  }
  
  setState(obj) {
    this.state = Object.assign(this.state, obj);
    Object.keys(this.comps).forEach(e => this.render(e));
  }
};

class App extends Glv {
  constructor() {
    super();
    this.initialState({ todo: { text: `ok` } });
  }

  listen() {
    this.addListener('todo-input', 'onkeyup', (e) => {
      this.setState({todo: {text: e.target.value}});
    });
    
    this.addListener('todo-submit', 'onclick', () => {
      const { todos, todo } = this.state;
      if (!todo.text) return;
      this.setState({todos: [todo, ...todos], todo: {text: `ok2`}});
    });
  }

  render() {
    return (`
      <section>
        <h1>Todo</h1>
        <input id="todo-input" value='${this.state.todo.text}' />
        <br><br>
        <button id="todo-submit">Submit</button>
      </section>
    `);
  }
};

const glv = new Glv();
glv.component('firstComponent', App);
