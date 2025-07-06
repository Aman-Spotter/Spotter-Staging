import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Check } from '@styled-icons/fa-solid';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import moment from 'moment';

const plans = [
  {
    title: 'basic plan',
    benefits: [
      <span>
        <b>market data</b> insights
      </span>,
      <span>
        <b>AI</b> suggestions
      </span>,
      <span>
        all load <b>filtering</b> tools
      </span>,
      <span>
        every <b>email automation </b> feature
      </span>,
      <span>
        30 days <b>free</b> trial
      </span>,
    ],
    price: 15,
    isCall: false,
    isPopular: false,
    actionButton: 'get started',
    url: 'carrier-sign-up-50',
  },
];

const PlanCardItem = ({ title, benefits, price, isCall, url, isPopular, actionButton }) => {
  const history = useHistory();
  const [link, setLink] = useState(url);
  useEffect(() => {
    if (isCall) {
      setLink(`javascript:window.open("${url}");`);
    }
  }, []);
  const onClick = () => {
    if (!isCall) history.push(url);
    else window.open(url);
  };
  return (
    <div className="plan-card">
      {isPopular && <div className="popular">most popular</div>}
      <span className="header">{title}</span>
      <div className="content">
        <div className="benefit">
          {benefits.map((bnf) => (
            <div className="item" key={bnf}>
              <Check className="checkmark" />
              {bnf}
            </div>
          ))}
        </div>
        {isCall && (
          <div className="call">
            call
            <br />
            for pricing
          </div>
        )}
        {!isCall && (
          <div className="price">
            <span>$</span>
            <span>{price}</span>
            <span>/mo</span>
          </div>
        )}
      </div>
      <div className="footer">
        <a className={`carrier-button ${isCall ? 'call' : ''}`} href={link}>
          {actionButton}
        </a>
      </div>
    </div>
  );
};

PlanCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.element).isRequired,
  price: PropTypes.number.isRequired,
  isCall: PropTypes.bool.isRequired,
  isPopular: PropTypes.bool.isRequired,
  actionButton: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const MemberPlan = () => (
  <div className="main-container member-plan">
    {moment().isAfter(moment('2024-01-01')) && (
      <div className="plans-wrapper">
        {plans.map((plan) => (
          <PlanCardItem {...plan} />
        ))}
      </div>
    )}
  </div>
);

export default MemberPlan;
