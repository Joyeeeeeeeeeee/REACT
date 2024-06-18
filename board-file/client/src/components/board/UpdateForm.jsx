import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../board/CSS/update.module.css'

const UpdateForm = ({ no, board, onUpdate, onDelete, isLoading }) => {
  // 🧊 state
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null)

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
  const onSubmit = () => {
    // 유효성 검사 ✅
    // ...일단 생략
    onUpdate(no, title, writer, content)
  }

  const handledelete = () => {
    const check = window.confirm("정말로 삭제하시겠습니까?");
    if (check) {
      onDelete(no)
    }
  }

  useEffect(() => {
    if (board) {
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board])
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
                  <textarea cols="40" rows={10} className={styles.formInput} value={content} onChange={handleChangeContent}></textarea>
                </td>
              </tr>
              {/* <tr>
                <td>파일</td>
                <td>
                  <input type="file" onChange={handleChangeFile} multiple />
                </td>
              </tr> */}
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