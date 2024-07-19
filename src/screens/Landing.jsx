import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'
import pic07 from '../assets/images/pic07.jpg'
import pic08 from '../assets/images/pic08.jpg'

const Landing = () => {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalDescriptionKey, setModalDescriptionKey] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const showModal = (imageSrc, descriptionKey) => {
        setModalImage(imageSrc);
        setModalDescriptionKey(descriptionKey);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/mailer/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    };

    return (
        <>
            {/* Intro */}
            <section id="section1" className="one cover dark">
                <div className="container">
                    <header>
                        <h2 className="alt"><strong>{t('intro.title')}</strong></h2>
                        <p><strong>{t('intro.subtitle')}</strong></p>
                    </header>
                    <footer>
                        <Link to="/home" className="button landing" id="start-now-link">{t('intro.startNow')}</Link>
                    </footer>
                </div>
            </section>

            {/* About Me */}
            <section id="about" className="three">
                <div className="container">
                    <header>
                        <h2>{t('about.name')}</h2>
                    </header>
                    <div className="image featured a">
                        <img src={pic08} alt="" />
                    </div>
                    <p>{t('about.description')}</p>
                </div>
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="two">
                <div className="container">
                    <header>
                        <h2>{t('portfolio.title')}</h2>
                    </header>
                    <p>{t('portfolio.description')}</p>
                    <div className="row">
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal(pic02, 'portfolio.mindfulnessText')}>
                                    <img src={pic02} alt="Mindfulness" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.mindfulness')}</h3>
                                </header>
                            </article>
                        </div>
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal(pic05, 'portfolio.sleepNeuropsychologyText')}>
                                    <img src={pic05} alt="Neuropsicología del sueño" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.sleepNeuropsychology')}</h3>
                                </header>
                            </article>
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal(pic07, 'portfolio.reikiText')}>
                                    <img src={pic07} alt="Reiki" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.reiki')}</h3>
                                </header>
                            </article>
                        </div>
                        <div className="col-4 col-12-mobile">
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal(pic06, 'portfolio.crisisInterventionText')}>
                                    <img src={pic06} alt="Crisis and intervention" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.crisisIntervention')}</h3>
                                </header>
                            </article>
                            <article className="item">
                                <Link className="image fit a" onClick={() => showModal(pic03, 'portfolio.occupationalTherapyText')}>
                                    <img src={pic03} alt="Terapia Ocupacional" />
                                </Link>
                                <header>
                                    <h3>{t('portfolio.occupationalTherapy')}</h3>
                                </header>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="four">
                <div className="container">
                    <header>
                        <h2>{t('contact.title')}</h2>
                    </header>
                    <p>{t('contact.description')}</p>
                    <form onSubmit={handleSubmit} id="contact-form">
                        <div className="row">
                            <div className="col-6 col-12-mobile">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t('contact.name')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete='name'
                                    required
                                />
                            </div>
                            <div className="col-6 col-12-mobile">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t('contact.email')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete='email'
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <textarea
                                    name="message"
                                    placeholder={t('contact.message')}
                                    value={formData.message}
                                    onChange={handleChange}
                                    autoComplete='off'
                                    required
                                ></textarea>
                            </div>
                            <div className="col-12">
                                <input type="submit" value={t('contact.sendMessage')} />
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <div id="footer">
                <ul className="copyright">
                    <li>&copy; G. REYNA. All rights reserved.</li>
                    <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
            </div>

            {/* Modal for Portfolio Images */}
            <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <img src={modalImage} alt={t(modalDescriptionKey)} style={{ width: '100%' }} />
                <p>{t(modalDescriptionKey)}</p>
            </Modal>
        </>
    );
};

export default Landing;
