import React, {Component, useEffect, useState} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import cogoToast from 'cogo-toast';
import {Prompt} from 'react-router-dom'

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';     // <--- ADDED
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Table from '@ckeditor/ckeditor5-table/src/table';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';


import MyuploadAdapter from './MyuploadAdapter'

import './MWEditor.css'

function MWEditor({mode, content, SetCotent}){

    const _onChange = (event, editor)=>{
        const data = editor.getData();
        console.log(data);
        SetCotent(data)
        console.log(editor.getData());
    }
    const _onBlur = (event, editor) => {
        console.log('Blur.', );
    }

    const _onFocus = (event, editor) => {
        console.log('_onFocus.', );
    }

    const _init = (editor) => {
        console.log('Editor is ready to use!');
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyuploadAdapter(loader);
        }
    }
    // const MyCustomUploadAdapterPlugin = (editor) => {
    //     editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
    //         return new MyuploadAdapter(loader)
    //     }
    // }

    const defaultToolbar = mode === "edit" ? ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'imageUpload', 'insertTable','|','alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'link', 'blockQuote', '|', 'undo', 'redo','highlight'] : [];

    const custom_config ={
        // extraPlugins: [ MyCustomUploadAdapterPlugin ],
        plugins: [
            Essentials,Highlight,Table,Link,Paragraph,Alignment,Heading,Image,Bold,ImageResize,Italic,ImageUpload,ImageToolbar,ImageStyle,ImageCaption,BlockQuote,List
        ],

        // plugins: [Image],
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'imageUpload',
                'undo',
                'redo'
            ]
        },
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        }
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
        <CKEditor
            editor={ClassicEditor}
            config={custom_config}
            data={content}
            onInit={_init}
            // onInit={editor =>{
            //     MyCustomUploadAdapterPlugin(editor)
            // }}
            // onInit={editor=>{

            // }}
            onBlur={_onBlur}
            onFoucs={_onFocus}
            onChange={_onChange}
            disable={mode !== "edit"}
        />
    )


}

// function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
//         return new MyuploadAdapter(loader)
//     }
// }
export default MWEditor