import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';
import Header from '../components/common/Header';
import useBoardStore from '../store/useBoardStore';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BackButton, Container } from '../components/common/style';

const BoardEdit = () => {
  const { id } = useParams();
  const boardId = Number(id);

  const { updateBoard, findBoard, getBoards } = useBoardStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  useEffect(() => {
    getBoards();
  }, [getBoards]);

  const board = findBoard(id);

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setContent(board.content);
      setCategory(board.categoryId);
    }
  }, [board]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const newPost = {
        id: board.id,
        categoryId: category,
        userId: board.userId,
        createDate: board.createDate,
        title,
        content,
        count: board.count,
      };
      updateBoard(newPost, boardId);
      console.log('새 게시글:', newPost);

      setLoading(false);
      alert('게시글이 수정되었습니다.');
      navigate('/board');
    } catch (err) {
      setLoading(false);
      setError('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <PostContainer>
          <BackButton onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
              뒤로가기
            </BackButton>
          <Title>게시글 수정</Title>
          <Form onSubmit={handleSubmit}>
            <Label>카테고리</Label>
            <Select value={category} onChange={handleCategoryChange}>
              <option value="1">자바</option>
              <option value="2">스프링</option>
              <option value="3">리액트</option>
              <option value="4">자바스크립트</option>
              <option value="5">데이터베이스</option>
            </Select>

            <Label>제목</Label>
            <Input type="text" value={title} onChange={handleTitleChange} placeholder="제목을 입력하세요" />

            <Label>내용</Label>
            <Textarea value={content} onChange={handleContentChange} placeholder="내용을 입력하세요" />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonWrapper>
              {loading ? <BeatLoader size={30} color="white" /> : <SubmitButton type="submit">수정 완료</SubmitButton>}
            </ButtonWrapper>
          </Form>
        </PostContainer>
      </ContentWrapper>
    </Container>
  );
};

export default BoardEdit;

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  padding: 15px 100px 0;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
  color: #343a40;
`;

const Select = styled.select`
  width: 30%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  color: #343a40;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  color: #343a40;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  color: #343a40;
  min-height: 150px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #3cb371;
  color: white;
  padding: 10px 22px;
  border-radius: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;