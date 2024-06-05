import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Table} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {addToCart, getProductById} from "../Utils/APIService";
import StarRatings from 'react-star-ratings';

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

    function handleAddToCartProduct(product) {
        addToCart({product: product, quantity: 1})
            .then(
                alert("Товар добавлен в корзину!")
            )
    }

    return (
        <>
            <Header/>
            {product ? (
                <Container className="my-5 px-4">
                    <Row>
                        <Col md={6} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Image className="" style={{width:'80%'}}
                                   src={`data:image/jpeg;base64,${product.image}`}
                                   alt={product.name}/>
                        </Col>
                        <Col style={{display:"flex", flexDirection:"column"}} md={6}>
                            <h2>{product.name}</h2>
                            <Row style={{display: "flex", alignItems: "center"}}>
                                <Col style={{alignSelf: "center", maxWidth: "fit-content"}}>
                                    <StarRatings
                                        rating={product.rating}
                                        starRatedColor="#fd920f"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="1px"
                                    />
                                </Col>
                                <Col style={{maxWidth: "fit-content", display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}} className="text-center">
                                    24
                                </Col>
                            </Row>
                            <Row className={"mt-3"} style={{display:"flex", flexDirection: 'row', justifyContent: 'center'}}>
                                <Col style={{maxHeight: "min-content"}}>
                                    <h5 style={{textWrap: "nowrap"}}>{product.price.toLocaleString('ru-RU')} ₽</h5>
                                </Col>
                                <Col style={{maxHeight: "min-content"}}>
                                    <Button onClick={() => handleAddToCartProduct(product)} variant="primary" style={{textWrap: "nowrap"}}>Добавить в корзину</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <p>{product.description}</p>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="mt-4">
                                <h4>Характеристики:</h4>
                                <Table striped bordered hover>
                                    <tbody>
                                    {product.attributeList.map((attr, index) => (
                                        <tr key={index}>
                                            <td>{attr.name}</td>
                                            <td>{attr.value}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div>Товар не найден.</div>
            )}
            <Footer/>
        </>

    );
};

export default ProductPage;
