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
      const res = await axios.get('http://localhost:8888/api/members');
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  loginUser: (id, password) => {
    const { users } = get();
    const user = users.find((u) => u.user_id === id && u.user_pwd === password);

    if (user) {
      set({ currentUser: user });
      return user.user_name;
    } else {
      set({ currentUser: null });
      return null;
    }
  },

  findId: (id) => {
    const { users } = get();
    if (users.find((u) => u.user_id === id)) {
      return true;
    } else {
      return false;
    }
  },

  insertUser: async (user_id, user_pwd, user_name) => {
    try {
      const newUser = { user_id, user_pwd, user_name };
      const res = await axios.post(`http://localhost:8888/api/members`, newUser);
      set((state) => ({
        users: [...state.users, res.data],
      }));
      return res;
    } catch (err) {
      console.error('회원 추가 실패:', err);
    }
  },

  logoutUser: () => {
    set({ currentUser: null });
  },

  updateUserName: async (user_id, user_pwd, user_name) => {
    console.log(user_id, user_pwd, user_name);
    try {
      const res = await axios.put(`http://localhost:8888/api/members/${user_id}`, {
        user_pwd: user_pwd,
        user_name: user_name,
      });
      set((state) => ({
        users: state.users.map((user) => (user.user_id === user_id ? res.data : user)),
      }));
    } catch (err) {
      console.error('회원 이름 변경 실패:', err);
    }
  },

  updateUserPassword: async (user_id, user_pwd, user_name) => {
    try {
      const res = await axios.put(`http://localhost:8888/api/members/${user_id}`, {
        user_pwd: user_pwd,
        user_name: user_name,
      });
      set((state) => ({
        users: state.users.map((user) => (user.user_id === user_id ? res.data : user)),
      }));
    } catch (err) {
      console.error('회원 비밀번호 변경 실패:', err);
    }
  },

  deleteUser: async (user_id) => {
    try {
      await axios.delete(`http://localhost:8888/api/members/${user_id}`);
      set((state) => ({
        users: state.users.filter((user) => user.user_id !== user_id),
      }));
    } catch (err) {
      console.error('회원 탈퇴 실패:', err);
    }
  },
}));

export default useUserStore;
