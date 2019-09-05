
const restoken = sessionStorage.getItem("Restoran-Token");

const initialState = restoken? {restoran_signed_in : true} : {restoran_signed_in : false} 

export const restoranState = (state=initialState, action) => {
    switch(action.type){
        case "RESTORAN_SIGNED_IN" : return {...state, restoran_signed_in : true}
        case "RESTORAN_SIGNED_OUT" : return {...state, restoran_signed_in : false}
        default : return state
    }
}

export const restoranNameState = (state={restoranName:""}, action) => {
    switch(action.type){
        case "RESTORAN_NAME": return {...state, restoranName:action.payload}
        default : return state
    }
}