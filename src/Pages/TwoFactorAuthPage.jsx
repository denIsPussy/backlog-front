// TwoFactorAuthPage.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import * as APIService from '../Utils/APIService';
import {useNavigate, useParams} from 'react-router-dom';
import Header from "../Components/Header";
import MyAlert from "../Components/MyAlert";

const TwoFactorAuthPage = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const { username } = useParams();
    const [showAlert, setShowAlert] = useState(false);
    const [errorResponse, setErrorResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await APIService.verifyTwoFactorCode({ username, code });
            //
            if (response.success){
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', username);
                localStorage.setItem('isChildModeEnabled', JSON.stringify(response.isChildModeEnabled));
                localStorage.setItem('isVk', JSON.stringify(response.isVk));
                navigate('/');
            }
        } catch (error) {
            setErrorResponse(error.message);
            setShowAlert(true);
        }
    };

    return (
        <>
            <Header/>
            <div className="two-factor-auth-page">
                <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                    <div className="w-100" style={{maxWidth: "400px"}}>
                        <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded">
                            <h2 className="text-center mb-4">Двухэтапная аутентификация</h2>
                            <Form.Group controlId="formConfirmCode" className="mb-3">
                                <Form.Label>Код подтверждения</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Введите код"
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Подтвердить
                            </Button>
                        </Form>
                    </div>
                </Container>
                <MyAlert show={showAlert} variant={"danger"} handleHide={() => setShowAlert(false)} message={errorResponse} header={"Уведомление"}/>
            </div>
        </>
    );
};

export default TwoFactorAuthPage;
