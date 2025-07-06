import styled from 'styled-components';

export const Layout = styled.div`
  padding: 25px 0;
`;

export const InnerLayout = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;
export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  margin-bottom: 20px;
  @media screen and (max-width: 758px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
  .title {
    color: ${({ theme }) => theme.colors.black};
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    span {
      color: ${({ theme }) => theme.colors.teal};
    }
  }
  .description {
    color: ${({ theme }) => theme.colors.black};
    font-size: 15px;
    margin-left: 18px;
    text-align: left;
    max-width: 300px;
  }
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    margin-left: 25px;
    margin-bottom: 20px;
    .title {
      margin-bottom: 5px;
    }
    .description {
      max-width: calc(100% - 25px);
    }
  }
`;

export const RightPanel = styled.div`
  flex: 0 0 50%;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  margin-left: -18px;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-left: 0;
  }
`;
