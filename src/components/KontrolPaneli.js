import React from 'react'
import axios from 'axios'
import history from '../history'
import {Field, reduxForm} from 'redux-form'
import io from "socket.io-client"
import {Link} from "react-router-dom"
import Table from "./Table"


class KontrolPaneli extends React.Component{

    state = {error:"", table:{}}

    componentDidMount = async () =>{
        const socket = io("http://localhost:8000")
        
        socket.emit("join", {username:"admin",password:"1234"})
        
        socket.on("message",(message)=>{
            console.log(message)
        })

        const result = await axios({
            url:"http://localhost:8000/admin/kuryeTalepleri",
            method:"post",
            headers:{
                "Authorization":sessionStorage.getItem("Admin-Token")
            }
        })
        
        this.setState({table : result.data})  

        socket.on("kuryeIstegi", async (message)=>{
            console.log(message)
            alert(message.restoranName + " kullanıcı adlı restoran "+ message.adres + 
                " adresine kurye talebi yapmıştır.")
            const result = await axios({
                url:"http://localhost:8000/admin/kuryeTalepleri",
                method:"post",
                headers:{
                    "Authorization":sessionStorage.getItem("Admin-Token")
                }
            })
            console.log(result.data)
            this.setState({table : result.data})  
        })
    }
    
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
                method:"POST",
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
                <Link to="/kurye-islemleri"><button className="ui button green">Kurye Ekle</button></Link>
                <br></br>
                <br></br>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.formGonder)}>
                    <Field name="restoranEmail" type="text" label="Restoran Email" component={this.formInput}></Field>
                    <Field name="restoranPassword" type="text" label="Password" component={this.formInput}></Field>
                    <button className="ui basic green button">RESTORAN EKLE</button>
                </form>
                <br></br>
                <br></br>
                <Table talep={this.state.table}/>
            </div>
        )
    }
}

var validateRestoranKayit = (formDegerleri) => {
    var error = {}

    if(!formDegerleri.restoranEmail){
        error.restoranEmail = "Kullanıcı adı boş bırakılamaz"
    }
    if(!formDegerleri.restoranPassword){
        error.restoranPassword ="Şifre hanesi boş bırakalamaz"
    }

    return error
}


export default reduxForm({
    form:"RestoranKayit",
    validate : validateRestoranKayit
}) (KontrolPaneli)