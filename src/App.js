import React, { Component } from 'react'
import { connect } from 'react-redux'
import contract from 'truffle-contract'
import {web3connect, fetchMonsters, createMonster, instantiateMonsterContract} from './actions';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textarea: ''
    }
    this.renderMyMonsters.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateMonsterContract().then(() => {
        this.props.fetchMonsters();
      });
    });
  }

  handleTextAreaChange(event) {
    this.setState({
      textarea: event.target.value
    });
  }
  renderMyMonsters(monsters) {
    console.log(monsters)
    return (<div>
      <div><span>Name: </span>{String(monsters.name)}</div>
      <div><span>HP: </span>{String(monsters.hp)}</div>
    </div>)
  }
  createMonster() {
    this.props.createMonster(this.state.textarea);
  }

  render() {
    if (!this.props.web3) {
      return (
        <div> Loading web3 </div>
      );
    }
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>My Monsters</h1>
              <textarea id="textarea" value={this.state.textarea} onChange={this.handleTextAreaChange.bind(this)} placeholder="please input monster name" />
              <button onClick={this.createMonster.bind(this)}>Create Your Monster</button>
              <ul>
                {this.renderMyMonsters(this.props.monsters)}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  instantiateMonsterContract,
  fetchMonsters,
  createMonster
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  monsters: state.monsters
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
