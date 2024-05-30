// src/components/ShoppingCart.js
import React, { useEffect, useState } from 'react';
import { getShoppingCart } from '../Utils/APIService';
import CartItem from './CartItem';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import '../css/shoppingCart.css';

const ShoppingCart = ({ username }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getShoppingCart(username);
                setCart(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!cart || cart.cartItems.length === 0) return <p>Корзина пуста.</p>;

    const product = cart.cartItems[0].product;
    return (
        <Container className="shadow-sm rounded-4 shopping-cart" style={{ backgroundColor: '#FFFFFF', border: '0px solid #007bff' }}>
            {cart.cartItems.map((item, index) => (
                <Row key={index} className="px-3 py-3">
                    <Col md={2} sm={12} style={{ display: 'flex', alignItems: "center", border: '0px solid #e09a53' }}>
                        <Image src={`data:image/jpeg;base64,${item.product.image}`}
                               style={{ maxWidth: "100%", maxHeight: "120px", objectFit: "contain", flexShrink: 0, flexGrow: 0 }} alt="Product" />
                    </Col>
                    <Col md={10} sm={0} style={{ border: '0px solid #a63539' }}>
                        <Row>
                            <div className="fs-3 text-nowrap">
                                {item.product.name}
                            </div>
                        </Row>
                        <Row>
                            <div className="fs-6">
                                {item.product.price}
                            </div>
                        </Row>
                        <Row>
                            <div className="">
                                <Button className="btn-primary" onClick={() => setLoading(false)}>Изменить количество</Button>
                            </div>
                        </Row>
                        <Row className="justify-content-end">
                            <Col className="px-4 py-3" xs="auto">
                                <Button className="btn-danger" onClick={() => setLoading(false)}>Удалить</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default ShoppingCart;
