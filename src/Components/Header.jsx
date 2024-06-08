import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Nav, Navbar, NavLink, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./header.css";
import { getNotifications } from "../Utils/APIService";
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const username = localStorage.getItem('username');
    const [notificationCount, setNotificationCount] = useState(0);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.reload();
    };

    useEffect(() => {
        const fetchNotifications = () => {
            getNotifications()
                .then(data => {
                    setNotificationCount(data.length);
                })
                .catch(error => {
                    console.error('Ошибка при получении количества уведомлений:', error);
                });
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 3000);
        const resizeListener = () => {
            setIsLargeScreen(window.innerWidth >= 992);
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return (
        <>
            {isLargeScreen ? (
                <Navbar bg="dark" variant="dark" expand="lg" className="header-nav">
                    <Container>
                        <Navbar.Brand as={Link} to="/" className="navbar-brand-logo">Backlog</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                {username ? (
                                    <>
                                        <Dropdown as={Nav.Item}>
                                            <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                                                <Button variant="dark" style={{border: 'none'}}>
                                                    Денис
                                                    <Badge bg="light" className="ms-2" style={{ color: 'black' }}>{notificationCount}</Badge>
                                                    <span className="visually-hidden" style={{color:"black"}}>unread messages</span>
                                                </Button>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end">
                                                <Dropdown.Item as={Link} to="/orders">Заказы</Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/profile">Профиль</Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/notifications">Уведомления</Dropdown.Item>
                                                <Dropdown.Divider/>
                                                <Dropdown.Item onClick={handleLogout}>Выйти</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <>
                                        <NavLink as={Link} to="/login" className="nav-link">Авторизация</NavLink>
                                        <NavLink as={Link} to="/register" className="nav-link">Регистрация</NavLink>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : (
                <>
                    <Navbar bg="dark" variant="dark" expand="lg" className="header-nav">
                        <Container>
                            <Navbar.Brand as={Link} to="/" className="navbar-brand-logo">Backlog</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowOffCanvas(true)}/>
                        </Container>
                    </Navbar>
                    <Offcanvas show={showOffCanvas} onHide={() => setShowOffCanvas(false)} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Меню</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="flex-column">
                                {username ? (
                                    <>
                                        <Nav.Link as={Link} to="/orders" className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faShoppingCart} className="me-2"/> Заказы
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faUser} className="me-2"/> Профиль
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/notifications" className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faBell} className="me-2"/> Уведомления
                                            <Badge bg="warning" text="dark" className="ms-auto">{notificationCount}</Badge>
                                        </Nav.Link>
                                        <Nav.Item className="mt-3">
                                            <Button variant="outline-danger" onClick={handleLogout} style={{width: '100%'}}>
                                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2"/> Выйти
                                            </Button>
                                        </Nav.Item>
                                    </>
                                ) : (
                                    <>
                                        <NavLink as={Link} to="/login" className="nav-link">
                                            <FontAwesomeIcon icon={faUser} className="me-2"/> Авторизация
                                        </NavLink>
                                        <NavLink as={Link} to="/register" className="nav-link">
                                            <FontAwesomeIcon icon={faUser} className="me-2"/> Регистрация
                                        </NavLink>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            )}
        </>
    );
};

export default Header;
