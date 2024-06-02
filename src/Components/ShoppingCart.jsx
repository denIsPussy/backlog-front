// src/components/ShoppingCart.js
import React, {useEffect, useState} from 'react';
import {getShoppingCart} from '../Utils/APIService';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
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

    function calculateTotalAmount() {
        return cart.cartItems.reduce((total, item) => {
            return total + (calculateProductPriceWithDiscounts(item.product) * item.quantity);
        }, 0);
    }

    function calculateTotalAmountWithoutDiscounts() {
        return cart.cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    function calculateBenefit() {
        return calculateTotalAmountWithoutDiscounts() - calculateTotalAmount();
    }

    function calculateTotalQuantityShop(product) {
        return product.storeList.reduce((total, item) => {
            return total + 1;
        }, 0)
    }

    function calculateProductPriceWithDiscounts(product) {
        let priceWithDiscount = product.price;
        product.discountList.forEach((item) => {
            priceWithDiscount = priceWithDiscount * (1 - item.discountAmountPercentage / 100);
        })
        return priceWithDiscount;
    }

    function getStoreCountText(count) {
        const tens = count % 100;
        const ones = count % 10;

        if (tens > 10 && tens < 20) {
            return `в ${count} магазинах`;
        }

        switch (ones) {
            case 1:
                return `в ${count} магазине`;
            case 2:
            case 3:
            case 4:
                return `в ${count} магазинах`;
            default:
                return `в ${count} магазинах`;
        }
    }


    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} lg={8} className="order-2 order-lg-1">
                        {cart.cartItems.map((item, index) => (
                            <Container className="shadow-sm rounded-3 shopping-cart" style={{ backgroundColor: '#FFFFFF', border: '0px solid #007bff' }}>
                                <Row key={index} className="px-3 py-3 mb-3" style={{minHeight: '200px'}}>
                                    <Col sm={3} md={3} xs={12} style={{ display: 'flex', alignItems: "center", border: '0px solid #e09a53' }}>
                                        <Image className="rounded-1" src={`data:image/jpeg;base64,${item.product.image}`}
                                               style={{ width: "100%", height: 'auto', maxWidth: "200px", objectFit: "contain", flexShrink: 1, flexGrow: 1}} alt="Product" />
                                    </Col>
                                    <Col sm={6} md={7} xs={12} style={{display: 'flex', flexDirection: 'column', border: '0px solid #a63539' }}>
                                        <div style={{flexGrow: 1}}>
                                            <Row>
                                                <div className="text fs-6">
                                                    {item.product.name}
                                                </div>
                                            </Row>
                                            <Row className="pt-3">
                                                <Col>
                                                    <Button variant="outline-dark" style={{
                                                        borderWidth: "1px",
                                                        fontWeight: "bolder",
                                                        borderBottomLeftRadius: "8px",
                                                        borderTopLeftRadius: "8px",
                                                        borderBottomRightRadius: "0px",
                                                        borderTopRightRadius: "0px",
                                                        borderRight: 'none'
                                                    }}>–</Button>
                                                    <Button disabled={true} style={{
                                                        fontWeight: "600",
                                                        borderWidth: "1px",
                                                        color: '#000000',
                                                        borderColor: '#000000',
                                                        borderLeft: 'none',
                                                        borderRight: 'none'
                                                    }} variant="outline-dark rounded-0">{item.quantity}</Button>
                                                    <Button variant="outline-dark" style={{
                                                        borderWidth: "1px",
                                                        fontWeight: "bolder",
                                                        borderBottomRightRadius: "8px",
                                                        borderTopRightRadius: "8px",
                                                        borderTopLeftRadius: "0px",
                                                        borderBottomLeftRadius: "0px",
                                                        borderLeft: 'none'
                                                    }}>+</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="" style={{marginTop: 'auto'}}>
                                            <Col style={{maxWidth: "fit-content"}} className="text fs-6 pe-0">
                                                В наличии:
                                            </Col>
                                            <Col className="text fs-6 ps-1 brighter-text" style={{maxWidth: "fit-content", color: "#1b6ab3"}}>
                                                {getStoreCountText(calculateTotalQuantityShop(item.product))}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3} md={2} xs={12} className="p-0" style={{display: 'flex', flexDirection: 'column'}}>
                                        <div className="order-1" style={{flexGrow: 1}}>
                                            <Row className="m-0">
                                                <Col style={{
                                                    paddingRight: "0px",
                                                    display: 'flex', justifyContent: 'end', alignItems: 'center',
                                                }}>
                                                    <Button className="rounded-3 hover-button py-1 px-1">
                                                        <Image src="/delete.png" alt="Удалить"
                                                               style={{width: '25px', height: '25px'}}/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="m-0 order-2" style={{display:"flex", justifyContent:"end", marginTop: 'auto'}}>
                                            <Row className="text-decoration-line-through" style={{ color: "#9d9d9d", display:"flex", justifyContent:"end", fontSize: "small", fontWeight: "normal"}}>
                                                {item.product.price.toLocaleString('ru-RU')} ₽
                                            </Row>
                                            <Row className="pb-2" style={{display:"flex", justifyContent:"end", fontSize: "medium", fontWeight: "650", textWrap: "nowrap", flexGrow: 1}}>
                                                {calculateProductPriceWithDiscounts(item.product).toLocaleString('ru-RU')} ₽
                                            </Row>
                                            <Row>
                                                <Button className="rounded-3" variant={'outline-dark'}>Купить</Button>
                                            </Row>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        ))}
                    </Col>
                    <Col xs={12} lg={4} className="order-1 order-lg-2 mb-3 mb-sm-3 mb-md-3">
                        <Container className="shadow-sm rounded-3 shopping-cart" style={{ backgroundColor: '#FFFFFF', border: '0px solid #007bff' }}>
                            <Row>
                                <Col style={{ maxWidth: "100%" }}>
                                    <div className="title py-2 px-2 text-start fs-5">
                                        Детали заказа
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ maxWidth: "100%" }}>
                                    <div className="py-2 px-2 text-start fs-6">
                                        Выгода {calculateBenefit().toLocaleString('ru-RU')} ₽
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ maxWidth: "100%" }}>
                                    <Row className="pb-0 pt-2 px-2">
                                        <div style={{color: "#9d9d9d", fontSize: "small"}} className="text rounded-1 pb-0 pt-1 px-2 text-nowrap text-start">
                                            Итого
                                        </div>
                                    </Row>
                                    <Row className="pt-0 pb-2 px-2">
                                        <div className="text rounded-1 py-1 px-2 text-start fs-6">
                                            Товаров: {cart.cartItems.length}
                                        </div>
                                    </Row>
                                </Col>
                                <Col style={{ maxWidth: "100%" }}>
                                    <Row className="pb-0 pt-2 px-2">
                                        <div style={{color: "#9d9d9d", fontSize: "small"}} className="text rounded-1 pb-0 pt-1 px-2 text-nowrap text-end text-decoration-line-through">
                                            {calculateTotalAmountWithoutDiscounts().toLocaleString('ru-RU')} ₽
                                        </div>
                                    </Row>
                                    <Row className="pt-0 pb-2 px-2">
                                        <div className="text rounded-1 py-1 px-2 text-nowrap text-end fs-6">
                                        Сумма: {calculateTotalAmount().toLocaleString('ru-RU')} ₽
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pb-3 pt-1" style={{display: "flex", justifyContent: "center"}}>
                                <Button className="rounded-3 w-100" variant="dark">Оформление заказа</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ShoppingCart;
