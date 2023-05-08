import axios from "axios"

export const setToken = async (token) => {
    // when you do logout pass the parameter as an empty string
    axios.defaults.headers.common.Authorization = token? `Bearer ${token}`:null;
}

const apiCalls = async (method, url, data,headers) => {
    const basePath='https://chatapp-735s.onrender.com/'
    // const basePath='http://localhost:4000/'

    try {
        const result = await axios({
            method: method,
            url: `${basePath}${url}`,
            data: data,
            headers:headers
        });
        return result
    } catch (error) {
        console.log("error:", error);
    }
} 

export default apiCalls;