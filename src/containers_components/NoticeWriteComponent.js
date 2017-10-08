import React, { Component } from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { renderSelect, renderField, renderSummernote } from './NoticeWriteContainer';

import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';

import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

class NoticeWriteComponent extends Component {
    constructor(props) {
        super(props);
        props.initReduxForm();
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div className="noticeWriteWrap">
                <form onSubmit={handleSubmit}>
                    <Field name="site" type="text" component={renderSelect} />
                    <Field name="title" type="text" component={renderField} className="noticeTitle" />
                    <Field name="contents" component={renderSummernote} />
                    <button className="submit btn btn-warning" type="submit">완료</button>
                    <button className="gobackButton btn btn-info" onClick={()=>{window.history.back()}}>뒤로</button>
                </form>
            </div>
        );
    }
}

NoticeWriteComponent.propTypes = {
    initReduxForm: PropTypes.func.isRequired
}

export default NoticeWriteComponent;
