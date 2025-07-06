import React, { useState } from 'react';
import { tosAccordionType } from 'types';
import { PublicLayout } from 'components';
import * as S from './styles';
import tosData from './tos';

const Accordion = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <S.Accordion isExpanded={isExpanded}>
      <S.Header isExpanded={isExpanded} onClick={toggleExpanded} className={data.class}>
        {data.text}
      </S.Header>
      <S.Content className="content">
        {data.children.map((item) => {
          if (item.type === 'accordion') return <Accordion data={item} />;
          return <S.Paragraph>{item.text}</S.Paragraph>;
        })}
      </S.Content>
    </S.Accordion>
  );
};

Accordion.propTypes = {
  data: tosAccordionType.isRequired,
};

const TOS = () => (
  <PublicLayout showAuthUrls={false}>
    <S.Container>
      <S.Title>{tosData.title}</S.Title>
      {tosData.content.map((item) => (
        <Accordion data={item} />
      ))}
    </S.Container>
  </PublicLayout>
);

export default TOS;
