import axios from 'axios';
const backendUrl = `https://backend-final-2-rpay.onrender.com`;

export const getdata = async(headphone_type,company,color,price,sort,Productsearch)=>{
  const reqUrl = `${backendUrl}/api/v1/product/getdata?headphone_type=${headphone_type}&company=${company}&color=${color}&price=${price}&sort=${sort}&Productsearch=${Productsearch}`
    try {
        const response = await axios.get(reqUrl);
     
        return response;
    } catch (error) {
        console.log(error)
        
    }
 
}
export const getcount = async () => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/count`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
       
    }

};
export const updatequantity = async (_id) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/increment/${_id}`;
        console.log(`'requrl'${reqUrl}`)
        const response = await axios.put(reqUrl);
        return response.data?.data;
    } catch (error) {
        console.log(error);
        
    }

};
export const updateCardStatus = async (_id) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/updateCardStatus/${_id}`;
       
        const response = await axios.put(reqUrl);
        return response.data?.data;
    } catch (error) {
        console.log(error);
        
    }

};export const updateDeliveryStatus = async (_id) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/updateDeliveryStatus/${_id}`;
       
        const response = await axios.put(reqUrl);
        return response.data?.data;
    } catch (error) {
        console.log(error);
        
    }

};
export const updateall = async () => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/updateall`;
       
        const response = await axios.put(reqUrl);
        return response.data?.data;
    } catch (error) {
        console.log(error);
        
    }

};


export const productdata = async () => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/products/cardstatus`;
        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
       
    }

};
export const deliverydata = async () => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/products/deliverystatus`;
        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
       
    }

};

export const quantityupdate = async (_id, { quantity }) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/product/quantityupdate/${_id}`;
        const reqPayload = { quantity };

        const response = await axios.put(reqUrl, reqPayload); // Pass the request payload here
        return response.data?.data;
    } catch (error) {
        console.log(error);
        // Handle error appropriately, e.g., throw an error or return a meaningful value
    }
};