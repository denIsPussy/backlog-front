import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, ListGroup, Modal} from 'react-bootstrap';
import Header from "../Components/Header";
import "../css/profilePage.css"
import {changeSettings, changeUserData, getUserInfo, changePassword} from "../Utils/APIService";
import OrdersOverTimeChart from "../Components/OrdersOverTimeChart";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBell,
    faChild,
    faCog,
    faKey,
    faShieldAlt,
    faUser,
    faUserEdit,
    faWallet
} from '@fortawesome/free-solid-svg-icons';
import validator from "validator";

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

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        patronymic: "",
    });

    const [currentSetting, setCurrentSetting] = useState(false);
    const [confirmMode, setConfirmMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(null);
    const [errorOldPassword, setErrorOldPassword] = useState(null);
    const [errorNewPassword, setErrorNewPassword] = useState(null);

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch(err => {
            });
    }, [reload]);

    useEffect(() => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            patronymic: user.patronymic
        });
        setErrors({});
    }, [editMode, user]);

    useEffect(() => {
        setPasswordConfirm("");
        setErrorPasswordConfirm(null);
    }, [confirmMode]);

    useEffect(() => {
        setOldPassword("");
        setNewPassword("");
        setErrorOldPassword(null);
        setErrorNewPassword(null);
        console.log("ПРОВЕРКА");
    }, [changePasswordMode]);

    const validatePassword = (name, value) => {
        let error = '';
        if (!validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            error = 'Пароль должен быть длиннее 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ';
            console.log("Пароль не прошел");
            console.log(`name: ${name}, value: ${value}, error: ${error}`);
        }
        else error = null;
        if (name === "passwordConfirm"){
            setErrorPasswordConfirm(error);
            setPasswordConfirm(value);
        } else if (name === "oldPassword"){
            setErrorOldPassword(error);
            setOldPassword(value);
            console.log("сюдаааа")
        } else if (name === "newPassword"){
            setErrorNewPassword(error);
            setNewPassword(value);
        }
        return error;
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'password':
                if (!validator.isStrongPassword(value, {
                    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
                })) {
                    error = 'Пароль должен быть длиннее 8 символов и содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ';
                }
                else error = null;
                break;
            case 'patronymic':
                if (value && !validator.matches(value, /^[A-Za-zА-Яа-яЁё\s-]+$/)) {
                    error = 'Должно содержать только буквы';
                }
                else error = null;
                break;
            case 'firstName':
            case 'lastName':
                if (!validator.matches(value, /^[A-Za-zА-Яа-яЁё\s-]+$/)) {
                    error = 'Должно содержать только буквы';
                }
                else error = null;
                break;
            default:
                break;
        }
        setErrors(prev => ({...prev, [name]: error}));
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        console.log(name + " " + value);
        validateField(name, value);
    };

    const handleToggle = (setting) => {
        setConfirmMode(true);
        setCurrentSetting(setting);
    }

    const handlePasswordConfirmSubmit = (e) => {
        e.preventDefault();  // Предотвращение стандартной отправки формы
        const passwordError = validatePassword("passwordConfirm", passwordConfirm);
        setErrorPasswordConfirm(passwordError)
        console.log(`passwordError:${passwordError}`)
        if (!passwordError) {
            const updSetting = {
                isEnabled: !user[currentSetting],
                password: passwordConfirm
            }
            console.log("Новые данные: " + updSetting);
            changeSettings(updSetting, currentSetting)
                .then(data => {
                    setReload(prev => !prev);
                    console.log('Изменения сохранены!');
                })
                .catch(err => {
                    console.log(err.message);
                });
            setConfirmMode(false);
        }
    };

    const handleUserDataChangeSubmit = (e) => {
        e.preventDefault();
        const passwordConfirmError = validatePassword("passwordConfirm", passwordConfirm)
        const formErrors = Object.keys(formData).map(key => validateField(key, formData[key]));
        console.log(`passwordError:${passwordConfirmError}`)
        if (formErrors.every(error => !error) && Object.values(formData).every(value => value.trim() !== '') && !passwordConfirmError) {
            const updUser = {
                firstname: user.firstName,
                lastname: user.lastName,
                patronymic: user.patronymic,
                password: passwordConfirm
            }
            console.log("User с новыми данными: " + updUser);
            changeUserData(updUser)
                .then(data => {
                    setReload(prev => !prev);
                })
                .catch(err => {
                    console.log(err.message);
                });
            setEditMode(false);
        }
    };

    const handlePasswordChangeSubmit = (event) => {
        event.preventDefault()
        const oldPasswordError = validatePassword("oldPassword", oldPassword);
        const newPasswordError = validatePassword("newPassword", newPassword);
        // console.log(`validatePassword '': ${!validator.isStrongPassword('', {
        //     minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        // })}`);
        console.log(`oldPasswordError:${oldPasswordError}, newPasswordError:${newPasswordError}, !oldPasswordError && !newPasswordError:${!oldPasswordError && !newPasswordError}`)
        console.log(`oldPassword:${oldPassword},  newPassword:${newPassword}`)
        if (!oldPasswordError && !newPasswordError) {
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
            setChangePasswordMode(false);
        }
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
                                    <Card.Title><FontAwesomeIcon icon={faUser}/> Профиль пользователя</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Имя: {user.firstName}</ListGroup.Item>
                                        <ListGroup.Item>Фамилия: {user.lastName}</ListGroup.Item>
                                        <ListGroup.Item>Отчество: {user.patronymic}</ListGroup.Item>
                                        <ListGroup.Item><FontAwesomeIcon
                                            icon={faWallet}/> Депозит: {user.deposit.toFixed(2)} руб.</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="primary" className="mt-3" onClick={() => setEditMode(true)}>
                                        <FontAwesomeIcon icon={faUserEdit}/> Редактировать данные
                                    </Button>
                                    <Button variant="secondary" className="mt-3 ms-2"
                                            onClick={() => setChangePasswordMode(true)}>
                                        <FontAwesomeIcon icon={faKey}/> Сменить пароль
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
                                                    <FontAwesomeIcon icon={faShieldAlt} className="me-2"/>
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
                                                    <FontAwesomeIcon icon={faChild} className="me-2"/>
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
                                                    <FontAwesomeIcon icon={faBell} className="me-2"/>
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
                    {/*<Tab eventKey="charts" title="Графики">*/}
                    {/*    <Col md={12}>*/}
                    {/*        <OrdersOverTimeChart orders={user.orderList}/>*/}
                    {/*        <OrdersOverTimeChart orders={user.orderList}/>*/}
                    {/*    </Col>*/}
                    {/*</Tab>*/}
                </Tabs>

                <Modal show={confirmMode} onHide={() => setConfirmMode(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение действия</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handlePasswordConfirmSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль для подтверждения</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={e => {
                                        validatePassword(e.target.name, e.target.value)
                                    }}
                                    isInvalid={!!errorPasswordConfirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorPasswordConfirm}
                                </Form.Control.Feedback>
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
                        <Form onSubmit={handleUserDataChangeSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="patronymic"
                                    value={formData.patronymic}
                                    onChange={handleFormChange}
                                    isInvalid={!!errors.patronymic}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.patronymic}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Пароль для подтверждения</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={e => {
                                        validatePassword(e.target.name, e.target.value)
                                    }}
                                    isInvalid={!!errorPasswordConfirm}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorPasswordConfirm}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Сохранить изменения
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={changePasswordMode} onHide={() => setChangePasswordMode(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Смена пароля</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handlePasswordChangeSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Старый пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => validatePassword(e.target.name, e.target.value)}
                                    isInvalid={!!errorOldPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorOldPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Новый пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => validatePassword(e.target.name, e.target.value)}
                                    isInvalid={!!errorNewPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorNewPassword}
                                </Form.Control.Feedback>
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
