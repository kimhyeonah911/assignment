import { create } from 'zustand';
import axios from 'axios';

const useCommentStore = create((set, get) => ({
  comments: [],
  loading: false,
  error: null,

  getComments: async (boardId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`http://localhost:8888/api/comments/${boardId}`);
      console.log(res);
      set({ comments: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  // findComment: (boardId) => {
  //   const { comments } = get();
  //   return comments.filter((c) => c.boardId === boardId);
  // },
  insertComment: async (newComment) => {
    try {
      const res = await axios.post(`http://localhost:8888/api/comments`, newComment);
      set((state) => ({
        comments: [...state.comments, res.data],
      }));
    } catch (err) {
      console.error('게시글 추가 실패:', err);
    }
  },
  deleteComment: async (commentId) => {
    try {
      await axios.delete(`http://localhost:8888/api/comments/${commentId}`);
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
    }
  },
}));

export default useCommentStore;
