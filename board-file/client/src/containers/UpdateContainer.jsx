import React, { useEffect, useState } from 'react'
import UpdateForm from '../components/board/UpdateForm'
import * as boards from '../apis/boards'
import { useNavigate } from 'react-router-dom'
import * as files from '../apis/files'

const UpdateContainer = ({ no }) => {
  const navigate = useNavigate()
  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])

  // 🎁 이벤트 함수
  const getBoard = async () => {
    // ⏳ 로딩 시작
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data    // board 객체 + fileList 객체
    // console.log("확인용 " + data)

    const board = data.board
    const fileList = data.fileList

    setBoard(board)
    setFileList(fileList)
    // 로딩 끝 ⌛
    setLoading(false)
  }
  // 다운로드
  const onDownload = async (no, fileName) => {
    const response = await files.download(no)
    console.log(response);

    // 서버에서 반환된 파일 데이터를 Blob 형식으로 변환
    // 브라우저를 통해 데이터를 a태그로 등록하고 다운로드하도록 요청
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await boards.update(no, title, writer, content)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!")

      // -> rptlrmf ahrfhrdmfh dlehd
      navigate("/boards")

    } catch (error) {
      console.log(error);
    }
  }

  const onDelete = async (no) => {
    const response = await boards.remove(no)
    const status = await response.status
    console.log(`게시글 삭제 요청 결과 : ${status}`);
    alert("삭제 완료!")

    // -> 게시글 목록으로 이동
    navigate("/boards")
  }

  const onDeleteFile = async (fileNo) => {
    try {
      // 파일 삭제 요청
      const fileResponse = await files.remove(fileNo)
      console.log(fileResponse.data);

      // 파일 목록 갱신
      const boardResponse = await boards.select(no)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)

    } catch (error) {
      console.log(error);
    }
  }

  // 파일 선택 삭제
  const deleteCheckedFiles = async (fileNoList) => {
    const fileNos = fileNoList.join(",")
    console.log(fileNos);
    try {
      // 파일 선택 삭제 요청
      const response = await files.removeFiles(fileNos)
      console.log(response.status);

      // 파일 목록 갱신
      const boardResponse = await boards.select(no)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)


    } catch (error) {
      console.log(error);
    }
  }

  // ❓ hook 
  useEffect(() => {
    getBoard()
  }, [])
  return (
    <>
      {/* 게시글 수정 */}
      <UpdateForm no={no} board={board} onUpdate={onUpdate} onDelete={onDelete} onDeleteFile={onDeleteFile} fileList={fileList} isLoading={isLoading} onDownload={onDownload} deleteCheckedFiles={deleteCheckedFiles} />
    </>
  )
}

export default UpdateContainer