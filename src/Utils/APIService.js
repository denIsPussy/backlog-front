const API_BASE_URL = 'http://localhost:8080'; // Обнови этот URL в соответствии с твоим серверным адресом

const fetchApi = async (url, method, data, token) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    // Добавляем токен в заголовки, если он передан и не равен null
    if (token) {
        const token = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${token}`);
    }

    const config = {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    };

    if (method === 'GET') {
        delete config.body; // Удаляем тело запроса для GET запросов
    }

    const response = await fetch(`${API_BASE_URL}${url}`, config);
    //console.log(response);

    let responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Что-то пошло не так');
    }
    return responseData;
};

const register = (userData) => fetchApi('/register', 'POST', userData, null);
const authenticate = (loginData) => fetchApi('/authenticate', 'POST', loginData, null);
const verifyTwoFactorCode = (twoFactorData) => fetchApi('/verifyTwoFactorCode', 'POST', twoFactorData, null);
const getAllProducts = () => fetchApi('/products/', 'GET', null, true);
const getShoppingCart = () => fetchApi('/user/getShopCart', 'GET', null, true);

export { register, authenticate, verifyTwoFactorCode, getAllProducts, getShoppingCart };
