
/******  ternary operator istendiği şekilde çalışmıyor... sayfa refresh edildiğinde sonuç hep true oluyor... */
// const initialState = {
//     signed_in : (sessionStorage.getItem("Admin-Token")=== undefined ? false : true)
// }

const adtoken =  sessionStorage.getItem("Admin-Token")

const initialState = adtoken? {signed_in : true} : {signed_in : false} 

export const adminState = (state = initialState, action) => {
    
    switch(action.type){

        case "ADMIN_SIGNED_IN" : 
            return {...state, signed_in : true}
            
        case "ADMIN_SIGNED_OUT" :
            return {...state, signed_in : false}
            
        default :
            return state
    }
}

