function test2() {
  const incrementReducer = (state = 0, action) => {
    if(action.type === 'INCREMENT') {
      return state + 1;
    }
  }

  const reducer = combineReducers({
    count: incrementReducer
  });

  function async(store) {
    return function(next) {
      return function(action) {
        const result = next(action);
        console.log('Middleware stuff.');
        return result; 
      };
    };
  }

  const store = applyMiddleware(async)(createStore)(reducer);

  document.querySelector('.increment-4').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });

  store.subscribe(() => {
    const state = store.getState();
    document.querySelector('.counter-4').innerHTML = state.count;
  });
}

test2();
