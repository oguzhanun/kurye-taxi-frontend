import React from 'react';
import ReactDOM from 'react-dom';
import './AdminLogin.css';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import history from '../history';
import axios from '../api/axios';

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

    // 
    if(meta.error && meta.touched){
      return (
        <div className="ui error message">
          {meta.error}
        </div>
      )
    }else return null;
  }

  fillTheField = ({input,label,meta,type})=>{
    
    const className = `field ${meta.error && meta.touched ? 'error':''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input}/>  {/*value={input.value} onChange={input.onChange} */}
        <div>{this.hataGoster(meta)}</div>
      </div>
    )
  }

  logindenCik = ()=>{
    history.push('/');
  }

  login = (e)=>{
    //e.preventDefault(); handleSubmit fonksiyonundan dolayı kullanılmasına gerek kalmadı...

    if(!this.state.error){
      
      const credentials = {username:e.username, password:e.password};
      this.setState({username:e.username, password:e.password});

      let token = null;

      axios.post('/admin/Login', credentials).then(res=>{
        
          token = res.data;
          console.log(JSON.stringify(res.data));
          
          sessionStorage.setItem('Admin-Token', token);
          console.log(sessionStorage);
          history.push('/kontrol-paneli')
          },
          rej=>{console.log(rej)
        
        })

        // setState xhr içinde hata veriyor.... BU TOKEN İLE İLGİLİYDİ MUHTEMELEN ŞİMDİ YAPMAYACAK AYNI ŞEYİ...
        this.setState(token);
        
    }
  }

  render =() =>{
    return ReactDOM.createPortal(
      <div className="ui modalBackground" onClick={this.logindenCik}>
        <div className="ui ">
          <div className="ui ">
            <div className="ui card" onClick={(event)=>{event.stopPropagation()}}>
              <div className="content ">
                  <form className="ui form error" onSubmit={this.props.handleSubmit(this.login)}>

                    <Field name="username" type="text" component={this.fillTheField} label="Kullanıcı Adı :"></Field>
                    <Field name="password" type="password" component={this.fillTheField} label="Şifre :"></Field>
                    
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

var validate = (formDegerleri) =>{
  
  var error = {};

  if(!formDegerleri.username){
    error.username = 'Kullanıcı Adı Boş Bırakılamaz';
  }
  if(!formDegerleri.password){
    error.password = 'Şifre Boş Bırakılamaz';
  }
  return error;
}



export default reduxForm({
  form:'loginForm',
  validate
})(LoginModal);



