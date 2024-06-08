import React, {useEffect, useState} from 'react';
import {Button, Col, Container, FloatingLabel, Form, Image, Modal, Row, Table} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {addToCart, createReview, deleteReview, getProductById, updateReview} from "../Utils/APIService";
import StarRatings from 'react-star-ratings';
import "leaflet/dist/leaflet.css";
import MyYandexMap from "../Components/MyYandexMap";

const ProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHeader, setEditHeader] = useState("");
    const [newReview, setNewReview] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editRating, setEditRating] = useState(0);
    const [sortedReviews, setSortedReviews] = useState([]);

    const username = localStorage.getItem("username");

    useEffect(() => {
        getProductById(productId)
            .then(data => {
                setProduct(data);
                setReviews(data.reviewList);
            })
            .catch(err => {
            });
    }, []);

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            const sortedReviews = [...reviews].sort((a, b) => {
                // Сначала проверяем, является ли отзыв от текущего пользователя
                if (a.user.username === username && b.user.username !== username) return -1;
                if (b.user.username === username && a.user.username !== username) return 1;
                // Затем сортируем остальные отзывы по дате
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setSortedReviews(sortedReviews);
        }
    }, [reviews]); // Добавление username в зависимости, чтобы реагировать на изменения текущего пользователя

    function handleAddToCartProduct(product) {
        addToCart({product: product, quantity: 1})
            .then(
                alert("Товар добавлен в корзину!")
            )
    }

    const handleEditClick = (review) => {
        setEditingReview(review);
        setEditHeader(review.header);
        setEditContent(review.content);
        setEditRating(review.rating);
        setNewReview(false);
    };

    const handleSaveClick = () => {
        const reviewData = {
            id: editingReview.id,
            header: editHeader,
            content: editContent,
            user: editingReview.user,
            createdAt: null,
            updatedAt: null,
            rating: editRating
        };

        updateReview(reviewData)
            .then(() => getProductById(productId))
            .then(data => {
                setProduct(data);
                setReviews(data.reviewList);
                setEditingReview(null);
            })
            .catch(err => {
                console.error("Error updating or fetching product:", err);
            });
    };

    const handleChangeRating = (newRating) =>{
        setEditRating(newRating);
        console.log(editRating);
    }

    const handleDeleteClick = (reviewId) => {
        deleteReview(reviewId)
            .then(data => {
                setReviews(data);
                alert("Отзыв удалён");
            })
            .catch(error => {
                console.error('Ошибка удаления отзыва:', error);
            });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setNewReview(false);
    };

    const handleCreateClick = () => {
        setEditHeader("");
        setEditContent("");
        setEditRating(0);
        handleShowModal();
        console.log("Нажата кнопка оставить отзыв");
        console.log(showModal);
    };

    const handleSaveCreateClick = () => {
        const reviewData = {
            header: editHeader,
            content: editContent,
            productId: product.id,
            rating: editRating,
        };

        createReview(reviewData)
            .then(data => {
                setEditingReview(null);
                setNewReview(false);
                setReviews(data)
                handleCloseModal();
                alert('Отзыв сохранён');
            })
            .catch(error => {
                console.error('Ошибка сохранения отзыва:', error);
            });
    };

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
                                <div className={"pb-2"} style={{width:'fit-content'}}>
                                    <StarRatings
                                        rating={product.rating}
                                        starRatedColor="#fd920f"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="1px"
                                    />
                                </div>
                                <div style={{display:"flex", alignItems:"center", width:'fit-content', height:'100%'}}>
                                    {product.reviewList.length}
                                </div>
                            </Row>
                            <Row className={"mt-2"} style={{display:"flex", flexDirection: 'row', justifyContent: 'center', alignItems:"center"}}>
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
                    <Row className="mt-4">
                        <Col md={12}>
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Новый отзыв</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <div className={"mb-3"}>
                                            <StarRatings
                                                rating={editRating}
                                                starRatedColor="#fd920f"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="25px"
                                                starSpacing="1px"
                                                changeRating={(newRating) => handleChangeRating(newRating)} // Добавьте обработчик для изменения рейтинга
                                            />
                                        </div>
                                        <FloatingLabel controlId="floatingInputHeader" label="Заголовок" className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Введите заголовок"
                                                value={editHeader}
                                                onChange={e => setEditHeader(e.target.value)}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingTextareaContent" label="Содержание">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Введите содержание отзыва"
                                                style={{ height: '100px' }}
                                                value={editContent}
                                                onChange={e => setEditContent(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Закрыть
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveCreateClick}>
                                        Сохранить
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <h4>Отзывы:</h4>
                            {username && !sortedReviews.some(review => review.user.username === username) && (
                                <Button className={"mb-3"} variant="primary" onClick={handleCreateClick}>Оставить отзыв</Button>
                            )}
                            {(sortedReviews && sortedReviews.length > 0) ? (
                                <div className="review-list">
                                    {sortedReviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className={`card mb-3 ${username === review.user.username ? "border border-2 border-primary" : "border border-2"}`}
                                            style={{ padding: "15px" }}
                                        >
                                            {editingReview && editingReview.id === review.id ? (
                                                <Col>
                                                    <Form>
                                                        <div className={"mb-3"}>
                                                            <StarRatings
                                                                rating={editRating}
                                                                starRatedColor="#fd920f"
                                                                numberOfStars={5}
                                                                name='rating'
                                                                starDimension="20px"
                                                                starSpacing="1px"
                                                                changeRating={(newRating) => handleChangeRating(newRating)} // Добавьте обработчик для изменения рейтинга
                                                            />
                                                        </div>
                                                        <FloatingLabel controlId="floatingInputHeader" label="Заголовок" className="mb-3">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Введите заголовок"
                                                                value={editHeader}
                                                                onChange={e => setEditHeader(e.target.value)}
                                                            />
                                                        </FloatingLabel>
                                                        <FloatingLabel controlId="floatingTextareaContent" label="Содержание">
                                                            <Form.Control
                                                                as="textarea"
                                                                placeholder="Введите содержание отзыва"
                                                                style={{ height: '100px' }}
                                                                value={editContent}
                                                                onChange={e => setEditContent(e.target.value)}
                                                            />
                                                        </FloatingLabel>
                                                        <div className="mt-3">
                                                            <Button variant="primary" onClick={handleSaveClick}>Сохранить</Button>
                                                            <Button variant="danger" onClick={() => setEditingReview(null)} className="ms-2">Отмена</Button>
                                                        </div>
                                                    </Form>
                                                </Col>
                                            ) : (
                                                <div>
                                                    <StarRatings
                                                        rating={review.rating}
                                                        starRatedColor="#fd920f"
                                                        numberOfStars={5}
                                                        name='rating'
                                                        starDimension="20px"
                                                        starSpacing="1px"
                                                    />
                                                    <h5>{review.header}</h5>
                                                    <p>{review.content}</p>
                                                    {username === review.user.username && (
                                                        <>
                                                            <button onClick={() => handleEditClick(review)} className="btn btn-primary">Редактировать</button>
                                                            <button onClick={() => handleDeleteClick(review.id)} className="btn btn-danger ms-2">Удалить</button>
                                                        </>
                                                    )}
                                                    {username !== review.user.username && (
                                                        <footer className="blockquote-footer">
                                                            Оставлен <cite title="Source Title">{review.user.firstName} {review.user.lastName}</cite>
                                                        </footer>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Отзывов пока нет.</p>
                            )}
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <MyYandexMap data={product.storeList} />
                    </Row>
                </Container>
            ) : (
                <div>Товар не найден.</div>
            )}
        </>
    );
};

export default ProductPage;
