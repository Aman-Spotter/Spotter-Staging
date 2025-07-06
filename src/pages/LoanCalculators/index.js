import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Settings,
  Zap,
  Target,
  Star,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Pin,
} from 'lucide-react';
import * as S from './styles';

const LoanCalculators = () => {
  const history = useHistory();
  const principalInterestChartRef = useRef(null);
  const balanceChartRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});
  const [chartInstances, setChartInstances] = useState({
    principalInterest: null,
    balance: null,
  });
  const [chartData, setChartData] = useState({
    months: [],
    principalPaid: [],
    interestPaid: [],
    balance: [],
  });
  const [currentCalculator, setCurrentCalculator] = useState('amortization');
  const [isInputsVisible, setIsInputsVisible] = useState(true); // Always visible by default
  const [showBalloonPayment, setShowBalloonPayment] = useState(false); // For "more" option
  const [showDropdown, setShowDropdown] = useState(false); // For mobile dropdown
  const [expandedSections, setExpandedSections] = useState({
    loanSummary: false,
    extraPayments: false,
    chart: false,
  });
  const [isSticky, setIsSticky] = useState(false); // For smooth sticky animation
  const [scrollY, setScrollY] = useState(0); // For tracking scroll position
  const [isLoaded, setIsLoaded] = useState(false); // For entrance animation

  const AMORTIZATION_SCENARIOS_KEY = 'amortizationScenarios_v6_icon';

  // Calculator options for dropdown
  const calculatorOptions = [
    {
      id: 'amortization',
      title: 'Amortization Calculator',
      subtitle: 'Payment schedules & loan breakdown',
      icon: BarChart3,
    },
    {
      id: 'affordability',
      title: 'Affordability Calculator',
      subtitle: 'Maximum loan based on budget',
      icon: PieChart,
    },
    {
      id: 'interestRate',
      title: 'Interest Rate Calculator',
      subtitle: 'Find the implied interest rate',
      icon: TrendingUp,
    },
  ];

  // Floating particles for visual enhancement
  const backgroundParticles = [
    { id: 'particle-1', type: 'dot', size: 'large', color: 'teal', speed: 'slow' },
    { id: 'particle-2', type: 'ring', size: 'medium', color: 'cyan', speed: 'medium' },
    { id: 'particle-3', type: 'dot', size: 'small', color: 'green', speed: 'fast' },
    { id: 'particle-4', type: 'ring', size: 'large', color: 'teal', speed: 'slow' },
    { id: 'particle-5', type: 'dot', size: 'medium', color: 'purple', speed: 'medium' },
    { id: 'particle-6', type: 'ring', size: 'small', color: 'cyan', speed: 'fast' },
  ];

  // Initialize Chart.js when component mounts
  useEffect(() => {
    // Load Chart.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      // Cleanup chart instances
      if (chartInstances.principalInterest) {
        chartInstances.principalInterest.destroy();
      }
      if (chartInstances.balance) {
        chartInstances.balance.destroy();
      }
    };
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Helper functions
  const clearAllErrors = () => {
    document.querySelectorAll('.error-message').forEach((el) => {
      el.textContent = '';
      el.style.display = 'none';
    });
  };

  const displayError = (elementId, message) => {
    const errorElement = document.getElementById(`${elementId}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  };

  const getValidatedInput = (
    elementId,
    min = 0,
    errorMessage = 'Invalid input.',
    max = null,
    allowEmpty = false
  ) => {
    const inputElement = document.getElementById(elementId);
    if (!inputElement) return null;

    const valueStr = inputElement.value.trim();

    const errorElement = document.getElementById(`${elementId}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }

    if (allowEmpty && valueStr === '') {
      return 0;
    }

    const value = parseFloat(valueStr || inputElement.placeholder);

    if (Number.isNaN(value)) {
      displayError(elementId, errorMessage);
      return null;
    }
    if (value < min) {
      displayError(elementId, `Value must be at least ${min}.`);
      return null;
    }
    if (max !== null && value > max) {
      displayError(elementId, `Value cannot exceed ${max}.`);
      return null;
    }
    return value;
  };

  const formatCurrency = (originalAmount) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let amount = originalAmount;
    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    if (isMobile && !window.matchMedia('print').matches) {
      amount = Math.round(amount * 10) / 10;
      options.minimumFractionDigits = 1;
      options.maximumFractionDigits = 1;
      if (amount === 0) return '$0.0';
    }
    return new Intl.NumberFormat('en-US', options).format(amount);
  };

  const formatPercentage = (rate) =>
    new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rate / 100);

  const calculatePayment = (principal, annualRate, term, balloon) => {
    const monthlyRate = annualRate / 12 / 100;
    if (principal <= 0) return 0;
    if (term === 0) return principal > balloon ? principal - balloon : 0;
    if (monthlyRate === 0) return (principal - balloon) / term;
    const pvFactor = (1 - (1 + monthlyRate) ** -term) / monthlyRate;
    const fvFactor = balloon / (1 + monthlyRate) ** term;
    if (pvFactor === 0) return principal > balloon ? Infinity : 0;
    const payment = (principal - fvFactor) / pvFactor;
    return payment < 0 ? 0 : payment;
  };

  const calculateAffordablePrincipal = (monthlyPayment, annualRate, term) => {
    const monthlyRate = annualRate / 12 / 100;
    if (term === 0 || monthlyPayment <= 0) return 0;
    if (monthlyRate === 0) return monthlyPayment * term;
    const principal = (monthlyPayment * (1 - (1 + monthlyRate) ** -term)) / monthlyRate;
    return principal > 0 ? principal : 0;
  };

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const generateSchedule = () => {
    clearAllErrors();
    const purchasePrice = getValidatedInput(
      'purchasePrice',
      0,
      'Purchase price must be non-negative.'
    );
    const downPayment = getValidatedInput('downPayment', 0, 'Down payment must be non-negative.');
    const annualRate = getValidatedInput('interestRate', 0, 'Interest rate must be non-negative.');
    const term = getValidatedInput('term', 1, 'Loan term must be positive.', 1200);
    const balloon = getValidatedInput('balloon', 0, 'Balloon must be non-negative.', null, true);
    const extraMonthlyPayment = getValidatedInput(
      'extraMonthlyPayment',
      0,
      'Extra monthly payment must be non-negative.',
      null,
      true
    );
    const oneTimePaymentAmount = getValidatedInput(
      'oneTimePaymentAmount',
      0,
      'One-time payment amount must be non-negative.',
      null,
      true
    );
    const oneTimePaymentMonth = getValidatedInput(
      'oneTimePaymentMonth',
      1,
      'One-time payment month must be positive.',
      term || 60,
      true
    );

    const scheduleElement = document.getElementById('schedule');
    const loanSummaryElement = document.getElementById('loanSummary');
    const newPayoffDateElement = document.getElementById('newPayoffDate');
    const interestSavedElement = document.getElementById('interestSaved');

    if (!scheduleElement || !loanSummaryElement || !newPayoffDateElement || !interestSavedElement) {
      return; // Elements not ready yet
    }

    setChartData({ months: [], principalPaid: [], interestPaid: [], balance: [] });

    // Only check required fields for null values
    if (purchasePrice === null || downPayment === null || annualRate === null || term === null) {
      scheduleElement.innerHTML =
        '<table><thead><tr><th>Month</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr></thead><tbody><tr><td colspan="5">Please enter valid loan details.</td></tr></tbody></table>';
      loanSummaryElement.innerHTML =
        '<div class="loan-summary-item"><h3>Original Total Payments</h3><p>-</p></div><div class="loan-summary-item"><h3>Original Total Interest</h3><p>-</p></div>';
      newPayoffDateElement.innerText = '-';
      interestSavedElement.innerText = '$0.00';
      return;
    }

    // Set default values for optional fields if they are null
    const safeBalloon = balloon !== null ? balloon : 0;
    const safeExtraMonthlyPayment = extraMonthlyPayment !== null ? extraMonthlyPayment : 0;
    const safeOneTimePaymentAmount = oneTimePaymentAmount !== null ? oneTimePaymentAmount : 0;
    const safeOneTimePaymentMonth = oneTimePaymentMonth !== null ? oneTimePaymentMonth : 1;
    if (downPayment > purchasePrice) {
      displayError('downPayment', 'Down payment cannot exceed purchase price.');
      return;
    }
    const initialPrincipal = purchasePrice - downPayment;
    if (safeBalloon > initialPrincipal && initialPrincipal > 0) {
      displayError('balloon', 'Balloon cannot exceed loan amount.');
      return;
    }

    if (initialPrincipal <= 0) {
      scheduleElement.innerHTML =
        '<table><thead><tr><th>Month</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr></thead><tbody><tr><td colspan="5">No loan needed.</td></tr></tbody></table>';
      loanSummaryElement.innerHTML =
        '<div class="loan-summary-item"><h3>Original Total Payments</h3><p>$0.00</p></div><div class="loan-summary-item"><h3>Original Total Interest</h3><p>$0.00</p></div>';
      newPayoffDateElement.innerText = 'N/A';
      interestSavedElement.innerText = '$0.00';
      setChartData({ months: [0], principalPaid: [0], interestPaid: [0], balance: [0] });
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const originalMonthlyPayment = calculatePayment(
      initialPrincipal,
      annualRate,
      term,
      safeBalloon
    );
    let originalTotalInterestPaid =
      originalMonthlyPayment * term + (safeBalloon > 0 ? safeBalloon : 0) - initialPrincipal;
    originalTotalInterestPaid = Math.max(0, originalTotalInterestPaid);

    let currentBalance = initialPrincipal;
    let totalInterestPaidWithExtra = 0;
    let actualMonthsPaid = 0;
    let scheduleHtml =
      '<table><thead><tr><th>Month</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr></thead><tbody>';
    scheduleHtml += `<tr class="initial-balance"><td data-label="Month">0</td><td data-label="Payment">-</td><td data-label="Interest">-</td><td data-label="Principal">-</td><td data-label="Balance">${formatCurrency(
      currentBalance
    )}</td></tr>`;

    const newChartData = {
      months: [0],
      principalPaid: [0],
      interestPaid: [0],
      balance: [currentBalance],
    };

    for (let month = 1; month <= term && currentBalance > 0.005; month += 1) {
      const basePaymentForCalc = originalMonthlyPayment;
      const interestThisMonth = currentBalance * monthlyRate;
      const principalFromBasePayment = basePaymentForCalc - interestThisMonth;
      let totalPaymentThisMonth = basePaymentForCalc;
      let totalPrincipalPaidThisMonth = principalFromBasePayment;

      if (safeExtraMonthlyPayment > 0) {
        totalPaymentThisMonth += safeExtraMonthlyPayment;
        totalPrincipalPaidThisMonth += safeExtraMonthlyPayment;
      }
      if (month === safeOneTimePaymentMonth && safeOneTimePaymentAmount > 0) {
        totalPaymentThisMonth += safeOneTimePaymentAmount;
        totalPrincipalPaidThisMonth += safeOneTimePaymentAmount;
      }

      if (
        totalPrincipalPaidThisMonth >= currentBalance &&
        !(month === term && safeBalloon > 0.005 && currentBalance > safeBalloon)
      ) {
        totalPrincipalPaidThisMonth = currentBalance;
        totalPaymentThisMonth = interestThisMonth + totalPrincipalPaidThisMonth;
      }

      if (month === term && safeBalloon > 0.005) {
        if (
          currentBalance - totalPrincipalPaidThisMonth > safeBalloon + 0.005 ||
          currentBalance - totalPrincipalPaidThisMonth < safeBalloon - 0.005
        ) {
          totalPrincipalPaidThisMonth = currentBalance - safeBalloon;
          if (totalPrincipalPaidThisMonth < 0) totalPrincipalPaidThisMonth = 0;
          totalPaymentThisMonth = interestThisMonth + totalPrincipalPaidThisMonth;
        }
      }

      currentBalance -= totalPrincipalPaidThisMonth;
      if (currentBalance < 0.005) currentBalance = 0;

      totalInterestPaidWithExtra += interestThisMonth;
      actualMonthsPaid = month;

      scheduleHtml += `<tr data-month="${month}"><td data-label="Month">${month}</td><td data-label="Payment">${formatCurrency(
        totalPaymentThisMonth
      )}</td><td data-label="Interest">${formatCurrency(
        interestThisMonth
      )}</td><td data-label="Principal">${formatCurrency(
        totalPrincipalPaidThisMonth
      )}</td><td data-label="Balance">${formatCurrency(currentBalance)}</td></tr>`;
      newChartData.months.push(month);
      newChartData.principalPaid.push(totalPrincipalPaidThisMonth);
      newChartData.interestPaid.push(interestThisMonth);
      newChartData.balance.push(currentBalance);

      if (currentBalance === 0 && !(month === term && safeBalloon > 0.005)) break;
    }

    if (safeBalloon > 0.005 && currentBalance > 0.005) {
      const balloonPrincipalPayment = currentBalance;
      currentBalance = 0;
      scheduleHtml += `<tr class="balloon-row"><td data-label="Month">Balloon</td><td data-label="Payment">${formatCurrency(
        balloonPrincipalPayment
      )}</td><td data-label="Interest">${formatCurrency(
        0
      )}</td> <td data-label="Principal">${formatCurrency(
        balloonPrincipalPayment
      )}</td><td data-label="Balance">${formatCurrency(currentBalance)}</td></tr>`;
      newChartData.months.push('Balloon');
      newChartData.principalPaid.push(balloonPrincipalPayment);
      newChartData.interestPaid.push(0);
      newChartData.balance.push(currentBalance);
      if (actualMonthsPaid === term) actualMonthsPaid += 1;
    }

    scheduleHtml += '</tbody></table>';
    scheduleElement.innerHTML = scheduleHtml;

    const totalOfOriginalScheduledPayments =
      originalMonthlyPayment * term + (safeBalloon > 0 ? safeBalloon : 0);
    const summaryHtml = `
      <div class="loan-summary-item"><h3>Original Total Payments</h3><p>${formatCurrency(
        totalOfOriginalScheduledPayments
      )}</p></div>
      <div class="loan-summary-item"><h3>Original Total Interest</h3><p>${formatCurrency(
        originalTotalInterestPaid
      )}</p></div>`;
    loanSummaryElement.innerHTML = summaryHtml;

    let payoffDateString;
    let monthsToPayoff = actualMonthsPaid;
    if (newChartData.months[newChartData.months.length - 1] === 'Balloon') {
      monthsToPayoff = actualMonthsPaid - 1;
    }

    if (currentBalance <= 0.005 && actualMonthsPaid === 0 && initialPrincipal > 0) {
      payoffDateString = 'Paid (Down Payment)';
    } else if (currentBalance <= 0.005) {
      const years = Math.floor(monthsToPayoff / 12);
      const monthsRem = monthsToPayoff % 12;
      let durationStr = '';
      if (years > 0) durationStr += `${years} yr${years > 1 ? 's' : ''} `;
      if (monthsRem > 0) durationStr += `${monthsRem} mo${monthsRem > 1 ? 's' : ''}`;
      if (durationStr === '')
        durationStr = monthsToPayoff > 0 || initialPrincipal > 0 ? 'Paid Off' : 'N/A';
      if (newChartData.months[newChartData.months.length - 1] === 'Balloon' && monthsToPayoff > 0)
        durationStr += ' + Balloon';
      else if (
        newChartData.months[newChartData.months.length - 1] === 'Balloon' &&
        monthsToPayoff === 0
      )
        durationStr = 'Paid by Balloon';

      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + monthsToPayoff);
      payoffDateString =
        monthsToPayoff > 0 ||
        (newChartData.months[newChartData.months.length - 1] === 'Balloon' && initialPrincipal > 0)
          ? `${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(
              currentDate
            )} (${durationStr.trim()})`
          : durationStr;
    } else {
      payoffDateString = `Original term: ${term} mos`;
      if (safeBalloon > 0) payoffDateString += ' + Balloon';
    }
    newPayoffDateElement.innerText = payoffDateString;
    const interestSaved = Math.max(0, originalTotalInterestPaid - totalInterestPaidWithExtra);
    interestSavedElement.innerText = formatCurrency(interestSaved);

    setChartData(newChartData);
  };

  const calculateAffordableLoan = () => {
    clearAllErrors();
    const desiredMonthlyPayment = getValidatedInput(
      'desiredMonthlyPayment',
      0.01,
      'Desired payment must be positive.'
    );
    const annualRate = getValidatedInput(
      'affordabilityInterestRate',
      0,
      'Interest rate must be non-negative.'
    );
    const term = getValidatedInput('affordabilityTerm', 1, 'Loan term must be positive.', 1200);
    const downPayment = getValidatedInput(
      'affordabilityDownPayment',
      0,
      'Down payment must be non-negative.'
    );

    const loanAmountElement = document.getElementById('affordableLoanAmount');
    const purchasePriceElement = document.getElementById('affordablePurchasePrice');

    if (!loanAmountElement || !purchasePriceElement) return;

    if (
      desiredMonthlyPayment === null ||
      annualRate === null ||
      term === null ||
      downPayment === null
    ) {
      loanAmountElement.innerText = '$0.00';
      purchasePriceElement.innerText = '$0.00';
      return;
    }
    const affordablePrincipal = calculateAffordablePrincipal(
      desiredMonthlyPayment,
      annualRate,
      term
    );
    const affordablePurchasePrice = affordablePrincipal + downPayment;
    loanAmountElement.innerText = formatCurrency(affordablePrincipal);
    purchasePriceElement.innerText = formatCurrency(affordablePurchasePrice);
  };

  const calculateInterestRate = () => {
    clearAllErrors();
    const principal = getValidatedInput('loanAmountIR', 0.01, 'Loan amount must be positive.');
    const monthlyPayment = getValidatedInput(
      'monthlyPaymentIR',
      0,
      'Monthly payment must be non-negative.'
    );
    const term = getValidatedInput('loanTermIR', 1, 'Loan term must be positive.', 1200);
    const balloon = getValidatedInput(
      'balloonPaymentIR',
      0,
      'Balloon must be non-negative.',
      null,
      true
    );
    const outputElement = document.getElementById('calculatedInterestRate');

    if (!outputElement) return;

    // Set default for optional balloon field
    const safeBalloonIR = balloon !== null ? balloon : 0;

    if (principal === null || monthlyPayment === null || term === null) {
      outputElement.innerText = 'Invalid Input';
      return;
    }
    if (safeBalloonIR > principal && monthlyPayment * term < 0.01) {
      displayError('balloonPaymentIR', 'Balloon cannot exceed principal if no payments.');
      outputElement.innerText = 'Invalid Input';
      return;
    }
    if (safeBalloonIR >= principal + monthlyPayment * term) {
      displayError('balloonPaymentIR', 'Balloon payment too high for loan terms.');
      outputElement.innerText = 'Invalid Input';
      return;
    }
    if (monthlyPayment * term + safeBalloonIR < principal) {
      displayError('monthlyPaymentIR', 'Total payments less than principal.');
      outputElement.innerText = 'Rate < 0%';
      return;
    }
    if (Math.abs(monthlyPayment * term - (principal - safeBalloonIR)) < 0.01 && principal > 0) {
      outputElement.innerText = '0.00%';
      return;
    }
    if (principal <= 0 && monthlyPayment <= 0 && safeBalloonIR <= 0) {
      outputElement.innerText = '0.00%';
      return;
    }
    if (principal > 0 && monthlyPayment === 0 && principal === safeBalloonIR) {
      outputElement.innerText = '0.00%';
      return;
    }
    if (principal > 0 && monthlyPayment * term === 0 && principal > safeBalloonIR) {
      outputElement.innerText = 'N/A (High Rate)';
      return;
    }

    let lowRate = 0.0000001;
    let highRate = 100.0;
    let iterations = 0;
    const maxIterations = 1000;
    const tolerance = 0.000001;
    while (iterations < maxIterations) {
      let midRate = (lowRate + highRate) / 2;
      if (midRate <= 0) {
        lowRate = 0.0000001;
        midRate = (lowRate + highRate) / 2;
        if (midRate <= 0) {
          outputElement.innerText = 'N/A (Rate too low)';
          return;
        }
      }
      const calculatedPayment = calculatePayment(principal, midRate, term, safeBalloonIR);
      if (
        Math.abs(calculatedPayment - monthlyPayment) < tolerance ||
        highRate - lowRate < tolerance / 100
      ) {
        outputElement.innerText = formatPercentage(midRate);
        return;
      }
      if (calculatedPayment < monthlyPayment) lowRate = midRate;
      else highRate = midRate;
      iterations += 1;
    }
    outputElement.innerText = 'N/A (Try adjusting inputs)';
  };

  const showCalculator = (calculatorType) => {
    setCurrentCalculator(calculatorType);
    setExpandedSections({
      loanSummary: false,
      extraPayments: false,
      chart: false,
    });

    // Clear previous results
    setTimeout(() => {
      if (calculatorType === 'amortization') {
        generateSchedule();
      } else if (calculatorType === 'affordability') {
        calculateAffordableLoan();
      } else if (calculatorType === 'interestRate') {
        calculateInterestRate();
      }
    }, 100);
  };

  // Initialize with default calculator
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentCalculator === 'amortization') {
        generateSchedule();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentCalculator]);

  // Smooth scroll handling for sticky input panel
  useEffect(() => {
    let debounceTimer = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Trigger sticky behavior when user scrolls past hero section (around 200px)
      const stickyThreshold = 200;
      const shouldBeSticky = currentScrollY > stickyThreshold;

      // Debounce sticky state changes for smoother transitions
      if (debounceTimer) {
        cancelAnimationFrame(debounceTimer);
      }

      debounceTimer = requestAnimationFrame(() => {
        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky);
        }
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (debounceTimer) {
        cancelAnimationFrame(debounceTimer);
      }
    };
  }, [isSticky]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('[data-dropdown]')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Set document title and trigger entrance animation
  useEffect(() => {
    document.title = "Spotter's Loan Calculators";

    // Trigger entrance animation after a brief delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.Layout>
      {/* Background Elements */}
      <S.BackgroundElements>
        {backgroundParticles.map((particle, index) => (
          <S.BackgroundParticle
            key={particle.id}
            delay={`${index * 0.4}s`}
            position={index}
            {...particle}
          />
        ))}
      </S.BackgroundElements>

      {/* Hero Section */}
      <S.HeroSection id="hero" data-animate>
        <S.HeroContainer isVisible={isVisible.hero}>
          <S.HeroTitle>
            <S.HeroHighlight>Loan Calculators</S.HeroHighlight>
          </S.HeroTitle>
          <S.HeroSubtitle>Calculate payments, affordability, and interest rates.</S.HeroSubtitle>
        </S.HeroContainer>
      </S.HeroSection>

      {/* Calculator Tabs */}
      <S.TabsSection id="calculator-tabs" data-animate>
        <S.TabsContainer isVisible={isVisible['calculator-tabs']}>
          <S.CalculatorTabs>
            {calculatorOptions.map((option) => (
              <S.CalculatorTab
                key={option.id}
                active={currentCalculator === option.id}
                onClick={() => showCalculator(option.id)}
              >
                <S.TabIcon>
                  <option.icon size={20} />
                </S.TabIcon>
                <S.TabContent>
                  <S.TabTitle>{option.title}</S.TabTitle>
                  <S.TabSubtitle>{option.subtitle}</S.TabSubtitle>
                </S.TabContent>
              </S.CalculatorTab>
            ))}
          </S.CalculatorTabs>
        </S.TabsContainer>
      </S.TabsSection>

      {/* Main Calculator Container */}
      <S.CalculatorContainer>
        {/* Input Controls Panel */}
        <S.InputPanel isSticky={isSticky} scrollY={scrollY} isLoaded={isLoaded}>
          <S.StickyIndicator show={isSticky}>
            <Pin size={12} />
            Pinned to Top
          </S.StickyIndicator>
          <S.InputPanelHeader isSticky={isSticky}>
            <S.InputPanelTitle isSticky={isSticky}>
              <Settings size={20} />
              Loan Parameters
            </S.InputPanelTitle>
          </S.InputPanelHeader>

          <S.InputWrapper>
            {/* Calculator Selection Dropdown - Mobile Only */}
            <S.MobileCalculatorDropdown data-dropdown>
              <S.DropdownHeader onClick={() => setShowDropdown(!showDropdown)}>
                <S.DropdownIcon>
                  {React.createElement(
                    calculatorOptions.find((opt) => opt.id === currentCalculator)?.icon ||
                      Calculator,
                    { size: 20 }
                  )}
                </S.DropdownIcon>
                <S.DropdownContent>
                  <S.DropdownTitle>
                    {calculatorOptions.find((opt) => opt.id === currentCalculator)?.title}
                  </S.DropdownTitle>
                  <S.DropdownSubtitle>
                    {calculatorOptions.find((opt) => opt.id === currentCalculator)?.subtitle}
                  </S.DropdownSubtitle>
                </S.DropdownContent>
                <ChevronDown
                  size={16}
                  style={{
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </S.DropdownHeader>

              <S.DropdownMenu show={showDropdown}>
                {calculatorOptions.map((option) => (
                  <S.DropdownMenuItem
                    key={option.id}
                    active={currentCalculator === option.id}
                    onClick={() => {
                      showCalculator(option.id);
                      setShowDropdown(false);
                    }}
                  >
                    <option.icon size={18} />
                    <S.DropdownMenuContent>
                      <S.DropdownMenuTitle>{option.title}</S.DropdownMenuTitle>
                      <S.DropdownMenuSubtitle>{option.subtitle}</S.DropdownMenuSubtitle>
                    </S.DropdownMenuContent>
                  </S.DropdownMenuItem>
                ))}
              </S.DropdownMenu>
            </S.MobileCalculatorDropdown>

            {/* Amortization Inputs */}
            <S.InputContainer
              style={{ display: currentCalculator === 'amortization' ? 'block' : 'none' }}
            >
              {/* Row 1: Purchase Price and Down Payment */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="purchasePrice">
                    <DollarSign size={16} />
                    Purchase Price
                  </S.Label>
                  <S.Input
                    type="number"
                    id="purchasePrice"
                    placeholder="175000"
                    onChange={generateSchedule}
                  />
                  <S.ErrorMessage id="purchasePriceError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="downPayment">
                    <DollarSign size={16} />
                    Down Payment
                  </S.Label>
                  <S.Input
                    type="number"
                    id="downPayment"
                    placeholder="0"
                    onChange={generateSchedule}
                  />
                  <S.ErrorMessage id="downPaymentError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>

              {/* Row 2: Interest Rate and Loan Term */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="interestRate">
                    <TrendingUp size={16} />
                    Interest Rate (%)
                  </S.Label>
                  <S.Input
                    type="number"
                    id="interestRate"
                    placeholder="11.9"
                    step="0.1"
                    onChange={generateSchedule}
                  />
                  <S.ErrorMessage id="interestRateError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="term">
                    <Target size={16} />
                    Loan Term (months)
                  </S.Label>
                  <S.Input type="number" id="term" placeholder="60" onChange={generateSchedule} />
                  <S.ErrorMessage id="termError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>

              {/* More Options Toggle */}
              <S.MoreOptionsContainer>
                <S.MoreOptionsToggle onClick={() => setShowBalloonPayment(!showBalloonPayment)}>
                  <span>More Options</span>
                  {showBalloonPayment ? <Minus size={16} /> : <Plus size={16} />}
                </S.MoreOptionsToggle>
              </S.MoreOptionsContainer>

              {/* Row 3: Balloon Payment (Hidden by default) */}
              {showBalloonPayment && (
                <S.InputRowFull>
                  <S.InputGroup>
                    <S.Label htmlFor="balloon">
                      <Zap size={16} />
                      Balloon Payment
                    </S.Label>
                    <S.Input
                      type="number"
                      id="balloon"
                      placeholder="0"
                      onChange={generateSchedule}
                    />
                    <S.ErrorMessage id="balloonError" className="error-message" />
                  </S.InputGroup>
                </S.InputRowFull>
              )}
            </S.InputContainer>

            {/* Affordability Inputs */}
            <S.InputContainer
              style={{ display: currentCalculator === 'affordability' ? 'block' : 'none' }}
            >
              {/* Row 1: Desired Payment and Interest Rate */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="desiredMonthlyPayment">
                    <DollarSign size={16} />
                    Desired Payment
                  </S.Label>
                  <S.Input
                    type="number"
                    id="desiredMonthlyPayment"
                    placeholder="2500"
                    onChange={calculateAffordableLoan}
                  />
                  <S.ErrorMessage id="desiredMonthlyPaymentError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="affordabilityInterestRate">
                    <TrendingUp size={16} />
                    Interest Rate (%)
                  </S.Label>
                  <S.Input
                    type="number"
                    id="affordabilityInterestRate"
                    placeholder="11.9"
                    step="0.1"
                    onChange={calculateAffordableLoan}
                  />
                  <S.ErrorMessage id="affordabilityInterestRateError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>

              {/* Row 2: Loan Term and Down Payment */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="affordabilityTerm">
                    <Target size={16} />
                    Loan Term (months)
                  </S.Label>
                  <S.Input
                    type="number"
                    id="affordabilityTerm"
                    placeholder="60"
                    onChange={calculateAffordableLoan}
                  />
                  <S.ErrorMessage id="affordabilityTermError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="affordabilityDownPayment">
                    <DollarSign size={16} />
                    Down Payment
                  </S.Label>
                  <S.Input
                    type="number"
                    id="affordabilityDownPayment"
                    placeholder="0"
                    onChange={calculateAffordableLoan}
                  />
                  <S.ErrorMessage id="affordabilityDownPaymentError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>
            </S.InputContainer>

            {/* Interest Rate Inputs */}
            <S.InputContainer
              style={{ display: currentCalculator === 'interestRate' ? 'block' : 'none' }}
            >
              {/* Row 1: Loan Amount and Monthly Payment */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="loanAmountIR">
                    <DollarSign size={16} />
                    Loan Amount
                  </S.Label>
                  <S.Input
                    type="number"
                    id="loanAmountIR"
                    placeholder="150000"
                    onChange={calculateInterestRate}
                  />
                  <S.ErrorMessage id="loanAmountIRError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="monthlyPaymentIR">
                    <DollarSign size={16} />
                    Monthly Payment
                  </S.Label>
                  <S.Input
                    type="number"
                    id="monthlyPaymentIR"
                    placeholder="2500"
                    onChange={calculateInterestRate}
                  />
                  <S.ErrorMessage id="monthlyPaymentIRError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>

              {/* Row 2: Loan Term and Balloon Payment */}
              <S.InputRow>
                <S.InputGroup>
                  <S.Label htmlFor="loanTermIR">
                    <Target size={16} />
                    Loan Term (months)
                  </S.Label>
                  <S.Input
                    type="number"
                    id="loanTermIR"
                    placeholder="60"
                    onChange={calculateInterestRate}
                  />
                  <S.ErrorMessage id="loanTermIRError" className="error-message" />
                </S.InputGroup>

                <S.InputGroup>
                  <S.Label htmlFor="balloonPaymentIR">
                    <Zap size={16} />
                    Balloon Payment
                  </S.Label>
                  <S.Input
                    type="number"
                    id="balloonPaymentIR"
                    placeholder="0"
                    onChange={calculateInterestRate}
                  />
                  <S.ErrorMessage id="balloonPaymentIRError" className="error-message" />
                </S.InputGroup>
              </S.InputRow>
            </S.InputContainer>
          </S.InputWrapper>
        </S.InputPanel>

        {/* Results Panel */}
        <S.ResultsPanel stickyOffset={isSticky}>
          {/* Amortization Content */}
          {currentCalculator === 'amortization' && (
            <S.CalculatorContent>
              {/* Schedule Table */}
              <S.ScheduleSection>
                <S.ScheduleHeader>
                  <S.ScheduleTitle>
                    <BarChart3 size={20} />
                    Payment Schedule
                  </S.ScheduleTitle>
                </S.ScheduleHeader>
                <S.ScheduleContainer>
                  <div id="schedule" />
                </S.ScheduleContainer>
              </S.ScheduleSection>

              {/* Extra Payments Section */}
              <S.ExpandableSection>
                <S.SectionHeader onClick={() => toggleSection('extraPayments')}>
                  <S.SectionHeaderContent>
                    <S.SectionIcon>
                      <TrendingUp size={20} />
                    </S.SectionIcon>
                    <S.SectionTitle>Extra Payment Options</S.SectionTitle>
                  </S.SectionHeaderContent>
                  <S.ExpandIcon rotated={expandedSections.extraPayments}>
                    <ChevronDown size={20} />
                  </S.ExpandIcon>
                </S.SectionHeader>

                <S.SectionContent expanded={expandedSections.extraPayments}>
                  <S.ExtraPaymentsGrid>
                    <S.InputGroup>
                      <S.Label htmlFor="extraMonthlyPayment">
                        <DollarSign size={16} />
                        Extra Monthly Payment
                      </S.Label>
                      <S.Input
                        type="number"
                        id="extraMonthlyPayment"
                        placeholder="0"
                        onChange={generateSchedule}
                      />
                      <S.ErrorMessage id="extraMonthlyPaymentError" className="error-message" />
                    </S.InputGroup>

                    <S.InputGroup>
                      <S.Label htmlFor="oneTimePaymentAmount">
                        <Zap size={16} />
                        One-Time Payment Amount
                      </S.Label>
                      <S.Input
                        type="number"
                        id="oneTimePaymentAmount"
                        placeholder="0"
                        onChange={generateSchedule}
                      />
                      <S.ErrorMessage id="oneTimePaymentAmountError" className="error-message" />
                    </S.InputGroup>

                    <S.InputGroup>
                      <S.Label htmlFor="oneTimePaymentMonth">
                        <Target size={16} />
                        One-Time Payment Month
                      </S.Label>
                      <S.Input
                        type="number"
                        id="oneTimePaymentMonth"
                        placeholder="1"
                        onChange={generateSchedule}
                      />
                      <S.ErrorMessage id="oneTimePaymentMonthError" className="error-message" />
                    </S.InputGroup>
                  </S.ExtraPaymentsGrid>

                  <S.PayoffSummary>
                    <S.PayoffCard>
                      <S.PayoffIcon>
                        <Target size={24} />
                      </S.PayoffIcon>
                      <S.PayoffContent>
                        <S.PayoffLabel>New Payoff Date</S.PayoffLabel>
                        <S.PayoffValue id="newPayoffDate">-</S.PayoffValue>
                      </S.PayoffContent>
                    </S.PayoffCard>

                    <S.PayoffCard>
                      <S.PayoffIcon>
                        <TrendingUp size={24} />
                      </S.PayoffIcon>
                      <S.PayoffContent>
                        <S.PayoffLabel>Interest Saved</S.PayoffLabel>
                        <S.PayoffValue id="interestSaved">$0.00</S.PayoffValue>
                      </S.PayoffContent>
                    </S.PayoffCard>
                  </S.PayoffSummary>
                </S.SectionContent>
              </S.ExpandableSection>

              {/* Loan Summary Section */}
              <S.ExpandableSection>
                <S.SectionHeader onClick={() => toggleSection('loanSummary')}>
                  <S.SectionHeaderContent>
                    <S.SectionIcon>
                      <PieChart size={20} />
                    </S.SectionIcon>
                    <S.SectionTitle>Loan Summary</S.SectionTitle>
                  </S.SectionHeaderContent>
                  <S.ExpandIcon rotated={expandedSections.loanSummary}>
                    <ChevronDown size={20} />
                  </S.ExpandIcon>
                </S.SectionHeader>

                <S.SectionContent expanded={expandedSections.loanSummary}>
                  <S.LoanSummaryContainer>
                    <div id="loanSummary" />
                  </S.LoanSummaryContainer>
                </S.SectionContent>
              </S.ExpandableSection>
            </S.CalculatorContent>
          )}

          {/* Affordability Content */}
          {currentCalculator === 'affordability' && (
            <S.CalculatorContent>
              <S.ResultsSection>
                <S.ResultsHeader>
                  <S.ResultsTitle>
                    <PieChart size={24} />
                    Affordability Analysis
                  </S.ResultsTitle>
                  <S.ResultsSubtitle>Based on your desired monthly payment</S.ResultsSubtitle>
                </S.ResultsHeader>

                <S.ResultsGrid>
                  <S.ResultCard>
                    <S.ResultCardHeader>
                      <S.ResultCardIcon>
                        <DollarSign size={24} />
                      </S.ResultCardIcon>
                      <S.ResultCardTitle>Maximum Loan Amount</S.ResultCardTitle>
                    </S.ResultCardHeader>
                    <S.ResultCardValue id="affordableLoanAmount">$0.00</S.ResultCardValue>
                  </S.ResultCard>

                  <S.ResultCard highlight>
                    <S.ResultCardHeader>
                      <S.ResultCardIcon>
                        <Star size={24} />
                      </S.ResultCardIcon>
                      <S.ResultCardTitle>Total Purchase Price</S.ResultCardTitle>
                    </S.ResultCardHeader>
                    <S.ResultCardValue id="affordablePurchasePrice">$0.00</S.ResultCardValue>
                  </S.ResultCard>
                </S.ResultsGrid>
              </S.ResultsSection>
            </S.CalculatorContent>
          )}

          {/* Interest Rate Content */}
          {currentCalculator === 'interestRate' && (
            <S.CalculatorContent>
              <S.ResultsSection>
                <S.ResultsHeader>
                  <S.ResultsTitle>
                    <TrendingUp size={24} />
                    Interest Rate Analysis
                  </S.ResultsTitle>
                  <S.ResultsSubtitle>Calculated based on your loan parameters</S.ResultsSubtitle>
                </S.ResultsHeader>

                <S.ResultsGrid>
                  <S.ResultCard highlight>
                    <S.ResultCardHeader>
                      <S.ResultCardIcon>
                        <TrendingUp size={24} />
                      </S.ResultCardIcon>
                      <S.ResultCardTitle>Annual Interest Rate</S.ResultCardTitle>
                    </S.ResultCardHeader>
                    <S.ResultCardValue id="calculatedInterestRate">0.00%</S.ResultCardValue>
                  </S.ResultCard>
                </S.ResultsGrid>
              </S.ResultsSection>
            </S.CalculatorContent>
          )}
        </S.ResultsPanel>
      </S.CalculatorContainer>
    </S.Layout>
  );
};

export default LoanCalculators;
