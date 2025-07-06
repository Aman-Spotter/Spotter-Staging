import styled from 'styled-components';

export const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.teal};
`;

export const InnerLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-end;
  gap: 35px;
  padding: 40px;
  @media (max-width: 1060px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
    .dots {
      margin-left: 10px;
    }
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 28px;
  font-weight: bold;
  margin-left: 20px;
  line-height: 1;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  width: 100%;
  max-width: 330px;
  gap: 20px;
  align-items: center;
  .left {
    color: ${({ theme }) => theme.colors.teal};
    font-size: 15px;
    flex: 0 0 50%;
    font-weight: bold;
  }
  .right {
    color: ${({ theme }) => theme.colors.textMidGray};
    font-size: 12px;
    flex: 0 0 50%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .left {
      font-size: 25px;
      text-align: center;
    }
    .right {
      font-size: 20px;
      text-align: center;
    }
  }
`;
