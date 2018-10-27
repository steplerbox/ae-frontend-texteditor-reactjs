export function getText() {
  return new Promise(resolve => {
    resolve(localStorage.getItem('text'));
  });
}

export function saveText(text) {
  return new Promise(resolve => {
      resolve(localStorage.setItem('text', text));
    }
  );
}
