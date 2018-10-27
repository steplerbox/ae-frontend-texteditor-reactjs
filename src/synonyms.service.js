
export default function getSynonymsList(word) {
  if (!getSynonymsList.cache) {
    getSynonymsList.cache = {};
  }

  if (getSynonymsList.cache[word]) {
    return new Promise(resolve => {
      resolve(getSynonymsList.cache[word]);
    });
  }
  return fetch(`https://api.datamuse.com/words?ml=${word}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(synonymsList => {
      getSynonymsList.cache[word] = synonymsList;
      return synonymsList;
    });
}
