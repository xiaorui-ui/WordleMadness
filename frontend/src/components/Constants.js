// Local backend
// const BACKEND = "http://localhost:8080/backend/";
// Production backend
const BACKEND = "https://skilful-earth-388409.as.r.appspot.com/backend/";
const BACKEND_LOGIN = BACKEND + "verify";
const BACKEND_GET_WORD_LIST = BACKEND + "getWords";
const BACKEND_GET_ALLOWED_WORD_LIST = BACKEND + "getAllowedWords";
const BACKEND_ADD_WORDS = BACKEND + "addWords";
const BACKEND_ADD_ALLOWED_WORDS = BACKEND + "addAllowedWords";
const BACKEND_REMOVE_WORDS = BACKEND + "deleteWords";
const BACKEND_REMOVE_ALLOWED_WORDS = BACKEND + "deleteAllowedWords";

export {
    BACKEND_LOGIN, BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, BACKEND_ADD_WORDS,
    BACKEND_ADD_ALLOWED_WORDS, BACKEND_REMOVE_WORDS, BACKEND_REMOVE_ALLOWED_WORDS
};