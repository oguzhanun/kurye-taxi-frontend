import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";


class Anasayfa extends React.Component{

    renderKontrolPaneli = () =>{
        if(this.props.signed_in){
            return(
                <div>
                    <br></br>
                    <Link to="/kontrol-paneli" className="ui basic button green">Kontrol Paneli</Link>
                </div>
            )
        }
        else return(
            <div></div>
        )
    }

    render(){
        return(
           <div className="ui container">
                ANASAYFA
                <div>
                    {this.renderKontrolPaneli()}
                </div>
          </div>
        );
    }
}

const mapStateToProps = (state)=>{

    return {signed_in : state.adminState.signed_in}
}

export default connect(mapStateToProps)(Anasayfa);