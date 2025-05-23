import { create } from 'zustand';
import axios from 'axios';

const useBoardStore = create((set, get) => ({
  boards: [],
  board: null,
  loading: false,
  error: null,

  getBoards: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:8888/api/boards');
      set({ boards: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  findId: (id) => {
    const { boards } = get();
    if (boards.find((b) => b.board_no === id)) {
      return true;
    } else {
      return false;
    }
  },
  findBoard: async (boardId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`http://localhost:8888/api/boards/${boardId}`);
      set({ board: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  // increaseCount: async (boardId) => {
  //   const { boards } = get();
  //   const board = boards.find((b) => b.id === boardId);

  //   const updatedBoard = { ...board, count: board.count + 1 };
  //   try {
  //     const id = Number(boardId);
  //     const res = await axios.put(`http://localhost:8888/boards/${id}`, updatedBoard);
  //     set((state) => ({
  //       boards: state.boards.map((b) => (b.id === boardId ? res.data : b)),
  //     }));
  //   } catch (err) {
  //     console.error('조회수 증가 실패:', err);
  //   }
  // },

  insertBoard: async (newBoard) => {
    try {
      const res = await axios.post(`http://localhost:8888/api/boards`, newBoard);
      set((state) => ({
        boards: [...state.boards, res.data],
      }));
    } catch (err) {
      console.error('게시글 추가 실패:', err);
    }
  },
  updateBoard: async (newBoard, boardId) => {
    try {
      const res = await axios.put(`http://localhost:8888/api/boards/${boardId}`, newBoard);
      set({ board: res.data });
    } catch (err) {
      console.error('게시글 수정 실패:', err);
    }
  },
  deleteBoard: async (boardId) => {
    console.log(boardId);
    try {
      await axios.delete(`http://localhost:8888/api/boards/${boardId}`);
      set({ board: null });
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
    }
  },
}));

export default useBoardStore;
