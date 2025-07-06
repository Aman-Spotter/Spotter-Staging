import React from 'react';
import TruckImg from 'assets/pngs/truck.png';
import DriverImg from 'assets/pngs/driver.png';
import LoadImg from 'assets/pngs/load.png';
import * as S from './styles';

const ImageSection = () => (
  <S.Layout>
    <S.InnerLayout>
      <S.Image src={TruckImg} alt="truck" />
      <S.Image src={DriverImg} alt="truck" />
      <S.Image src={LoadImg} alt="truck" />
    </S.InnerLayout>
  </S.Layout>
);

export default ImageSection;
