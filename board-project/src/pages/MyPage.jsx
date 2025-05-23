import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { BackButton, Container } from '../components/common/style';
import { toast } from 'react-toastify';

const MyPage = () => {
  const { currentUser, getUsers, updateUserName, updateUserPassword, deleteUser, logoutUser } = useUserStore();

  const [editedName, setEditedName] = useState(currentUser.user_name);
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleNameUpdate = async () => {
    if (!editedName.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    const user = await updateUserName(currentUser.user_id, currentUser.user_pwd, editedName);
    if (user !== null) {
      toast.success('이름 변경 성공!');
    } else {
      toast.error('이름 변경이 실패하였습니다.');
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (currentPassword !== currentUser.user_pwd) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 8) {
      alert('새 비밀번호는 8자리 이상 설정 가능합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('변경할 비밀번호가 일치하지 않습니다.');
      return;
    }

    const user = await updateUserPassword(currentUser.user_id, newPassword, currentUser.user_name);

    if (user !== null) {
      alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
      logoutUser();
      navigate('/');
    } else {
      toast.error('비밀번호 변경이 실패하였습니다.');
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmed) {
      deleteUser(currentUser.user_id);
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/');
    }
  };

  return (
    <Container>
      <Header />
      <MyPageContainer>
        <ContentWrapper>
          <BackButton onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
            뒤로가기
          </BackButton>
          <MyPageCard>
            <SectionTitle>내 정보</SectionTitle>

            <InfoRow>
              <Label>아이디</Label>
              <Value value={currentUser.user_id} readOnly />
            </InfoRow>

            <InfoRow>
              <Label>이름</Label>
              <NameInput value={editedName} onChange={(e) => setEditedName(e.target.value)} />
              <NameChangeButton onClick={handleNameUpdate}>변경</NameChangeButton>
            </InfoRow>

            <InfoRow>
              <Label>비밀번호</Label>
              <PasswordButton onClick={() => setShowModal(true)}>비밀번호 변경</PasswordButton>
            </InfoRow>

            <InfoRow>
              <DeleteButton onClick={handleDeleteAccount}>회원 탈퇴</DeleteButton>
            </InfoRow>
          </MyPageCard>
        </ContentWrapper>

        {showModal && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <BackButton
                onClick={() => {
                  setShowModal(false);
                  navigate('/myPage');
                }}
              >
                <IoMdArrowRoundBack />
                뒤로가기
              </BackButton>
              <ModalTitle>비밀번호 변경</ModalTitle>
              <ModalInput
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <ModalInput
                type="password"
                placeholder="새 비밀번호 8자리 이상"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <ModalInput
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ModalButton onClick={handlePasswordChange}>변경하기</ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </MyPageContainer>
    </Container>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px 28px 32px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
`;

const MyPageCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 28px;
  font-size: 20px;
  color: #343a40;
`;

const InfoRow = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #495057;
`;

const Value = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  background-color: #e9ecef;
  font-size: 14px;
  color: #495057;
  box-sizing: border-box;
`;

const NameInput = styled.input`
  width: 80%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 14px;
  background-color: #ffffff;
  color: #343a40;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #868e96;
  }
`;

const NameChangeButton = styled.button`
  width: 20%;
  margin-top: 8px;
  padding: 8px;
  background-color: #495057;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const PasswordButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background-color: #adb5bd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background-color: #e03131;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 32px 28px;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const ModalTitle = styled.h3`
  text-align: center;
  font-size: 18px;
  color: #343a40;
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 14px;
  margin-bottom: 12px;
  background-color: #ffffff;
  color: #343a40;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #868e96;
  }
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #495057;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
