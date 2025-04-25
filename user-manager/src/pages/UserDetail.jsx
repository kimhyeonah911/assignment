import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const UserCard = styled.div`
    width: 300px;
    height: 400px;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    background-color: ${props => (props.$isDarkMode ? '#ddf5ff' : '#fffddd')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
`;

const TopBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    top: 16px;
    left: 16px;
`;

const UserName = styled.h3`
    font-size: 22px;
    margin-bottom: 8px;
    color: #4b4b4b;
`;

const UserImage = styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
    margin: 12px 0;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
    cursor: pointer;
`;

const DeleteButton = styled.button`
    position: absolute;
    bottom: 15px;
    background: #ff4444;
`

const UserDetail = () => {
    const {isDarkMode} = useTheme();
    const {deleteUser, findUser ,updateUserStatus} = useUser();
    const { id } = useParams();
    const user = findUser(parseInt(id)); 
    const navigate = useNavigate();
    
    return (
      <UserCard $isDarkMode={isDarkMode}>
        <TopBar>
            <Link to={`/`} style={{color: "#4d4d4d", fontSize: "20px"}}>←</Link>
        </TopBar>
        <UserName>{user.name}님의 프로필</UserName>
        <UserImage 
            src="data:image/png;base64,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" 
            alt={`${user.name}의 프로필 이미지`} 
        />
        <UserAge>나이: {user.age}세</UserAge>
        <UserStatus $isOnline={user.isOnline} onClick={()=> {updateUserStatus(user.id)}}>
            ● {user.isOnline ? '온라인 상태입니다' : '오프라인 상태입니다'}
        </UserStatus>
        <DeleteButton onClick={() => {deleteUser(user.id); navigate('/')}}>삭제하기</DeleteButton>
      </UserCard>
    );
  };

export default UserDetail