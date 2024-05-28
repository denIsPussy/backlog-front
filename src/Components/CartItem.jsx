import React from 'react';
import {Card, Button, Container, Row, Col, ListGroup, ListGroupItem, Table} from 'react-bootstrap';
import '../css/cartItem.css'
const CartItem = ({ item }) => {
    const imageUrl = `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(item.image)))}`;
    return (
        // <Card style={{maxWidth: '100%', margin: '10px', padding: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        //     <Card.Img variant="top" src={`data:image/jpeg;base64,${item.product.image}`} style={{maxWidth: '20%', objectFit: "contain", flex: '1 1 auto', marginBottom: '10px'}} alt={item.product.name}/>
        //     <Card.Body style={{marginLeft: "20px", padding: '10px', display: 'inline-block', alignContent: 'center', alignItems: 'center', flex: '1 1 auto'}}>
        //         <Card.Title>{item.product.name}</Card.Title>
        //         <Card.Text>Цена: {item.product.price}₽</Card.Text>
        //         <Card.Text>Количество: {item.quantity}</Card.Text>
        //         <Button variant="primary">Изменить количество</Button>
        //     </Card.Body>
        // </Card>
        <div>
            <Container className="cart-page">

            </Container>
        </div>
    );
};

export default CartItem;