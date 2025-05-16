import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const schema = yup.object().shape({
  id: yup.string().min(6, '아이디는 최소 6자리여야 합니다.').required('아이디는 필수 입력 항목입니다.'),
  password: yup.string().min(8, '비밀번호는 최소 8자리여야 합니다.').required('비밀번호는 필수 입력 항목입니다.'),
  confirmPassword: yup.string().required('비밀번호 확인은 필수 입력 항목입니다.'),
  name: yup.string().required('이름은 필수 입력 항목입니다.'),
});

const SignUp = () => {
  const { insertUser, findId, getUsers } = useUserStore();
  const navigate = useNavigate();
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const idValue = watch('id');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  useEffect(() => {
    const checkIdExistence = () => {
      if (idValue && idValue.length >= 6) {
        const isExist = findId(idValue);
        if (isExist) {
          setIdError('이미 존재하는 아이디입니다.');
        } else {
          setIdError('');
        }
      } else {
        setIdError('');
      }
    };

    checkIdExistence();
  }, [idValue]);

  useEffect(() => {
    if (passwordValue && confirmPasswordValue) {
      if (passwordValue !== confirmPasswordValue) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  }, [passwordValue, confirmPasswordValue]);

  const onSubmit = (data) => {
    console.log('회원가입 데이터:', data);
    insertUser(data.id, data.password, data.name);
    alert('회원가입이 완료되었습니다!');
    navigate('/');
  };

  return (
    <SignUpContainer>
      <SignUpBox onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>

        <Label>아이디</Label>
        <Input type="text" {...register('id')} onChange={(e) => setValue('id', e.target.value)} />
        {idError && <Error>{idError}</Error>}
        {errors.id && !idError && <Error>{errors.id.message}</Error>}

        <Label>비밀번호</Label>
        <Input type="password" {...register('password')} onChange={(e) => setValue('password', e.target.value)} />
        {errors.password && <Error>{errors.password.message}</Error>}

        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          {...register('confirmPassword')}
          onChange={(e) => setValue('confirmPassword', e.target.value)}
        />
        {passwordError && <Error>{passwordError}</Error>}
        {errors.confirmPassword && !passwordError && <Error>{errors.confirmPassword.message}</Error>}

        <Label>이름</Label>
        <Input type="text" {...register('name')} />
        {errors.name && <Error>{errors.name.message}</Error>}

        <ButtonContainer>
          <SubmitButton type="submit">회원가입</SubmitButton>
        </ButtonContainer>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const SignUpBox = styled.form`
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
    background-color: #fff;
  }
`;

const Error = styled.p`
  color: #e03131;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #495057;
  color: white;
  font-size: 15px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
