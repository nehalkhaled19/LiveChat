import React, { useContext } from 'react'
import Style from './Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../imgs/Circle-icons-chat.svg-fotor-2023112321401.png'
import { signOut } from "firebase/auth";
import { DataContext } from '../../Context/userContext';


export default function Nav() {
    let { auth, user } = useContext(DataContext)
    const nav = useNavigate()
    function toSignOut(user) {
        signOut(user).then((data) => {
            // Sign-out successful.
            nav('../')
        }).catch((error) => {
           console.log(error);
        });
    }

    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center w-50" >
                    <img className={Style.imgLogo} src={logo} alt="logo" />
                    <h3 className='d-inline'>Live<span style={{ color: '#ff5a8a' }}>Chat</span></h3>
                </a>
                {user ? <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> : ''}
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto my-3 mb-lg-0">

                        <li className="nav-item "  onClick={() => { toSignOut(auth) }}>
                            {user ? <Link className='btnNav btn' onClick={() => { toSignOut(auth) }}>Sign Out</Link>
                                : ''}
                        </li>
                

                    </ul>
                </div>
            </div>
        </nav>




    </>

}

