import { getDecks } from '../utils/api';

// Card
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

// Decks
export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const REMOVE_CERTAIN_DECK = 'REMOVE_CERTAIN_DECK';

// Reset all Decks
export const RESET_DATA = 'RESET_DATA';

export function initDataHandling() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(getAllDecks(decks));
    });
  };
}

export function getAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks
  };
}

export function addDeck(title) {
  return {
    type: ADD_NEW_DECK,
    title
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_NEW_CARD,
    deckId,
    card
  };
}

export function removeCertainDeck(id) {
  return {
    type: REMOVE_CERTAIN_DECK,
    id
  };
}


export function resetData() {
  return {
    type: RESET_DATA
  };
}
