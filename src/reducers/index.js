import {
  WEB3_CONNECTED,
  MONSTER_ADDED,
  MONSTERS_CONTRACT_INSTANTIATED,
  MONSTERS_FETCHED,
  defaultState
} from '../actions';

const monsters = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case MONSTERS_CONTRACT_INSTANTIATED:
    return {
      ...state,
      monstersContract: action.payload
    };
  case MONSTERS_FETCHED:
    return {
      ...state,
      monsters: action.payload
    };
  case MONSTER_ADDED:
    return {
      ...state,
      monsters: [
        ...state.monsters,
        action.payload
      ]
    };
  default:
    return state
  }
};

export default monsters;