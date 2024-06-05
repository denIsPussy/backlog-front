import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {getAllCategories} from '../Utils/APIService';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getAllCategories()
            .then(data => {
                setCategories(data);
                setSelectedCategory(data[0]);
                setIsLoading(false);
                console.log(data);
            })
            .catch(err => {
            })
    }, []);

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Выберите категорию товаров</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {isLoading ? (
                        // Показываем скелетоны во время загрузки
                        Array.from({length: 6}).map((_, idx) => (
                            <Col key={idx}>
                                <Card>
                                    <Card.Body>
                                            <Skeleton height={30} width={`70%`}/>
                                            <Skeleton height={15} width={`90%`} style={{marginTop: 10}} count={2}/>
                                            <Skeleton height={40} width={`50%`} style={{marginTop: 20}}/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        // Показываем данные после загрузки
                        categories.map((category) => (
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
                        ))
                    )}
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default CategoriesPage;
