import React, {useEffect, useState} from 'react';
import {getNotifications, readNotification} from "../Utils/APIService";
import Header from "../Components/Header";
import "../css/notificationsPage.css"
import {Container} from "react-bootstrap";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchAndUpdateNotifications = () => {
        console.log('Отправка запроса для проверки уведомлений');
        getNotifications()
            .then(data => {
                if (data) {
                    setNotifications(data);  // Обновляем состояние уведомлений
                    console.log(data);
                }
            })
            .catch(error => {
                console.error('Ошибка при получении уведомлений:', error);
            });
    };

    useEffect(() => {
        fetchAndUpdateNotifications(); // Вызываем при монтировании компонента

        const intervalId = setInterval(fetchAndUpdateNotifications, 3000); // Устанавливаем интервал на 30 секунд

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
    }, []);

    const handleMouseOver = (notificationId) => {
        console.log(`Mouse over notification with id: ${notificationId}`);
        readNotification(notificationId).then(data => {
            fetchAndUpdateNotifications();
            console.log(`Прочитано уведомление с id: ${notificationId}`);
        })
    };

    return (
        <>
            <Header/>
            <Container className="notifications-container mt-5">
                <h1>Уведомления</h1>
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}
                            onMouseOver={() => !notification.isRead && handleMouseOver(notification.id)}
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}>
                            {notification.text}
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    );
};

export default Notifications;
