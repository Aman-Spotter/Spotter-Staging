import React from 'react';
import TruckImg from 'assets/pngs/truck.png';
import DriverImg from 'assets/pngs/driver.png';
import LoadImg from 'assets/pngs/load.png';
import Dots from 'components/Dots';
import * as S from './styles';

const QuestionSection = () => (
  <S.Layout>
    <Dots direction="horizontal" />
    <S.Question>
      what can <span>spotter</span> do for you?
    </S.Question>
  </S.Layout>
);

export default QuestionSection;
