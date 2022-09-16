const loggedIn = (window.localStorage.getItem("user") === null) ? false : true;
const user = (window.localStorage.getItem("user") === null) ? "": JSON.parse(window.localStorage.getItem("user"))

const initialState = {
    loggedIn,
    user
}

const authenticateUser = (state = initialState, action)=>{
    switch(action.type){
        case "LOGIN" : return {loggedIn:true, user:action.user}
        case "LOGOUT" : return {loggedIn : false, user:action.user};
        default : return state;
    }

}

export default authenticateUser;