import axios from 'axios';

const backendUrl = `https://backend-final-2-rpay.onrender.com`;


export const userdata = async ({userdata}) => {
    try {
      const reqUrl = `${backendUrl}/api/v1/cart/userdata`; 
      const response = await axios.post(reqUrl, userdata); // Pass userdata directly
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const alldata = async () => {
    try {
      const reqUrl = `${backendUrl}/api/v1/cart/alldata`; 
      const response = await axios.get(reqUrl); // Pass userdata directly
   
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const getcart = async (_id) => {
    try {
      const reqUrl = `${backendUrl}/api/v1/cart/getcart/${_id}`; 
      const response = await axios.get(reqUrl); // Pass userdata directly
   console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
 