import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import {useLocation, useNavigate} from 'react-router-dom';
import * as VKID from '@vkid/sdk';
import "./style.css"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
    const navigate = useNavigate();

    useEffect(() => {
        VKID.Config.set({
            app: 51934140,
            redirectUrl: 'https://backlogshop.ru/vkAuth',
            state: 'dj29fnsadjsd82' //было dj29fnsadjsd82, стало dj29dfsagfsd23
        });

        const oneTap = new VKID.OneTap();
        const container = document.getElementById('VkIdSdkOneTap');
        if (container) {
            oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS });
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true); // Активация индикатора загрузки
        try {
            const response = await APIService.authenticate({ username, password });
            if (response.success && response.message.includes("2FA")) {
                navigate(`/two-factor-auth/${username}`);
            } else {
                localStorage.setItem('username', response.username);
                localStorage.setItem('token', response.token);
                navigate('/');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Form className="p-4 shadow-lg rounded">
                        <h2 className="text-center mb-4">Авторизация</h2>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите логин"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" role="status"
                                        onClick={handleLogin} aria-hidden="true"/> : "Войти"}
                        </Button>
                        <div className="w-100" id="VkIdSdkOneTap"></div>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
