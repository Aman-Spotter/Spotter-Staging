import styled from 'styled-components';

export const Layout = styled.div`
  padding: 0 0 50px;
  @media screen and (max-width: 768px) {
    padding-top: 80px;
  }
  position: relative;
`;

export const Background = styled.div`
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 130px;
  z-index: -1;
  @media screen and (max-width: 768px) {
    bottom: unset;
    top: 0;
  }
`;

export const InnerLayout = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  padding: 120px 40px 0;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px 0;
    .dots {
      display: none;
    }
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 100px;
  @media screen and (max-width: 768px) {
    justify-content: center;
    margin-top: 50px;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContent = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

export const Heading = styled.div`
  text-align: left;
  font-size: 50px;
  line-height: 1.2;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;
  margin-top: -21px;
  white-space: nowrap;
  & .ai {
    font-size: 40px;
  }
  & .load {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.teal};
    text-underline-offset: 5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
    text-align: center;
    margin-top: -50px;
    margin-bottom: 50px;
  }
`;

export const Description = styled.div`
  text-align: left;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 80px;
  & .load {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.teal};
    text-underline-offset: 2px;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 20px;
    margin-bottom: 50px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 150px;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 200px;
  }
`;

export const PhoneWrapper = styled.div`
  position: relative;
`;

export const PhoneImg = styled.img`
  width: 350px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Card = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 25px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: ${({ left }) => left || 'unset'};
  right: ${({ right }) => right || 'unset'};
  top: ${({ top }) => top || 'unset'};
  bottom: ${({ bottom }) => bottom || 'unset'};
  box-shadow: 0px 0px 5px 5px #0000001a;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const InnerCard = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colors.textBlack};
    font-size: 12px;
  }
  div {
    width: 140px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.teal};
    font-size: 12px;
    padding: 10px 20px;
    margin-top: 20px;
  }
  img {
    margin-top: 10px;
    width: 140px;
  }
`;
