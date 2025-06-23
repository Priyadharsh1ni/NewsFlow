const initialState = {
    token: null,
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
            };
        case 'LIST_ARTICLES':
            return {
                ...state,
                articles: action.payload,
            };
        case 'GET_ARTICLES':
            return {
                ...state,
                article: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;