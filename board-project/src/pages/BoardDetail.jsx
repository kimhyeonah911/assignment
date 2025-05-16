import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCommentStore from '../store/useCommentStore';
import useBoardStore from '../store/useBoardStore';
import useUserStore from '../store/useUserStore';
import Header from '../components/common/Header';
import CommentList from '../components/CommentList';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BackButton, Container } from '../components/common/style';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

const BoardDetail = () => {
  const { id } = useParams();
  const boardId = Number(id);
  const navigate = useNavigate();

  const { getBoards, findBoard, increaseCount, deleteBoard, loading } = useBoardStore();
  const { getComments, insertComment, findComment } = useCommentStore();
  const { currentUser } = useUserStore();

  const [comment, setComment] = useState('');

  useEffect(() => {
    getBoards();
    getComments();
    increaseCount(id);
  }, [getBoards, getComments, increaseCount]);

  const board = findBoard(id);
  const boardComments = findComment(boardId);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    const newComment = {
      boardId,
      userId: currentUser.id,
      createDate: new Date().toISOString().split('T')[0],
      content: comment,
    };
    insertComment(newComment);
    toast.success('댓글 작성 완료!');
    setComment('');
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await deleteBoard(boardId);
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    }
  };

  if (!board) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <BeatLoader size={30} color="#5c5c5c" />
          <p>불러오는 중...</p>
        </LoadingContainer>
      ) : (
        <>
          <Header />
          <PostContainer>
            <BackButton onClick={() => navigate('/board')}>
              <IoMdArrowRoundBack />
              뒤로가기
            </BackButton>

            <TitleRow>
              <Title>{board.title}</Title>
              {currentUser.id === board.userId && (
                <ButtonGroup>
                  <EditButton to={`/boardEdit/${boardId}`}>
                    <FaEdit />
                    수정
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteBoard(board.id)}>
                    <FaTrash />
                    삭제
                  </DeleteButton>
                </ButtonGroup>
              )}
            </TitleRow>

            <MetaInfo>
              <span>작성자: {board.userId}</span>
              <span>작성일: {board.createDate}</span>
            </MetaInfo>

            <Content>{board.content}</Content>
          </PostContainer>

          <CommentSection>
            <CommentList boardComments={boardComments} currentUser={currentUser} />
            <InputArea>
              <CommentInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="답변을 입력하세요..."
              />
              <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
            </InputArea>
          </CommentSection>
        </>
      )}
    </Container>
  );
};

export default BoardDetail;

const PostContainer = styled.div`
  padding: 10px 190px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #dcdcdc;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #2f2f2f;
  margin: 0;
`;

const MetaInfo = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
`;

const Content = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled(Link)`
  color: #3cb371;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #eaeaea;
  }

  svg {
    margin: 0;
  }
`;

const DeleteButton = styled.button`
  background-color: #f0f0f0;
  color: #e53935;
  padding: 8px 12px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #eaeaea;
  }

  svg {
    margin: 0;
  }
`;

const CommentSection = styled.div`
  flex: 1;
  padding: 20px 180px;

  display: flex;
  flex-direction: column;
`;

const InputArea = styled.div`
  display: flex;
  padding: 16px 100px;
  border-top: 1px solid #ccc;
  margin-top: auto;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
  resize: none;
  height: 80px;
  font-size: 14px;
  background: #ffffff;
  color: #343a40;
`;

const SubmitButton = styled.button`
  background-color: #3cb371;
  color: white;
  padding: 10px 16px;
  margin-left: 10px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #32a363;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #555555;
`;
