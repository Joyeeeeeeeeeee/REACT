import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContextProvider'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    // 🍞 LoginContext 가져오기
    //   🧊 isLogin
    //   🎁 logout
    const {isLogin, logout} = useContext(LoginContext)
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="https://i.imgur.com/fzADqJo.png" alt="logo" className='logo' />
                </Link>
            </div>
            <div className='util'>
                <ul>
                    {/* 로그인 여부(isLogin)에 따라서 조건부 렌더링 */}
                    {
                        isLogin ?
                        <>
                            {/* 로그인이 되어 있을 때 : isLogin=true */}
                            <li><Link to="/user">마이페이지</Link></li>
                            <li><button className='link' onClick={() => logout()}>로그아웃</button></li>
                        </>
                        :
                        <>
                            {/* 로그인이 안 되어 있을 때 : isLogin=false */}
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/join">회원가입</Link></li>
                            <li><Link to="/about">소개</Link></li>
                        </>
                    }
                </ul>
            </div>
        </header>
    )
}

export default Header