import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import NoticeListContainer from './NoticeListContainer';
import NoticeViewContainer from './NoticeViewContainer';
import NoticeWriteContainer from './NoticeWriteContainer';
import data from '../data/notice.json';

import '../stylesheets/NoticeContainer.scss';

export default class Notice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const locationPath = location.pathname;
        const locationSearch = queryString.parse(location.search);
         return (
            <Router>
                <div className="noticeContainer">
                    <h1>공지사항</h1>
                    <Route path="/list" component={NoticeListContainer} />
                        {locationPath == '/list' && locationSearch.page == null && <Redirect from="/list" to="/list?page=1" />}
                    <Route path="/view" component={NoticeViewContainer} />
                    <Route path="/write" component={NoticeWriteContainer} />
                </div>
            </Router>
        );
    }
}

