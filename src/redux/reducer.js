import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { apiMiddleware } from 'redux-api-middleware';

const initialState = {
    status: 'INIT',
    error: -1
}

const noticeWrite = (state = initialState, action) => {
    switch(action.type) {
        case 'NOTICE_WRITE_SUBMIT':
            return Object.assign({}, state, {
                status: 'WAITING',
                error: -1
            })
        case 'NOTICE_WRITE_SUCCESS':
            return Object.assign({}, state, {
                status: 'SUCCESS'
            })
        case 'NOTICE_WRITE_FAILURE':
            return Object.assign({}, state, {
                status: 'FAILURE',
                error: action.error
            })
        default:
            return state
    }
}

const noticeDelete = (state = initialState, action) => {
    switch(action.type) {
        case 'NOTICE_DELETE_SUBMIT':
            return Object.assign({}, state, {
                status: 'WAITING',
                error: -1
            })
        case 'NOTICE_DELETE_SUCCESS':
            return Object.assing({}, state, {
                status: 'SUCCESS'
            })
        case 'NOTICE_DELETE_FAILURE':
            return Object.assign({}, state, {
                status: 'FAILURE',
                error: action.error
            })
        default:
            return state
    }
}

const reducers = combineReducers({
    form: reduxFormReducer,
    noticeWrite,
    noticeDelete
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(apiMiddleware)));

export default store;