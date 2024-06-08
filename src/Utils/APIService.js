// // const API_BASE_URL = 'https://denispussy-backlog-back-0907.twc1.net'; // Обнови этот URL в соответствии с твоим серверным адресом
// const API_BASE_URL = 'http://api.backlogshop.ru';
// const fetchApi = async (url, method, data, token) => {
//     const headers = new Headers({
//         'Content-Type': 'application/json',
//     });
//
//     // Добавляем токен в заголовки, если он передан и не равен null
//     if (token) {
//         const token = localStorage.getItem('token');
//         headers.append('Authorization', `Bearer ${token}`);
//     }
//
//     const config = {
//         method: method,
//         headers: headers,
//         body: JSON.stringify(data),
//     };
//
//     if (method === 'GET') {
//         delete config.body; // Удаляем тело запроса для GET запросов
//     }
//
//     let url1 = `${API_BASE_URL}${url}`;
//     console.log("Отправка запроса на:", url1);  // Вывод URL в консоль
//     const response = await fetch(`${API_BASE_URL}${url}`, config);
//
//     let responseData = await response.json();
//
//     if (!response.ok) {
//         throw new Error(responseData.message || 'Что-то пошло не так');
//     }
//     return responseData;
// };
//
// const register = (userData) => fetchApi('/register', 'POST', userData, false);
// const authenticate = (loginData) => fetchApi('/authenticate', 'POST', loginData, false);
// const verifyTwoFactorCode = (twoFactorData) => fetchApi('/verifyTwoFactorCode', 'POST', twoFactorData, false);
// const getAllProducts = () => fetchApi('/products/', 'GET', null, false);
// const getShoppingCart = () => fetchApi('/user/getShopCart', 'GET', null, true);
//
// export { register, authenticate, verifyTwoFactorCode, getAllProducts, getShoppingCart };
const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

const fetchWithToken = async (url, method, data = null, tokenRequired = false) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    if (tokenRequired) {
        const token = localStorage.getItem('token');
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
    }

    const config = {
        method: method,
        headers: headers,
    };

    if (data !== null) {
        config.body = JSON.stringify(data);
    }

    console.log(API_BASE_URL);
    const fullUrl = `${API_BASE_URL}${url}`;
    console.log("Отправка запроса на:", fullUrl);  // Вывод URL в консоль
    const response = await fetch(fullUrl, config);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || 'Что-то пошло не так');
    }
    return responseData;
};

const register = (userData) => {
    return fetchWithToken('/register', 'POST', userData);
};

const authenticate = (loginData) => {
    return fetchWithToken('/authenticate', 'POST', loginData);
};

const verifyTwoFactorCode = (twoFactorData) => {
    return fetchWithToken('/verifyTwoFactorCode', 'POST', twoFactorData);
};

const getPageProducts = (page, size) => {
    return fetchWithToken('/products', 'GET');
};

const getProductsByCategory = (categoryId, page, size) => {
    return fetchWithToken(`/products/byCategory/${categoryId}?page=${page-1}&size=${size}`, 'GET');
};

const addToCart = (data) => {
    return fetchWithToken(`/cart/addToCart`, 'POST', data, true);
};

const removeFromCart = (productId) => {
    return fetchWithToken(`/cart/removeFromCart/${productId}`, 'DELETE', null, true);
};

const reduceProductQuantityInCart = (productId) => {
    return fetchWithToken(`/cart/reduceProductQuantityInCart/${productId}`, 'POST', null, true);
};

const increaseProductQuantityInCart = (productId) => {
    return fetchWithToken(`/cart/increaseProductQuantityInCart/${productId}`, 'POST', null, true);
};

const getProductById = (id) => {
    return fetchWithToken(`/products/get/${id}`, 'GET');
};

const updateReview = (data) => {
    return fetchWithToken(`/products/updateReview`, 'PUT', data, true);
};

const deleteReview = (reviewId) => {
    return fetchWithToken(`/products/deleteReview/${reviewId}`, 'DELETE', null, true);
};

const createReview = (data) => {
    return fetchWithToken(`/products/createReview`, 'POST', data, true);
};

const getAllCategories = () => {
    return fetchWithToken('/products/categories', 'GET');
};

const getShoppingCart = () => {
    return fetchWithToken('/user/getShopCart', 'GET', null, true);
};

const getOrdersByUser = (username) => {
    return fetchWithToken(`/order/byUser?username=${username}`, 'GET', null, true);
};

const getPaymentMethods = () => {
    return fetchWithToken(`/order/getPaymentMethods`, 'GET', null, true);
};

const getShippingMethods = () => {
    return fetchWithToken(`/order/getShippingMethods`, 'GET', null, true);
};

const createOrder = (data) => {
    return fetchWithToken(`/order/create`, 'POST', data, true);
};

const exchangeToken = (data) => {
    return fetchWithToken('/exchangeSilentAuthToken', 'POST', data, false);
};

const getNotifications = () => {
    return fetchWithToken('/notifications/', 'GET', null, true);
};

export { getNotifications, createOrder, getShippingMethods, getPaymentMethods, getOrdersByUser, createReview, deleteReview, updateReview, register, authenticate, verifyTwoFactorCode, getPageProducts, getShoppingCart, exchangeToken, getAllCategories, getProductsByCategory, getProductById, addToCart, removeFromCart, reduceProductQuantityInCart, increaseProductQuantityInCart };
