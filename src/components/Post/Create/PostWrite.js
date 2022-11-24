import React, {Component, useEffect, useState} from "react";
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import cogoToast from 'cogo-toast';
import {Prompt} from 'react-router-dom'

import MWEditor from './MWEditor'

axios.defaults.withCredentials = true;


function PostWrite(){
    const [content, setContent] = useState('');
    const [fileQueue, setFileQueue] = useState([]);
    const [title, setTitle] = useState("");

    const mode = 'edit';


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        fileQueue.forEach((value, idx, arr) => {
            data.append('upload', value);
        })
        console.log(data.entries);
        for(var pair of data.entries()){
            console.log(pair[0] + ',, ' + pair[1]);
        }

        axios.post('/boards', data)
        .then(res=>{
            console.log(res)
        });
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }


    const divStyle = {
        marginTop: "3%",
        minWidth: "70%",
        minHeight: "700px"
    };
    const titleStyle = {
        marginBottom: 5
    };
    const buttonStyle = {
        marginTop: 5
    };
    return (
        <div className="container" style={divStyle}>
          <form id="bbsForm" name="bbsForm" onSubmit={handleSubmit}>
            <div>
              <Form.Control
              type="text"
              style={titleStyle}
              placeholder="글 제목"
              value={title}
              onChange={onChangeTitle} 
              />
            </div>
            <div id="_editor" style={divStyle}>
              <input type="hidden" id="content" name="content" value={content} />
              <MWEditor mode={mode} content={content} SetContent={setContent} />
            </div>
            {/* <div id="fileAttach" style={styles.fileattach}>
              <MWFileReader fileQueue={fileQueue} setFileQueue={setFileQueue} />
            </div> */}
            <div>
              <Button variant="contained" type="submit" color="secondary" >글쓰기</Button>
            </div>
          </form>
        </div>
      )
}

export default PostWrite;

