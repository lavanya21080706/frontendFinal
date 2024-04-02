import axios from 'axios';

const backendUrl = `https://backend-final-2-rpay.onrender.com`;

export const register = async ({
name,
email,
mobile,
password,
}) => {
  try {
    const reqUrl = `${backendUrl}/api/v1/auth/register`; 
    const reqPayload = {name, email,mobile,password }; // Corrected the payload
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    // Handle the error or throw it for the calling code to handle
    throw error;
  }
};

export const login = async ({ email, password ,mobile}) => {
  try {
    const reqUrl = `${backendUrl}/api/v1/auth/login`;
    const reqPayload = { email, password,mobile };
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
