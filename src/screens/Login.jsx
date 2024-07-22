import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const response = await axios.post('/api/auth/login', JSON.stringify({ email, password }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setUser(response.data.user); // Almacena la información del usuario
            } else {
                setError(t('login.error')); // Manejar el error de inicio de sesión aquí
            }
        } catch (error) {
            setError(t('login.error')); // Manejar el error de inicio de sesión aquí
        }
    };

    return (
        <div className="middle">
            {user ? (
                <div className="user-info">
                    <h2>{t('login.welcome')}, {user.username}</h2>
                    {!user.verified ? <p>{t('login.verifyEmail')}</p> : null}
                </div>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group login">
                        <input
                            type="email"
                            id="email"
                            placeholder={t('login.email')}
                            name="email"
                            autoComplete='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group login">
                        <input
                            type="password"
                            id="password"
                            placeholder={t('login.password')}
                            name="password"
                            autoComplete='off'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-actions login">
                        <button type="submit" className="login-button">{t('login.login')}</button>
                        <button type="button" className="register-button" onClick={() => navigate('/register')}>{t('login.register')}</button>
                    </div>
                </form>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Login;
