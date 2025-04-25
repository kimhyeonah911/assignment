import React, { createContext, useContext, useState} from 'react'

const UserContext = createContext();

export function UserProvider ({children}) {

    const [users, setUsers] = useState([{
        id: 1,
        name: "김현아",
        age: 24,
        isOnline: true
      }, {
        id: 2,
        name: "전진영",
        age: 25,
        isOnline: false
      },{
        id: 3,
        name: "이주찬",
        age: 26,
        isOnline: true
      },{
        id: 4,
        name: "황인태",
        age: 26,
        isOnline: true
    }])

    const deleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const insertUser = (newUser) => {
        const id = users.length + 1;
        setUsers([...users, { ...newUser, id }]);
    };

    const findUser = (userId) => {
        return users.find(user => user.id === userId);
    };

    const updateUserStatus = (userId) => {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isOnline: !user.isOnline } : user
        ));
      };
      
    

    return (
        <UserContext.Provider value={{users, deleteUser, insertUser, findUser, updateUserStatus}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext);
}