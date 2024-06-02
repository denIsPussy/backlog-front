// components/Catalog.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../Utils/APIService';
import ProductDTO from '../Components/ModelDTO/ProductDTO';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/catalog.css';
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const categories = ["Категория 1", "Категория 2", "Категория 3", "Категория 4"];

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                //console.log(data);
            })
            .catch(err => {
                console.log(process.env.REACT_APP_BASE_API_URL); // Должно вывести 'http://localhost:8080'
                //console.error('Failed to fetch products:', err);
                setError('Ошибка при загрузке продуктов.');
            });
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Список товаров</h1>
                <Row>
                    <Col>
                        <Container fluid>
                            <Row>
                                <Col md={3} className="sidebar"> {/* Колонка для категорий */}
                                    <ListGroup>
                                        {categories.map((category, index) => (
                                            <ListGroup.Item key={index} action>
                                                {category}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col md={9}> {/* Колонка для отображения товаров или деталей */}
                                    <h2>Детали категории</h2>
                                    <p>Выберите категорию слева, чтобы увидеть товары.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {products.map(product => (
                                <Col key={product.id}>
                                    <Card className="h-100 shadow-sm">
                                        <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ objectFit: "contain" }}/>
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>
                                                {product.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Рейтинг: {product.rating}</small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
