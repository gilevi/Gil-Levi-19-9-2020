import axios from 'axios';

export default axios.create({
    baseURL:'http://167.172.162.59:9000',
    headers: {'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json, text/plain, */*'}
});