
import React, { useContext, useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { DataContext } from '../../Context/userContext';
import { Link } from 'react-router-dom';

export default function Home() {

    let { database, setSelectedUser, user, selectedUser } = useContext(DataContext)
    const [otherUsers, setOtherUsers] = useState(null);
  

    async function fetchData() {
        try {
            // Reference to a collection
            const myCollection = collection(database, 'users');

            // Asynchronously retrieve documents in the collection
            const querySnapshot = await getDocs(myCollection);

            // Iterate through the documents in the querySnapshot
            querySnapshot.forEach((doc) => {
                // Access the data of each document using .data()
                const data = doc.data();  
            });
            if (querySnapshot.docs.length > 0) {
                setOtherUsers(querySnapshot.docs.map((item) => {
                    return item.data();
                }))
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (user?.uid != undefined) {
        fetchData();
    }

    return <>
        <div className='p-2 w-100 ' style={{ backgroundColor: '#ff5a8a' }}>
            <img src={`${user?.photoURL}`} className='rounded-circle user-img' style={{ width: '30px' }} alt="avatar" />
            <p className='d-inline text-white mx-2'>Welcome, <span className='bolder'>{user?.displayName}</span></p>
        </div>
        <section className=' mt-5 '>
            <div className=' w-75 m-auto home '>
                {
                    otherUsers?.map((otherUser, index) => {
                        return (
                            <div key={index} className='border rounded-3 d-flex mb-3  align-items-center justify-content-between p-3'>
                                <div>
                                    <img src={otherUser.photoURL} className='rounded-circle' style={{ width: '50px' }} alt="profile-pic" />
                                    <h4 className='mx-3 d-inline'>{otherUser.displayName}</h4>
                                </div>
                                <Link to={'../chat'} > <i className="fa-solid fa-comment-dots fa-2xl" style={{ color: '#ff5a8a' }} title={`Start chatting with ${otherUser.displayName}`} onClick={() => {
                                        setSelectedUser(otherUsers[index]);}}>
                                 
                                </i>
                                </Link>
                            </div>

                        )

                    })
                }

            </div>
        </section>
    </>
}

