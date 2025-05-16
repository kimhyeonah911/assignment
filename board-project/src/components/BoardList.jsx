import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../store/useUserStore';

const BoardList = ({ boards }) => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();

  const handleRowClick = (boardId) => {
    if (currentUser) {
      navigate(`/board/${boardId}`);
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  return (
    <tbody>
      {boards.length > 0 ? (
        boards.map((board) => (
          <TableRow key={board.id} onClick={() => handleRowClick(board.id)}>
            <TableData>{board.id}</TableData>
            <TableData>{board.userId}</TableData>
            <TableData>{board.createDate}</TableData>
            <TableData>{board.title}</TableData>
            <TableData>{board.count}</TableData>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableData colSpan="5">게시글이 없습니다.</TableData>
        </TableRow>
      )}
    </tbody>
  );
};

export default BoardList;

const TableData = styled.td`
  padding: 14px 12px;
  border-bottom: 1px solid #e2e2e2;
  color: #404040;
`;

const TableRow = styled.tr`
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #eaeaea;
  }
`;
