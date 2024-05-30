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
const API_BASE_URL = "https://api.backlogshop.ru";

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

const getAllProducts = () => {
    return fetchWithToken('/products/', 'GET');
};

const getShoppingCart = () => {
    return fetchWithToken('/user/getShopCart', 'GET', null, true);
};

const exchangeToken = (data) => {
    return fetchWithToken('/exchange-token', 'POST', data, false);
};

export { register, authenticate, verifyTwoFactorCode, getAllProducts, getShoppingCart, exchangeToken };
