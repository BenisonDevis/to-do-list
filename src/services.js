import axios from './axios';


const services = () => {
    const getTodo = async () => {
        const response = await axios.get(
          "/create"
        );
        return response?.data;
      };
  return {
    getTodo,
  }
  
}

export default services