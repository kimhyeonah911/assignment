import { create } from "zustand"

const useUserStore = create((set, get) => ({
  users: [{
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
    }],
    deleteUser : (userId) => set(state => ({
        users: state.users.filter(user => user.id !== userId)
    })),
    insertUser : (newUser) => set(state => {
        const id = state.users.length + 1;
        return {users: [...state.users, {...newUser, id}]};
    }),
    findUser: (userId) => {
        const users = get().users;
        return users.find((user) => user.id === userId);
    },
    updateUserStatus : (userId) => set(state => ({
        users : state.users.map((user) =>
        user.id === userId ? {...user, isOnline: !user.isOnline} : user)
    }))
}))

export default useUserStore