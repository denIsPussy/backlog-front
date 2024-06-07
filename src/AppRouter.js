import React from 'react';
import {config, useTransition} from 'react-spring';
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
import {AnimatePresence, motion} from 'framer-motion';
import ProductPage from "./Pages/ProductPage";
import OrdersPage from "./Pages/OrdersPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CheckoutPage from "./Pages/CheckoutPage";

const AnimatedRoutes = () => {
    const location = useLocation(); // Получаем текущее местоположение для ключа анимации

    const transitions = useTransition(location, {
        from: {opacity: 0, transform: 'translate3d(10%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {opacity: 0, transform: 'translate3d(-10%,0,0)'},
        // config: { duration: 150, clamp: false }, // Настройка продолжительности анимации
        config: config.stiff
    });

    const pageTransition = {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
        transition: {duration: 0.3, delay: 0}

        // initial: { opacity: 0 },
        // animate: { opacity: 1 },
        // exit: { opacity: 0 },
        // transition: {
        //     type: "spring",
        //     stiffness: 500,
        //     damping: 55
        // }
    };

    return (
        // <animated.div style={props}>
        // <TransitionGroup>
        //     <CSSTransition
        //         key={location.key}
        //         timeout={100}
        //         classNames="fade"
        //     >
        <>
            <AnimatePresence mode="wait">
                {/*<div style={{position: 'absolute', width: '100%'}}>*/}
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<motion.div {...pageTransition}><HomePage/></motion.div>}/>
                    <Route path="/login" element={<motion.div {...pageTransition}><LoginPage/></motion.div>}/>
                    <Route path="/register" element={<motion.div {...pageTransition}><RegisterPage/></motion.div>}/>
                    <Route path="/two-factor-auth/:username"
                           element={<motion.div {...pageTransition}><TwoFactorAuthPage/></motion.div>}/>
                    <Route path="/catalog/:category" element={<motion.div {...pageTransition}><Catalog/></motion.div>}/>
                    <Route path="/cart" element={<motion.div {...pageTransition}><CartPage/></motion.div>}/>
                    <Route path="/vkAuth" element={<motion.div {...pageTransition}><VkAuthPage/></motion.div>}/>
                    <Route path="/categories" element={<motion.div {...pageTransition}><CategoriesPage/></motion.div>}/>
                    <Route path="/product/:productId"
                           element={<motion.div {...pageTransition}><ProductPage/></motion.div>}/>
                    <Route path="/orders" element={<motion.div {...pageTransition}><OrdersPage/></motion.div>}/>
                    <Route path="/checkout" element={<motion.div {...pageTransition}><CheckoutPage/></motion.div>}/>
                </Routes>
                {/*</div>*/}
            </AnimatePresence>
        </>
        // {/*</animated.div>*/}
        // {/*</CSSTransition>*/}
        // {/*</TransitionGroup>*/}
    )
};

const AppRouter = () => {
    return (
        <Router>
            <div className="main-content">
                <Header/>
                <main className="flex-grow-1">
                    <AnimatedRoutes/>
                </main>
                <Footer/>
            </div>
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
