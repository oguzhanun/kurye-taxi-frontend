



export const kuryeStateAction = (kuryeLoggedIn) => {
    if(kuryeLoggedIn){
        return {type : "KURYE_LOGGED_IN"}
    } else return {type : "KURYE_LOGGED_OUT"}
}