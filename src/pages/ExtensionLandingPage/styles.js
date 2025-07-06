import styled from 'styled-components';

export const BannerContainer = styled.div`
  height: unset;
  width: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: row;
  background-color: lightblue;
  margin: 30px auto;
`;

export const BannerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const BannerTitle = styled.div`
  font-family: Open sans semibold;
  font-weight: 400;
  font-size: 60px;

  > span {
    font-weight: 600;
    color: ${(props) => props.theme.highlightColor};
  }
`;

export const BannerButton = styled.button``;
