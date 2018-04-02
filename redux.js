const createStore = function(reducer) {
  let state;
  const listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.splice(listeners.indexOf(listener), 1);
    }
  }

  const dispatch = action => {
    const newState = reducer(state, action);
    state = newState;
    listeners.forEach(listener => {
      listener();
    })
    return action;
  }

  return {
    getState: getState,
    subscribe: subscribe,
    dispatch: dispatch
  }
}

/* TEST 2 */

const combineReducers = reducers => {
  const keys = Object.keys(reducers);
  return (state = {}, action) => {
    const newState = {};
    keys.forEach(key => {
      newState[key] = reducers[key](state[key], action);
    });
    return newState;
  }
}

/* TEST 3 */

const bindActionCreators = (actionCreators ,dispatch) => {
  const bounded = {};
  Object.keys(actionCreators).forEach(key => {
    bounded[key] = (...args) => {
      dispatch(actionCreators[key].apply(null, args));
    } 
  });
  return bounded;
}

/* TEST 4 */

function applyMiddleware(middleware) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer);
      return {
        getState: store.getState,
        subscribe: store.subscribe,
        dispatch: function dispatch(action) {
          return middleware(store)(store.dispatch)(action);
        }
      };
    };
  };
} 
