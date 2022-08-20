import { rootReducer } from "../Reducer/reducer"; 
import {createStore,applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"


const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export default Store