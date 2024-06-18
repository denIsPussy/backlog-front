import React, { useEffect, useState } from 'react';
import {Form, Button, Container, Spinner} from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const VkAuthPage = () => {
    const [formData, setFormData] = useState({
        vkId: '',
        lastName: '',
        patronymic: '',
        username: '',
        password: '',
        email: '',
        firstName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const [errorResponse, setErrorResponse] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Включаем индикатор загрузки
        try {
            await APIService.register(formData);
            const response = await APIService.authenticate({ username: formData.username, password: formData.password });
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                navigate('/');
            }
            setIsLoading(false); // Выключаем индикатор загрузки
        } catch (error) {
            setErrorResponse(error.message);
            setShowAlert(true);
            setIsLoading(false); // Выключаем индикатор загрузки в случае ошибки
        }
    };

    useEffect(() => {
        //
        const fetchData = async () => {
            //
            const url = new URL(window.location.href);
            const payloadEncoded = url.searchParams.get('payload');
            const state = url.searchParams.get('state');

            if (payloadEncoded) {
                const payloadDecoded = decodeURIComponent(payloadEncoded);
                //
                setIsLoading(false); // Выключаем индикатор загрузки
                try {
                    const payload = JSON.parse(payloadDecoded);
                    const silentToken = payload.token;
                    const type = payload.type;
                    const uuid = payload.uuid;
                    //
                    //
                    //
                    setIsLoading(true); // Включаем индикатор загрузки
                    const response = await APIService.exchangeToken({ silentToken, type, uuid });
                    if ('username' in response && response.success) {
                        localStorage.setItem('username', response.username);
                        localStorage.setItem('token', response.token);
                        navigate("/");
                    }
                    setIsLoading(false);
                    setFormData(prev => ({ ...prev, lastName: response.lastName, firstName: response.firstName, vkId: response.vkId}));
                    //
                    //
                    //
                    //
                } catch (error) {
                    console.error('Ошибка при обмене токена:', error);
                    setIsLoading(false); // Выключаем индикатор загрузки
                }
            } else {
                setIsLoading(false); // Выключаем индикатор загрузки
            }
        };

        fetchData();
    }, [location]);

    return (
        <>
            <Header/>
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
        </>
    );
};

export default VkAuthPage;
