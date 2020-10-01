import api_requests from '../apis/api_requests';
import axios from 'axios';

export const fetchMessages = () => async dispatch => {
    const response = await api_requests.get('/messages-receive');
    dispatch({ type: 'FETCH_MESSAGES', payload: response.data})
};

export const fetchSentMessages = () => async dispatch => {
    const response = await api_requests.get('/messages-sent');
    dispatch({ type: 'FETCH_SENT_MESSAGES', payload: response.data})
};

export const deleteMessages = (id) => async dispatch => {
    const request = await api_requests.delete('/delete-message/:'+id);
    return {
        type:'DELETE_MESSAGE',
        payload: request
    }
};

export const deleteMessagesSent = (id) => async dispatch => {
    const request = await api_requests.delete('/delete-message-s/:'+id);
    console.log(request);
    return {
        type:'DELETE_MESSAGE_SENT',
        payload: request
    }
};

export const addMessage = (data) => async dispatch => {     
    const request = await api_requests.post('/send-message', {data});
    return {
        type:'CREATE_MESSAGE',
        payload: request
    }
};

export const LoginInto = (data) => async dispatch => {     
    const request = await api_requests.post('/users/login', data);
    console.log(request)
    var ifLogin = false;
    if(request.status === 201){
        // setLogin(true);
        // var isLogin = JSON.parse("true".toLowerCase());
        // sessionStorage.setItem('login', true); 
        ifLogin = true;

    }
    else if(request.status === 400) {
        ifLogin = false;

    }
    else{
        // setLogin(false);
        // var isLogin = JSON.parse("false".toLowerCase());
        // sessionStorage.setItem('login', false); 
        ifLogin = false;
    }
    return {
        type:'LOGIN_USER',
        payload: ifLogin
    }

    // fetch('http://167.172.162.59:9000/users/login', {
    //     method: 'POST',
    //     headers:  new Headers ({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json, text/plain, */*'
    //     }),
    //     body: JSON.stringify({ user: username, password: password})
    //     }).then(data => {
    //         console.log('Success:', data.status);
    //         if(data.status === 201){
    //             setLogin(true);
    //             var isLogin = JSON.parse("true".toLowerCase());
    //             sessionStorage.setItem('login', isLogin); 

    //         }
    //         else{
    //             setLogin(false);
    //             var isLogin = JSON.parse("true".toLowerCase());
    //             sessionStorage.setItem('login', false); 
    //         }
    //       })
};
