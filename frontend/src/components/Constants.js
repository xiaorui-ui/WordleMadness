// Local backend
// const BACKEND = "http://localhost:8080/backend";
// Production backend
const BACKEND = "https://wordle-madness-backend.internal.delightfulwater-21442138.eastasia.azurecontainerapps.io/backend";
const BACKEND_CACHED_LOGIN = BACKEND + "/cachedLogIn";
const BACKEND_LOGIN = BACKEND + "/verify";
const BACKEND_LOGOUT = BACKEND + "/logOut";
const BACKEND_GET_WORD_LIST = BACKEND + "/getWords";
const BACKEND_GET_ALLOWED_WORD_LIST = BACKEND + "/getAllowedWords";
const BACKEND_GET_TREE = BACKEND + "/getTree";
const BACKEND_GET_TIME = BACKEND + "/getTime";
const BACKEND_ADD_WORDS = BACKEND + "/addWords";
const BACKEND_ADD_ALLOWED_WORDS = BACKEND + "/addAllowedWords";
const BACKEND_REMOVE_WORDS = BACKEND + "/deleteWords";
const BACKEND_REMOVE_ALLOWED_WORDS = BACKEND + "/deleteAllowedWords";
const BACKEND_REGISTER = BACKEND + "/register";
const BACKEND_SET_LISTS_TO_SAME = BACKEND + "/setListsToSame";
const BACKEND_SET_TIME = BACKEND + "/setTime";
const BACKEND_COMPUTE = BACKEND + "/compute";
const DEFAULT_WORDS = [
  { word: "moral", remove: false },
  { word: "coral", remove: false },
  { word: "royal", remove: false },
  { word: "rival", remove: false },
  { word: "flora", remove: false },
  { word: "mural", remove: false },
  { word: "lycra", remove: false },
  { word: "rural", remove: false },
  { word: "viral", remove: false },
  { word: "aural", remove: false },
  { word: "rally", remove: false },
  { word: "regal", remove: false },
  { word: "trial", remove: false },
  { word: "renal", remove: false },
  { word: "glare", remove: false },
  { word: "blare", remove: false },
  { word: "flare", remove: false },
];

export {
  BACKEND_CACHED_LOGIN, BACKEND_LOGIN, BACKEND_LOGOUT,
  BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, BACKEND_GET_TREE, BACKEND_GET_TIME,
  BACKEND_ADD_WORDS, BACKEND_ADD_ALLOWED_WORDS, BACKEND_REMOVE_WORDS, BACKEND_REMOVE_ALLOWED_WORDS,
  BACKEND_REGISTER, DEFAULT_WORDS, BACKEND_COMPUTE, BACKEND_SET_LISTS_TO_SAME, BACKEND_SET_TIME
};
