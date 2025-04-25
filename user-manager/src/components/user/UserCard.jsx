import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserName = styled.h3`
  font-size: 22px;
  margin-bottom: 8px;
  color: #4b4b4b;
`;

const UserAge = styled.p`
  font-size: 16px;
  margin-bottom: 6px;
  color: #6d6d6d;
`;

const UserStatus = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.$isOnline ? 'green' : 'red')};
`;


const UserCard = ({user}) => {
  return (
    <Link to={`/user/${user.id}`}>
        <UserName>{user.name}</UserName>
        <UserAge>나이: {user.age}세</UserAge>
        <UserStatus $isOnline={user.isOnline}>
        ● {user.isOnline ? '온라인' : '오프라인'}
        </UserStatus>
    </Link>
  )
}

export default UserCard