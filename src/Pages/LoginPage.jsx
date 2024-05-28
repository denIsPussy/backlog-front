import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import { useNavigate } from 'react-router-dom';
import "./style.css"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true); // Активация индикатора загрузки
        try {
            const response = await APIService.authenticate({ username, password });
            if (response.message != null && response.message.includes("2FA")) {
                navigate('/two-factor-auth');
            } else {
                localStorage.setItem('token', response.jwt);
                navigate('/');
            }
            localStorage.setItem('username', username);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false); // Деактивация индикатора загрузки после получения ответа
        }
    };

    return (
        <div className="login-page">
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Form onSubmit={handleLogin} className="p-4 shadow-lg rounded">
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
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Войти"}
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
