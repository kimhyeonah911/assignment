import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import BoardDetail from './pages/BoardDetail';
import MyPage from './pages/MyPage';
import BoardEnroll from './pages/BoardEnroll';
import BoardEdit from './pages/BoardEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/board" element={<Board />} />
          <Route path="/boardEnroll" element={<BoardEnroll />} />
          <Route path="/boardEdit/:id" element={<BoardEdit />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </>
  );
}

export default App;
