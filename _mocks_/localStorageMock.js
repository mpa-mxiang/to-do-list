const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => {
      const value = store[key];
      return value ? { [key]: value } : null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: key => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();
export const getItem = localStorageMock.getItem;
export const setItem = localStorageMock.setItem;


// set localStorage to the mock object before running the tests
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});
export default localStorageMock;
