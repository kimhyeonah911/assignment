import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../../store/useUserStore';

const Header = () => {
  const { logoutUser, currentUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    alert('로그아웃되었습니다');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <ButtonGroup>
        <HeaderButton to={currentUser ? '/myPage' : '/login'}>
          <FaHome style={{ marginRight: '6px' }} />
          {currentUser ? '마이페이지' : '로그인'}
        </HeaderButton>
        {currentUser && (
          <LogoutButton onClick={handleLogout}>
            <IoIosLogOut style={{ marginRight: '6px' }} />
            로그아웃
          </LogoutButton>
        )}
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  background-color: #1f1f1f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const commonButtonStyle = `
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  background: transparent;
  border: none;
  outline: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
`;

const HeaderButton = styled(Link)`
  ${commonButtonStyle}
  text-decoration: none;
`;

const LogoutButton = styled.button`
  ${commonButtonStyle}
`;
