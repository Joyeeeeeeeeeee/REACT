import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

// ★
// <BrowserRouter> : 라우팅 활성화
// <Routes></Routes> : <Route> 컴포넌트 정의하는 영역
// 🔗 경로 설정(라우팅)
// <Route path='/경로' element={<컴포넌트/>}></Route>

// 🔗->💻 라우터로 이동하는 방법
// <Link to='/경로'>경로 이름</Link>
// : 실제로는 a태그처럼 랜더링 된다.

export default App;

