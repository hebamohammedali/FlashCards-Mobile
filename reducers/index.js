import { GET_ALL_DECKS, ADD_NEW_DECK, REMOVE_CERTAIN_DECK, ADD_NEW_CARD, RESET_DATA } from '../actions/index';
import { decks as INITIAL_STATE } from '../utils/_DATA';

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_NEW_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    case REMOVE_CERTAIN_DECK:
      const { id } = action;
      // return ({ [id]: value, ...remainingDecks } = state);
      const { [id]: value, ...remainingDecks } = state;
      // console.log(remainingDecks);
      return remainingDecks;
    case ADD_NEW_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card)
        }
      };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
