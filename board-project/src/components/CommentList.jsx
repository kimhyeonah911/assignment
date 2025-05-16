import React, { useState } from 'react';
import styled from 'styled-components';
import useCommentStore from '../store/useCommentStore';
import { FaTrash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const CommentList = ({ boardComments, currentUser }) => {
  const { deleteComment } = useCommentStore();
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const handleDeleteComment = async (commentId) => {
    setDeleteCommentId(commentId);
    await deleteComment(commentId);
    toast.success('댓글 삭제 완료!');
    setDeleteCommentId(null);
  };

  return (
    <>
      {boardComments.map((c) => (
        <CommentBubble key={c.id} $isMyComment={c.userId === currentUser.id}>
          <CommentHeader>
            <HeaderLeft>
              <strong>{c.userId}</strong> · {c.createDate}
            </HeaderLeft>
            {c.userId === currentUser.id && (
              <DeleteButton onClick={() => handleDeleteComment(c.id)}>
                {deleteCommentId === c.id ? <ClipLoader size={6} color="#e53935" /> : <FaTrash />}
              </DeleteButton>
            )}
          </CommentHeader>
          <CommentContent>{c.content}</CommentContent>
        </CommentBubble>
      ))}
    </>
  );
};

export default CommentList;

const CommentBubble = styled.div`
  background-color: ${(props) => (props.$isMyComment ? '#e2e9dc' : '#e7e7e7')};
  color: #333;
  align-self: ${(props) => (props.$isMyComment ? 'flex-end' : 'flex-start')};
  border-radius: 16px;
  padding: 14px 18px;
  margin-bottom: 14px;
  width: 50%;
  max-width: 80%;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: 14px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 6px;
`;

const CommentContent = styled.div`
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53935;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 4px;

  &:hover {
    color: #d32f2f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
