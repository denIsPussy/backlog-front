import React, { useState } from 'react';
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header";

const DepositPage = () => {
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Пополнение на сумму: ${amount}`);
        navigate("/payment/" + amount);
        setAmount(''); // Очистка поля после отправки формы
    };

    const handleBack = () => {
        navigate(-1); // Возвращает пользователя на предыдущую страницу
    };

    return (
        <>
            <Header/>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                <Card style={{ width: '400px' }} className="shadow-lg p-4 mb-5 bg-white rounded">
                    <Card.Body>
                        <Card.Title className="text-center">Пополнение депозита</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="depositAmount">
                                <Form.Label>Сумма пополнения</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₽</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Введите сумму"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        min="1" // Минимальная сумма пополнения
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-2">
                                Пополнить
                            </Button>
                            <Button variant="secondary" onClick={handleBack} className="w-100">
                                Назад
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DepositPage;
