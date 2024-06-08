import React, { useEffect, useState } from 'react';
import {getNotifications} from "../Utils/APIService";
import Header from "../Components/Header";

const DiscountNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchAndUpdateNotifications = () => {
            console.log('Отправка запроса для проверки уведомлений');
            getNotifications()
                .then(data => {
                    if (data) {
                        setNotifications(data);  // Обновляем состояние уведомлений
                    }
                })
                .catch(error => {
                    console.error('Ошибка при получении уведомлений:', error);
                });
        };

        fetchAndUpdateNotifications(); // Вызываем при монтировании компонента

        const intervalId = setInterval(fetchAndUpdateNotifications, 3000); // Устанавливаем интервал на 30 секунд

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
    }, []);

    return (
        <>
            <Header/>
            <h1>Уведомления</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.text}</li> // Предполагается, что уведомления имеют поле 'message'
                ))}
            </ul>
        </>
    );
};

export default DiscountNotifications;
