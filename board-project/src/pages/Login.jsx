import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const schema = yup.object().shape({
  id: yup.string().required('아이디는 필수 입력 항목입니다.'),
  password: yup.string().required('비밀번호는 필수 입력 항목입니다.'),
});

const Login = () => {
  const { loginUser, getUsers } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('로그인 데이터:', data);
    const userName = loginUser(data.id, data.password);
    if (userName) {
      alert(`${userName}님 환영합니다!`);
      navigate('/board');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <LoginContainer>
      <LoginBox onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>

        <Label>아이디</Label>
        <Input type="text" {...register('id')} />
        {errors.id && <Error>{errors.id.message}</Error>}

        <Label>비밀번호</Label>
        <Input type="password" {...register('password')} />
        {errors.password && <Error>{errors.password.message}</Error>}

        <ButtonContainer>
          <LoginButton type="submit">로그인</LoginButton>
          <SignupButton to={`/signUp`}>회원가입</SignupButton>
        </ButtonContainer>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoginBox = styled.form`
  background-color: #ffffff;
  padding: 32px 28px;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 28px;
  font-size: 20px;
  color: #343a40;
`;

const Label = styled.label`
  display: block;
  margin-top: 16px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #495057;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 14px;
  background-color: #ffffff;
  box-sizing: border-box;
  color: #343a40;

  &:focus {
    outline: none;
    border-color: #868e96;
  }
`;

const Error = styled.p`
  color: #e03131;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
`;

const LoginButton = styled.button`
  flex: 1;
  background-color: #495057;
  color: white;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SignupButton = styled(Link)`
  flex: 1;
  text-align: center;
  background-color: #868e96;
  color: white;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
