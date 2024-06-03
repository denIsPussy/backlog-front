import React from 'react';
import { useTransition, animated, config } from 'react-spring';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import TwoFactorAuthPage from './Pages/TwoFactorAuthPage';
import './transitions.css';
import Catalog from "./Pages/Catalog";
import CartPage from "./Pages/CartPage";
import VkAuthPage from "./Pages/VkAuthPage";
import CategoriesPage from "./Pages/CategoryPage";

const AnimatedRoutes = () => {
    const location = useLocation(); // Получаем текущее местоположение для ключа анимации

    const transitions = useTransition(location, {
        from: { opacity: 0, transform: 'translate3d(10%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-10%,0,0)' },
        // config: { duration: 150, clamp: false }, // Настройка продолжительности анимации
        config: config.stiff
    });

    return transitions((props, item) => (
        <animated.div style={props}>
            <div style={{position: 'absolute', width: '100%'}}>
                <Routes location={item}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/two-factor-auth/:username" element={<TwoFactorAuthPage />} />
                    <Route path="/catalog/:categoryId" element={<Catalog />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/vkAuth" element={<VkAuthPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                </Routes>
            </div>
        </animated.div>
    ));
};

const AppRouter = () => {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
};

// const AppRouter = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={
//                     <TransitionGroup>
//                         <CSSTransition
//                             classNames="fade" // класс для анимации
//                             timeout={3000} // продолжительность анимации
//                         >
//
//                             <HomePage/>
//                         </CSSTransition>
//                     </TransitionGroup>
//                 }/>
//                 <Route path="/register" element={
//                     <CSSTransition
//                         classNames="fade" // класс для анимации
//                         timeout={3000} // продолжительность анимации
//                     >
//
//
//                         <RegisterPage/>
//                     </CSSTransition>
//                 }/>
//                 <Route path="/login" element={
//
//                         <LoginPage/>
//                 }/>
//                 <Route path="/two-factor-auth" element={
//
//                         <TwoFactorAuthPage/>
//                 }/>
//             </Routes>
//         </Router>
//     );
// }

// const AppRouter = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={
//                     <HomePage/>
//                 }/>
//                 <Route path="/register" element={
//                     <RegisterPage/>
//                 }/>
//                 <Route path="/login" element={
//                     <LoginPage/>
//                 }/>
//                 <Route path="/two-factor-auth" element={
//                     <TwoFactorAuthPage/>
//                 }/>
//             </Routes>
//         </Router>
//     );
// }

export default AppRouter;
