import axios from "axios";
// import * as Cookie from "cookies-js";
// import Cookie from 'js-cookie';
import Cookies from "js-cookie";
const myCookie = Cookies.get(process.env.COOKIE_NAME as string);
// const myCookie = Cookies.get("authjs.session-token");


const fetcher = axios.create({
  baseURL: "/api",
});

// fetcher.interceptors.request.use(
// 	async (config) => {
//     const accessToken = Cookies.get("authjs.session-token");
//     console.log('INTERCEPTOR TOKEN=', accessToken);
    
//     // if (accessToken != null && accessToken.length != 0) {
//       config.headers.Authorization = `Bearer ${accessToken}`;

//       return config;
//     // }

//     // return config;
// 	},
// 	(error) => Promise.reject(error)
// );

console.log('FETCH COOKEI=', myCookie);

if (myCookie) {  
  fetcher.defaults.headers.common["Authorization"] = `Bearer ${myCookie}`;
}
// request.po

export { fetcher };
