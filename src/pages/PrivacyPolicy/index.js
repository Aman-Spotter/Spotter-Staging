/* global fbq */
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as S from './styles';
import ppPdf from '../../assets/pdf/Spotter_privacy_policy.pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PrivacyPolicy = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
      <S.Layout>
        <S.Container>
          <Viewer fileUrl={ppPdf} plugins={[defaultLayoutPluginInstance]} />
        </S.Container>
      </S.Layout>
    </Worker>
  );
};
export default PrivacyPolicy;
