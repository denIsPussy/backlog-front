import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {getProductById} from "../Utils/APIService";

const ProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(productId)
            .then(data => {
                setProduct(data);
            })
            .catch(err => {
            });
    }, []);

    return (
        <>
            <Header/>
            <Container className="my-5">
                {product ?
                    (
                        <Row>
                            <Col md={6}>
                                <Image style={{objectFit: "contain", maxWidth: "200px", margin: "0 auto"}}
                                       src={`data:image/jpeg;base64,${product.image}`}
                                       alt="Apple Computer"/>
                            </Col>
                            <Col md={6}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <h3>Цена: {product.price} ₽</h3>
                                <Button variant="primary">Добавить в корзину</Button>
                            </Col>
                        </Row>
                    ):(
                        <div></div>
                    )}
            </Container>
            <Footer/>
        </>
    );
};

export default ProductPage;
