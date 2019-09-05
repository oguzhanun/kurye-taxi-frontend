import React from 'react';
import ReactDOM from 'react-dom';
import './LoginModal.css';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import history from '../../history';
import axios from '../../api/axios';
import validator from "validator";
import { connect } from 'react-redux';
import {restoranStateAction,restoranNameAction} from '../../actions/restoranStateAction'


class LoginModal extends React.Component{ 

  state = {username:"",password:null, error:"",token:""};

  hataGoster = (meta)=>{

    // eğer form inputlarına hiç dokunmadan doğrudan giriş butonuna basılırsa
    // bu state değişikliği ile login fonksiyonu içinde herhangi bir değişiklik
    // yapılmayacak...
    if(meta.error){
      this.setState({error:meta.error}) 
    }

    // bu kontrol ile de hatanın düzeltilmesini müteakip tekrar giriş işlemlerinin yapılabilmesine
    // olanak tanıyoruz...
    if(!meta.error)
    this.setState({error:""})

    if(meta.error && meta.touched){
      return (
        <div className="ui error message">
          {meta.error}
        </div>
      )
    }else return null;
  }

  fillTheField = ({input,label,meta,type,focus})=>{
    
    const className = `field ${meta.error && meta.touched ? 'error':''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} autoFocus={focus}/>  {/*value={input.value} onChange={input.onChange} */}
        <div>{this.hataGoster(meta)}</div>
      </div>
    )
  }

  logindenCik = ()=>{
    history.push('/');
  }

  login = async (e)=>{
    //e.preventDefault(); handleSubmit fonksiyonundan dolayı kullanılmasına gerek kalmadı...

    if(!this.state.error){
      
      const credentials = {username:e.username, password:e.password};
      await this.setState({username:e.username, password:e.password});

      let token = null;
      try{
        axios.post('/restorans/login', credentials).then((res) => {
        
          token = res.data;

          this.props.restoranStateAction(true)
          
          /*         eğer session refresh edilirse redux üzerindeki state bilgisi başlangıç konumuna
           *         dönecektir. bu yüzden her daim ihtiyaç duyulacak verinin session storage içinde 
           *         tutulması önem arz etmektedir...
           */
          this.props.restoranNameAction(e.username)

          sessionStorage.setItem('Restoran-Token', token)
          sessionStorage.setItem("Restoran-Name", e.username)

          history.push('/cagir')

          },
          async (rej) => {
            console.log("reject oldu...")
            console.log(rej)
            await this.setState({error : "Kullanıcı adı veya şifre yanlış"})
            
            //history.goBack()
        
          })
        } catch(e){
            console.log(e)
        }

        await this.setState(token);
        
    }
  }

  donenHata = () => {
    if(this.state.error === "Kullanıcı adı veya şifre yanlış"){
      return(
        <div className="ui error message">Kullanıcı adı veya şifre yanlış</div>
      )
    }else return null
  }

  render =() =>{
    return ReactDOM.createPortal(
      <div className="ui modalBackground" onClick={this.logindenCik}>
        <div className="ui ">
          <div className="ui ">
            <div className="ui card" onClick={(event)=>{event.stopPropagation()}}>
              <div className="content ">
                  <form className="ui form error" onSubmit={this.props.handleSubmit(this.login)}>

                    <Field name="username" type="text" focus={true} component={this.fillTheField} label="Kullanıcı Adı :"></Field>
                    <Field name="password" type="password" focus={false} component={this.fillTheField} label="Şifre :"></Field>
                    {this.donenHata()}
                    <div className="ui extra content">
                      <div className="ui two buttons">
                        <Link to="/" className="ui basic red button">İptal</Link>
                        <button className="ui basic green button" >Giriş</button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>, 
        document.querySelector('#modal')
    );
  }
}

var validateRestoran = (formDegerleri) =>{
  
  var error = {};

  if(!formDegerleri.username){
  
    error.username = 'Kullanıcı Adı Boş Bırakılamaz';
  } 
  else if(!validator.isEmail(formDegerleri.username)){
  
    error.username = "Lütfen geçerli bir email adresi giriniz"
  }

  if(!formDegerleri.password){
    error.password = 'Şifre Boş Bırakılamaz';
  }
  
  return error;
}

const wrappedForm2 = reduxForm({
  form:'loginFormRestoran',
  validate : validateRestoran
})(LoginModal);

export default connect(null, {restoranStateAction,restoranNameAction})(wrappedForm2)



