import React from 'react';
import {Link} from 'react-router-dom';



class Anasayfa extends React.Component{

    state = {goster : false}

    componentDidMount = async () =>{
        if(sessionStorage.getItem("Admin-Token")){
            //console.log(sessionStorage.getItem("Admin-Token"))
            await this.setState({goster:true})
           // console.log(this.state.goster)
        }
    }

    renderKontrolPaneli = () =>{
        if(this.state.goster){
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

export default Anasayfa;