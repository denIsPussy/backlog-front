function createProductDTO(data) {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        rating: data.rating,
        imageURL: data.imageURL,
        discountList: data.discountList.map(createDiscountDTO),
        categoryList: data.categoryList.map(createCategoryDTO),
        storeList: data.storeList.map(createStoreItemDTO),
    };
}

function createDiscountDTO(data) {
    return {
        id: data.id,
        description: data.description,
        discountAmountPercentage: data.discountAmountPercentage
    };
}

function createCategoryDTO(data) {
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
}

function createStoreItemDTO(data) {
    return {
        id: data.id,
        quantity: data.quantity,
        store: createStoreDTO(data.store)
    };
}

function createStoreDTO(data) {
    return {
        id: data.id,
        name: data.name,
        address: createAddressDTO(data.address)
    };
}

function createAddressDTO(data) {
    return {
        id: data.id,
        city: data.city,
        street: data.street,
        houseNumber: data.houseNumber,
        postalCode: data.postalCode,
        apartment: data.apartment
    };
}
