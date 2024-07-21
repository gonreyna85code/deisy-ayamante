import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from '../../axiosConfig';

const Register = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/auth/register', {
                username: formData.name,
                password: formData.password,
                email: formData.email
            });
            console.log(response.data);
            // Maneja el éxito del registro, por ejemplo, redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
            console.error(error);
            // Maneja el error del registro, por ejemplo, mostrar un mensaje de error
        }
    };

    return (
        <section id="contact" className="four">
            <div className="container">
                <header>
                    <h2>{t('register.title')}</h2>
                </header>
                <p>{t('register.description')}</p>
                <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 col-12-mobile">
                            <input
                                type="text"
                                name="name"
                                placeholder={t('register.name')}
                                autoComplete='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-6 col-12-mobile">
                            <input
                                type="email"
                                name="email"
                                placeholder={t('register.email')}
                                autoComplete='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-6 col-12-mobile">
                            <input
                                type="password"
                                name="password"
                                placeholder={t('register.password')}
                                autoComplete='off'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-6 col-12-mobile">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder={t('register.confirmPassword')}
                                autoComplete='off'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errors && (
                            <div className="col-12">
                                <p style={{ color: 'red' }}>{errors}</p>
                            </div>
                        )}
                        <div className="col-12">
                            <input type="submit" value={t('register.register')} />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
