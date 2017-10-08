import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NoticeViewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="noticeViewWrap">
                <li className="noticeView row">
                    <span className="col-md-2">{this.props.data.site.name}</span>
                    <span className="col-md-8">{this.props.data.title}</span>
                    <span className="col-md-2">{this.props.data.createdDate}</span>
                    <span className="col-md-12">{this.props.data.contents}</span>            
                </li>
                <span className="gobackButton btn btn-info" onClick={()=>{window.history.back()}}>뒤로</span>
            </ul>
        );
    }
}

NoticeViewComponent.propTypes = {
    data: PropTypes.object
}