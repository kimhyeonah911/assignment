import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set, get) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:3001/users');
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  loginUser: (id, password) => {
    const { users } = get();
    const user = users.find((u) => u.id === id && u.password === password);

    if (user) {
      set({ currentUser: user });
      return user.name;
    } else {
      set({ currentUser: null });
      return null;
    }
  },

  findId: (id) => {
    const { users } = get();
    if (users.find((u) => u.id === id)) {
      return true;
    } else {
      return false;
    }
  },

  insertUser: async (id, password, name) => {
    try {
      const newUser = { id, password, name };
      const res = await axios.post(`http://localhost:3001/users`, newUser);
      set((state) => ({
        users: [...state.users, res.data],
      }));
    } catch (err) {
      console.error('회원 추가 실패:', err);
    }
  },

  logoutUser: () => {
    set({ currentUser: null });
  },

  updateUserName: async (userId, userPassword, userName) => {
    try {
      const res = await axios.put(`http://localhost:3001/users/${userId}`, { password: userPassword, name: userName });
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? res.data : user
        ),
      }));
    } catch (err) {
      console.error('회원 이름 변경 실패:', err);
    }
  },  

  updateUserPassword: async (userId, userPassword, userName) => {
    try {
      const res = await axios.put(`http://localhost:3001/users/${userId}`, { password: userPassword, name: userName });
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? res.data : user
        ),
      }));
    } catch (err) {
      console.error('회원 비밀번호 변경 실패:', err);
    }
  },  

  deleteUser: async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
    }
  },
}));

export default useUserStore;
