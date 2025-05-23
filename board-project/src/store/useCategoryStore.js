import { create } from 'zustand';
import axios from 'axios';

const useCategoryStore = create((set) => ({
  categorys: [],
  loading: false,
  error: null,

  getCategorys: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:8888/api/categorys');
      set({ categorys: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useCategoryStore;
