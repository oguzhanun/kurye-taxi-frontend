import React from 'react';
import {Router, Switch,Route,Redirect} from 'react-router-dom'
import Header from './Header/Header';
import Anasayfa from './Anasayfa';
import history from '../history';
import LoginModal from './LoginModal/LoginModal';
import Cagir from './CagirFolder/Cagir';
import AdminLogin from './AdminLogin';
import KontrolPaneli from "./KontrolPaneli";
import AtamaModal from "./AtamaModal";
import KuryeIslemleri from "./KuryeIslemleri";
import KuryePaneli from "./KuryePaneli";
import KuryeModal from "./KuryeModal";
import {connect} from "react-redux";
import Navigasyon from "./Navigasyon";


class App extends React.Component{
    
    renderCagir =  ()=>{
        
        if( this.props.restoranState){
            return(
                <Route exact path="/cagir" component={Cagir}/>
            )
        }
        /* path değeri kullanılmadığında doğrudan redirect in çalışmasına neden oluyor. */
        else {
            return <Redirect path="/cagir" exact to="/"/>
        }
    }

    renderKontrolPanel =  () =>{
        
        if(  this.props.adminState){
            return (
                <Route path="/kontrol-paneli" exact component={KontrolPaneli}/>
            )
        }
        else {
            return <Redirect path="/kontrol-paneli" exact to="/"/>
        }
    }

    renderAtamaPanel =  () => {
        
        if(  this.props.adminState){
            return(
                <Route path="/atama-modal" exact component={AtamaModal}/>
            )
        }
        else {
            return <Redirect path="/atama-modal" exact to="/"/>
        }
    }

    renderKuryeIslemleri =  () => {
        
        if( this.props.adminState){
            return(
                <Route path="/kurye-islemleri" exact component={KuryeIslemleri}/>
            )
        }
        else {
            return <Redirect path="/kurye-islemleri" exact to="/"/>
        }
    }

    renderKuryePaneli =  () =>{
    
        if( this.props.kuryeState){
            return(
                <Route path="/kurye-paneli" exact component={KuryePaneli}/>
            )
        }
        else {
            return <Redirect path="/kurye-paneli" exact to="/"/>
        }
    }

    render = () =>{
        return(
            <div>
                <Router history={history}>
                    <div>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Anasayfa}/>
                            <Route path="/login-modal" exact component={LoginModal}/>
                            <Route path="/admin-login" exact component={AdminLogin}/>
                            <Route path="/kurye-modal" exact component={KuryeModal}/>
                            <Route path="/navigasyon" exact component={Navigasyon}/>
                            {/* kontrol paneline de şifreli yani token ın varlığı üzerinden erişim sağlanacak... */}
                            {/* <Route path="/kontrol-paneli" exact component={KontrolPaneli}/> */}
                            {/* renderCagir fonksiyonu ve benzeri kapalı kompanentler en alt kısımda çağrılmalı
                            yoksa kapalı olmayan kompanentlere erişim engelleniyor... */}
                            {this.renderCagir()}
                            {this.renderKontrolPanel()}
                            {this.renderAtamaPanel()}
                            {this.renderKuryeIslemleri()}
                            {this.renderKuryePaneli()}
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        adminState : state.adminState.signed_in,
        restoranState : state.restoranState.restoran_signed_in,
        kuryeState : state.kuryeState.kuryeLoggedIn
    }
}
export default connect(mapStateToProps)(App);