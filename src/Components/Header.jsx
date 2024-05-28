// Header.js
import React, {useState} from 'react';
import { Navbar, Nav, Container, Button, NavLink, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./header.css"

const Header = () => {
    const username = localStorage.getItem('username'); // Получаем имя пользователя из localStorage

    const handleLogout = () => {
        localStorage.removeItem('username'); // Удаляем пользователя из localStorage
        window.location.reload(); // Перезагружаем страницу для обновления состояния
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header-nav">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand-logo">Backlog</Navbar.Brand>
                <Button variant="outline-light" onClick={handleShow}>
                    Меню
                </Button>

                <Offcanvas show={show} onHide={handleClose} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Меню</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-3">
                            <NavLink as={Link} to="/cart" onClick={handleClose} style={{color: "black"}} className="nav-link">Корзина</NavLink>
                            {username ? (
                                <>
                                    <Nav.Item className="me-3 text-black">Привет, {username}</Nav.Item>
                                    <Button variant="outline-dark" style={{color: "black"}} onClick={handleLogout}>Выйти</Button>
                                </>
                            ) : (
                                <>
                                    <NavLink as={Link} to="/login" onClick={handleClose} style={{color: "black"}} className="nav-link">Авторизация</NavLink>
                                    <NavLink as={Link} to="/register" onClick={handleClose} style={{color: "black"}} className="nav-link">Регистрация</NavLink>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
