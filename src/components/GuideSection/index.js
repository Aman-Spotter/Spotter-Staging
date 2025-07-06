import React from 'react';
import DestinationsSvg from 'assets/gifs/step2_spotter_markets.gif';
import ReadyNowSvg from 'assets/gifs/step1_spotter_ready.gif';
import LoadsSvg from 'assets/gifs/step3_spotter_loads.gif';
import * as S from './styles';

const GuideSection = () => (
  <S.Layout>
    <S.InnerLayout>
      <S.Section>
        <S.LeftPanel>
          <div>
            <span className="title">1. ready now</span>
            <span className="description">set the times when you will be ready</span>
          </div>
        </S.LeftPanel>
        <S.RightPanel>
          <S.Image src={ReadyNowSvg} alt="readynow" />
        </S.RightPanel>
      </S.Section>
      <S.Section reverse>
        <S.LeftPanel>
          <div>
            <span className="title">2. select destinations</span>
            <span className="description">
              select the markets you want to go to, avoid bad markets via NO-GO map.
            </span>
          </div>
        </S.LeftPanel>
        <S.RightPanel>
          <S.Image src={DestinationsSvg} alt="readynow" />
        </S.RightPanel>
      </S.Section>
      <S.Section>
        <S.LeftPanel>
          <div>
            <span className="title">
              3. <span>spotter</span> recommends loads
            </span>
            <span className="description">get matched with the highest load score offers</span>
          </div>
        </S.LeftPanel>
        <S.RightPanel>
          <S.Image src={LoadsSvg} alt="readynow" />
        </S.RightPanel>
      </S.Section>
    </S.InnerLayout>
  </S.Layout>
);

export default GuideSection;
