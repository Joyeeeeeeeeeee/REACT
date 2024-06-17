import React from 'react'

const TodoFooter = () => {
  const no = -1;
  return (
    <div className='footer'>
        <div className="item">
            <button className="btn" onClick={()=> onRemove(no)}>전체 삭제</button>
        </div>
        <div className="item">
            <button className="btn">전체 완료</button>
        </div>
    </div>
  )
}

export default TodoFooter