import React from 'react'
import io from "socket.io-client"
import history from "../history"
import axios from "axios"
import Table from "./Table"
import alarm1 from "./Fire_pager.mp3"


class KuryePaneli extends React.Component{
    
    socket = io("http://127.0.0.1:8000")
    
    state = {table : ""}

    componentDidMount = async ()=> {
        
        this.audioRef = React.createRef()

        if(history.location.state){
            sessionStorage.setItem("Kurye-Adi", history.location.state.username)
        }
        const result = await axios({
            url:`http://localhost:8000/kurye/kuryeTalepleri/${sessionStorage.getItem("Kurye-Adi")}`,
            method:"post",
            headers:{
                "Authorization" : sessionStorage.getItem("Kurye-Token")
            }
        })
        //console.log(result.data)
        await this.setState({table : result.data})  
        
        this.socket.on("console",(msg)=>{
            console.log(msg)
        })
        
        //console.log(history.location.state.username)
        this.socket.emit("join", {username : sessionStorage.getItem("Kurye-Adi")})
        this.socket.on("message",(msg) => {
            console.log(msg)
        })
        this.socket.on("atama", async (msg)=>{
            console.log("müzik çal")
            

            //const alarm = new Audio("http://soundbible.com/grab.php?id=1766&type=mp3")
            /* dom içine local dosyayı yalnızca javascript kullanarak ekleyip çalıştıramıyoruz.
            ** Ancak dosyayı import edip audio tag ini de dom a render edersek ref sistemi üzerinden
            ** ses dosyasını çalıştırabiliyoruz... */
            
            try {
                await this.refs.audio.load()
                await this.refs.audio.play()
            } catch(e) {
                console.log(e)

            } finally {
                
            }
            
            alert(msg.adres + " adresine gitmek üzere " + msg.restoran + " tarafından çağrılıyorsunuz.")
            const result = await axios({
                url:`http://localhost:8000/kurye/kuryeTalepleri/${sessionStorage.getItem("Kurye-Adi")}`,
                method:"post",
                headers:{
                    "Authorization" : sessionStorage.getItem("Kurye-Token")
                }
            })
            
            await this.setState({table : result.data}) 

            history.push("/navigasyon")
        })
    }


    render =  () => {
        return( 
            <div>
                {/* <audio src="http://soundbible.com/grab.php?id=1766&type=mp3" type="audio/mp3"></audio> */}
                <Table talep={this.state.table}/>

                {/* controls attribute ını kullanmadığımızda audio elemanı otomatik olarak görünmez oluyor. */}
                <audio ref="audio" >
                    <source src={alarm1} />
                </audio>

                {/* <span style={{fontSize:"10em"}}>&#9651;</span>
                <span style={{fontSize:"10em"}}>&#9651;</span>
                <span style={{fontSize:"10em"}}>&#9651;</span> */}
            </div>
        )
    }
}

export default KuryePaneli