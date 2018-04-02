function test1() {
  const reducer = (state = 0, action) => {
    if(action.type === 'INCREMENT') {
      return state + 1;
    }
  }

  const store = createStore(reducer);

  document.querySelector('.increment-1').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });

  store.subscribe(() => {
    const state = store.getState();
    document.querySelector('.counter-1').innerHTML = state;
  });
}

test1();
