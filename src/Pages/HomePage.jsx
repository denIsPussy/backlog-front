// HomePage.js
import React from 'react';
import Header from '../Components/Header';
import { useNavigate } from "react-router-dom"; // Убедитесь, что путь к Header корректен

const HomePage = () => {
    const username = localStorage.getItem('username'); // Получаем имя пользователя из localStorage
    const navigate = useNavigate();

    const goToCatalog = () => {
        navigate("/catalog"); // Используем функцию для перехода на страницу каталога
    };

    return (
        <div className="home-page">
            <Header/>
            <div className="hero-section text-center">
                <h1 className="display-4">Добро пожаловать в наш онлайн-магазин{username ? `, ${username}` : ''}!</h1>
                <p>Это домашняя страница нашего сайта. Вы можете просматривать товары и делать заказы.</p>
                <button onClick={goToCatalog} className="btn btn-primary btn-lg">Посмотреть товары</button>
            </div>
        </div>
    );
};

export default HomePage;
