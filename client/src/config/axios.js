import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
  });
  
  instance.defaults.headers.post['Content-Type'] ='application/json';
  // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

export default instance