import React, { useContext } from 'react'
import img1 from '../../imgs/2760246.jpg'
import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { DataContext } from '../../Context/userContext';
import 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
export default function Main() {
  let { auth, database, user } = useContext(DataContext)
  const nav = useNavigate()

// to sign in
  async function SignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider)
      const { uid, displayName, email, photoURL } = result.user;
      await setDoc(doc(database, "users", uid), {
        uid: uid,
        displayName,
        email,
        photoURL,
      })
    } catch (err) {
      console.log(err);
    }
  }


  return <>
    <div className=' h-100 pt-5 pb-3 containerd-flex align-items-center  main '>
      <div className="row ">

        <div className='col-xl-6 py-3'>
          <img src={img1} className='w-100' alt="main-img" />
        </div>
        <div className='col-xl-6  d-flex flex-column justify-content-center my-3'>
          <h1 >Chat easy, chat instantly
            whereveer you go
          </h1>
          <p style={{ color: '#5965a4', fontSize: '18px' }} className='my-3'>The easiest & faster way to live chat</p>
          <button className='btn btnNav mt-4' onClick={() => { SignIn() }} >Sign in With Google</button>
        </div>
      </div>

      {user ? <Navigate to='home' /> : ''}
    </div>
  </>

}

