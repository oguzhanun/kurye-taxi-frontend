import React from 'react';
//import history from '../../history';
import './Cagir.css';
import io from 'socket.io-client';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';


class Cagir extends React.Component{

    state = {kuryeTalebiDonusu:"",talepkutusu:"talepkutusu"}

    componentDidMount = () =>{
        this.talepkutusu = React.createRef()
        this.adresBarRef = React.createRef()
        this.button = React.createRef()
    }

    hataGoster = (meta)=>{

        if(meta.error && meta.touched){
            return(
                <div className="ui error message">
                    <p>{meta.error}</p>
                </div>
            )
        }

    }

    formDoldur = ({input, type,meta,label}) =>{
        
        return(
            <div>
                {/* <label>{label}</label> */}
                <input ref={this.adresBarRef} type={type} {...input} placeholder={label} ></input>
                {this.hataGoster(meta)}
            </div>
        )
    }

    formHallet = (formDegerleri)=>{
        const socket = io("http://127.0.0.1:8000")
        
        this.button.current.setAttribute("disabled", "true")

        socket.emit("kuryeTalebi", {
                adres : formDegerleri.adres, 
                restoranName : sessionStorage.getItem("Restoran-Name")}, async (message)=>{
                console.log(message)
                
                //setTimeout(()=>{
                    
                //},2500)
                
                if(message==="TALEBİNİZ ALINMIŞTIR, HEMEN GELİYORUZ."){

                    await this.setState({kuryeTalebiDonusu : message})
                    await this.setState({talepkutusu:"talepkutusu kaybol"})
    
                    this.adresBarRef.current.focus()
                    this.adresBarRef.current.value = ""
                }
                setTimeout( async ()=>{
                    await this.setState({kuryeTalebiDonusu : "",talepkutusu :"talepkutusu"})
                },2500)

                this.button.current.removeAttribute("disabled")
            }
        )

    }

    renderMesajKutusu = () =>{
        return(
            <div ref={this.talepkutusu} style={{color:"red"}} className={this.state.talepkutusu}>
                {this.state.kuryeTalebiDonusu}
            </div>
        )
    }

    render = () =>{

        return(
            <div className="flexBox">

                <form className="ui form error" onSubmit={this.props.handleSubmit(this.formHallet)}>
                    <div>{this.renderMesajKutusu()}</div>
                    <br/>
                    <Field  name="adres" type="text" component={this.formDoldur} label="Adres"/>
                    
                    <br></br>
                    <div className="flexItem"> <button ref={this.button} style={{backgroundColor:"yellow", border:"none"}}>ÇAĞIR</button></div> 
                </form>
            </div>
        );
    }
}

var validateKuryeCagir = (formDegerleri)=>{
    var error = {}
    
    //formDegerleri.adres = formDegerleri.adres.trim()

    if(!formDegerleri.adres){
        error.adres = "Lütfen adres bilgisi giriniz..."
    }

    return error
}

const wrappedForm3 = reduxForm({
        form : "KuryeCagirmaFormu",
        validate : validateKuryeCagir
    }
)(Cagir)

const mapStateToProps = (state) =>{
    return {
        restoranName : state.restoranNameState.restoranName
    }
}


export default connect(mapStateToProps)(wrappedForm3);