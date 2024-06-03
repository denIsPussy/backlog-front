// components/Catalog.js

import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getAllCategories, getProductsByCategory} from '../Utils/APIService';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/catalog.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import SearchableDropdown from "../Components/SearchableDropdown";
import TestComponent from "../Components/TestComponent";
import Template from "../Components/Template";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const {categoryId} = useParams();
    const [error, setError] = useState('');

    useEffect(() => {
        getProductsByCategory(categoryId)
            .then(data => {
                setProducts(data);
                //console.log(data);
            })
            .catch(err => {
                console.log(process.env.REACT_APP_BASE_API_URL); // Должно вывести 'http://localhost:8080'
                //console.error('Failed to fetch products:', err);
                setError('Ошибка при загрузке продуктов.');
            });
        getAllCategories()
            .then(data => {
                setCategories(data);
                console.log(data);
                const matchedCategory = data.find(item => item.id.toString() === categoryId); // Проверьте сравнение, возможно нужно приведение типов
                setSelectedCategory(matchedCategory);
                console.log(matchedCategory);
                console.log(selectedCategory);
            })
            .catch(err => {
                console.log(process.env.REACT_APP_BASE_API_URL); // Должно вывести 'http://localhost:8080'
                //console.error('Failed to fetch products:', err);
                setError('Ошибка при загрузке категорий.');
            })
    }, []);
    const navigate = useNavigate();
    const handleSelectCategory = (value) => {
        console.log(value);
        setSelectedCategory(value);
        navigate(`/catalog/${value.id}`);
    };

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }

        return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
    }

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Каталог</h1>
                <Container fluid>
                    <Row>
                        {/*<Col md={3} className="sidebar">*/}
                        {/*    <ListGroup>*/}
                        {/*        {categories.map((category) => (*/}
                        {/*            <ListGroup.Item*/}
                        {/*                key={category.id}*/}
                        {/*                action*/}
                        {/*                href={`/catalog/${category.id}`}*/}
                        {/*                active={category === selectedCategory}*/}
                        {/*                className="list-group-item-secondary"// Подсветка активной категории*/}
                        {/*            >*/}
                        {/*                {category.name}*/}
                        {/*            </ListGroup.Item>*/}
                        {/*        ))}*/}
                        {/*    </ListGroup>*/}
                        {/*</Col>*/}
                        {/*<Dropdown*/}
                        {/*    listItems={categories}*/}
                        {/*    selectedValue={selectedCategory ? selectedCategory.name : 'Загрузка...'}*/}
                        {/*    onClick={handleSelectCategory}*/}
                        {/*/>*/}
                        {/*<Dropdown>*/}
                        {/*    <Dropdown.Toggle variant="outline-dark">*/}
                        {/*        Категории*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu as={CustomMenu}*/}
                        {/*                   className="outline-dark">*/}
                        {/*        {categories.map((category) => (*/}
                        {/*            <Dropdown.Item*/}
                        {/*                key={category.id}*/}
                        {/*                href={`/catalog/${category.id}`}*/}
                        {/*                active={category === selectedCategory}*/}
                        {/*            >*/}
                        {/*                {category.name}*/}
                        {/*            </Dropdown.Item>*/}
                        {/*        ))}*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>,*/}
                        {
                            categories.length > 0 &&
                            <SearchableDropdown items={categories} handleSelect={handleSelectCategory}/>
                        }
                        <Col md={9}>
                            <h2>{selectedCategory ? selectedCategory.name : 'Загрузка...'}</h2>
                            <p>Сердце любого компьютера — его процессор. От бюджетных вариантов для офисных задач до экстремальных процессоров для гейминга и создания контента — у нас есть всё, чтобы ваша система работала на максимальной скорости</p>
                        </Col>
                        {/*<Template>*/}

                        {/*</Template>*/}
                    </Row>
                </Container>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {products.map(product => (
                            <Col key={product.id}>
                                <Template product={product} />
                                {/*<Card className="h-100 shadow-sm border-0">*/}
                                {/*    <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`}*/}
                                {/*              alt={product.name} style={{objectFit: "contain"}}/>*/}
                                {/*    <Card.Body>*/}
                                {/*        <Card.Title>{product.name}</Card.Title>*/}
                                {/*        <Card.Text>*/}
                                {/*            {truncateText(product.description, 100)}*/}
                                {/*        </Card.Text>*/}
                                {/*    </Card.Body>*/}
                                {/*    <Card.Footer className="">*/}
                                {/*        <small>Рейтинг: {product.rating}</small>*/}
                                {/*    </Card.Footer>*/}
                                {/*</Card>*/}
                            </Col>
                        ))}
                    </Row>
            </Container>
            <Footer/>
        </>
    );
}

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Введите для поиска..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);
