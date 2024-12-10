import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import react, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const authData = await authService.login({username, password});
            handleLogin(authData.accessToken);
            setError("");
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="pwd" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </div>
                <div className='button-container'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;