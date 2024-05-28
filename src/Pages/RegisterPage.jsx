// RegisterPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import { useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        username: '',
        password: '',
        email: ''
    });
    const navigate = useNavigate();  // Используйте useNavigate вместо useHistory

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await APIService.register(formData);
            alert(response.message); // Показываем сообщение об успешной регистрации
            navigate('/login'); // Перенаправляем пользователя на страницу входа
        } catch (error) {
            alert(error.message); // Показываем ошибку, если что-то пошло не так
        }
    };

    return (
        <div className="registration-page">
            <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded">
                        <h2 className="text-center mb-4">Регистрация</h2>
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPatronymic" className="mb-3">
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите отчество"
                                name="patronymic"
                                value={formData.patronymic}
                                onChange={handleChange}
                            />
                        </Form.Group>
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
                        <Button variant="primary" type="submit" className="w-100">
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default RegisterPage;
