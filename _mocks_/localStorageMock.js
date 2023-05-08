const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem: (key) => store[key] || {},
      setItem: (key, value) => (store[key] = value.toString()),
      clear: () => (store = {}),
      removeItem: (key) => delete store[key],
    };
  })();
  
  // In your test, you can replace the `localStorage` object with the mock
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  