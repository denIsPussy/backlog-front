import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, ListGroup} from 'react-bootstrap';
import Header from "../Components/Header";
import "../css/profilePage.css"
import {changeSettings, changeUserData, getUserInfo} from "../Utils/APIService";
import OrdersOverTimeChart from "../Components/OrdersOverTimeChart";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserEdit, faKey, faWallet, faCog, faShieldAlt, faBell, faChild, faChartLine, faChartBar, faChartPi, faChartArea } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
    const [reload, setReload] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        patronymic: "",
        twoFactorEnabled: true,
        deposit: 0,
        childModeEnabled: false,
        areNotificationsEnabled: true,
        orderList: null
    });

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch(err => {
            });
    }, [reload]);

    const [currentSetting, setCurrentSetting] = useState(false);
    const [confirmMode, setConfirmMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const handleToggle = (setting) => {
        setConfirmMode(true);
        setCurrentSetting(setting);
    }

    const handleConfirm = () => {
        //setUser({...user, [setting]: !user[setting]});
        const updSetting = {
            isEnabled: !user[currentSetting],
            password: passwordConfirm
        }
        console.log("Новые данные: " + updSetting);
        changeSettings(updSetting, currentSetting)
            .then(data => {
                //setUser(data);
                setReload(prev => !prev);
                console.log('Изменения сохранены!');
            })
            .catch(err => {
                console.log(err.message);
            });
        setConfirmMode(false);
    };

    const handleSubmit = (event) => {
        const updUser = {
            firstname: user.firstName,
            lastname: user.lastName,
            patronymic: user.patronymic,
            password: passwordConfirm
        }
        console.log("User с новыми данными: " + updUser);
        changeUserData(updUser)
            .then(data => {
                //setUser(data);
                setReload(prev => !prev);
                //console.log('Сохраненные данные:', user);
            })
            .catch(err => {
                console.log(err.message);
            });
        setEditMode(false);
    };

    const handlePasswordChange = (event) => {
        const updPassword = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        console.log("Новый пароль: " + updPassword);
        changePassword(updPassword)
            .then(data => {
                //setUser(data);
                setReload(prev => !prev);
                console.log('Пароль изменен:', oldPassword, newPassword);
                //console.log('Сохраненные данные:', user);
            })
            .catch(err => {
                console.log(err.message);
            });
        setChangePassword(false);
    };

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Профиль">
                        <Col md={12}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title><FontAwesomeIcon icon={faUser} /> Профиль пользователя</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Имя: {user.firstName}</ListGroup.Item>
                                        <ListGroup.Item>Фамилия: {user.lastName}</ListGroup.Item>
                                        <ListGroup.Item>Отчество: {user.patronymic}</ListGroup.Item>
                                        <ListGroup.Item><FontAwesomeIcon icon={faWallet} /> Депозит: {user.deposit.toFixed(2)} руб.</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="primary" className="mt-3" onClick={() => setEditMode(true)}>
                                        <FontAwesomeIcon icon={faUserEdit} /> Редактировать данные
                                    </Button>
                                    <Button variant="secondary" className="mt-3 ms-2" onClick={() => setChangePassword(true)}>
                                        <FontAwesomeIcon icon={faKey} /> Сменить пароль
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Tab>
                    <Tab eventKey="settings" title="Настройки">
                        <Col md={12}>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title><FontAwesomeIcon icon={faCog} className="me-2"/>Настройки</Card.Title>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="two-factor-switch"
                                            label={
                                                <>
                                                    <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                                                    Двухфакторная аутентификация
                                                </>
                                            }
                                            checked={user.twoFactorEnabled}
                                            onChange={() => handleToggle('twoFactorEnabled')}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="child-mode-switch"
                                            label={
                                                <>
                                                    <FontAwesomeIcon icon={faChild} className="me-2" />
                                                    Детский режим
                                                </>
                                            }
                                            checked={user.childModeEnabled}
                                            onChange={() => handleToggle('childModeEnabled')}
                                        />
                                        <Form.Check
                                            type="switch"
                                            id="notifications-switch"
                                            label={
                                                <>
                                                    <FontAwesomeIcon icon={faBell} className="me-2" />
                                                    Уведомления
                                                </>
                                            }
                                            checked={user.areNotificationsEnabled}
                                            onChange={() => handleToggle('areNotificationsEnabled')}
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Tab>
                    <Tab eventKey="charts" title="Графики">
                        <Col md={12}>
                            <OrdersOverTimeChart orders={user.orderList}/>
                            <OrdersOverTimeChart orders={user.orderList}/>
                        </Col>
                    </Tab>
                </Tabs>

                <Modal show={confirmMode} onHide={() => setConfirmMode(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение действия</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleConfirm}>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль для подтверждения</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={passwordConfirm}
                                    onChange={e => {
                                        setPasswordConfirm(e.target.value)
                                        console.log("Пароль для подтверждения: " + e.target.value)
                                    }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Сохранить изменения
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
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
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль для подтверждения</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={passwordConfirm}
                                    onChange={e => {
                                        setPasswordConfirm(e.target.value)
                                        console.log("Пароль для подтверждения: " + e.target.value)
                                    }}
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
                            <Button variant="primary" type="submit">
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
