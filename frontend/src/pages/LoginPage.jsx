import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const LoginPage = ({ setAuthToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error message

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await axios.post('https://car-management-1duu.onrender.com/api/users/login', {
                email,
                password,
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem('authToken', token);  // Store token
                setAuthToken(token);                       // Update auth token in state
                navigate('/');                             // Redirect after successful login
            }
        } catch (error) {
            if (error.response) {
                console.error('Backend error:', error.response.data);
                setError(error.response.data.message || 'Failed to log in.');
            } else {
                console.error('Error:', error.message);
                setError('Failed to log in.');
            }
        }
    };



    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>

            {/* Add a Sign Up Button */}
            <p>Do not have an account?</p>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    );
};

LoginPage.propTypes = {
    setAuthToken: PropTypes.func,
};

export default LoginPage;
