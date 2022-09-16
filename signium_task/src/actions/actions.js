export const logIn = (user) => {
    return {
        type: "LOGIN",
        user:user
    }
}

export const logOut = () => {
    return {
        type: "LOGOUT",
        user:""
    }
}

