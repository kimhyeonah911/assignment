import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h2>페이지를 찾을 수 없습니다. (404)</h2>
      <button onClick={() => navigate('/')}>홈으로 가기</button>
    </Container>
  );
};

export default NotFound;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: black;
`;
