import React from "react"
import {Field, reduxForm} from "redux-form"
import axios from "axios";
import history from '../history'


class KuryeIslemleri extends React.Component{

    hataGoster = (meta) => {
        if(meta.error && meta.touched){
            return(
                <div className="ui error message">{meta.error}</div>
            )
        }
    }

    formDoldur = ({type, label, input, meta}) => {
        //const className = `field`
        return(
            <div className=" ten wide field">
                <label>{label}</label>
                <input type={type} {...input}/>
                <div>{this.hataGoster(meta)}</div>
            </div>
        )
    }

    kuryeKaydet = async (formDegerleri) => {
        const kuryeOlustur = await axios({
            url:"http://localhost:8000/admin/kuryeler",
            headers : {
                Authorization : sessionStorage.getItem("Admin-Token")
            },
            method : "post",
            data : formDegerleri
        })

        console.log(kuryeOlustur)
        history.push("/kontrol-paneli")
    }

    render = () => {
        return(
            <div className="ui container">
                <form className="ui form error " onSubmit={this.props.handleSubmit(this.kuryeKaydet)}>
                    <Field name="kuryeAdi" type="text" component={this.formDoldur} label="Kurye Adı"/>
                    <Field name="kullaniciAdi" type="text" component={this.formDoldur} label="Kullanıcı Adı"/>
                    <Field name="password" type="password" component={this.formDoldur} label="Password"/>
                    <Field name="dogumTarihi" type="date" component={this.formDoldur} label="Doğum Tarihi"/>
                    <Field name="cinsiyet" type="text" component={this.formDoldur} label="Cinsiyet"/>
                    <Field name="telefonNumarasi" type="text" component={this.formDoldur} label="Telefon No"/>
                    <button className="ui button blue">Kaydet</button>
                </form>
            </div>
        )
    }
}

var kuryeFormValidate = (formDegerleri) => {
    var error = {}
    if(!formDegerleri.kuryeAdi){
        error.kuryeAdi = "Kurye adı boş bırakılamaz."
    }
    if(!formDegerleri.kullaniciAdi){
        error.kullaniciAdi = "Kullanıcı adı boş bırakılamaz."
    }
    if(!formDegerleri.password){
        error.password = "Şifre alanı boş bırakılamaz."
    }

    return error
}

export default reduxForm({
    form : "kuryeForm",
    validate : kuryeFormValidate
})(KuryeIslemleri)