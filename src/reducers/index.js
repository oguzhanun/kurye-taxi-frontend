import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {adminState} from "./adminState";
import {restoranState,restoranNameState} from "./restoranState";
import {kuryeState} from "./kuryeState"

export default combineReducers({
    form : formReducer,
    adminState,
    restoranState,
    restoranNameState,
    kuryeState
});