import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends React.Component{

    adminLogout = async () => {
        sessionStorage.setItem("Admin-Token", "")
    }

    renderAdminButton = () =>{
        if(sessionStorage.getItem("Admin-Token")){
            return(
                <button onClick={this.adminLogout}>Admin Logout</button>
            )
        } else return (
            <Link to="/admin-login" className="ui button">Admin Login</Link>
        )
    }

    render = ()=>{
        return (
            <div className="flex-container ui container">
                <div className="header-left">
                    <h1> KURYE TAXI </h1>
                    <ul>
                        <li><Link to="/">Anasayfa</Link></li>
                        <li><Link to="">Hakkımızda</Link></li>
                        <li><Link to="">Kariyer</Link></li>
                        <li><Link to="">İletişim</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <Link to="/login-modal" className="ui button"> Üye Restorant Girişi </Link>
                    <button className="ui button"> {this.renderAdminButton()} </button>
                </div>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default Header;