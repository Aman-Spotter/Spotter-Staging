import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'vertical' ? 'column' : 'row')};
  gap: 10px;
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme, index }) =>
    index === 0 ? theme.colors.red : index === 1 ? theme.colors.teal : theme.colors.lightTeal};
  border-radius: 50%;
`;
