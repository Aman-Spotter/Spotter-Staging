import styled from 'styled-components';

export const Label = styled.label`
  background-color: ${({ selected }) => (selected ? '#ffffff' : 'rgb(238, 238, 238)')};

  border: ${({ selected }) =>
    selected ? '2px solid rgb(84, 84, 84)' : '1px solid rgb(226, 226, 226)'};
  border-radius: 4px;
  padding: 11px;
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  line-height: 16px;
  justify-content: center;
  &:last-child {
    margin-right: 0px;
  }
`;
export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
`;
export const Img = styled.img`
  margin-right: 10px;
  max-width: 16px;
`;
