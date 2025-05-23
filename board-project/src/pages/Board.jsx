import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBoardStore from '../store/useBoardStore';
import useCategoryStore from '../store/useCategoryStore';
import { BeatLoader } from 'react-spinners';
import Header from '../components/common/Header';
import BoardList from '../components/BoardList';
import { Container } from '../components/common/style';
import useUserStore from '../store/useUserStore';

const Board = () => {
  const { boards, getBoards, loading, error } = useBoardStore();
  const { categorys, getCategorys } = useCategoryStore();
  const { currentUser } = useUserStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    getBoards();
    getCategorys();
  }, [getBoards, getCategorys]);

  const handleRowClick = () => {
    if (currentUser) {
      navigate(`/boardEnroll`);
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  const filteredBoards =
    selectedCategory === 'all'
      ? (boards.content ?? [])
      : (boards.content ?? []).filter((board) => board.category_no === selectedCategory);

  if (error) {
    return <ErrorMessage>게시판 데이터를 불러오는 데 오류가 발생했습니다.</ErrorMessage>;
  }

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <MainContent>
          <PostContainer>
            <CategoryList>
              <CategoryItem active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')}>
                전체
              </CategoryItem>
              {categorys.map((c) => (
                <CategoryItem
                  key={c.category_no}
                  active={c.category_no === selectedCategory}
                  onClick={() => setSelectedCategory(c.category_no)}
                >
                  {c.category_name}
                </CategoryItem>
              ))}
            </CategoryList>
            <WriteButton onClick={() => handleRowClick()}>글쓰기</WriteButton>
          </PostContainer>

          <TableContainer>
            {loading ? (
              <LoadingContainer>
                <BeatLoader size={30} color="#5c5c5c" />
                <p>불러오는 중...</p>
              </LoadingContainer>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>번호</TableHeader>
                    <TableHeader>작성자</TableHeader>
                    <TableHeader>작성일</TableHeader>
                    <TableHeader>제목</TableHeader>
                    <TableHeader>조회수</TableHeader>
                  </tr>
                </thead>
                <BoardList boards={filteredBoards} />
              </Table>
            )}
          </TableContainer>
        </MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default Board;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  padding: 15px 190px 0;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.button`
  background-color: ${({ active }) => (active ? '#5c5c5c' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#5c5c5c')};
  border: 1px solid #777;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #666;
    color: #fff;
  }
`;

const WriteButton = styled.button`
  background-color: #3cb371;
  color: white;
  padding: 10px 22px;
  border-radius: 20px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #32a363;
  }
`;

const TableContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #f0f0f0;
  border: 1px solid #e9e9e9;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 14px;
  text-align: center;
  background-color: #e4e4e4;
  color: #2f2f2f;
  border-bottom: 1px solid #c0c0c0;
  border-top: 1px solid #c0c0c0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #555555;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;
