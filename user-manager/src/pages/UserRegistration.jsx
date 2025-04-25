import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const FormContainer = styled.div`
  padding: 20px;
  background-color: ${props => (props.$isDarkMode ? '#ddf5ff' : '#fffddd')};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
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

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #4b4b4b;
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #4b4b4b;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  color: #4b4b4b;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #f8f9fa;

  &:focus {
    border-color: #56ccff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => (props.$isDarkMode ? ' #56ccff' : ' #ffe056')};
  color: ${props => (props.$isDarkMode ? ' #ffffff' : ' #4b4b4b')};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.$isDarkMode ? ' #4bb2d4' : ' #ddc24a')};
  }
`;

const UserRegistration = () => {
    const {isDarkMode} = useTheme();
    const [name, setName] = useState('');
    const [age, setAge] = useState(20);
    const [isOnline] = useState(false);
    const {insertUser} = useUser();
    const navigate = useNavigate();

    const onChangeName = (e) => {
      setName(e.target.value);
    }

    const onChangeAge = (e) => {
      setAge(Number(e.target.value));
    }

    const onSubmitButton = () => {
      if (name.trim() === '') {
        alert('이름을 입력해주세요.');
        return;
      }
    
      if (age < 0) {
        alert('정확한 나이를 입력해주세요.');
        return;
      }

      const newUser = {
          name,
          age,
          isOnline
      };
      console.log(newUser);
      insertUser(newUser);
      navigate('/');
    }

    return (
        <FormContainer $isDarkMode={isDarkMode}>
          <TopBar>
            <Link to={`/`} style={{color: "#4d4d4d", fontSize: "20px"}}>←</Link>
        </TopBar>
        <FormTitle>사용자 등록</FormTitle>
        <FormField>
            <Label htmlFor="name">이름:</Label>
            <Input id="name" type="text" value={name} onChange={onChangeName} placeholder="이름을 입력하세요" />
        </FormField>
        <FormField>
            <Label htmlFor="age">나이:</Label>
            <Input id="age" type="number" value={age} onChange={onChangeAge} placeholder="나이를 입력하세요" />
        </FormField>
        <Button $isDarkMode={isDarkMode} onClick={() => {onSubmitButton()}}>등록</Button>
        </FormContainer>
    );
};

export default UserRegistration;
