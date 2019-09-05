


export const restoranStateAction = (restoranSign) =>{
    console.log("restoranStateAction : ", restoranSign)
    if(restoranSign){
        return {
            type : "RESTORAN_SIGNED_IN"
        }
    } else return{
        type : "RESTORAN_SIGNED_OUT"
    }
}

export const restoranNameAction = (restoranName) =>{

    return {type:"RESTORAN_NAME", payload: restoranName}
}