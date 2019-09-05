
const kuryeToken = sessionStorage.getItem("Kurye-Token");

const initialState = kuryeToken? {kuryeLoggedIn : true} : {kuryeLoggedIn : false} 

export const kuryeState = (state=initialState, action) => {
    switch(action.type){
        case ("KURYE_LOGGED_IN") : return {...state, kuryeLoggedIn : true}
        case ("KURYE_LOGGED_OUT") : return {...state, kuryeLoggedIn : false}
        default : return state
    }
}