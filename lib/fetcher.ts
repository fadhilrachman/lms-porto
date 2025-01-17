import axios from "axios";
import * as Cookie from "cookies-js";
const myCookie = Cookie.get(process.env.COOKIE_NAME as string);

const fetcher = axios.create({
  baseURL: "/api",
});

if (myCookie) {  
  fetcher.defaults.headers.common["Authorization"] = `Bearer ${myCookie}`;
}
// request.po

export { fetcher };
