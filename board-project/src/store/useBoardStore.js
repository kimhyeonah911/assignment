import { create } from 'zustand';
import axios from 'axios';

const useBoardStore = create((set, get) => ({
  boards: [],
  loading: false,
  error: null,

  getBoards: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:3001/boards');
      set({ boards: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  findBoard: (boardId) => {
    const { boards } = get();
    return boards.find((b) => b.id === boardId);
  },
  increaseCount: async (boardId) => {
    const { boards } = get();
    const board = boards.find((b) => b.id === boardId);

    const updatedBoard = { ...board, count: board.count + 1 };
    try {
      const id = Number(boardId);
      const res = await axios.put(`http://localhost:3001/boards/${id}`, updatedBoard);
      set((state) => ({
        boards: state.boards.map((b) => (b.id === boardId ? res.data : b)),
      }));
    } catch (err) {
      console.error('조회수 증가 실패:', err);
    }
  },

  insertBoard: async (newBoard) => {
    try {
      const { boards } = get();
      const newId = String(boards.reduce((max, board) => Number(board.id > max ? board.id : max), 0) + 1);
      const newnewBoard = { ...newBoard, id: newId };
      const res = await axios.post(`http://localhost:3001/boards`, newnewBoard);
      set((state) => ({
        boards: [...state.boards, res.data],
      }));
    } catch (err) {
      console.error('게시글 추가 실패:', err);
    }
  },
  updateBoard: async (newBoard, boardId) => {
    try {
      const id = Number(boardId);
      const res = await axios.put(`http://localhost:3001/boards/${id}`, newBoard);
      set((state) => ({
        boards: state.boards.map((board) => (board.id === id ? res.data : board)),
      }));
    } catch (err) {
      console.error('게시글 수정 실패:', err);
    }
  },
  deleteBoard: async (boardId) => {
    try {
      const id = Number(boardId);
      await axios.delete(`http://localhost:3001/boards/${id}`);
      set((state) => ({
        boards: state.boards.filter((board) => board.id !== boardId),
      }));
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
    }
  },
}));

export default useBoardStore;
