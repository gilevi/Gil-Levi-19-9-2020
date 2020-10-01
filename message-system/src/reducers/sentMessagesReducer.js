
export default(state = [], action) => {
    switch(action.type){
        case 'FETCH_SENT_MESSAGES':
            return action.payload;
        default:
            return state;
    }
   
};