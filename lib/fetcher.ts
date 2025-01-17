import axios from "axios";
import * as Cookie from "cookies-js";
const myCookie = Cookie.get(process.env.COOKIE_NAME as string);

const fetcher = axios.create({
  baseURL: "/api",
});

fetcher.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiMTgzNGRjLTk3ZDktNDI0MC05MGYzLTU5YzI1YzA2MTA2YSIsInVzZXJfbmFtZSI6ImN1eXkiLCJlbWFpbCI6ImZhZGhpbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR4eU1IYkVucFJpZk9oTjh0ckQuZU9lWGppN2NYa3FXeFZnMU5Ua1lEL0RSaE5rNnlQZUxFcSIsImlzX2FkbWluIjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjUtMDEtMTFUMDQ6NDQ6MzcuNDY4WiIsInVwZGF0ZV9hdCI6IjIwMjUtMDEtMTFUMDQ6NDQ6MzcuNDY4WiIsImlhdCI6MTczNzAwMzk3MywiZXhwIjoxNzM5NDIzMTczfQ.DNjzfmdblfD54FqCKMTqb6WOFBnk7DkipQsZYJ3qRtQ`;
if (myCookie) {  
  fetcher.defaults.headers.common["Authorization"] = `Bearer ${myCookie}`;
}
// request.po

export { fetcher };
