import React, { useContext, useEffect, useState } from 'react';
import _ from 'underscore';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import date from 'date-and-time';
import { BsFillBackspaceFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context/userContext';

export default function Chat() {
    let { auth, database, getCollectionName, selectedUser } = useContext(DataContext)
    const [currentUser] = useAuthState(auth);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if ((message.trim()) === "")
            setAllow(false)
        else
            setAllow(true);
    }, [message]);

    useEffect(() => {
        onSnapshot(collection(database, getCollectionName(currentUser?.uid, selectedUser?.uid)), (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setChatMessages(_.sortBy(messages, 'timeStamp'));
        })
    }, [currentUser?.uid, selectedUser?.uid])

    useEffect(() => {
        document.getElementById('chats').scrollTop = document.getElementById('chats').scrollHeight;
    }, [chatMessages])

    //Store message function for add new message
    const storeMessage = async () => {
        try {
            const date = serverTimestamp();
            await addDoc(collection(database, getCollectionName(currentUser?.uid, selectedUser?.uid)), {
                messageBy: currentUser.uid,
                message,
                timeStamp: date
            })
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    const applyStyle = (value) => {
        return (
            value?.messageBy === currentUser.uid ?
                {
                    backgroundColor: "#ff5a8a", alignSelf: "end", borderBottomRightRadius: "0"
                }
                :
                {
                    backgroundColor: "#748cf8", alignSelf: "start", borderBottomLeftRadius: "0"
                }
        );

    }



    return (
        <div className='container my-5 '>
            <div className='w-100 m-auto border border-1 rounded'>
                <div className='d-flex align-items-center justify-content-between border-bottom border-1  p-3'>
                    <div>
                        <h4 className='mx-3'>{selectedUser?.displayName}</h4>
                    </div>
                    <div>
                        <Link to={'../home'}>
                            <button className='btn btnNav' >
                                <i className="fa-solid fa-share fa-lg me-2"></i>
                                Back
                            </button>
                        </Link>
                    </div>
                </div>


                <div className='chats main-bg d-flex flex-column' id="chats">
                    {
                        chatMessages && chatMessages?.length > 0 && chatMessages?.map((value, index) => {
                            return (
                                <div className='chat text-white ' key={index} style={applyStyle(value)}>
                                    <p>{value.message}</p>
                                    <p>{date.format(new Date(value.timeStamp?.seconds * 1000), 'YYYY MMM DD hh:mm:ss A')}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='position-relative'>
                    <input type={'text'} className='form-control py-3' placeholder='enter your message here....' value={message} onChange={(e) => {
                        setMessage(e.target.value);
                    }} />
                    <button className='btn btnNav send px-4' disabled={!allow} onClick={storeMessage}>
                        Send
                    </button>
                </div>
            </div >
        </div >
    )
}
