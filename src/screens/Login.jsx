import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = Cookies.get('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/auth/login', JSON.stringify({ email, password }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const userData = response.data.user;
                setUser(userData); 
                Cookies.set('user', JSON.stringify(userData), { expires: 0.25 }); // 6 horas de duración (0.25 días)
            } else {
                setError(t('login.error'));
            }
        } catch (error) {
            setError(t('login.error'));
        }
    };

    const handleLogout = () => {
        setUser(null);
        Cookies.remove('user');
        navigate('/');
    };

    return (
        <div className="middle">
            {user ? (
                <div className="user-info">
                    <h2>{t('login.welcome')}, {user.username}</h2>
                    {!user.verified ? <p>{t('login.verifyEmail')}</p> : null}
                    <button onClick={handleLogout}>{t('login.logout')}</button>
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
