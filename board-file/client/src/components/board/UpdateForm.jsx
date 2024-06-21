import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/CSS/update.module.css'
import * as format from '../../apis/format'
import { useNavigate } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesAPI from '../../apis/files'

const UpdateForm = ({ no, board, fileList, onUpdate, onDelete, isLoading, onDownload, onDeleteFile, deleteCheckedFiles }) => {
  // 🧊 state
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null)
  const [fileNoList, setFileNoList] = useState([]) // ✅ 파일 선택 삭제
  const [checkAll, setCheckAll] = useState(false)

  // 🎁 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) => {
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }
  // 파일 업로드
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }

  const handleDownload = (no, fileName) => {
    // 중간 처리(confirm, 유효성검사 등)를 위해 바로 넘기지 않고 이와 같은 과정을 거침
    onDownload(no, fileName)
  }


  const onSubmit = () => {
    // 유효성 검사 ✅
    // ...일단 생략

    // 파일 업로드에서는 
    // Content-Type : application/json -> multipart/form-data
    const formData = new FormData()
    formData.append('no', no);
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)

    console.log(`fileNoList--------------------`);
    console.log(fileNoList);
    formData.append('deleteFileNoList', fileNoList);

    // 헤더
    const headers = {
      'Content-type': 'multipart/form-data'
    }

    // 파일 데이터 추가
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file)
      }
    }

    // onInsert(title, writer, content) // json
    onUpdate(formData, headers)         // formData
  }

  const handledelete = () => {
    const check = window.confirm("정말로 삭제하시겠습니까?");
    if (check) {
      onDelete(no)
    }
  }

  const handleDeleteFile = (no) => {
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if (check) {
      onDeleteFile(no)
    }
  }

  // ✅ 파일 번호 체크
  const checkFileNo = (no) => {
    let duplicated = false
    for (let i = 0; i < fileNoList.length; i++) {
      const fileNo = fileNoList[i];
      // 중복 : 체크박스 해제 🟩
      if (fileNo == no) {
        fileNoList.splice(i, 1)
        duplicated = true
      }
      // fileNoList.push(no)
    }
    // 중복X -> 체크박스 지정 ✅ -> 추가
    if (!duplicated) fileNoList.push(no)
    // const checkdFileNoList =  fileNoList
    console.log(`선택된 파일 번호 : ${fileNoList}`);

    setFileNoList(fileNoList)
  }

  const handleDeleteFiles = () => {
    const check = window.confirm("정말로 삭제하시겠습니까? \n" + fileNoList)
    if (check) {
      deleteCheckedFiles(fileNoList)
      setFileNoList([]) // 파일 번호 체크박스 초기화
    }
  }

  const fillCheckAll = () => {
    let checkList = document.getElementsByClassName('checkbox')
    if (!checkAll) {
      for (let i = 0; i < checkList.length; i++) {
        console.log("뭐야왜안돼");
        const check = checkList[i];
        // check.click()
        if (!check.checked)
          checkFileNo(check.value)
        check.checked = true
      }
      setCheckAll(true)
    }
    else {
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        if (check.checked)
          checkFileNo(check.value)
        check.checked = false
      }
      setCheckAll(false)
    }
    console.log(checkList);
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then(async (file) => {
            console.log(file);
            formData.append("parentTable", 'editor');
            formData.append("file", file);

            const headers = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };

            let response = await filesAPI.upload(formData, headers);
            let data = await response.data;
            console.log(`data : ${data}`);

            let newFileNo = data;
            // let newFileNo = newFile.no

            // 이미지 렌더링
            await resolve({
              default: `http://localhost:8080/files/img/${newFileNo}`
            })

          });
        });
      },
    };
  };
  useEffect(() => {
    if (board) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board, fileList])
  // [의존하는 객체]
  // : 지정한 객체가 변화했을 때 다시 useEffect를 실행한다.

  return (
    <div className='container'>
      <h1 className='title'>게시글 수정</h1>
      <h3>번호 : {no}</h3>
      <hr />
      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" />
        </div>
      }
      {
        !isLoading && board && (
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" className={styles.formInput} value={title} onChange={handleChangeTitle} />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" className={styles.formInput} value={writer} onChange={handleChangeWriter} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {/* <textarea cols="40" rows={10} className={styles.formInput} value={content} onChange={handleChangeContent}></textarea> */}
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      placeholder: "내용을 입력하세요.",
                      toolbar: {
                        items: [
                          'undo', 'redo',
                          '|', 'heading',
                          '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                          '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                          '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                          '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                          '|', 'mediaEmbed',
                        ],
                        shouldNotGroupWhenFull: false
                      },
                      editorConfig: {
                        height: 500, // Set the desired height in pixels
                      },
                      alignment: {
                        options: ['left', 'center', 'right', 'justify'],
                      },

                      extraPlugins: [uploadPlugin]            // 업로드 플러그인
                    }}
                    data={content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setContent(data);
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>파일</td>
              </tr>
              <tr>
                <td>파일</td>
                <td>
                  <input type="file" onChange={handleChangeFile} multiple />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="flex-box">
                    <div className="item">
                      <button className="btn" onClick={fillCheckAll}>전체선택</button>
                    </div>
                    <div className="item">
                      <button className="btn" onClick={handleDeleteFiles}>선택삭제</button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                {/* <td className='check'> */}
                {/* 파일 선택 체크 박스*/}
                {/* <input type="checkbox" /> */}
                {/* </td> */}
                <td colSpan={2}>
                  {
                    fileList.map((file) => (
                      <div className="flex-box" key={file.no}>
                        <div className="item">
                          <span>{file.checked}</span>
                          <input type="checkbox"
                            onChange={() => checkFileNo(file.no)}
                            value={file.no} className='checkbox' />
                          <img src={`/files/img/${file.no}`} alt="썸네일 이미지" />
                          <span>{file.originName} ({format.byteToUnit(file.fileSize)})</span>
                        </div>
                        <div className="item">
                          <button className="btn" onClick={() => handleDownload(file.no, file.originName)}>다운로드</button>
                          <button className="btn" onClick={() => handleDeleteFile(file.no)}>삭제</button>
                        </div>
                      </div>
                    ))
                  }
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
        <div className="item">
          <Link to="/boards" className="btn">목록</Link>
        </div>
        <div className="item">
          <button className='btn' onClick={onSubmit}>수정</button>
          <button className='btn' onClick={handledelete}>삭제</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateForm