import React, { useState } from 'react';
import { Button, Typography, Space } from 'antd';
import { BookOutlined, ProfileOutlined, SoundOutlined, CalendarOutlined } from '@ant-design/icons';
import BookAdmin from './Admin/BookAdmin';
import BlogAdmin from './Admin/BlogAdmin';
import MeditationAdmin from './Admin/MeditationAdmin';
import SessionsAdmin from './Admin/SessionsAdmin';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('');
    const { Title } = Typography;
    const renderContent = () => {
        switch (activeTab) {
            case 'books':
                return <BookAdmin />;
            case 'blog':
                return <BlogAdmin />;
            case 'meditations':
                return <MeditationAdmin />;
            case 'sessions':
                return <SessionsAdmin />;
            default:
                return null;
        }
    };

    return (
        <section className="two">
            <header>
                <Title className="aln-center" level={2}>Panel de Administración</Title>
                <Space className="aln-center">
                    <Button
                        type="primary"
                        icon={<BookOutlined />}
                        className="modal-button"
                        onClick={() => setActiveTab('books')}
                    >
                        Libros
                    </Button>
                    <Button
                        type="primary"
                        icon={<ProfileOutlined />}
                        className="modal-button"
                        onClick={() => setActiveTab('blog')}
                    >
                        Blog
                    </Button>
                    <Button
                        type="primary"
                        icon={<SoundOutlined />}
                        className="modal-button"
                        onClick={() => setActiveTab('meditations')}
                    >
                        Meditaciones
                    </Button>
                    <Button
                        type="primary"
                        icon={<CalendarOutlined />}
                        className="modal-button"
                        onClick={() => setActiveTab('sessions')}
                    >
                        Sesiones
                    </Button>
                </Space>
            </header>
            <div className="admin-content">
                {renderContent()}
            </div>
        </section>

    );
}

export default Admin;
