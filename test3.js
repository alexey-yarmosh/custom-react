function test3() {
  const incrementReducer = (state = 0, action) => {
    if(action.type === 'INCREMENT') {
      return state + 1;
    }
  }

  const reducer = combineReducers({
    count: incrementReducer
  });

  const store = createStore(reducer);

  actionCreators = {
    incrementCount: function() {
      return {type: 'INCREMENT'}
    }
  }

  const bounded = bindActionCreators(actionCreators, store.dispatch);

  document.querySelector('.increment-3').addEventListener('click', () => {
    bounded.incrementCount();
  });

  store.subscribe(() => {
    const state = store.getState();
    document.querySelector('.counter-3').innerHTML = state.count;
  });
}

test3();
