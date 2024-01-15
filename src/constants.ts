export const SUCCESS_MESSAGES = {
    INDEX_SUCCESS: 'Product indexed successfully',
    SEARCH_SUCCESS: 'Products retrieved successfully',
    UPDATE_SUCCESS: 'Product updated successfully',
    DELETE_SUUCESS: 'Product deleted successfully',
}

export const ERROR_MESSAGES = {
    NO_DATA:'NO_DATA',
    INDEX_ERROR:'Error indexing product',
    SEARCH_ERROR: 'Error searching products',
    UPDATE_ERROR: 'Error updating product',
    DELETE_ERROR: 'Error deleting product',
    FETCH_ERROR: 'Error fetching product by ID',
}

export const RESPONSE_MESSAGES = {
    SERVER_ERROR: 'Something went wrong',
    NOT_FOUND: 'Product not found',
    DUPLICATE: 'Already exists',
};

export const RESPONSE_STATUS = {
    success: 200,
    unauthorized: 401,
    internalServerError: 500,
    notFound: 404,
    badRequest: 400,
    alreadyExist: 409,
}