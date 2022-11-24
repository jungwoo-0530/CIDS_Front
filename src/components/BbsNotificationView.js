import React, { useEffect, useState } from 'react'
import MWEditor from './editor/MWEditor'
import MWFileReader from './filereader/MWFileReader'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import $ from 'jquery';


function BbsNotificationView() {

  const [content, setContent] = useState('');
  const [fileQueue, setFileQueue] = useState([]);

 

  useEffect(() => {
    return ()=>{
      console.log("탈출!!!!!!!!!!!!!!!!!!!!!1");
    }
  })



  const mode = 'edit';// 'edit'!=='edit';
  const styles = {
    root: {
      width: '700px'
    },
    editor: {
      width: '100%',
    },
    fileattach: {
      width: '100%',
      height: '100px',
    },

  }
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
    },
    textFieldInput: {
      width: '150px',
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonInc: {
      display: 'flex',
      justifyContent: 'flex-end'
    }

  }));
  const classes = useStyles();

  //1. 본문내용 전송(기본항목, 에디터 본문)
  //2. file있다면, return 받은 articleid로 fileUpload
  const handlePreview = (e) => {
    e.preventDefault();
    console.log('handlePreview');
  }
  const handleTempSave = (e) => {
    e.preventDefault();
    console.log('handleTempSave');
  }
  const handleSubmit = (e) => {
    
    e.preventDefault();
    // console.log('handleSubmit',e.target);
    // console.log(data,e.target.writer,e.target.title.value);
    console.log(e.target.title.value);
    console.log(content);

    const data = new FormData(e.target);
    //파일추가만포함
    //더 추가되야하는것 : 수정로직에서 기존 파일,신규파일,삭제파일 구분처리 필요,
    fileQueue.forEach((value,idx,arr)=>{
      data.append('upload',value);
    })
    console.log(data.entries());
    for (var pair of data.entries()) {
      console.log(pair[0] + ',, ' + pair[1]);
    }

    ///////////////////////////////////////////
    const send_param = {
      title: e.target.title.value,
      type: "notification",
      content: content
    }

    axios.post('/boards',send_param,
    {
      headers: {
        'Authorization': 'Bearer ' + $.cookie('accessToken')
    }
    })
    .then(res=>{
      if(res.status === 201){
        cogoToast.success(res.data.message)
        console.log("글쓰기 완료.");
        window.location.href="/notice";

      }else{
        cogoToast.error(res.data.message)
      }
    })
    .catch((err) =>{
      console.log(err);

    })
  }





  return (
    <div>
      
      <form id="bbsForm" name="bbsForm" onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            name="title"
            label="문서제목"
            className={classes.textField}
            margin="normal"
            variant="outlined" />
        </div>
        <div id="_editor" style={styles.editor}>
          <input type="hidden" id="content" name="content" value={content} />
          <MWEditor mode={mode} content={content} setContent={setContent} />
        </div>
        <div id="fileAttach" style={styles.fileattach}>
          <MWFileReader fileQueue={fileQueue} setFileQueue={setFileQueue} />
        </div>
        <div className={classes.buttonInc}>
          <Button variant="contained" color="default" className={classes.button} onClick={handlePreview}>미리보기</Button>
          <Button variant="contained" color="default" className={classes.button} onClick={handleTempSave}>임시저장</Button>
          <Button variant="contained" type="submit" color="secondary" className={classes.button} >글쓰기</Button>
        </div>
      </form>
    </div>
  )
}

export default BbsNotificationView;
