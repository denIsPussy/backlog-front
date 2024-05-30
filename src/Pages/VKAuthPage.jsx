import React, { useEffect, useState } from 'react';
import {Form, Button, Container, Spinner} from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";

const VKAuth = () => {
    const [formData, setFormData] = useState({
        vkId: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        firstName: '' // Добавлено для хранения имени
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Включаем индикатор загрузки
        try {
            await APIService.register(formData);
            const response2 = await APIService.authenticate({ username: formData.username, password: formData.password });
            localStorage.setItem('token', response2.jwt);
            localStorage.setItem('username', formData.username);
            navigate('/');
            setIsLoading(false); // Выключаем индикатор загрузки
        } catch (error) {
            alert(error.message);
            setIsLoading(false); // Выключаем индикатор загрузки в случае ошибки
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Включаем индикатор загрузки
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');
            const type = queryParams.get('type');
            const uuid = queryParams.get('uuid');

            if (!token || !type || !uuid) {
                console.error('Один или несколько параметров отсутствуют');
                setIsLoading(false); // Выключаем индикатор загрузки
            } else {
                try {
                    const response = await APIService.exchangeToken({ token, type, uuid });
                    setFormData(prev => ({ ...prev, lastName: response.lastName, firstName: response.firstName, vkId: response.vkId}));
                    setIsLoading(false); // Выключаем индикатор загрузки
                } catch (error) {
                    console.error('Ошибка при обмене токена:', error);
                    setIsLoading(false); // Выключаем индикатор загрузки
                }
            }
        };

        fetchData();
    }, [location]);

    return (
        <div className="registration-page">
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded">
                        <h2 className="text-center mb-4">Регистрация</h2>
                        {formData.firstName && <p className="text-center">Добро пожаловать {formData.firstName}</p>}
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите логин"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Завершить регистрацию'}
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default VKAuth;
