import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import UserCard from '../components/user/UserCard';
import useUserStore from '../store/useUserStore';
import useThemeStore from '../store/useThemeStore';

const UserCardContainer = styled.div`
  width: 200px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${props => (props.$isDarkMode ? '#ddf5ff' : '#fffddd')};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-6px);
    background-color: ${props => (props.$isDarkMode ? '#c9ecff' : '#fff7c8')};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  max-width: 890px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background-color: ${props => (props.$isDarkMode ? '#56ccff' : '#fff786')};
  color: ${props => (props.$isDarkMode ? '#ffffff' : '#4b4b4b')};
  bottom: 10px;
  margin-right: 20px;
`;

const ThemeButton = styled.button`
  background-color: ${props => (props.$isDarkMode ? '#56ccff' : '#fff786')};
  color: ${props => (props.$isDarkMode ? '#ffffff' : '#4b4b4b')};
  bottom: 10px;
`;

const UserList = () => {
    //const {users} = useUser();
    //const {isDarkMode, toggleTheme} = useTheme();
    const {users} = useUserStore();
    const {isDarkMode, toggleTheme} = useThemeStore();

    return (
        <Container>
            <Link to={`/user`}>
                <AddButton $isDarkMode={isDarkMode}>+등록</AddButton>
            </Link>
            <ThemeButton $isDarkMode={isDarkMode} onClick={toggleTheme}>테마변경</ThemeButton>
            <ListContainer>
                {users.map((user) => (
                <UserCardContainer key={user.id} $isDarkMode={isDarkMode}>
                    <UserCard user={user}/>
                </UserCardContainer>
                ))}
            </ListContainer>
        </Container>
      );
    }
  

export default UserList