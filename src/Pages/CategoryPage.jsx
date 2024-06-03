import React, {useEffect, useState} from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import {getAllCategories, getAllProducts} from '../Utils/APIService';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(data => {
                setCategories(data);
                setSelectedCategory(data[0]);
                console.log(data);
            })
            .catch(err => {
            })
    }, []);

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h1 className="text-center mb-4">Выберите категорию товаров</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {categories.map((category) => (
                        <Col key={category.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                    <Card.Text>{category.description}</Card.Text>
                                    <Button variant="dark" href={`/catalog/${category.id}`}>Посмотреть
                                        товары</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default CategoriesPage;
