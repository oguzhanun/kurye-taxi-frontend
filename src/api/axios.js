import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8000',
    
});

// headers:{
//     Authorization : sessionStorage.getItem("Admin-Token")
// }