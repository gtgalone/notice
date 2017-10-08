import React, { Component } from 'react';
import queryString from 'query-string';

import NoticeViewComponent from './NoticeViewComponent';
import data from '../data/notice.json';

import '../stylesheets/NoticeViewContainer.scss';

export default class NoticeViewContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        data.reverse();
    }

    render() {
        const nidQueryString = parseInt(queryString.parse(location.search).nid);
        return (
            <NoticeViewComponent data={data[nidQueryString-1]} />
        );
    }
}
