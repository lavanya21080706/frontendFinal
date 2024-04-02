import axios from 'axios';
const backendUrl = `https://backend-final-2-rpay.onrender.com`;
export const feedbackpost = async ({
    feedbackType,feedback
    }) => {
      try {
        const reqUrl = `${backendUrl}/api/v1/feedback/feedback`; 
        const reqPayload = {feedbackType,feedback}; 
        const response = await axios.post(reqUrl, reqPayload);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        // Handle the error or throw it for the calling code to handle
        throw error;
      }
    };