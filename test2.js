function test2() {
  const incrementReducer = (state = 0, action) => {
    if(action.type === 'INCREMENT') {
      return state + 1;
    }
  }

  const reducer = combineReducers({
    count: incrementReducer
  });

  /* REMAINS SAME AS PREVIOUS */

  const store = createStore(reducer);

  document.querySelector('.increment-2').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });

  store.subscribe(() => {
    const state = store.getState();
    document.querySelector('.counter-2').innerHTML = state.count;
  });
}

test2();
