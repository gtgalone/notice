import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPagination: 1,
            endPagination: 5
        }
        this.moveToFirstPage = this.moveToFirstPage.bind(this);
        this.moveToLastPage = this.moveToLastPage.bind(this);
        this.moveToPrevPage = this.moveToPrevPage.bind(this);
        this.moveToNextPage = this.moveToNextPage.bind(this);
    }

    moveToFirstPage() {
        const { currentParams, currentPage } = this.props;
        delete currentParams.page;
        if(currentPage != 1) {
            currentParams.page = 1;
            location.search = queryString.stringify(currentParams);
        }
    }

    moveToLastPage() {
        const { currentParams, currentPage, lastPage } = this.props;
        delete currentParams.page;
        if(currentPage != lastPage) {
            currentParams.page = lastPage;
            location.search = queryString.stringify(currentParams);
        }
    }

    moveToPrevPage() {
        const { currentParams, currentPage } = this.props;
        delete currentParams.page;
        if(currentPage > 1) {
            currentParams.page = currentPage - 1;
            location.search = queryString.stringify(currentParams);
        }
        
    }

    moveToNextPage() {
        const { currentParams, currentPage, lastPage } = this.props;
        delete currentParams.page;
        if(currentPage < lastPage) {
            currentParams.page = currentPage + 1;
            location.search = queryString.stringify(currentParams);
        }
    }

    moveToSpecificPage(i) {
        const { currentParams, currentPage } = this.props;
        delete currentParams.page;
        if(currentPage != i + 1) {
            currentParams.page = i + 1;
            location.search = queryString.stringify(currentParams);
        }
    }

    render() {
        const { searchResults, currentParams, currentPage, lastPage } = this.props;
        return (
            <ul className="pagination">
                <li onClick={this.moveToFirstPage}>
                    {/*<Link to={ searchQueryString ? "/list?page=" + 1 + "&search=" + searchQueryString : "/list?page=" + 1 } aria-label="Previous">*/}
                        <span aria-hidden="true">First Page</span>
                    {/*</Link>*/}
                </li>
                <li onClick={this.moveToPrevPage}>
                    {/*<Link 
                        to={ searchQueryString 
                            ? "/list?page=" + (currentPage > 1 ? currentPage - 1 : currentPage) + "&search=" + searchQueryString 
                            : "/list?page=" + (currentPage > 1 ? currentPage - 1 : currentPage) }
                        aria-label="Previous">*/}
                        <span aria-hidden="true">&laquo;</span>
                    {/*</Link>*/}
                </li>
                {searchResults.slice(0, Math.ceil(searchResults.length/5)).map((data, i) => {
                    {/*if( currentPage == lastPage - 1 ? currentPage <= i + 4 : false 
                        || currentPage == lastPage ? currentPage <= i + 5 : false 
                        || currentPage == 1 ? i < 5 : false || currentPage == 2 ? i < 5 : false 
                        || ( i + 1 <= currentPage + 2 && i + 1 >= currentPage - 2 ) ) {*/}
                    if( currentPage == lastPage - 1 && currentPage <= i + 4
                        || currentPage == lastPage && currentPage <= i + 5
                        || currentPage == 1 && i < 5 
                        || currentPage == 2 && i < 5
                        || ( i + 1 <= currentPage + 2 && i + 1 >= currentPage - 2 ) ) {
                        return (
                            <li 
                                key={i}
                                className={i == currentPage-1 && "active"} 
                                onClick={this.moveToSpecificPage.bind(this, i)}>
                                {/*<Link to={ searchQueryString ? "/list?page=" + (i + 1) + "&search=" + searchQueryString : "/list?page=" + (i + 1) }>*/}
                                    <span aria-hidden="true">{i + 1}</span>
                                {/*</Link>*/}
                            </li>)
                    }
                })}
                <li onClick={this.moveToNextPage}>
                    {/*<Link 
                        to={ searchQueryString 
                            ? "/list?page=" + (currentPage < lastPage ? currentPage + 1 : currentPage) + "&search=" + searchQueryString 
                            : "/list?page=" + (currentPage < lastPage ? currentPage + 1 : currentPage) } 
                        aria-label="Next">*/}
                        <span aria-hidden="true">&raquo;</span>
                    {/*</Link>*/}
                </li>
                <li onClick={this.moveToLastPage}>
                    {/*<Link to={ searchQueryString ? "/list?page=" + lastPage + "&search=" + searchQueryString : "/list?page=" + lastPage } aria-label="Previous">*/}
                        <span aria-hidden="true">Last Page</span>
                    {/*</Link>*/}
                </li>
            </ul>        
        );
    }
}

PaginationComponent.propTypes = {
    searchResults: PropTypes.array,
    currentParams: PropTypes.object,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number
}