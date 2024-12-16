import axios from 'axios';

interface AuthResponse {
    accessToken: string;
}

interface LoginFormInputs{
    username: string;
    password: string;
}


const POST_QUERY_URL = "https://azure-web-server-dkf6geh3dsbhbdc8.canadaeast-01.azurewebsites.net/query-kusto";
const GET_API = "https://ant-adtoken.wonderfulsmoke-c5695b79.canadaeast.azurecontainerapps.io/sign-in?";

const login = async (loginData: LoginFormInputs): Promise<AuthResponse> => {
    try{
        const response = await axios.get<AuthResponse>(GET_API, {
            params: {
                username: loginData.username,
                password: loginData.password,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Login Failed' + error);
    }
};

const getQueryData = async (kqlQuery: string)=> {
    try {
        const response = await fetch(`${POST_QUERY_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kqlQuery: kqlQuery,
            }),
        });

        const data = response.json();
        return data;

    } catch (error) {
        throw new Error('get query data failed');
    }
}

export default {
    login,
    getQueryData
};