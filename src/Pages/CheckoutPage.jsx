import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import OrderSummary from "../Components/OrderSummary";
import {createOrder, getPaymentMethods, getShippingMethods, getShoppingCart} from "../Utils/APIService";
import {useNavigate} from "react-router-dom";

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState(null);
    const [shippingMethods, setShippingMethods] = useState(null);
    const navigate = useNavigate();

    const calculateTotal = (cartItems) => {
        return cartItems && cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0) : 0;
    };

    const [orderDetails, setOrderDetails] = useState({
        totalAmount: 0,
        paymentMethod: null,
        shippingMethod: null,
        orderItems: null
    });

    useEffect(() => {
        const username = localStorage.getItem('username');

        const fetchCartAndMethods = async () => {
            try {
                const cartData = await getShoppingCart(username);
                const paymentData = await getPaymentMethods();
                const shippingData = await getShippingMethods();

                setCartItems(cartData.cartItems);
                setPaymentMethods(paymentData);
                setShippingMethods(shippingData);

                setOrderDetails(prev => ({
                    ...prev,
                    totalAmount: calculateTotal(cartData.cartItems),
                    orderItems: cartData.cartItems.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity
                    })),
                    paymentMethod: paymentData[0],
                    shippingMethod: shippingData[0]
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCartAndMethods();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const selectedValue = parseInt(value);

        setOrderDetails(prev => ({
            ...prev,
            [name]: (name === "shippingMethod"
                ? shippingMethods.find(item => item.id === selectedValue)
                : paymentMethods.find(item => item.id === selectedValue))
        }));
    };

    const handleSubmit = (e) => {
        const fetchOrder = async () => {
            try {
                console.log(orderDetails)
                const data = await createOrder(orderDetails);
                //navigate("/orders")
            }
            catch (error) {
            }
            finally {
            }
        };

        fetchOrder();
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={7}>
                    <Card style={{boxShadow:"0 4px 16px rgba(0, 0, 0, 0.1)"}} className="border-0">
                        <Card.Body>
                            <Card.Title>Оформление заказа</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Общая сумма</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={orderDetails.totalAmount.toFixed(2)}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Способ оплаты</Form.Label>
                                    <Form.Select
                                        name="paymentMethod"
                                        value={orderDetails.paymentMethod?.id || ''}
                                        onChange={handleInputChange}
                                    >
                                        {paymentMethods && paymentMethods.map(method => (
                                            <option key={method.id} value={method.id}>
                                                {method.description}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Способ доставки</Form.Label>
                                    <Form.Select
                                        name="shippingMethod"
                                        value={orderDetails.shippingMethod?.id || ''}
                                        onChange={handleInputChange}
                                    >
                                        {shippingMethods && shippingMethods.map(method => (
                                            <option key={method.id} value={method.id}>
                                                {method.description}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button style={{width:"100%"}} variant="primary" type="submit">
                                    Оформить заказ
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card style={{boxShadow:"0 4px 16px rgba(0, 0, 0, 0.1)"}} className="border-0">
                        {cartItems && cartItems.length > 0 && (
                            <OrderSummary cartItems={cartItems} />
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;
