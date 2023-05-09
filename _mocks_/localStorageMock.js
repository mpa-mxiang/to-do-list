const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => {
      console.log(`Getting item ${key} from mock storage`);
      return store[key] || {};
    },
    setItem: (key, value) => {
      console.log(`Setting item ${key} to ${value} in mock storage`);
      store[key] = value.toString();
    },
    clear: () => {
      console.log(`Clearing mock storage`);
      store = {};
    },
    removeItem: (key) => {
      console.log(`Removing item ${key} from mock storage`);
      delete store[key];
    },
  };
})();
