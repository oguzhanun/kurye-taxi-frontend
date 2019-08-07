import React from 'react'
import axios from 'axios'
import history from '../history'
import {Field, reduxForm} from 'redux-form'


class KontrolPaneli extends React.Component{

    state = {error:""}

    hataGoster = (meta) => {

        if(meta.error){
            this.setState({error:meta.error})
        }
      
        if(!meta.error){
            this.setState({error:""})
        }

        if(meta.error && meta.touched){
            return (
              <div className="ui error message">
                {meta.error}
              </div>
            )
          }else return null;
    }

    formInput = ({input, meta, type, label}) =>{
        const className = `field ${meta.touched && meta.error ? "error":""}`
        return(
            <div className={className}>
                <label>{label}</label>
                <input type={type} {...input}></input>
                <div>{this.hataGoster(meta)}</div>
            </div>
        )
    }

    formGonder = async (formDegerleri) => {
        console.log(formDegerleri)
        
        if(this.state.error){
           return  
        }
        
        const credentials = {username:formDegerleri.restoranEmail, password:formDegerleri.restoranPassword};
        
        var result = null;

        try{
            result = await axios({
                method:"post",
                url:"http://localhost:8000/admin/restorans", 
                headers :{
                    "Authorization" : sessionStorage.getItem("Admin-Token")
                },
                data:{
                    restoran : {
                        username : credentials.username,
                        password : credentials.password
                    }
                }
            })
        } catch(e){
            console.log(e)
        }

        console.log(JSON.stringify(result.data));
        
        history.push('/')

    }

    render(){
        return(
            <div className="ui container">Burası Kontrol Panelidir...
                <br></br>
                <br></br>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.formGonder)}>
                    <Field name="restoranEmail" type="text" label="Restoran Email" component={this.formInput}></Field>
                    <Field name="restoranPassword" type="text" label="Password" component={this.formInput}></Field>
                    <button className="ui basic green button">RESTORAN EKLE</button>
                </form>
            </div>
        )
    }
}

var validate = (formDegerleri) => {
    var error = {}

    if(!formDegerleri.restoranEmail){
        error.restoranEmail = "Kullanıcı adı boş bırakılamaz"
    }
    if(!formDegerleri.password){
        error.restoranPassword ="Şifre hanesi boş bırakalamaz"
    }

    return error
}


export default reduxForm({
    form:"RestoranKayit",
    validate
}) (KontrolPaneli)