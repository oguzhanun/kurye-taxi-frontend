


export const adminStateAction = (sign) => {
    //const token = sessionStorage.getItem("Admin-Token")
    
    console.log("adminStateAction: ",sign);
    
    
    if(sign){
        return  { type : "ADMIN_SIGNED_IN" }
    } else return { type : "ADMIN_SIGNED_OUT"}
}

