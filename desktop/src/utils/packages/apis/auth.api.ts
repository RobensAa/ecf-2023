import axios from "axios";

const serverUrl = 'http://localhost:3333/api/v1';

export const UserSignUp = async ({ username, email, password }: {
    username: string,
    email: string,
    password: string
}) => {
    try {
        const res = await axios.post(`${serverUrl}/auth/signup`, {
            username,
            email,
            password
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const UserSignIn = async ({ username, email, password }: {
    username: string,
    email: string,
    password: string
}) => {
    try {
        const res = await axios.post(`${serverUrl}/auth/signin`, {
            username,
            email,
            password
        });
        return res.data
    } catch (e) {
        console.log(e)
    }
}

//const videos = () => {}