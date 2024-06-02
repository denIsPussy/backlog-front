// src/pages/CartPage.js
import React from 'react';
import ShoppingCart from '../Components/ShoppingCart';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/cartPage.css'
import { Container } from 'react-bootstrap';

const CartPage = () => {
    const username = localStorage.getItem("username"); // Замените на актуальный идентификатор корзины

    return (
        <>
            <Header/>
            <Container className="cart-page my-5" style={{ boxShadow: "none", backgroundColor: "transparent"}}>
                <h1 className="text-start mb-4 ms-2">Корзина</h1>
                <ShoppingCart username={username}/>
            </Container>
            <Footer/>
        </>
    );
};

export default CartPage;
