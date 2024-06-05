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
import Skeleton from "react-loading-skeleton";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const {category} = useParams();
    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch(err => {
            })
    }, []);

    // useEffect(() => {
    //     getProductsByCategory(currentCategory?.id, currentPage, pageSize)
    //         .then(data => {
    //             setProducts(data.content);
    //             setTotalPages(data.totalPages);
    //         })
    //         .catch(err => {
    //         });
    // }, [currentCategory, currentPage]);

    const handleSelectCategory = (category) => {
        //setCurrentCategory(category)
        navigate(`/catalog/${category.id}`);
    };
    const handleSelectProduct = (product) => {
        //setCurrentCategory(category)
        navigate(`/product/${product.id}`);
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
                            isLoading ? <Skeleton width={200} height={40} /> :
                                categories.length > 0 &&
                                <SearchableDropdown items={categories} handleSelect={handleSelectCategory}/>
                        }
                        <Col md={9}>
                            <h2>{isLoading ? <Skeleton width={200} height={40} /> : currentCategory ? currentCategory.name : 'Нет категории'}</h2>
                            <p>{isLoading ? <Skeleton width={800} height={80} /> : currentCategory ? currentCategory.description : 'Описание отсутствует'}</p>
                        </Col>
                    </Row>
                </Container>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <Col key={idx}>
                                <Skeleton height={300} />
                            </Col>
                        ))
                    ) : (
                        products.map(product => (
                            <Col key={product.id}>
                                <ProductCard handleSelectProduct={handleSelectProduct} product={product}/>
                            </Col>
                        ))
                    )}
                </Row>
                <Container className="mt-5">
                    {isLoading ? <Skeleton height={50} width={300} /> :
                        <CustomPagination totalPages={Number(totalPages)} currentPage={Number(currentPage)}
                                          onPageChange={onPageChange}/>
                    }
                </Container>
            </Container>
            <Footer/>
        </>
    );
}