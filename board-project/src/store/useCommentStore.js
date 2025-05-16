import { create } from 'zustand';
import axios from 'axios';

const useCommentStore = create((set, get) => ({
  comments: [],
  loading: false,
  error: null,

  getComments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:3001/comments');
      set({ comments: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  findComment: (boardId) => {
    const { comments } = get();
    return comments.filter((c) => c.boardId === boardId);
  },
  insertComment: async (newComment) => {
    try {
      const { comments } = get();
      const newId = String(comments.reduce((max, comment) => Number(comment.id > max ? comment.id : max), 0) + 1);
      const newnewComment = { ...newComment, id: newId };
      const res = await axios.post(`http://localhost:3001/comments`, newnewComment);
      set((state) => ({
        comments: [...state.comments, res.data],
      }));
    } catch (err) {
      console.error('게시글 추가 실패:', err);
    }
  },
  deleteComment: async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`);
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
    }
  },
}));

export default useCommentStore;
