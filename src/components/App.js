import React from 'react';
import {Router, Switch,Route} from 'react-router-dom'
import Header from './Header/Header';
import Anasayfa from './Anasayfa';
import history from '../history';
import LoginModal from './LoginModal/LoginModal';
import Cagir from './CagirFolder/Cagir';
import AdminLogin from './AdminLogin';
import KontrolPaneli from "./KontrolPaneli";


const App = ()=>{
   
        return(
            <div>
                <Router history={history}>
                    <div>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Anasayfa}/>
                            <Route path="/login-modal" exact component={LoginModal}/>
                            <Route path="/cagir" exact component={Cagir}/>
                            <Route path="/admin-login" exact component={AdminLogin}/>
                            <Route path="/kontrol-paneli" exact component={KontrolPaneli}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }


export default App;