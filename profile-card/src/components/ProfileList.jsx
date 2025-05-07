import React from 'react'
import styled from 'styled-components'

const Container = styled.table`
    width: 320px;
    border-collapse: collapse;

`
const Th = styled.th`
    border: 1px solid #e2e2e2;
    background-color: #ececec;
    padding: 6px;
    &:hover{
        font-weight: bold;
    }
`
const Td = styled.td`
    border: 1px solid #e2e2e2;
    background-color: #f8f8f8;
    padding: 8px;
    &:hover{
        font-weight: bold;
    }
`
const StatusDot = styled.span`
  color: ${props => (props.$isOnline ? 'green' : 'red')};

  &:hover {
    color: ${props => (props.$isOnline ? '#69cf4a' : '#ff6161')};
  }
`;


function ProfileList({profile}) {
  return (
    <Container>
        <thead>
            <tr>
                <Th>이름</Th>
                <Th>나이</Th>
                <Th>활성상태</Th>
            </tr>
        </thead>
        <tbody>
        {profile.map((p, index) => (
            <tr key={index}>
                <Td>{p.name}</Td>
                <Td>{p.age}</Td>
                <Td>
                <StatusDot $isOnline={p.isOnline}>●{p.isOnline ? '온라인 상태입니다.' : '오프라인 상태입니다.'}</StatusDot>

                </Td>
            </tr>
  ))}
        </tbody>
    </Container>
  )
}

export default ProfileList