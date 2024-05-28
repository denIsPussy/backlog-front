// components/Catalog.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../Utils/APIService';
import ProductDTO from '../Components/ModelDTO/ProductDTO';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/catalog.css';
import {Card, Col, Container, Row} from "react-bootstrap";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                //console.log(data);
            })
            .catch(err => {
                //console.error('Failed to fetch products:', err);
                setError('Ошибка при загрузке продуктов.');
            });
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Список товаров</h1>
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
            </Container>
            <Footer />
        </>
    );
}
