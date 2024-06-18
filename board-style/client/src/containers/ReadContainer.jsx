import React, { useEffect, useState } from 'react'
import Read from '../components/board/Read'
import * as boards from '../apis/boards'

const ReadContainer = ({ no }) => {
  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🎁 이벤트 함수
  const getBoard = async () => {
    // ⏳ 로딩 시작
    setLoading(true)
    const response = await boards.select(no)
    const data = await response.data    // board 객체
    console.log(data)
    setBoard(data)
    // 로딩 끝 ⌛
    setLoading(false)
  }

  // ❓ hook 
  useEffect(() => {
    getBoard()
  }, [])
  return (
    <>
      {/* 게시글 조회 */}
      <Read no={no} board={board} isLoading={isLoading}></Read>
    </>
  )
}

export default ReadContainer