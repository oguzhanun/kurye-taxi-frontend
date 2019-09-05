import React from "react"
import ReactDOM from "react-dom"
import {reduxForm, Field} from 'redux-form';
import axios from "../api/axios"
import history from "../history"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {kuryeStateAction} from "../actions/kuryeStateAction"

class KuryeModal extends React.Component{

    state = {error : ""}

    hataVarMi =  (meta) => {

        if(meta.error){
            this.setState({error : meta.error}) 
        } else{
            this.setState({error : ""})
        }
        if(meta.error && meta.touched){
            return (
              <div className="ui error message">
                {meta.error}
              </div>
            )
        } else return null;
    }

    formDoldur = ({label,input,meta,type, focus}) => {
        return(
            <div className="field">
                <label>{label}</label>
                <input type={type} {...input} autoFocus={focus}></input>
                <div>{this.hataVarMi(meta)}</div>
            </div>
        )
    }   

    login = (e)=>{
        if(!this.state.error){
            const credentials = {username:e.kuryeKullaniciAdi, password:e.kuryePassword};
            
            axios.post('/kurye/login', credentials).then( res=>{
                const kuryeToken = res.data;   
                sessionStorage.setItem('Kurye-Token', kuryeToken);
                this.props.kuryeStateAction(true)
                history.push('/kurye-paneli',{username : e.kuryeKullaniciAdi})
            },
            rej=>{
                console.log(rej)
            })
        }
    }

    render = () => {
        return ReactDOM.createPortal(
            <div className="ui modalBackground" onClick={()=>history.push("/")}>
                <div className="ui card" onClick={(event)=>{event.stopPropagation()}}>
                    <div className="content">
                        <form className="ui form error" onSubmit={this.props.handleSubmit(this.login)}>
                            <Field type="text" name="kuryeKullaniciAdi" focus={true} component={this.formDoldur} label="Kullanıcı Adı :"></Field>
                            <Field type="password" name="kuryePassword" focus={false} component={this.formDoldur} label="Şifre :"></Field>
                            <div className="ui extra content">
                                <div className="ui two buttons">
                                    <Link to="/" className="ui basic red button">İptal</Link>
                                    <button className="ui basic green button" >Giriş</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    }
}

var kuryeLoginValidate = (formDegerleri) => {
    var error={}
    if(!formDegerleri.kuryeKullaniciAdi){
        error.kuryeKullaniciAdi ="Lütfen kullanıcı adını giriniz!"
    }
    if(!formDegerleri.kuryePassword){
        error.kuryePassword = "Lütfen şifreyi giriniz!"
    }
    return error
}

const wrappedFormForKurye = reduxForm({
    form:"kurye_login_form",
    validate : kuryeLoginValidate
})(KuryeModal)


export default connect(null, {kuryeStateAction})(wrappedFormForKurye)