import React from 'react';
import history from '../../history';
import './Cagir.css';
import axios from '../../api/axios';

class Cagir extends React.Component{

    state = {token : ""};

    componentDidMount = ()=>{
        
        // ÖNCELİKLE TOKEN VAR MI BUNU ÖĞRENECEĞİZ.
        // DOĞRUDAN SAYFAYA ERİŞİM SAĞLANMASINI ÖNLEMEK İÇİN...
        const token = sessionStorage.getItem('token');
        
        if(!token){
            history.push('/');
        }
        this.setState({token});
    }

    cagir = () =>{
        
        axios.post("/kuryeCagrisi", {
            data:{
                token:sessionStorage.getItem('token')
            }
        }).then(res =>{
            console.log(res);
        }, rej =>{
            console.log(rej);
        })
    }

    render = () =>{

        return(
            <div className="flexBox">
                <div className="flexItem" onClick={this.cagir}>ÇAĞIR</div>
            </div>
        );
    }

}


export default Cagir;