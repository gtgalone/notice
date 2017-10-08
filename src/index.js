import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import NoticeContainer from './containers_components/NoticeContainer';
import store from './redux/reducer';

ReactDOM.render(
    <Provider store={store}>
        <NoticeContainer />
    </Provider>, 
    document.getElementById('root')
);