import React from 'react'
import ReactDOM from 'react-dom'
import {Field, reduxForm} from 'redux-form'
import axios from 'axios';
import history from '../history'
import io from 'socket.io-client'


class AtamaModal extends React.Component{

    state = {kuryeler : null}
    
    socket = io("http://localhost:8000")

    componentDidMount = async () => {
        this.socket.on("console",(msg)=>{
            console.log(msg)
        })    
        const result = await axios({
            method:"get",
            headers : {
                Authorization : sessionStorage.getItem("Admin-Token")
            },
            url : "http://localhost:8000/admin/kuryeler"
        })
        console.log(result.data)
        console.log(result.data.map((kurye)=>{return kurye.kullaniciAdi}))
        await this.setState({kuryeler : result.data.map((kurye)=>{return kurye.kullaniciAdi})})
        console.log(history.location.state)
    }

    formDoldur = ({label,input}) => {
        console.log(input)
        return(
            <div>
                <label>{label} </label>
                <br></br>
                <br></br>
                <select className="ui selection dropdown"   {...input} >
                    {!this.state.kuryeler? null : this.state.kuryeler.map((kurye)=>{
                        return(
                            <option key={kurye} value={kurye}>{kurye}</option>
                        )
                    })} 
                </select>
            </div>
        )
    }
   
    handleFormSubmit = (formDegerleri) => {
        console.log(formDegerleri.select)
        /* 
        burada atama yapılan kurye server a gönderilecek. server da veritabanında güncelleme
        yapılacak. atamanın yapıldığı kuryeye mesaj gönderilecek. kuryeden alındı mesajı geri döndürülecek.
         */
        this.socket.emit("atama",{
            atananKurye : formDegerleri.select,
            atamaZamanı : new Date(),
            atamaDurumu : true,
            _id : history.location.state._id,
            adres : history.location.state.adres,
            restoranName : history.location.state.restoranName}, (callback)=>{
                console.log(callback)
                if(callback==="ok"){
                    history.push("/kontrol-paneli")
                }
            })
        
    }

    render = () => {
        return ReactDOM.createPortal(
            <div className="ui modalBackground" onClick={()=>{history.goBack()}}>
                <div className="ui card" onClick={(e)=>{e.stopPropagation()}}>
                    <div className="content">
                        <form className="ui form error" onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                            <Field name="select" component={this.formDoldur} label="Lütfen bir kurye seçiniz : "></Field>
                            <br></br>
                            <button style={{float:"right"}} className="ui button green" type="submit">Ata</button>
                        </form>
                    </div>
                </div>
            </div>
        , document.querySelector('#modal'))
            
    }
}


export default reduxForm({
    form:"atamaFormu"
})(AtamaModal)