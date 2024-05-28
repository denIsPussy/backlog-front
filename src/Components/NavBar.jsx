import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";


function NavBar() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            src="/virus.png"
                            width="30"    // Задайте ширину изображения
                            height="30"  // Задайте высоту изображения
                            className="d-inline-block align-top" // Классы для выравнивания изображения с текстом
                            alt="Logo" // Альтернативный текст для изображения
                        />
                        Backlog
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Главная</Nav.Link>
                            <Nav.Link href="#link">Каталог</Nav.Link>
                            <Nav.Link href="#link">Профиль</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Button variant="outline-light">Войти</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;