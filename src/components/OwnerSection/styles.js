import styled from 'styled-components';

export const Layout = styled.div`
  padding: 50px 0;
  background-color: ${({ color, theme }) => color || theme.colors.darkTeal};
`;

export const InnerLayout = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 50%;
  @media screen and (max-width: 768px) {
    margin-bottom: 40px;
    .dots {
      margin-left: 10px;
    }
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 50%;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ small }) => (small ? '28px' : '40px')}};
  font-weight: bold;
  margin-left: 20px;
  line-height: 1;
  @media screen and (max-width: 768px) {
    margin-left: 20px;
  }
`;

export const Card = styled.div`
  padding: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  width: 100%;
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
      font-size: ${({ small }) => (small ? '18px' : '25px')}};
      text-align: center;
    }
    .right {
      font-size: ${({ small }) => (small ? '13px' : '20px')}};
      text-align: center;
    }
  }
`;
