import React, { Component, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import $, { get } from "jquery";
import { } from "jquery.cookie";
import cogoToast from "cogo-toast";
import { } from '../../css/pagination.css';

import PostRow from "./PostRow";
import PaginationPostAndComment from "../Pagination/PaginationPostAndComment";

axios.defaults.withCredentials = true;

//post 하나당 출력

//////////////////////////////////////////////

///////////////////////////////////////////

const SearchPosts = () => {
    const location = useLocation();

    const [keyword, setKeyword] = useState(location.data.keyword);
    const [searchOption, setSearchOption] = useState(location.data.searchOption);
    const [boardName, setBoardName] = useState(location.data.boardName)
    const [postType, setPostType] = useState(location.data.postType);

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);



    useEffect(() => {
        console.log("searchPosts 시작!")
        console.log("keyword ",keyword)
        console.log("searchOption ", searchOption)
        console.log("boardName", boardName)
        console.log("postType ", postType)

        getPosts(currentPage);
        return () => {
            console.log("searchPosts 탈출.")
        }

    },[currentPage])



    const getPosts = (pageNumber) => {

        console.log("getPosts 몇번 페이지 시작? ", pageNumber)
        const url = `/boards/search`;
        const send_params = {
            page: pageNumber
        };
        console.log(send_params.page);
        const send_body = {
            option: searchOption,
            keyword: keyword,
            boardType: postType
        };
        console.log(send_body.option);
        console.log(send_body.keyword);
        console.log(send_body.boardType);
        



        /* 권한 체크ajax */
        
        axios // 실제 post List 가져오기
            .get(url
            ,{
                headers: {
                    'Authorization': 'Bearer ' + $.cookie('accessToken')
                },
                params: {
                    page: pageNumber,
                    option: searchOption,
                    keyword: keyword,
                    boardType: postType
                }
        })
            .then(returnData => {
                const totalPages = returnData.data.totalPages;

                setTotalPages(totalPages)
                if (returnData.data.numberOfElements > 0) {
                    const returnedPosts = returnData.data.content;
                    setPosts(returnedPosts);


                } else {
                    //게시글 못 찾은 경우
                    posts.push([
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>게시글이 존재하지 않습니다.</td>
                        </tr>
                    ])

                }
            })
            .catch(err => {
                console.log(err);
            })


    };
    ///////////////////////////////////////////////
    const paginate = (pageNumber) => {

        setCurrentPage(pageNumber.selected);


        getPosts(pageNumber.selected);
        // this.forceUpdate();


        // window.location.reload();
    }


    /////////////////검색
    const handleSearch = (e) => {
        
        setKeyword(e.target.value);

    }


    const onSubmit = () => {
    
        getPosts(0);
    }

    const handleSearchOption = (e) => {

        setSearchOption(e.target.value);
    }


        const divStyle = {
            marginTop: "3%",
            minWidth: "70%",
            minHeight: "700px",
        };


        return (
            <div className="container" style={divStyle}>
                <div style={{ marginBottom: "1%" }}>
                    <h2>{boardName} : {keyword}에 대한 검색결과 </h2>
                </div>

                <div>
                    <h5>{totalPages} 중 {currentPage + 1} 페이지</h5>
                </div>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th style={{ width: "10%" }}>#</th>
                                <th style={{ width: "40%" }}>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <PostRow PostRow={post} />
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <PaginationPostAndComment totalPage={totalPages} paginate={paginate} />
                </div>
                <div>
                        <select value={searchOption} onChange={handleSearchOption}>
                            <option value="title">
                                제목
                            </option>
                            <option value="titleAndContent">
                                제목 + 내용
                            </option>
                            <option value="author">
                                글쓴이
                            </option>
                        </select>

                        <input type="text" placeholder="" onChange={handleSearch} />
                        
                        <NavLink 
                        to={{
                            pathname:`/post/search`,
                            data: {
                                postType: postType,
                                searchOption: searchOption,
                                keyword: keyword,
                                boardName: boardName
                            }
                        }}
                        >
                        <Button type="submit" >검색</Button>
                        </NavLink>


                </div>

            </div>

        );
}

export default SearchPosts;
