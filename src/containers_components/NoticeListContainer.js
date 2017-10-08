import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import queryString from 'query-string';

import NoticeListItemComponent from './NoticeListItemComponent';
import PaginationComponent from './PaginationComponent';
import { deleteSubmit } from '../redux/action';
import data from '../data/notice.json';

import '../stylesheets/NoticeListContainer.scss';


const ifNoSearchResult = (
    <div>
        <h1>검색결과가 없습니다.</h1>
    </div>
);

class NoticeListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noticeSearchKeyword: queryString.parse(location.search).search || '',
            noticeSelectAllList: [],
            deleteList: []
        }

        this.noticeSelect = this.noticeSelect.bind(this);
    }

    noticeDelete() {
        this.props.deleteSubmit(this.state.deleteList).then(
            () => {
                if(this.props.deleteResponse.status == 'SUCCESS') {
                    console.log('Success');
                } else {
                    console.log('Failure', this.props.deleteResponse.error);
                    console.log(this.state.deleteList);
                }
            }
        );
    }

    onSearchChange(e) {
        this.setState({
            noticeSearchKeyword: e.target.value
        })
    }

    noticeSearch(e, val) {
        e.preventDefault();
        location.reload();
        e.target.firstChild.firstChild.blur();
        this.props.history.push('?search=' + encodeURIComponent(val) + '&page=1');
        this.setState({
            pagination: parseInt(queryString.parse(location.search).page) - 1
        })
    }

    noticeSelectAll(searchResults, fiveEachPageFirst, fiveEachPageSecond) {
        if(this.state.noticeSelectAllList.indexOf(this.state.currentPage) == -1) {
            this.state.noticeSelectAllList.push(this.state.currentPage);
            searchResults.slice(fiveEachPageFirst, fiveEachPageSecond).map((searchResults) => {
                if(this.state.deleteList.indexOf(searchResults.nid) == -1) {
                    this.setState({
                        // deleteList: update(
                        //     this.state.deleteList,
                        //     {
                        //         $push: [searchResults.nid]
                        //     }
                        // )
                    });
                    this.state.deleteList.push(searchResults.nid);
                }
            });
            // console.log('list',this.state.noticeSelectAllList);
        } else if(this.state.noticeSelectAllList.indexOf(this.state.currentPage) != -1) {
            let selectAllIndex = this.state.noticeSelectAllList.indexOf(this.state.currentPage);
            this.state.noticeSelectAllList.splice(selectAllIndex, 1);
            searchResults.slice(fiveEachPageFirst, fiveEachPageSecond).map((searchResults) => {
                if(this.state.deleteList.indexOf(searchResults.nid) != -1) {
                    let itemIndex = this.state.deleteList.indexOf(searchResults.nid);
                    this.setState({
                        // deleteList: update(
                        //     this.state.deleteList,
                        //     {
                        //         $splice: [[itemIndex, 1]]
                        //     }
                        // )
                    });
                    this.state.deleteList.splice(itemIndex, 1);
                }
            });
            // console.log('list',this.state.noticeSelectAllList);
        }
    }

    noticeSelect(nid) {
        if(this.state.deleteList.indexOf(nid) == -1)  {
            this.setState({});
            this.state.deleteList.push(nid)
            // console.log(this.state.deleteList);
        } else if(this.state.deleteList.indexOf(nid) != -1) {
            let itemIndex = this.state.deleteList.indexOf(nid);
            this.setState({});
            this.state.deleteList.splice(itemIndex, 1);
            // console.log(this.state.deleteList);
        }
    }

    componentWillMount() {
        if(data[0].nid < data[1].nid) {
            data.reverse();
        };
    }

    render() {
        const searchFilter = (obj) => {
            const searchQueryStringRegExp = new RegExp(queryString.parse(location.search).search, "g");
            if(searchQueryStringRegExp.test(obj.title)) {
                return true
            }
        }
        const searchResults = data.filter(searchFilter);
        const fiveEachPageFirst = (parseInt(queryString.parse(location.search).page) - 1) * 5;
        const fiveEachPageSecond = parseInt(queryString.parse(location.search).page) * 5;
        return (
            <div className="noticeListWrap">
                <span className="noticeDelete btn btn-danger" onClick={this.noticeDelete.bind(this)}>선택삭제</span>
                <Link to="/list?page=1"><span className="noticeList btn btn-info" onClick={(e)=>this.setState({noticeSearchKeyword: ''})}>목록보기</span></Link>
                <Link to="/write"><span className="noticeWrite btn btn-warning">글쓰기</span></Link>
                <form onSubmit={(e) => this.noticeSearch(e, this.state.noticeSearchKeyword)}>
                    <span className="noticeSearch">
                        <input
                            id="noticeSearch"
                            type="text"
                            onChange={e => this.setState({noticeSearchKeyword: e.target.value}) }
                            value={this.state.noticeSearchKeyword} 
                        />
                        <button type="submit" className="btn btn-success">검색</button>
                    </span>
                </form>
                <ul className="noticeHeaderWrap">
                    <li className="noticeHeader">
                        <span className="bg-primary col-md-1">
                            <input 
                                id={"noticeSelectAll-" + this.state.currentPage}
                                name={"noticeSelectAll-" + this.state.currentPage}
                                type="checkbox"
                                checked={ this.state.noticeSelectAllList.indexOf(this.state.currentPage) != -1 ? true : false }
                                onChange={this.noticeSelectAll.bind(this, searchResults, fiveEachPageFirst, fiveEachPageSecond)} />
                        </span>
                        <span className="bg-primary col-md-2">사이트</span>
                        <span className="bg-primary col-md-5">제목</span>
                        <span className="bg-primary col-md-2">날짜</span>
                        <span className="bg-primary col-md-2">'</span>
                    </li>
                </ul>
                { searchResults.length == 0 
                    ? ifNoSearchResult 
                    : <NoticeListItemComponent
                            searchResults={searchResults}
                            fiveEachPageFirst={fiveEachPageFirst}
                            fiveEachPageSecond={fiveEachPageSecond}
                            deleteList={this.state.deleteList}
                            noticeDelete={this.noticeSelect}
                     /> }
                <PaginationComponent
                    searchResults={searchResults}
                    currentParams={queryString.parse(location.search)}
                    currentPage={parseInt(queryString.parse(location.search).page)}
                    lastPage={searchResults.slice(0, Math.ceil(searchResults.length/5)).length}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    deleteResponse: state.noticeDelete
});

const mapDispatchToProps = (dispatch) => ({
    deleteSubmit: (values) => dispatch(deleteSubmit(values))
});

NoticeListContainer = connect(mapStateToProps, mapDispatchToProps)(NoticeListContainer);

export default NoticeListContainer;