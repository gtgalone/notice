import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class NoticeListItemComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { searchResults, fiveEachPageFirst, fiveEachPageSecond, deleteList, noticeDelete } = this.props;
        return (
            <ul className="noticeBodyWrap">
                {searchResults.slice(fiveEachPageFirst, fiveEachPageSecond).map((data, i) => (
                    <li className="noticeBody" key={i}>
                        <span className="col-md-1">
                            <input 
                                id={"noticeSelect-"+data.nid} 
                                name={"noticeSelect-"+data.nid}
                                checked={deleteList.indexOf(data.nid) == -1 ? false : true } 
                                type="checkbox" 
                                onChange={(e)=>noticeDelete(data.nid)}/>
                        </span>
                        <Link to={"/view?nid="+data.nid}>
                        <span className="siteName col-md-2">[{data.site.name}]</span>
                        <span className="title col-md-5">{data.title}</span>
                        <span className="createdDate col-md-2">{data.createdDate}</span>
                        </Link>
                        <Link to={"/view?nid="+data.nid}><span className="btn btn-default col-md-2">상세보기</span></Link>
                    </li>
                ))}
            </ul>
        );
    }
}

NoticeListItemComponent.propTypes = {
    searchResults: PropTypes.array,
    fiveEachPageFirst: PropTypes.number,
    fiveEachPageSecond: PropTypes.number,
    deleteList: PropTypes.array,
    noticeDelete: PropTypes.func
}