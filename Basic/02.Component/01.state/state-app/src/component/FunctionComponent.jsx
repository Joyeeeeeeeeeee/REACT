import React, { useState } from 'react'
// 👩‍💻 함수형 컴포넌트 자동완성
// rafce : React Arrow Function Component Export

const FunctionComponent = () => {

    // 함수형 컴포넌트에서 state 정의하기
    // const[상태, 상태설정함수] = useState('초기값')
    const[name, setName] = useState('홍준범')
    const[msg, setMsg] = useState('')

    // 입사지원 클릭
    const handleApply = () => {
        console.log('입사지원 클릭!');
        // 상태 업데이트
        setMsg('입사지원을 하였습니다.')
    }
    // 중도포기 클릭
    const handleStop = () => {
        console.log('중도포기 클릭!');
        setMsg('중도포기 하였습니다.')
    }
    return (
        <div>
            <h1>함수형 컴포넌트</h1>
            <h2>Hello I'm {name}</h2>
            <p>{msg}</p>
            <button onClick={handleApply}>입사지원</button>
            <button onClick={handleStop}>중도포기</button>
        </div>
    )
}

export default FunctionComponent