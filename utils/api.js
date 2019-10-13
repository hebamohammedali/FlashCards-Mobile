import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const STORAGE_KEY = 'HebaMohammedAli:decks';

export function getAllData() {
  return decks;
}

export async function getDecks() {
    const storeResults = await AsyncStorage.getItem(STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
}

function resetResults(results) {
  return results === null ? decks : JSON.parse(results);
}

export function getOldDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(resetResults);
}

export async function getOneDeck(id) {
    const storeResults = await AsyncStorage.getItem(STORAGE_KEY);

    return JSON.parse(storeResults)[id];
}

export async function removeDeckAS(key) {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function backToFactoryMood() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export async function saveDeckTitleAS(title) {
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({[title]: {
        title,
        questions: []
      }
    })
  );
}

export async function addCardToDeckAS(title, card) {
    const deck = await getOneDeck(title);

    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({[title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
}