import React from 'react'

const Todo = ({todo}) => {
  return (
    <div className="todo">
        <ul>
            <li>
                <input type="radio"/>
                <span>{todo.name}</span>
                <button className='btn delete-btn'>삭제</button>
            </li>
        </ul>
    </div>
  )
}

export default Todo

//    // state : list
//    const [list, setList] = useState([])

//    // hook
//    useEffect(() => {
//        async function fetchData(){
//            try {
//                const response = await fetch('http://localhost:8080/todos')
//                const data = await response.json();
//                setList(data); 
//                console.log(data);
//            } catch (error) {
//                console.log(error);
//            }
//        }
//        fetchData();
//    }, [])
//    return (
//        <>
//            <div className="container">
               
//                <div className="todo-list">
//                    {list.map((todo, index) => (
//                        <Todo todo = {todo} key={todo.no}/>
//                    ))}
//                    {/* {list.map((todo, index)=> (
//                        <h1>{todo.name}</h1>
//                    ))} */}
//                </div>
//                <button className='btn allUpdate-btn'>전체 수정</button>
//                <button className='btn allDelete-btn'>전체 삭제</button>
//            </div>
//        </>
//  )