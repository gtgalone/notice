import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, initialize } from 'redux-form';
import ReactSelect from 'react-select2-wrapper';
import ReactSummernote from 'react-summernote';

import NoticeWriteComponent from './NoticeWriteComponent';
import { writeSubmit } from '../redux/action';

import '../stylesheets/NoticeWriteContainer.scss';

const validate = values => {
    const errors = {};
    if(!values.site) {
        errors.site = '사이트를 선택해주세요'
    }
    if(!values.title) {
        errors.title = '제목을 입력해주세요'
    }
    if(!values.contents) {
        errors.contents = '내용을 입력해주세요'
    }
    return errors
}

export class renderSelect extends Component {
    constructor(props) {
        super(props);
    }

    reactSelect(e) {
        const { input } = this.props;
        input.onChange(e.target.value);
    }

    render() {
        const { input, name, value, meta: {touched, error} } = this.props;
        return (
            <ReactSelect
                name={name}
                defaultValue={'kolon'}
                value={input.value}
                data={[
                    { id: 'kolon', text: '코오롱몰'},
                    { id: 'luckychouette', text: '럭키슈에뜨'},
                    { id: 'byseries', text: '바이시리즈'}
                ]}
                onChange={this.reactSelect.bind(this)}
            />
        )
    }
}

export const renderField = ({input, type, className, meta: {error, touched}}) => {
    return (
        <div className={className}>
            <input {...input} type={type} />
            {touched && (error && <span className="validation">{error}</span>)}
        </div>
    )
}

export class renderSummernote extends Component {
    constructor(props) {
        super(props);
    }

    reactSummernote(e) {
        const { input } = this.props;
        input.onChange(e);
    }

    render() {
        const { input, name, meta: {touched, error} } = this.props;
        return (
            <div>
                <ReactSummernote
                    {...input}
                    options={{
                        lang: 'ko-KR',
                        height: 300,
                        dialogsInBody: true,
                        toolbar: [
                            ['style', ['style']],
                            ['font', ['bold', 'underline', 'clear']],
                            ['fontname', ['fontname']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['table', ['table']],
                            ['insert', ['link', 'picture', 'video']],
                            ['view', ['fullscreen', 'codeview']]
                        ]
                    }}
                    onChange={this.reactSummernote.bind(this)}
                />
                {touched && (error && <span className="validation">{error}</span>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        submitResponse: state.noticeWrite
});

const mapDispatchToProps = (dispatch) => ({
    initReduxForm: () => dispatch(initialize('noticeWriteForm', {site: 'kolon'}))
});

const onSubmit = (values, dispatch, props) => {
    dispatch(writeSubmit(values)).then(
        () => {
            if(props.submitResponse == 'SUCCESS') {
                console.log('성공');
            } else {
                console.log('실패', props.submitResponse.error);
                console.log(values);
            }
        }
    );
}

const NoticeWriteReduxForm = reduxForm({
    form: 'noticeWriteForm',
    validate,
    onSubmit
})(NoticeWriteComponent);

const NoticeWriteContainer = connect(mapStateToProps, mapDispatchToProps)(NoticeWriteReduxForm);

export default NoticeWriteContainer;