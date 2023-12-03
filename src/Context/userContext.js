import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export let DataContext = createContext()
export default function UserContextProvider(props) {

  
    const firebaseConfig = {
      apiKey: "AIzaSyDbuM_SoJAvfpoid4RCiO0D_NPxcmRb6_A",
      authDomain: "test-77836.firebaseapp.com",
      databaseURL: "https://test-77836-default-rtdb.firebaseio.com",    
      projectId: "test-77836",
      storageBucket: "test-77836.appspot.com",
      messagingSenderId: "574472088982",
      appId: "1:574472088982:web:ceb4e7eb40e21c528fc1b7",
      measurementId: "G-CNZNF89FGL"
    
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getFirestore(app);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user] = useAuthState(auth);

  const getCollectionName = (uid1, uid2) => {
    const names = uid1 + uid2
    const splittedArray = names.split('');
    // console.log(splittedArray.sort());
    splittedArray.sort();
    let collectionName = "";
    splittedArray.map((char) => {
      collectionName += char;
      return 1;
    })
    return collectionName;
  }


  return <DataContext.Provider value={{ user, selectedUser, setSelectedUser, auth, database, getCollectionName }}>
    {props.children}
  </DataContext.Provider>
}