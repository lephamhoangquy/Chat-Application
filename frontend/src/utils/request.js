import axios from 'axios';

export const send = (url, endPoint, method, headers = null, data = null) =>
  axios({ method, url: `${url}/${endPoint}`, headers, data });
