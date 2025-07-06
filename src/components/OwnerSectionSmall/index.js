import React from 'react';
import Dots from 'components/Dots';
import * as S from './styles';

const OwnerSection = () => (
  <S.Layout>
    <S.InnerLayout>
      <S.LeftPanel>
        <S.Title>
          sign up for <br />
          owner operators
        </S.Title>
      </S.LeftPanel>
      <S.RightPanel>
        {/* <S.Card>
          <span className="left">Is your MC older than 6 months?</span>
          <span className="right">Special pricing for MCs that are 6+ months old</span>
        </S.Card>
        <S.Card>
          <span className="left">Less than 6 month old MC?</span>
          <span className="right">
            Don’t worry, we also accept MCs that are younger than 6 months!
          </span>
        </S.Card> */}
        <S.Card>
          our Owner Operators have the optionality of accepting/rejecting loads while running under
          our select MCs
        </S.Card>
      </S.RightPanel>
    </S.InnerLayout>
  </S.Layout>
);

export default OwnerSection;
