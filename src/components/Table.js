import React from "react"
import history from "../history"

class Table extends React.Component{

    atamaYap = (element) => {
        history.push("/atama-modal",element)
    }

    renderNavigasyonButton = (element) => {
        return(
            <td><button style={{margin:"auto auto"}} 
                    className="ui button green"
                    onClick={ () => history.push("/navigasyon", {adres : element.adres} ) }>Navigasyon
                </button>
            </td>
        )    
    }

    renderAtamaButton = (element) => {
        console.log(element.atamaDurumu)
        if(element.atamaDurumu === true){
            return(
                <td><button style={{margin:"auto auto"}} 
                        onClick={()=>this.atamaYap(element)} 
                        className="ui button green">Değiştir
                    </button>
                </td>
            )
        }
        return(
            <td><button style={{margin:"auto auto"}} 
                    onClick={()=>this.atamaYap(element)} 
                    className="ui button red">Atama Yap
                </button>
            </td>
        ) 

    }

    render = () => {
        //console.log(this.props.talep)
        if(this.props.talep){
            const arrayOfTalep = Object.values(this.props.talep)
            return(
                <div>
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Restoran Adı</th>
                                <th>Adres</th>
                                <th>Atama Durumu</th>
                                <th>Atanan Kurye</th>
                                <th>Talep Zamanı</th>
                                <th>Atama Zamanı</th>
                                {sessionStorage.getItem("Admin-Token")? <th>İş Emri</th> : <th>İşlem</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {arrayOfTalep.map((element)=>{
                                return(
                                    <tr key={element._id} >
                                        <td data-label="Restoran_Adı">{element.restoranName}</td>
                                        <td data-label="Adres">{element.adres}</td>
                                        <td data-label="Atama Durumu">{element.atamaDurumu? "evet":"hayır"}</td>
                                        <td data-label="Atanan Kurye">{element.atananKurye}</td>
                                        <td data-label="Talep Zamanı">{element.talepZamanı}</td>
                                        <td data-label="Atama Zamanı">{element.atamaZamanı}</td>
                                        {sessionStorage.getItem("Admin-Token")? this.renderAtamaButton(element) : this.renderNavigasyonButton(element)}

                                        {/* <td><button style={{margin:"auto auto"}} onClick={()=>this.atamaYap(element)} className="ui button red">Atama Yap</button></td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                        </table>
                </div>
            )
        } else return <div>Lütfen bekleyiniz...</div>
    }
}

export default Table