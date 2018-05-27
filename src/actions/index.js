import Web3 from 'web3';
import contract from 'truffle-contract';
import MonstersContract from '../..//build/contracts/MonsterFactory.json';
export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const MONSTERS_CONTRACT_INSTANTIATED = 'MONSTERS_CONTRACT_INSTANTIATED';
export const MONSTERS_FETCHED = 'MONSTERS_FETCHED';
export const MONSTER_ADDED = 'MONSTER_ADDED';

export const defaultState = {
  web3: null,
  monsters: []
};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
        //payload: new Web3(web3.currentProvider)
      });
    } else {
      console.log('bbb')
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      });
    }
  };
}

export function instantiateMonsterContract() {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const monsters = contract(MonstersContract);
    monsters.setProvider(web3.currentProvider);
    return monsters.deployed().then((monstersContract) => {
      dispatch({
        type: MONSTERS_CONTRACT_INSTANTIATED,
        payload: monstersContract
      });
    });
  };
}

export function fetchMonsters() {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const monstersContract = state.monstersContract;
    monstersContract.getMonsters().then((monster) => {
      dispatch({
        type: MONSTERS_FETCHED,
        payload: {
          name: web3.toAscii(monster[0]),
          hp: monster[1]
        }
      });
    });
  };
}

export function createMonster(payload) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const monstersContract = getState().monstersContract;
    web3.eth.getAccounts((err, accounts) => {
      monstersContract.createMonster(web3.fromAscii(payload), {
        from: accounts[1],
        gas: 3000000
      }).then((results) => {
        dispatch({
          type: MONSTER_ADDED,
          payload
        });
      });
    });
  };
}