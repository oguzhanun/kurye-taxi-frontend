import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {connect} from "react-redux";
import {adminStateAction} from "../../actions/adminStateAction"
import history from "../../history"
import {restoranStateAction,restoranNameAction} from "../../actions/restoranStateAction"
import {kuryeStateAction} from "../../actions/kuryeStateAction"

class Header extends React.Component{

    adminLogout = async () => {
        //sessionStorage.setItem("Admin-Token", undefined)
        sessionStorage.removeItem("Admin-Token")
        this.props.adminStateAction(false)
        
        history.push("/")
    }

    renderAdminButton = () =>{
        console.log("renderAdminButton : ",this.props.signed_in)

        if(this.props.signed_in){
            return(
                <button className="ui button red" onClick={this.adminLogout}>Admin Logout</button>
            )
        } else return (
            <Link to="/admin-login" className="ui button blue">Admin Login</Link>
        )
    }

    restoranLogout = async () => {
        //sessionStorage.setItem("Restoran-Token", undefined)
        sessionStorage.removeItem("Restoran-Token")
        sessionStorage.removeItem("Restoran-Name")
        this.props.restoranStateAction(false)
        this.props.restoranNameAction("")

        history.push("/")
    }

    renderRestoranButton = () =>{
        console.log("renderRestoranButton : ",this.props.restoran_signed_in)

        if(this.props.restoran_signed_in){
            return(
                <button className="ui button red" onClick={this.restoranLogout}>Restoran Logout</button>
            )
        } else return (
            <Link to="/login-modal" className="ui button blue">Restoran Login</Link>
        )
    }

    kuryeLogout = async () => {
        await sessionStorage.removeItem("Kurye-Token")
        this.props.kuryeStateAction(false)
        history.push("/")
    }

    renderKuryeButton = () => {
        if(this.props.kuryeLoggedIn){
            return(
                <button className="ui button red" onClick={this.kuryeLogout}>Kurye Logout</button>
            )
        } else return (
            <div>
                <Link to="/kurye-modal" className="ui button blue">Kurye Login</Link>
            </div>
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
                <div style={{clear:"both"}}></div>
                <div className="" style={{ marginRight:"5px", marginBottom:"25px", width:"100%", float:"right", display:"inline-block"}}>
                    <div style={{display:"inline-block", float:"right"}}>{this.renderRestoranButton()}</div>
                    
                    <div style={{display:"inline-block", float:"right"}}>{this.renderAdminButton()}</div>
                    
                    <div style={{display:"inline-block", float:"right"}}>{this.renderKuryeButton()}</div>
                </div>
                <div style={{clear:"both"}}></div>
            </div>
        );
    }
}

const mapsStateToProps = (state) =>{
    
    return {signed_in : state.adminState.signed_in,
            restoran_signed_in : state.restoranState.restoran_signed_in,
            kuryeLoggedIn : state.kuryeState.kuryeLoggedIn}
}

export default connect(mapsStateToProps,{adminStateAction,restoranStateAction,
                        restoranNameAction,kuryeStateAction})(Header)