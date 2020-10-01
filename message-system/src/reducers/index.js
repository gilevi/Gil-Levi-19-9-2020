import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import sentMessagesReducer from './sentMessagesReducer';


export default combineReducers({
    messages: messagesReducer,
    sent_messages: sentMessagesReducer,
});