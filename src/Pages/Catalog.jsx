// components/Catalog.js

import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getAllCategories, getProductsByCategory} from '../Utils/APIService';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../css/catalog.css';
import {Col, Container, Row} from "react-bootstrap";
import SearchableDropdown from "../Components/SearchableDropdown";
import CustomPagination from "../Components/CustomPagination";
import ProductCard from "../Components/ProductCard";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const {category} = useParams();
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 8;

    const navigate = useNavigate();

    useEffect(() => {
        getProductsByCategory(category, currentPage, pageSize)
            .then(data => {
                setProducts(data.content);
                setTotalPages(data.totalPages);
                console.log(data.totalPages);
            })
            .catch(err => {
            });
        getAllCategories()
            .then(data => {
                setCategories(data);
                const matchedCategory = data.find(item => item.id.toString() === category);
                setCurrentCategory(matchedCategory);
            })
            .catch(err => {
            })
    }, []);

    useEffect(() => {
        getProductsByCategory(currentCategory?.id, currentPage, pageSize)
            .then(data => {
                setProducts(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(err => {
            });
    }, [currentCategory, currentPage]);

    const handleSelectCategory = (category) => {
        setCurrentCategory(category)
        //navigate(`/catalog/${value.id}/1`);
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }

    // function truncateText(text, maxLength) {
    //     if (text.length <= maxLength) {
    //         return text;
    //     }
    //
    //     return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
    // }

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Каталог</h1>
                <Container fluid>
                    <Row>
                        {
                            categories.length > 0 &&
                            <SearchableDropdown items={categories} handleSelect={handleSelectCategory}/>
                        }
                        <Col md={9}>
                            <h2>{currentCategory ? currentCategory.name : 'Загрузка...'}</h2>
                            <p>{currentCategory ? currentCategory.description : 'Загрузка...'}</p>
                        </Col>
                    </Row>
                </Container>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {products.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product}/>
                        </Col>
                    ))}
                </Row>
                <Container className="mt-5">
                    <CustomPagination totalPages={Number(totalPages)} currentPage={Number(currentPage)}
                                      onPageChange={onPageChange}/>
                </Container>
            </Container>
            <Footer/>
        </>
    );
}