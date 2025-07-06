/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import * as S from '../styles';

const Success = () => {
  const location = useLocation();
  const { title, description } = location.state;
  return (
    <S.Wrapper lightMode>
      {title && <S.Label>{title}</S.Label>}
      {description && <S.Label>{description}</S.Label>}
    </S.Wrapper>
  );
};

export default Success;
