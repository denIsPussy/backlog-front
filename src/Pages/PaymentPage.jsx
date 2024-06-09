
import {Button, Card, Col, Container, Form} from 'react-bootstrap';
import Header from "../Components/Header";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {topUpDeposit} from "../Utils/APIService";

const PaymentPage = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: ''
    });

    const {amount} = useParams();

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(cardDetails); // Здесь можно добавить логику отправки данных
        topUpDeposit(amount)
            .then(data => {
                alert('Оплата произведена успешно!');
                navigate("/")
            })
            .catch(error => {
                alert('При оплате возникла ошибка');
            })
    };

    return (
        <>
            <Header/>
            <Container className="d-flex justify-content-center align-items-center flex-grow-1" style={{minHeight: '90vh'}}>
                <Card style={{width: '400px'}} className="shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Card.Title className="text-center">Оплата картой</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={"mb-2"} as={Col} controlId="formGridCardNumber">
                                <Form.Label>Номер карты</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className={"mb-2"} as={Col} controlId="formGridExpiryDate">
                                <Form.Label>Срок действия</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="MM/YY"
                                    name="expiryDate"
                                    value={cardDetails.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className={"mb-2"} as={Col} controlId="formGridCVV">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="CVV"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGridCardHolderName">
                                <Form.Label>Имя держателя карты</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Имя Фамилия"
                                    name="cardHolderName"
                                    value={cardDetails.cardHolderName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3 w-100">
                                Оплатить
                            </Button>
                            <Button onClick={() => navigate(-1)} variant="primary" type="button" className="mt-3 w-100">
                                Назад
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default PaymentPage;
