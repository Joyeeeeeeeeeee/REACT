import React, { useContext } from 'react'
import Header from '../components/Header'
import { LoginContext } from '../contexts/LoginContextProvider'
import { Link } from 'react-router-dom'

const Login = () => {
    // 🍞 LoginContext 가져오기
    //   🧊 isLogin
    //   🎁 logout
    const { isLogin, logout } = useContext(LoginContext)
    return (
        <>
            <Header></Header>
            <div className='container'>
                <h1>Login</h1>
                <hr />
                <h2>로그인 페이지</h2><br />
                {
                    isLogin ?
                        <>
                            {/* 로그인이 되어 있을 때 : isLogin=true */}
                            <p>로그인 되어 있음</p>
                            <Link to="/user">마이페이지</Link>
                            <br />
                            <button className='link' onClick={() => logout()}>로그아웃</button>
                        </>
                        :
                        <>
                            {/* 로그인이 안 되어 있을 때 : isLogin=false */}
                            <p>로그인 안 되어 있음</p>
                            <p>3초 뒤 로그인 됩니다</p>
                        </>
                }

            </div>
        </>
    )
}

export default Login