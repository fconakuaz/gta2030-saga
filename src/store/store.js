import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from '../reducers/reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'


const composeEnhancers = 
        (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    composeEnhancers( 
        applyMiddleware( sagaMiddleware )
    )
);

sagaMiddleware.run(rootSaga);