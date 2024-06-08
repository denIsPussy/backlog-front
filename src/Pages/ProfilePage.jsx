import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import Header from "../Components/Header";
import "../css/profilePage.css"
import {getProductById, getUserInfo} from "../Utils/APIService";

const ProfilePage = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        patronymic: "",
        isTwoFactorEnabled: true,
        deposit: 0,
        isChildModeEnabled: false,
        areNotificationsEnabled: true
    });

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setUser(data);
            })
            .catch(err => {
            });
    }, []);

    const [editMode, setEditMode] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({...user, [name]: value});
    };

    const handleToggle = (setting) => {
        setUser({...user, [setting]: !user[setting]});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Сохраненные данные:', user);
        setEditMode(false);
    };

    const handlePasswordChange = (event) => {
        event.preventDefault();
        console.log('Пароль изменен:', oldPassword, newPassword);
        setChangePassword(false);
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Профиль пользователя</Card.Title>
                                <Card.Text as="div">
                                    <div><strong>Имя:</strong> {user.firstName}</div>
                                    <div><strong>Фамилия:</strong> {user.lastName}</div>
                                    <div><strong>Отчество:</strong> {user.patronymic}</div>
                                    <div><strong>Депозит:</strong> {user.deposit.toFixed(2)} руб.</div>
                                </Card.Text>
                                <Button className={"mt-3"} variant="primary" onClick={() => setEditMode(true)}>
                                    Редактировать данные
                                </Button>
                                <Button className="ms-2 mt-3" variant="secondary" onClick={() => setChangePassword(true)} >
                                    Сменить пароль
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className="mt-3">
                            <Card.Body>
                                <Card.Title>Настройки</Card.Title>
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="two-factor-switch"
                                        label="Двухфакторная аутентификация"
                                        checked={user.isTwoFactorEnabled}
                                        onChange={() => handleToggle('isTwoFactorEnabled')}
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="child-mode-switch"
                                        label="Детский режим"
                                        checked={user.isChildModeEnabled}
                                        onChange={() => handleToggle('isChildModeEnabled')}
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="notifications-switch"
                                        label="Уведомления"
                                        checked={user.areNotificationsEnabled}
                                        onChange={() => handleToggle('areNotificationsEnabled')}
                                    />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Модальные окна для редактирования данных и смены пароля */}
                <Modal show={editMode} onHide={() => setEditMode(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактирование данных</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="patronymic"
                                    value={user.patronymic}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Сохранить изменения
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={changePassword} onHide={() => setChangePassword(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Смена пароля</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handlePasswordChange}>
                            <Form.Group className="mb-3">
                                <Form.Label>Старый пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Новый пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Изменить пароль
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default ProfilePage;
