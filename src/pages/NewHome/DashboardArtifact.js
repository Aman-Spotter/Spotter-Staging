import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import * as S from './styles';
import lensMapImage from '../../assets/pngs/lens-map.png';
import firefoxIcon from '../../assets/pngs/firefox.png';

// Enhanced keyframe animations
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const growUp = keyframes`
  from { height: 0; }
  to { height: var(--height); }
`;

const drawLine = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(200px); opacity: 0; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// New cool animations
const floatParticle = keyframes`
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.6;
  }
  25% { 
    transform: translateY(-15px) translateX(10px) scale(1.2);
    opacity: 1;
  }
  50% { 
    transform: translateY(-5px) translateX(-8px) scale(0.8);
    opacity: 0.8;
  }
  75% { 
    transform: translateY(-20px) translateX(5px) scale(1.1);
    opacity: 0.9;
  }
`;

const pulseSoft = keyframes`
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const slideInUp = keyframes`
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(64, 224, 208, 0.6);
  }
`;

const colorWave = keyframes`
  0% { 
    background-position: 0% 50%;
    transform: scale(1);
  }
  25% { 
    background-position: 100% 50%;
    transform: scale(1.02);
  }
  50% { 
    background-position: 100% 100%;
    transform: scale(1);
  }
  75% { 
    background-position: 0% 100%;
    transform: scale(1.01);
  }
  100% { 
    background-position: 0% 50%;
    transform: scale(1);
  }
`;

const cardFlip = keyframes`
  0% { 
    transform: perspective(1000px) rotateY(0deg);
    filter: brightness(1);
  }
  50% { 
    transform: perspective(1000px) rotateY(90deg);
    filter: brightness(1.2);
  }
  100% { 
    transform: perspective(1000px) rotateY(0deg);
    filter: brightness(1);
  }
`;

const shimmer = keyframes`
  0% { 
    transform: translateX(-100%);
    opacity: 0;
  }
  50% { 
    opacity: 1;
  }
  100% { 
    transform: translateX(100%);
    opacity: 0;
  }
`;

const dataPointPulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 0.6;
    filter: brightness(1);
  }
  25% { 
    transform: scale(1.3);
    opacity: 1;
    filter: brightness(1.5);
  }
  50% { 
    transform: scale(0.8);
    opacity: 0.8;
    filter: brightness(1.2);
  }
  75% { 
    transform: scale(1.1);
    opacity: 0.9;
    filter: brightness(1.3);
  }
`;

const orbitRotation = keyframes`
  0% { 
    transform: rotate(0deg) translateX(30px) rotate(0deg);
  }
  100% { 
    transform: rotate(360deg) translateX(30px) rotate(-360deg);
  }
`;

const neumorphismPulse = keyframes`
  0%, 100% {
    box-shadow: 
      8px 8px 16px rgba(0, 0, 0, 0.3),
      -8px -8px 16px rgba(255, 255, 255, 0.05),
      inset 2px 2px 4px rgba(255, 255, 255, 0.1),
      inset -2px -2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 
      12px 12px 24px rgba(0, 0, 0, 0.4),
      -12px -12px 24px rgba(255, 255, 255, 0.08),
      inset 4px 4px 8px rgba(255, 255, 255, 0.15),
      inset -4px -4px 8px rgba(0, 0, 0, 0.4);
  }
`;

const ambientGlow = keyframes`
  0%, 100% {
    filter: brightness(1) saturate(1);
  }
  25% {
    filter: brightness(1.1) saturate(1.2);
  }
  50% {
    filter: brightness(1.2) saturate(1.4);
  }
  75% {
    filter: brightness(1.1) saturate(1.2);
  }
`;

const dynamicLighting = keyframes`
  0% {
    box-shadow: 
      0 0 20px rgba(64, 224, 208, 0.3),
      0 0 40px rgba(64, 224, 208, 0.1),
      inset 0 0 20px rgba(64, 224, 208, 0.05);
  }
  25% {
    box-shadow: 
      0 0 30px rgba(248, 73, 96, 0.3),
      0 0 60px rgba(248, 73, 96, 0.1),
      inset 0 0 30px rgba(248, 73, 96, 0.05);
  }
  50% {
    box-shadow: 
      0 0 25px rgba(188, 221, 222, 0.3),
      0 0 50px rgba(188, 221, 222, 0.1),
      inset 0 0 25px rgba(188, 221, 222, 0.05);
  }
  75% {
    box-shadow: 
      0 0 35px rgba(16, 185, 129, 0.3),
      0 0 70px rgba(16, 185, 129, 0.1),
      inset 0 0 35px rgba(16, 185, 129, 0.05);
  }
  100% {
    box-shadow: 
      0 0 20px rgba(64, 224, 208, 0.3),
      0 0 40px rgba(64, 224, 208, 0.1),
      inset 0 0 20px rgba(64, 224, 208, 0.05);
  }
`;

const colorShift = keyframes`
  0%, 100% {
    background: linear-gradient(135deg, 
      rgba(64, 224, 208, 0.1), 
      rgba(64, 224, 208, 0.05)
    );
  }
  20% {
    background: linear-gradient(135deg, 
      rgba(248, 73, 96, 0.1), 
      rgba(248, 73, 96, 0.05)
    );
  }
  40% {
    background: linear-gradient(135deg, 
      rgba(188, 221, 222, 0.1), 
      rgba(188, 221, 222, 0.05)
    );
  }
  60% {
    background: linear-gradient(135deg, 
      rgba(16, 185, 129, 0.1), 
      rgba(16, 185, 129, 0.05)
    );
  }
  80% {
    background: linear-gradient(135deg, 
      rgba(139, 92, 246, 0.1), 
      rgba(139, 92, 246, 0.05)
    );
  }
`;

// Enhanced particle system
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const AnimatedParticle = styled.div`
  position: absolute;
  background: ${({ color }) => color || '#40e0d0'};
  border-radius: 50%;
  width: ${({ size }) => size || 4}px;
  height: ${({ size }) => size || 4}px;
  animation: ${floatParticle} ${({ duration }) => duration || 8}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  top: ${({ top }) => top || 0}%;
  left: ${({ left }) => left || 0}%;
  opacity: 0.8;
  box-shadow: 0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor;
  filter: brightness(1.5) saturate(1.2);

  ${({ type }) =>
    type === 'glow' &&
    css`
      box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor,
        0 0 80px rgba(64, 224, 208, 0.3);
      animation: ${pulseSoft} 3s ease-in-out infinite;
      filter: brightness(2) saturate(1.5);
    `}

  ${({ type }) =>
    type === 'ring' &&
    css`
      background: transparent;
      border: 3px solid currentColor;
      box-shadow: 0 0 15px currentColor, 0 0 30px currentColor, inset 0 0 15px currentColor;
      animation: ${floatParticle} ${({ duration }) => duration || 6}s ease-in-out infinite;
      filter: brightness(1.8) saturate(1.3);
    `}

  ${({ type }) =>
    type === 'datapoint' &&
    css`
      background: radial-gradient(circle, currentColor, transparent 70%);
      box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
      animation: ${dataPointPulse} 2s ease-in-out infinite;
      filter: brightness(2) saturate(1.5);
    `}

  ${({ type }) =>
    type === 'orbit' &&
    css`
      animation: ${orbitRotation} 8s linear infinite;
      box-shadow: 0 0 8px currentColor, 0 0 16px currentColor;
      filter: brightness(1.5);
    `}
`;

const DataStream = styled.div`
  position: absolute;
  top: ${({ top }) => top || 0}%;
  left: ${({ left }) => left || 0}%;
  width: 3px;
  height: 40px;
  background: linear-gradient(0deg, transparent, #40e0d0, #f84960, #bcddde, transparent);
  animation: ${float} 4s linear infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  border-radius: 2px;
  box-shadow: 0 0 10px #40e0d0, 0 0 20px #40e0d0, 0 0 30px rgba(64, 224, 208, 0.5);
  filter: brightness(1.5) blur(0.5px);
`;

// Animated truck for route visualization
const truckMove = keyframes`
  0% { 
    transform: translateX(-50px) scale(0.8);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateX(calc(100vw + 50px)) scale(0.8);
    opacity: 0;
  }
`;

const AnimatedTruck = styled.div`
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 20px;
  height: 20px;
  color: #40e0d0;
  animation: ${truckMove} 15s linear infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  z-index: 5;
  filter: drop-shadow(0 2px 4px rgba(64, 224, 208, 0.3));

  &::before {
    content: '🚛';
    font-size: 16px;
    display: block;
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;

    &::before {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;

    &::before {
      font-size: 12px;
    }
  }
`;

// Enhanced styled components with dramatic 3D effects
const DashboardInner = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  background: linear-gradient(
    135deg,
    #0a0e1a 0%,
    #1a2332 20%,
    #2d3e50 40%,
    #34495e 70%,
    #3a5a6b 100%
  );
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: visible;
  border-radius: 20px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  perspective: 800px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4), 0 20px 40px rgba(64, 224, 208, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(64, 224, 208, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 70% 80%, rgba(248, 73, 96, 0.05) 0%, transparent 60%);
    z-index: 0;
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 620px;
    padding: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    column-gap: 10px;
    row-gap: 2px;
    border-radius: 8px;
    perspective: 800px;
  }

  @media (max-width: 480px) {
    padding: 7px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    column-gap: 7px;
    row-gap: 2px;
    min-height: 580px;
    perspective: 600px;
  }

  @media (max-width: 360px) {
    padding: 5px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto auto auto;
    column-gap: 0px;
    row-gap: 2px;
    min-height: 580px;
    perspective: 400px;
  }
`;

const Card = styled.div`
  background: rgba(26, 35, 50, 0.85);
  backdrop-filter: blur(30px) saturate(1.5);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 8px 15px rgba(64, 224, 208, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  min-height: 240px;
  transform-style: preserve-3d;
  z-index: 2;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #40e0d0, #20b2aa);
    border-radius: 20px 20px 0 0;
    z-index: 1;
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.05) 0%,
      transparent 30%,
      transparent 70%,
      rgba(248, 73, 96, 0.03) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    border-radius: 20px;
  }

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px rgba(64, 224, 208, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: rgba(64, 224, 208, 0.3);
    background: rgba(26, 35, 50, 0.95);

    &::after {
      opacity: 1;
    }
  }

  /* Subtle depth without distracting animations */
  &:nth-child(1) {
    transform: translateZ(5px);
  }

  &:nth-child(2) {
    transform: translateZ(10px);
  }

  &:nth-child(3) {
    transform: translateZ(8px);
  }

  &:nth-child(4) {
    transform: translateZ(12px);
  }

  &:nth-child(5) {
    transform: translateZ(6px);
  }

  &:nth-child(6) {
    transform: translateZ(15px);
  }

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 12px;
    min-height: 200px;
    max-height: 200px;
    margin: 0;

    &:nth-child(n) {
      transform: translateZ(0px);
    }

    &:hover {
      transform: translateY(-4px) rotateX(2deg);
      box-shadow: 0 12px 36px rgba(64, 224, 208, 0.15);
    }
  }

  @media (max-width: 480px) {
    padding: 13px;
    border-radius: 10px;
    min-height: 185px;
    max-height: 185px;
    margin: 0;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(64, 224, 208, 0.1);
    }
  }

  @media (max-width: 360px) {
    padding: 11px;
    border-radius: 8px;
    min-height: 170px;
    max-height: 170px;
    margin: 0;

    &:hover {
      transform: none;
    }
  }
`;

const CardHoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 35, 50, 0.95);
  backdrop-filter: blur(30px) saturate(1.5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 10;
  cursor: pointer;
  border: 2px solid transparent;
  transform: scale(0.9) rotateY(180deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);

  ${Card}:hover & {
    opacity: 1;
    visibility: visible;
    border-color: rgba(64, 224, 208, 0.6);
    background: rgba(26, 35, 50, 0.98);
    transform: scale(1) rotateY(0deg);
    box-shadow: 0 30px 60px rgba(64, 224, 208, 0.2), 0 15px 30px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:hover {
    background: rgba(26, 35, 50, 1);
    border-color: rgba(64, 224, 208, 0.8);
    transform: scale(1.05) rotateY(0deg);
    animation: ${glowPulse} 2s ease-in-out infinite;
    box-shadow: 0 40px 80px rgba(64, 224, 208, 0.3), 0 20px 40px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    border-radius: 12px;

    &:hover {
      transform: scale(1.01);
    }
  }

  @media (max-width: 480px) {
    border-radius: 8px;

    &:hover {
      transform: none;
    }
  }
`;

const CardHoverTitle = styled.div`
  color: #40e0d0;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${slideInUp} 0.5s ease-out;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.5);

  ${CardHoverOverlay}:hover & {
    animation: ${pulseSoft} 1.5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    letter-spacing: 0.5px;
  }
`;

// Enhanced glassmorphism background with neumorphism
const GlassmorphismBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(64, 224, 208, 0.12) 0%,
    rgba(248, 73, 96, 0.08) 25%,
    rgba(188, 221, 222, 0.1) 50%,
    rgba(64, 224, 208, 0.06) 75%,
    rgba(248, 73, 96, 0.05) 100%
  );
  backdrop-filter: blur(50px) saturate(1.5) brightness(1.1);
  border-radius: 20px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  animation: ${ambientGlow} 6s ease-in-out infinite;

  ${Card}:hover & {
    opacity: 1;
    backdrop-filter: blur(60px) saturate(1.8) brightness(1.2);
    background: linear-gradient(
      135deg,
      rgba(64, 224, 208, 0.18) 0%,
      rgba(248, 73, 96, 0.12) 25%,
      rgba(188, 221, 222, 0.15) 50%,
      rgba(64, 224, 208, 0.1) 75%,
      rgba(248, 73, 96, 0.08) 100%
    );
  }
`;

// Neumorphism overlay for enhanced depth
const NeumorphismOverlay = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background: linear-gradient(145deg, rgba(26, 35, 50, 0.9), rgba(26, 35, 50, 0.7));
  border-radius: 16px;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  animation: ${neumorphismPulse} 4s ease-in-out infinite;

  ${Card}:hover & {
    opacity: 0.3;
  }
`;

// Dynamic ambient lighting component
const AmbientLighting = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 30px;
  opacity: 0.6;
  z-index: -1;
  animation: ${dynamicLighting} 10s ease-in-out infinite;
  filter: blur(15px);
  pointer-events: none;

  ${Card}:hover & {
    opacity: 0.8;
    animation: ${dynamicLighting} 6s ease-in-out infinite;
    filter: blur(20px);
  }
`;

// Data-responsive lighting
const DataResponsiveLighting = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  opacity: ${({ intensity = 0.3 }) => intensity};
  background: ${({ color = '#40e0d0' }) => `
    radial-gradient(circle at 30% 30%, ${color}20 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, ${color}15 0%, transparent 50%)
  `};
  animation: ${ambientGlow} ${({ duration = 8 }) => duration}s ease-in-out infinite;
  z-index: 0;
  pointer-events: none;
  filter: blur(2px);

  ${Card}:hover & {
    opacity: ${({ intensity = 0.3 }) => intensity + 0.2};
    filter: blur(3px);
  }
`;

const CardTitle = styled.div`
  color: #f1f5f9;
  font-size: 14px; /* Reduced from 16px */
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 10px; /* Reduced from 12px */
  display: flex;
  align-items: center;
  gap: 5px; /* Reduced from 6px */

  @media (max-width: 768px) {
    font-size: 12px; /* Reduced from 14px */
    margin-bottom: 8px; /* Reduced from 10px */
    gap: 3px; /* Reduced from 4px */
  }

  @media (max-width: 480px) {
    font-size: 11px; /* Reduced from 13px */
    margin-bottom: 6px; /* Reduced from 8px */
    gap: 2px; /* Reduced from 3px */
  }
`;

const MetricValue = styled.div`
  font-size: 24px; /* Reduced from 28px */
  font-weight: 800;
  color: #40e0d0;
  margin-bottom: 6px; /* Reduced from 8px */
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    font-size: 20px; /* Reduced from 24px */
    margin-bottom: 4px; /* Reduced from 6px */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Reduced from 20px */
    margin-bottom: 3px; /* Reduced from 4px */
  }
`;

const MetricChange = styled.div`
  font-size: 10px; /* Reduced from 12px */
  color: #40e0d0;
  display: flex;
  align-items: center;
  gap: 3px; /* Reduced from 4px */

  @media (max-width: 768px) {
    font-size: 9px; /* Reduced from 11px */
    gap: 2px; /* Reduced from 3px */
  }

  @media (max-width: 480px) {
    font-size: 8px; /* Reduced from 10px */
    gap: 1px; /* Reduced from 2px */
  }
`;

const ChartContainer = styled.div`
  height: 100px; /* Increased from 80px */
  position: relative;
  margin-top: 10px; /* Reduced from 12px */

  @media (max-width: 768px) {
    height: 85px; /* Increased from 70px */
    margin-top: 8px; /* Reduced from 10px */
  }

  @media (max-width: 480px) {
    height: 75px; /* Increased from 60px */
    margin-top: 6px; /* Reduced from 8px */
  }
`;

const ChartBar = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(64, 224, 208, 0.8), rgba(64, 224, 208, 0.3));
  border-radius: 3px 3px 0 0;
  animation: ${growUp} 1.5s ease-out;
  animation-delay: ${(props) => props.delay || '0s'};
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const ChartLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #40e0d0, #20b2aa);
  border-radius: 1px;
  animation: ${drawLine} 2s ease-out;
  animation-delay: ${(props) => props.delay || '0s'};
  top: ${(props) => props.top};
`;

const DataPoint = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #40e0d0;
  border-radius: 50%;
  border: 1px solid rgba(64, 224, 208, 0.3);
  animation: ${fadeInScale} 0.8s ease-out;
  animation-delay: ${(props) => props.delay || '0s'};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(64, 224, 208, 0.3);
  border-radius: 50%;
  animation: ${float} 15s linear infinite;
  left: ${(props) => props.left};
  animation-delay: ${(props) => props.delay};
  animation-duration: ${(props) => props.duration};
`;

const GlowEffect = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(64, 224, 208, 0.05) 0%, transparent 70%);
  animation: ${rotate} 20s linear infinite;
`;

// Add new styled components for the safety scoring interface
const SafetyScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 0px;

  @media (max-width: 768px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    gap: 2px;
  }
`;

const ScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;

  @media (max-width: 480px) {
    margin-bottom: 1px;
  }
`;

const ScoreTitle = styled.div`
  color: #f1f5f9;
  font-size: 14px; /* Reduced from 16px */
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px; /* Reduced from 14px */
  }

  @media (max-width: 480px) {
    font-size: 10px; /* Reduced from 12px */
  }
`;

const ScoreBadge = styled.div`
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
  padding: 1px 5px; /* Reduced from 1px 6px */
  border-radius: 50%;
  font-size: 7px; /* Reduced from 8px */
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 6px; /* Reduced from 7px */
    padding: 1px 4px; /* Reduced from 1px 5px */
  }

  @media (max-width: 480px) {
    font-size: 5px; /* Reduced from 6px */
    padding: 1px 3px; /* Reduced from 1px 4px */
  }
`;

const ScoreValue = styled.div`
  font-size: 28px; /* Reduced from 34px */
  font-weight: 800;
  color: #fb923c;
  text-align: center;
  margin: 10px 0; /* Reduced from 12px 0 */

  @media (max-width: 768px) {
    font-size: 24px; /* Reduced from 28px */
    margin: 8px 0; /* Reduced from 10px 0 */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Reduced from 22px */
    margin: 5px 0; /* Reduced from 6px 0 */
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  margin: 4px 0 2px 0;

  @media (max-width: 768px) {
    margin: 3px 0 2px 0;
  }

  @media (max-width: 480px) {
    margin: 2px 0 1px 0;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
  overflow: hidden;

  @media (max-width: 480px) {
    height: 3px;
  }
`;

const ProgressFill = styled.div`
  width: 64%;
  height: 100%;
  background: linear-gradient(90deg, #fb923c, #f59e0b);
  border-radius: 2px;
  transition: width 1s ease-out;
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  font-size: 7px; /* Reduced from 8px */
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 6px; /* Reduced from 7px */
    margin-top: 1px;
  }

  @media (max-width: 480px) {
    font-size: 5px; /* Reduced from 6px */
    margin-top: 1px;
  }
`;

const GradeContainer = styled.div`
  text-align: center;
  margin-top: 2px;

  @media (max-width: 480px) {
    margin-top: 1px;
  }
`;

const Grade = styled.div`
  font-size: 18px; /* Reduced from 22px */
  font-weight: 800;
  color: #ea580c;
  margin-bottom: 1px;

  @media (max-width: 768px) {
    font-size: 15px; /* Reduced from 18px */
  }

  @media (max-width: 480px) {
    font-size: 13px; /* Reduced from 16px */
    margin-bottom: 0px;
  }
`;

const GradeLabel = styled.div`
  font-size: 7px; /* Reduced from 8px */
  color: #94a3b8;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 6px; /* Reduced from 7px */
  }

  @media (max-width: 480px) {
    font-size: 5px; /* Reduced from 6px */
  }
`;

// Add new styled components for Lens card with fixed dimensions
const LensContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 4px;
    height: 100%;
    min-height: 160px;
  }

  @media (max-width: 480px) {
    gap: 3px;
    height: 100%;
    min-height: 150px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 65%; /* Increased from 60% */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 65%; /* Increased from 60% */
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    height: 60%; /* Increased from 55% */
    flex-shrink: 0;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const RankNumber = styled.span`
  color: ${(props) =>
    props.direction === 'up' ? '#10b981' : props.direction === 'down' ? '#ef4444' : '#40e0d0'};
  font-weight: 700;
  min-width: 20px;
  max-width: 20px;
  width: 20px;
  font-size: inherit;
  flex-shrink: 0;
  text-align: left;
  overflow: visible;

  @media (max-width: 768px) {
    min-width: 18px;
    max-width: 18px;
    width: 18px;
  }

  @media (max-width: 480px) {
    min-width: 16px;
    max-width: 16px;
    width: 16px;
  }
`;

const RankChange = styled.span`
  color: ${(props) => (props.direction === 'up' ? '#10b981' : '#ef4444')};
  font-weight: 600;
  min-width: 50px;
  max-width: 50px;
  width: 50px;
  font-size: inherit;
  flex-shrink: 0;
  text-align: right;
  overflow: visible;
  white-space: nowrap;

  @media (max-width: 768px) {
    min-width: 45px;
    max-width: 45px;
    width: 45px;
  }

  @media (max-width: 480px) {
    min-width: 40px;
    max-width: 40px;
    width: 40px;
  }
`;

const LocationName = styled.span`
  color: #cbd5e1;
  font-weight: 500;
  font-size: 10px; /* Reduced from 12px */
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;

  @media (max-width: 480px) {
    font-size: 8px; /* Reduced from 10px */
  }
`;

// Add new styled components for fetching state
const FetchingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 56px;
  max-height: 56px;
  min-height: 56px;
  width: 100%;
  padding: 4px 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    height: auto;
    max-height: none;
    min-height: auto;
    padding: 2px 0;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    padding: 1px 0;
    margin-top: 4px;
  }
`;

const FetchingText = styled.div`
  color: #40e0d0;
  font-size: 9px; /* Reduced from 11px */
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px; /* Reduced from 8px */
  text-transform: uppercase;
  letter-spacing: 0.4px; /* Reduced from 0.5px */
  text-shadow: 0 1px 3px rgba(64, 224, 208, 0.3);
  width: 100%;

  @media (max-width: 768px) {
    font-size: 8px; /* Reduced from 10px */
    margin-bottom: 4px; /* Reduced from 6px */
    letter-spacing: 0.2px; /* Reduced from 0.3px */
  }

  @media (max-width: 480px) {
    font-size: 7px; /* Reduced from 9px */
    margin-bottom: 3px; /* Reduced from 4px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px; /* Increased gap between dots */
  justify-content: center;
  align-items: center;

  .dot {
    width: 5px; /* Slightly larger dots */
    height: 5px;
    background: radial-gradient(circle, #40e0d0, #20b2aa);
    border-radius: 50%;
    animation: ${pulse} 1.4s infinite ease-in-out, ${neumorphismPulse} 2s infinite ease-in-out;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.05),
      0 0 8px rgba(64, 224, 208, 0.5);
    filter: brightness(1.2) saturate(1.3);

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @media (max-width: 768px) {
    gap: 3px;

    .dot {
      width: 4px;
      height: 4px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.05),
        0 0 6px rgba(64, 224, 208, 0.5);
    }
  }

  @media (max-width: 480px) {
    .dot {
      width: 3px;
      height: 3px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25), 0 0 4px rgba(64, 224, 208, 0.4);
    }
  }
`;
const MetricLabel = styled.span`
  color: #94a3b8;
  font-size: 8px; /* Reduced from 9px */
  font-weight: 600;
  min-width: 32px; /* Reduced from 35px */
  max-width: 32px;
  width: 32px;
  text-transform: uppercase;
  letter-spacing: 0.2px; /* Reduced from 0.3px */
  flex-shrink: 0;
`;

const LoadMetricValue = styled.span`
  color: #40e0d0;
  font-size: 7px; /* Reduced from 8px */
  font-weight: 700;
  min-width: 0;
  max-width: 75px; /* Reduced from 80px */
  width: auto;
  text-align: right;
  text-shadow: 0 1px 2px rgba(64, 224, 208, 0.3);
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;

  @media (max-width: 768px) {
    max-width: 55px; /* Reduced from 60px */
    font-size: 6px; /* Reduced from 7px */
  }

  @media (max-width: 480px) {
    max-width: 40px; /* Reduced from 45px */
    font-size: 5px; /* Reduced from 6px */
  }
`;

const ChromeIcon = styled.div`
  width: 75px; /* Increased from 60px */
  height: 75px; /* Increased from 60px */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 8px 32px rgba(66, 133, 244, 0.3))
    drop-shadow(0 4px 16px rgba(234, 67, 53, 0.2));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 12px 48px rgba(66, 133, 244, 0.4))
      drop-shadow(0 6px 24px rgba(234, 67, 53, 0.3));
  }

  @media (max-width: 768px) {
    width: 55px; /* Increased from 45px */
    height: 55px; /* Increased from 45px */

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    width: 45px; /* Increased from 35px */
    height: 45px; /* Increased from 35px */

    &:hover {
      transform: none;
    }
  }
`;

const ChromeSVG = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${rotate} 20s linear infinite;

  .chrome-center {
    fill: #1a73e8;
  }

  .chrome-red {
    fill: #e33b2e;
  }

  .chrome-green {
    fill: #229342;
  }

  .chrome-yellow {
    fill: #fbc116;
  }

  .chrome-white {
    fill: #ffffff;
  }

  &:hover {
    .chrome-center {
      fill: #1557b0;
    }
    .chrome-red {
      fill: #c62d20;
    }
    .chrome-green {
      fill: #1e7e3a;
    }
    .chrome-yellow {
      fill: #e6a914;
    }
  }
`;

const ExtensionGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px; /* Increased from 120px */
  height: 150px; /* Increased from 120px */
  background: radial-gradient(
    circle,
    rgba(0, 128, 128, 0.1) 0%,
    rgba(248, 73, 96, 0.05) 50%,
    transparent 70%
  );
  border-radius: 50%;
  animation: ${pulse} 3s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 120px; /* Increased from 100px */
    height: 120px; /* Increased from 100px */
  }

  @media (max-width: 480px) {
    width: 90px; /* Increased from 70px */
    height: 90px; /* Increased from 70px */
  }
`;

const TMSLogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const TMSLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 16px rgba(64, 224, 208, 0.2));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 24px rgba(64, 224, 208, 0.3));
  }

  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none;
    }
  }
`;

const TMSLogoSVG = styled.svg`
  width: 45px; /* Increased from 35px */
  height: 30px; /* Increased from 24px */

  .st0 {
    fill: #008080;
  }

  .st1 {
    fill: #f84960;
  }

  .st2 {
    fill: #bcddde;
  }

  @media (max-width: 768px) {
    width: 38px; /* Increased from 30px */
    height: 25px; /* Increased from 20px */
  }

  @media (max-width: 480px) {
    width: 32px; /* Increased from 25px */
    height: 22px; /* Increased from 17px */
  }
`;

const TMSBrandText = styled.div`
  color: #40e0d0;
  font-size: 20px; /* Reduced from 24px */
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.2px; /* Reduced from 0.3px */
  text-shadow: 0 2px 8px rgba(64, 224, 208, 0.3);
  margin-left: 5px; /* Reduced from 6px */

  @media (max-width: 768px) {
    font-size: 17px; /* Reduced from 20px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
    margin-left: 3px; /* Reduced from 4px */
  }

  @media (max-width: 480px) {
    font-size: 14px; /* Reduced from 16px */
    letter-spacing: 0.05px; /* Reduced from 0.1px */
    margin-left: 2px; /* Reduced from 3px */
  }
`;

const TMSGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px; /* Increased from 100px */
  height: 130px; /* Increased from 100px */
  background: radial-gradient(
    circle,
    rgba(64, 224, 208, 0.1) 0%,
    rgba(248, 73, 96, 0.05) 50%,
    transparent 70%
  );
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 100px; /* Increased from 80px */
    height: 100px; /* Increased from 80px */
  }

  @media (max-width: 480px) {
    width: 80px; /* Increased from 60px */
    height: 80px; /* Increased from 60px */
  }
`;

// Add new styled components for the CRM card redesign
const CRMContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 8px 0;
  }

  @media (max-width: 480px) {
    padding: 6px 0;
  }
`;

const CRMTitle = styled.div`
  color: #f1f5f9;
  font-size: 12px; /* Reduced from 14px */
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px; /* Reduced from 8px */
  text-transform: uppercase;
  letter-spacing: 0.4px; /* Reduced from 0.5px */

  @media (max-width: 768px) {
    font-size: 10px; /* Reduced from 12px */
    margin-bottom: 4px; /* Reduced from 6px */
    letter-spacing: 0.2px; /* Reduced from 0.3px */
  }

  @media (max-width: 480px) {
    font-size: 9px; /* Reduced from 11px */
    margin-bottom: 3px; /* Reduced from 4px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
  }
`;

const CRMLogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const CRMLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 16px rgba(64, 224, 208, 0.2));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 24px rgba(64, 224, 208, 0.3));
  }

  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    &:hover {
      transform: none;
    }
  }
`;

const CRMLogoSVG = styled.svg`
  width: 45px; /* Increased from 35px */
  height: 30px; /* Increased from 24px */

  .st0 {
    fill: #008080;
  }

  .st1 {
    fill: #f84960;
  }

  .st2 {
    fill: #bcddde;
  }

  @media (max-width: 768px) {
    width: 38px; /* Increased from 30px */
    height: 25px; /* Increased from 20px */
  }

  @media (max-width: 480px) {
    width: 32px; /* Increased from 25px */
    height: 22px; /* Increased from 17px */
  }
`;

const CRMBrandText = styled.div`
  color: #40e0d0;
  font-size: 20px; /* Reduced from 24px */
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.2px; /* Reduced from 0.3px */
  text-shadow: 0 2px 8px rgba(64, 224, 208, 0.3);
  margin-left: 5px; /* Reduced from 6px */

  @media (max-width: 768px) {
    font-size: 17px; /* Reduced from 20px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
    margin-left: 3px; /* Reduced from 4px */
  }

  @media (max-width: 480px) {
    font-size: 14px; /* Reduced from 16px */
    letter-spacing: 0.05px; /* Reduced from 0.1px */
    margin-left: 2px; /* Reduced from 3px */
  }
`;

const CRMSubtitle = styled.div`
  color: #cbd5e1;
  font-size: 10px; /* Reduced from 12px */
  font-weight: 600;
  text-align: center;
  margin-top: 6px; /* Reduced from 8px */
  text-transform: lowercase;
  letter-spacing: 0.2px; /* Reduced from 0.3px */

  @media (max-width: 768px) {
    font-size: 8px; /* Reduced from 10px */
    margin-top: 4px; /* Reduced from 6px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
  }

  @media (max-width: 480px) {
    font-size: 7px; /* Reduced from 9px */
    margin-top: 3px; /* Reduced from 4px */
    letter-spacing: 0.05px; /* Reduced from 0.1px */
  }
`;

const CRMGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px; /* Increased from 100px */
  height: 130px; /* Increased from 100px */
  background: radial-gradient(
    circle,
    rgba(64, 224, 208, 0.1) 0%,
    rgba(248, 73, 96, 0.05) 50%,
    transparent 70%
  );
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 100px; /* Increased from 80px */
    height: 100px; /* Increased from 80px */
  }

  @media (max-width: 480px) {
    width: 80px; /* Increased from 60px */
    height: 80px; /* Increased from 60px */
  }
`;

// New styled component for the modified score header layout
const ModifiedScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    margin-bottom: 4px;
  }
`;

const ScoreValueInline = styled.div`
  font-size: 28px; /* Reduced from 34px */
  font-weight: 800;
  color: #fb923c;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px; /* Reduced from 28px */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Reduced from 22px */
  }
`;

const ValueBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0px; /* Remove gap between 64 and Moderate */

  @media (max-width: 768px) {
    gap: 0px;
  }

  @media (max-width: 480px) {
    gap: 0px;
  }
`;

// Create a new bottom label component
const BottomLabel = styled.div`
  font-size: 7px; /* Reduced from 8px */
  color: #94a3b8;
  font-weight: 500;
  text-align: center;
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 6px; /* Reduced from 7px */
  }

  @media (max-width: 480px) {
    font-size: 5px; /* Reduced from 6px */
  }
`;

// Add new styled components for colored text spans
const CRMColoredText = styled.span`
  color: #fb923c;
`;

const TMSColoredText = styled.span`
  color: #f64673;
`;

const ExtensionColoredText = styled.span`
  color: #2d7a73; /* Dark teal color */
  margin-left: 4px;
`;

// Modified Chrome Icon Container to handle both icons
const ModifiedIconContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

// Firefox Icon Component
const FirefoxIcon = styled.div`
  width: 75px; /* Increased from 60px */
  height: 75px; /* Increased from 60px */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 16px rgba(255, 113, 57, 0.2));

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 24px rgba(255, 113, 57, 0.3));

    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 55px; /* Increased from 45px */
    height: 55px; /* Increased from 45px */

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    width: 45px; /* Increased from 35px */
    height: 45px; /* Increased from 35px */

    &:hover {
      transform: none;
    }
  }
`;

// Add new styled components for consistent bottom card layout
const BottomCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 8px 0;
  }

  @media (max-width: 480px) {
    padding: 6px 0;
  }
`;

const BottomCardTitle = styled.div`
  color: #f1f5f9;
  font-size: 12px; /* Reduced from 14px */
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px; /* Reduced from 8px */
  text-transform: uppercase;
  letter-spacing: 0.4px; /* Reduced from 0.5px */
  min-height: 16px; /* Reduced from 18px */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 10px; /* Reduced from 12px */
    margin-bottom: 4px; /* Reduced from 6px */
    letter-spacing: 0.2px; /* Reduced from 0.3px */
    min-height: 14px; /* Reduced from 16px */
  }

  @media (max-width: 480px) {
    font-size: 9px; /* Reduced from 11px */
    margin-bottom: 3px; /* Reduced from 4px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
    min-height: 12px; /* Reduced from 14px */
  }
`;

const BottomCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  width: 100%;
`;

const BottomCardSubtitle = styled.div`
  color: #cbd5e1;
  font-size: 10px; /* Reduced from 12px */
  font-weight: 600;
  text-align: center;
  margin-top: 6px; /* Reduced from 8px */
  text-transform: lowercase;
  letter-spacing: 0.2px; /* Reduced from 0.3px */
  min-height: 14px; /* Reduced from 16px */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 8px; /* Reduced from 10px */
    margin-top: 4px; /* Reduced from 6px */
    letter-spacing: 0.1px; /* Reduced from 0.2px */
    min-height: 12px; /* Reduced from 14px */
  }

  @media (max-width: 480px) {
    font-size: 7px; /* Reduced from 9px */
    margin-top: 3px; /* Reduced from 4px */
    letter-spacing: 0.05px; /* Reduced from 0.1px */
    min-height: 10px; /* Reduced from 12px */
  }
`;

// Add new styled component for the Grade text in Sentinel card
const SentinelGrade = styled.div`
  font-size: 26px; /* Reduced from 32px */
  font-weight: 800;
  color: #ea580c;
  margin-top: 3px; /* Reduced from 4px */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px; /* Reduced from 28px */
    margin-top: 2px; /* Reduced from 3px */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Reduced from 24px */
    margin-top: 1px; /* Reduced from 2px */
  }
`;

const SentinelScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const SentinelScoreHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

// Add new styled components for the redesigned Driver App card
const LoadScoreTitle = styled.div`
  color: #f1f5f9;
  font-size: 12px; /* Reduced from 14px */
  font-weight: 600;
  text-align: center;
  margin: 4px 0 0px 0; /* Reduced from 6px 0 0px 0 */
  text-transform: uppercase;
  letter-spacing: 0.4px; /* Reduced from 0.5px */
`;

const LoadScoreSpan = styled.span`
  color: #2d7a73; /* Dark teal color for "Score" */
`;

// Modified LoadMatchContainer for new layout
const RedesignedLoadMatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0px;
  position: relative;
  padding: 0px 8px 8px 8px;
  z-index: 2;
  align-items: center;
  justify-content: flex-start;
  margin-top: -4px;

  @media (max-width: 768px) {
    height: 100%;
    max-height: 148px;
    overflow: hidden;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    height: 100%;
    max-height: 146px;
    overflow: hidden;
    justify-content: space-between;
  }

  @media (max-width: 360px) {
    height: 100%;
    max-height: 140px;
    overflow: hidden;
    justify-content: space-between;
  }
`;

// Dynamic Pie Chart with percentage-based arc and large text
const AnimatedPieChart = styled.div`
  width: 85px; /* Increased from 70px */
  height: 85px; /* Increased from 70px */
  border-radius: 50%;
  position: relative;
  background: conic-gradient(
    from 0deg,
    #b8d4e3 0deg,
    #b8d4e3 ${(props) => (props.score || 0) * 3.6}deg,
    transparent ${(props) => (props.score || 0) * 3.6}deg,
    transparent 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0px;
  flex-shrink: 0;
  transition: all 0.1s ease-out;
  transform: scale(1);
  box-shadow: 0 4px 16px rgba(184, 212, 227, 0.2);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 24px rgba(184, 212, 227, 0.3);
  }

  &::before {
    content: '${(props) => props.score || 0}%';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px; /* Reduced from 52px */
    font-weight: 900;
    color: ${(props) => {
      const score = props.score || 0;
      if (score >= 80) return '#2c8b7d';
      if (score >= 60) return '#f59e0b';
      if (score >= 40) return '#fb923c';
      return '#dc2626';
    }};
    z-index: 2;
    transition: color 0.2s ease-out;
    letter-spacing: -1px;
    line-height: 1;
  }

  @media (max-width: 768px) {
    width: 110px; /* Increased from 100px */
    height: 110px; /* Increased from 100px */
    margin-bottom: 3px; /* Reduced from 4px */
    margin-top: 18px; /* Reduced from 20px */

    &::before {
      font-size: 32px; /* Reduced from 36px */
    }
  }

  @media (max-width: 480px) {
    width: 95px; /* Increased from 85px */
    height: 95px; /* Increased from 85px */
    margin-bottom: 1px; /* Reduced from 2px */
    margin-top: 22px; /* Reduced from 25px */

    &::before {
      font-size: 28px; /* Reduced from 32px */
    }
  }

  @media (max-width: 360px) {
    width: 85px; /* Increased from 75px */
    height: 85px; /* Increased from 75px */
    margin-bottom: 0px; /* Reduced from 1px */
    margin-top: 26px; /* Reduced from 30px */

    &::before {
      font-size: 24px; /* Reduced from 28px */
    }
  }
`;

// Modified MetricsGrid with reduced spacing
const CompactMetricsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  margin-top: 0px;
  justify-content: flex-start;
  height: auto;
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 0;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    display: none;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;

// Modified MetricRow with reduced spacing
const CompactMetricRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  min-width: 0;
  min-height: 16px;
  text-align: left;
  background: transparent;
  border-radius: 0px;
  padding: 0px 0px;
  border: none;
  margin: 0px;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    min-height: 12px;
    padding: 0px 0px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    min-height: 8px;
    padding: 0px 0px;
    margin: -1px 0px;
    gap: 4px;
  }

  @media (max-width: 360px) {
    min-height: 6px;
    padding: 0px 0px;
    margin: -2px 0px;
    gap: 3px;
  }
`;

// Modified MetricBar - thinner bars with consistent left alignment
const CompactMetricBar = styled.div`
  flex: 1 1 0%;
  min-width: 0;
  height: 4px;
  background: rgba(100, 116, 139, 0.15);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  max-width: 120px;

  &:hover {
    height: 5px;
    background: rgba(100, 116, 139, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 80px;
  }

  @media (max-width: 480px) {
    max-width: 30px;
  }

  @media (max-width: 360px) {
    max-width: 20px;
  }
`;

// Enhanced MetricFill with interactive animations, tooltips, and dynamic lighting
const CompactMetricFill = styled.div`
  height: 100%;
  background: ${(props) => props.color || 'linear-gradient(90deg, #40e0d0, #20b2aa)'};
  border-radius: 2px;
  width: ${(props) => props.width}%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-origin: left;
  overflow: visible;
  box-shadow: 0 0 8px rgba(64, 224, 208, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${ambientGlow} 6s ease-in-out infinite;

  &::before {
    content: '${(props) => props.width}%';
    position: absolute;
    top: -25px;
    right: -8px;
    background: rgba(26, 35, 50, 0.95);
    color: #40e0d0;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    opacity: 0;
    visibility: hidden;
    transform: translateY(5px) scale(0.8);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(64, 224, 208, 0.2);
    white-space: nowrap;
    pointer-events: none;
    z-index: 100;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 0 2px 2px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }

  ${CompactMetricBar}:hover & {
    transform: scaleX(1.02) scaleY(1.1);
    filter: brightness(1.3) saturate(1.4);
    box-shadow: 0 0 20px rgba(64, 224, 208, 0.6), 0 0 40px rgba(64, 224, 208, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    animation: ${dynamicLighting} 3s ease-in-out infinite;

    &::before {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(64, 224, 208, 0.5);
    }

    &::after {
      opacity: 1;
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.5), inset 0 0 4px rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: 768px) {
    &::before {
      font-size: 9px;
      padding: 3px 6px;
      top: -22px;
      right: -6px;
    }
  }

  @media (max-width: 480px) {
    &::before {
      font-size: 8px;
      padding: 2px 4px;
      top: -20px;
      right: -4px;
    }
  }
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  position: relative;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.isTransitioning ? 0.3 : 1)};
  height: 56px;
  max-height: 56px;
  min-height: 56px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 4px 0;

  @media (max-width: 768px) {
    height: auto;
    max-height: none;
    min-height: auto;
    gap: 4px;
    padding: 2px 0;
    flex: 1;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    gap: 2px;
    padding: 1px 0;
    margin-top: 4px;
    flex: 1;
    height: auto;
    min-height: auto;
    max-height: none;
  }
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* Reduced from 6px */
  font-size: 9px; /* Reduced from 11px */
  color: #e2e8f0;
  padding: 5px 6px; /* Reduced from 6px 8px */
  border-radius: 4px;
  background: ${(props) => (props.striped ? 'rgba(64, 224, 208, 0.08)' : 'transparent')};
  margin: 0 auto;
  width: 75%;
  max-width: 180px;
  min-height: 18px; /* Reduced from 20px */
  height: 18px; /* Reduced from 20px */
  max-height: 18px; /* Reduced from 20px */
  flex-shrink: 0;
  overflow: visible;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.isTransitioning ? 0 : 1)};
  transform: translateX(${(props) => (props.isTransitioning ? '-10px' : '0')});
  animation: ${fadeInScale} 0.8s ease-out;
  animation-fill-mode: both;
  justify-content: flex-start;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:hover {
    background: ${(props) =>
      props.striped ? 'rgba(64, 224, 208, 0.15)' : 'rgba(64, 224, 208, 0.08)'};
    transform: translateX(${(props) => (props.isTransitioning ? '-10px' : '2px')});
    box-shadow: 0 2px 8px rgba(64, 224, 208, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 8px; /* Reduced from 10px */
    padding: 3px 4px; /* Reduced from 4px 6px */
    gap: 3px; /* Reduced from 4px */
    min-height: 16px; /* Reduced from 18px */
    height: 16px; /* Reduced from 18px */
    max-height: 16px; /* Reduced from 18px */
    width: 85%;
    max-width: 100%;
    border-radius: 3px;
    flex: none;
  }

  @media (max-width: 480px) {
    font-size: 7px; /* Reduced from 9px */
    padding: 2px 3px; /* Reduced from 3px 4px */
    gap: 2px; /* Reduced from 3px */
    min-height: 14px; /* Reduced from 16px */
    height: 14px; /* Reduced from 16px */
    max-height: 14px; /* Reduced from 16px */
    width: 90%;
    max-width: 100%;
    border-radius: 2px;
    flex: none;
  }
`;

const DashboardArtifact = () => {
  const containerRef = useRef(null);
  // Add refs to track timeout IDs for proper cleanup
  const timeoutRefs = useRef([]);
  const animationTimeoutRef = useRef(null);

  // Enhanced state with real-time data streaming
  const [loadData, setLoadData] = useState({
    score: 38,
    rate: { value: 28, label: 'poor' },
    tolls: { value: 22, label: '$25' },
    fuel: { value: 45, label: '$4.15/gal' },
    times: { value: 25, label: 'poor' },
    bh: { value: 15, label: 'very hot' },
  });
  const [animationPhase, setAnimationPhase] = useState(0);
  const [displayedLocations, setDisplayedLocations] = useState([
    { rank: 11, change: '↑11', location: 'Tifton, GA', percentage: '+17.06%', direction: 'up' },
    { rank: 9, change: '↓9', location: 'Saginaw, MI', percentage: '-0.38%', direction: 'down' },
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingMessageIndex, setFetchingMessageIndex] = useState(0);

  // Real-time metrics state for live updates
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    activeLoads: 2847,
    totalRevenue: 485720,
    avgRate: 2.85,
    efficiency: 94.2,
  });

  // Animated counter hook for smooth number transitions
  const useAnimatedCounter = (targetValue, duration = 2000) => {
    const [currentValue, setCurrentValue] = useState(0);
    const counterRef = useRef(null);

    useEffect(() => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }

      const startValue = currentValue;
      const difference = targetValue - startValue;
      const increment = difference / (duration / 16); // 60fps

      counterRef.current = setInterval(() => {
        setCurrentValue((prev) => {
          const newValue = prev + increment;
          if (
            (increment > 0 && newValue >= targetValue) ||
            (increment < 0 && newValue <= targetValue)
          ) {
            clearInterval(counterRef.current);
            return targetValue;
          }
          return newValue;
        });
      }, 16);

      return () => {
        if (counterRef.current) {
          clearInterval(counterRef.current);
        }
      };
    }, [targetValue, duration]);

    return Math.round(currentValue);
  };

  // Smooth real-time data simulation
  useEffect(() => {
    const smoothUpdateInterval = setInterval(() => {
      // Simulate real-time metric updates with smoother changes
      setRealtimeMetrics((prev) => ({
        activeLoads: prev.activeLoads + Math.floor(Math.random() * 10 - 5),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 2500 - 1250),
        avgRate: Math.max(1.5, Math.min(4.5, prev.avgRate + (Math.random() * 0.1 - 0.05))),
        efficiency: Math.max(75, Math.min(100, prev.efficiency + (Math.random() * 1 - 0.5))),
      }));
    }, 8000); // Update every 8 seconds for smoother experience

    return () => clearInterval(smoothUpdateInterval);
  }, []);

  // Define the exact sequence from screenshots
  const loadSequence = [
    // Phase 0: Blank state
    {
      score: 0,
      rate: { value: 0, label: 'rate' },
      tolls: { value: 0, label: 'tolls' },
      fuel: { value: 0, label: 'fuel' },
      times: { value: 0, label: 'times' },
      bh: { value: 0, label: 'bh' },
    },
    // Phase 1: 94% - Good performance (mostly green with some red)
    {
      score: 94,
      rate: { value: 85, label: 'excellent' },
      tolls: { value: 30, label: '$12' }, // Red/poor performance
      fuel: { value: 85, label: '$3.96/gal' },
      times: { value: 85, label: 'excellent' },
      bh: { value: 35, label: 'hot' }, // Red/poor performance
    },
    // Phase 2: 78% - Mixed performance (more red bars)
    {
      score: 78,
      rate: { value: 35, label: 'poor' }, // Red/poor performance
      tolls: { value: 25, label: '$25' }, // Red/poor performance
      fuel: { value: 80, label: '$4.12/gal' },
      times: { value: 75, label: 'good' },
      bh: { value: 75, label: 'warm' },
    },
    // Phase 3: 100% - Excellent performance (all green)
    {
      score: 100,
      rate: { value: 95, label: 'excellent' },
      tolls: { value: 90, label: '$11' },
      fuel: { value: 95, label: '$3.96/gal' },
      times: { value: 95, label: 'excellent' },
      bh: { value: 85, label: 'hot' },
    },
  ];

  // Professional fetching messages for trucking industry
  const fetchingMessages = [
    'Fetching Latest Market Results',
    'Analyzing Freight Rates',
    'Updating Load Board Data',
    'Scanning Market Trends',
    'Processing Rate Changes',
    'Refreshing Spot Rates',
    'Collecting Market Intelligence',
    'Updating Regional Pricing',
  ];

  // Comprehensive location data based on the screenshot - Updated to match exact screenshot
  const locationData = [
    { rank: 11, change: '↑11', location: 'Tifton, GA', percentage: '+17.06%', direction: 'up' },
    { rank: 9, change: '↓9', location: 'Saginaw, MI', percentage: '-0.38%', direction: 'down' },
    { rank: 1, change: '↑1', location: 'N Charleston, SC', percentage: '+9.63%', direction: 'up' },
    { rank: 2, change: '↓1', location: 'McAllen, TX', percentage: '+5.71%', direction: 'down' },
    { rank: 3, change: '↑4', location: 'Atlanta, GA', percentage: '+9.58%', direction: 'up' },
    { rank: 4, change: '', location: 'Greenville, SC', percentage: '+5.63%', direction: 'up' },
    { rank: 5, change: '↑16', location: 'Decatur, AL', percentage: '+17.93%', direction: 'up' },
    { rank: 6, change: '↑4', location: 'Macon, GA', percentage: '+10.80%', direction: 'up' },
    { rank: 7, change: '↑7', location: 'Columbia, SC', percentage: '+9.59%', direction: 'up' },
    { rank: 8, change: '↑6', location: 'Evansville, IN', percentage: '+13.43%', direction: 'up' },
    { rank: 10, change: '↓5', location: 'Laredo, TX', percentage: '+2.16%', direction: 'down' },
    {
      rank: 12,
      change: '↑9',
      location: 'Cape Girardeau, MO',
      percentage: '+16.51%',
      direction: 'up',
    },
    { rank: 13, change: '↓4', location: 'Memphis, TN', percentage: '+3.56%', direction: 'down' },
    { rank: 14, change: '↑5', location: 'Chattanooga, TN', percentage: '+10.01%', direction: 'up' },
    { rank: 15, change: '↓5', location: 'Houston, TX', percentage: '+1.65%', direction: 'down' },
    {
      rank: 16,
      change: '↑23',
      location: 'Bowling Green, KY',
      percentage: '+12.97%',
      direction: 'up',
    },
    { rank: 17, change: '↑18', location: 'Huntington, WV', percentage: '+11.59%', direction: 'up' },
    { rank: 18, change: '↓4', location: 'Austin, TX', percentage: '+4.04%', direction: 'down' },
  ];

  // Function to get random locations
  const getRandomLocations = () => {
    // Prioritize showing the specific locations from the screenshot
    const priorityLocations = [
      { rank: 11, change: '↑11', location: 'Tifton, GA', percentage: '+17.06%', direction: 'up' },
      { rank: 9, change: '↓9', location: 'Saginaw, MI', percentage: '-0.38%', direction: 'down' },
    ];

    // Sometimes show priority locations, other times show random ones
    if (Math.random() > 0.3) {
      return priorityLocations;
    }

    const shuffled = [...locationData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  // Function to smoothly transition locations with fetching state
  const transitionLocations = () => {
    // Start fade out
    setIsTransitioning(true);

    // After fade out completes, show fetching state
    const timeout1 = setTimeout(() => {
      setIsFetching(true);
      setIsTransitioning(false);

      // Cycle through fetching messages
      setFetchingMessageIndex((prev) => (prev + 1) % fetchingMessages.length);

      // Show fetching message for 1.5 seconds
      const timeout2 = setTimeout(() => {
        setDisplayedLocations(getRandomLocations());
        setIsFetching(false);
      }, 1500);

      // Store timeout reference for cleanup
      timeoutRefs.current.push(timeout2);
    }, 300);

    // Store timeout reference for cleanup
    timeoutRefs.current.push(timeout1);
  };

  useEffect(() => {
    // Initialize with random locations
    setDisplayedLocations(getRandomLocations());

    // Add dynamic data animation and location shuffling
    const interval = setInterval(() => {
      const metrics = containerRef.current?.querySelectorAll('[data-metric]');
      metrics?.forEach((metric) => {
        metric.style.color = '#20b2aa';
        const colorTimeout = setTimeout(() => {
          metric.style.color = '#40e0d0';
        }, 200);
        // Store timeout reference for cleanup
        timeoutRefs.current.push(colorTimeout);
      });

      // Smooth transition for locations
      transitionLocations();
    }, 8000);

    return () => {
      clearInterval(interval);
      // Clear all stored timeouts
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  // Gradual filling animation effect - 0% to 100% with smooth increments
  useEffect(() => {
    let isMounted = true;
    let currentScore = 0;
    let animationInterval;

    // Define target values for each metric at different score levels
    const metricTargets = {
      0: { rate: 15, tolls: 20, fuel: 25, times: 10, bh: 30 },
      25: { rate: 35, tolls: 40, fuel: 45, times: 30, bh: 25 },
      50: { rate: 60, tolls: 35, fuel: 70, times: 55, bh: 45 },
      75: { rate: 80, tolls: 65, fuel: 85, times: 75, bh: 70 },
      100: { rate: 95, tolls: 85, fuel: 90, times: 90, bh: 80 },
    };

    // Function to interpolate between two values
    const interpolate = (start, end, progress) => Math.round(start + (end - start) * progress);

    // Function to get interpolated values for current score
    const getInterpolatedValues = (score) => {
      if (score <= 0) return metricTargets[0];
      if (score >= 100) return metricTargets[100];

      // Find the two target points to interpolate between
      let lowerBound = 0;
      let upperBound = 25;

      if (score > 75) {
        lowerBound = 75;
        upperBound = 100;
      } else if (score > 50) {
        lowerBound = 50;
        upperBound = 75;
      } else if (score > 25) {
        lowerBound = 25;
        upperBound = 50;
      }

      // Calculate progress between the bounds (0 to 1)
      const progress = (score - lowerBound) / (upperBound - lowerBound);

      // Interpolate each metric
      return {
        rate: interpolate(metricTargets[lowerBound].rate, metricTargets[upperBound].rate, progress),
        tolls: interpolate(
          metricTargets[lowerBound].tolls,
          metricTargets[upperBound].tolls,
          progress
        ),
        fuel: interpolate(metricTargets[lowerBound].fuel, metricTargets[upperBound].fuel, progress),
        times: interpolate(
          metricTargets[lowerBound].times,
          metricTargets[upperBound].times,
          progress
        ),
        bh: interpolate(metricTargets[lowerBound].bh, metricTargets[upperBound].bh, progress),
      };
    };

    const runGradualAnimation = () => {
      if (!isMounted) return;

      // Reset to 0 and start gradual increment
      currentScore = 0;

      const incrementAnimation = () => {
        if (!isMounted) return;

        if (currentScore <= 100) {
          // Get interpolated values for current score
          const interpolatedValues = getInterpolatedValues(currentScore);

          // Update all metrics with interpolated values
          setLoadData({
            score: currentScore,
            rate: {
              value: interpolatedValues.rate,
              label:
                interpolatedValues.rate >= 90
                  ? 'excellent'
                  : interpolatedValues.rate >= 70
                  ? 'good'
                  : interpolatedValues.rate >= 50
                  ? 'fair'
                  : 'poor',
            },
            tolls: {
              value: interpolatedValues.tolls,
              label:
                interpolatedValues.tolls >= 80
                  ? '$10'
                  : interpolatedValues.tolls >= 60
                  ? '$15'
                  : interpolatedValues.tolls >= 40
                  ? '$20'
                  : '$25',
            },
            fuel: {
              value: interpolatedValues.fuel,
              label:
                interpolatedValues.fuel >= 80
                  ? '$3.96/gal'
                  : interpolatedValues.fuel >= 60
                  ? '$4.05/gal'
                  : interpolatedValues.fuel >= 40
                  ? '$4.15/gal'
                  : '$4.25/gal',
            },
            times: {
              value: interpolatedValues.times,
              label:
                interpolatedValues.times >= 90
                  ? 'excellent'
                  : interpolatedValues.times >= 70
                  ? 'good'
                  : interpolatedValues.times >= 50
                  ? 'fair'
                  : 'poor',
            },
            bh: {
              value: interpolatedValues.bh,
              label:
                interpolatedValues.bh >= 80
                  ? 'cool'
                  : interpolatedValues.bh >= 60
                  ? 'warm'
                  : interpolatedValues.bh >= 40
                  ? 'hot'
                  : 'very hot',
            },
          });

          currentScore += 1; // Increment by 1% each step
        } else {
          // Animation complete, wait 2 seconds before restarting
          clearInterval(animationInterval);
          animationTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              runGradualAnimation(); // Restart the animation
            }
          }, 2000);
        }
      };

      // Run increment every 50ms for smooth animation (100 steps * 50ms = 5 seconds total)
      animationInterval = setInterval(incrementAnimation, 50);
    };

    // Start the animation
    runGradualAnimation();

    return () => {
      isMounted = false;
      if (animationInterval) {
        clearInterval(animationInterval);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Updated color function to match screenshot colors with more variety
  const getMetricColor = (value) => {
    if (value >= 90) return 'linear-gradient(90deg, #10b981, #059669)'; // Green for excellent performance
    if (value >= 80) return 'linear-gradient(90deg, #40e0d0, #20b2aa)'; // Teal for very good performance
    if (value >= 70) return 'linear-gradient(90deg, #22c55e, #16a34a)'; // Light green for good performance
    if (value >= 60) return 'linear-gradient(90deg, #64748b, #475569)'; // Lead/gray for moderate performance
    if (value >= 50) return 'linear-gradient(90deg, #f59e0b, #d97706)'; // Orange for fair performance
    if (value >= 40) return 'linear-gradient(90deg, #ec4899, #db2777)'; // Pink for poor performance
    if (value >= 30) return 'linear-gradient(90deg, #ef4444, #dc2626)'; // Red for bad performance
    if (value >= 20) return 'linear-gradient(90deg, #f87171, #ef4444)'; // Light red for very bad performance
    if (value >= 10) return 'linear-gradient(90deg, #64748b, #475569)'; // Lead/gray for very poor performance
    return 'linear-gradient(90deg, #94a3b8, #64748b)'; // Light gray for minimal/no performance
  };

  // Navigation handler for card clicks
  const handleCardNavigation = (url) => {
    if (url.startsWith('http')) {
      // External links open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Internal navigation
      window.location.href = url;
    }
  };

  return (
    <S.DashboardContainer>
      <DashboardInner ref={containerRef}>
        {/* Minimal Particle System */}
        <ParticleContainer>
          {/* Just 2 subtle floating particles */}
          <AnimatedParticle size={2} color="#40e0d0" top={20} left={10} duration={30} delay={0} />
          <AnimatedParticle size={1} color="#bcddde" top={80} left={90} duration={35} delay={8} />
        </ParticleContainer>

        {/* Lens Card - First (was Third) */}
        <Card>
          <GlassmorphismBackground />
          <CardHoverOverlay onClick={() => handleCardNavigation('https://spotter.ai/lens')}>
            <CardHoverTitle>Lens</CardHoverTitle>
          </CardHoverOverlay>
          <LensContainer>
            <MapContainer>
              <MapImage src={lensMapImage} alt="US Map" />
            </MapContainer>
            {isFetching ? (
              <FetchingContainer visible={isFetching}>
                <FetchingText>{fetchingMessages[fetchingMessageIndex]}</FetchingText>
                <LoadingDots>
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </LoadingDots>
              </FetchingContainer>
            ) : (
              <LocationList isTransitioning={isTransitioning}>
                {displayedLocations.map((location, index) => (
                  <LocationItem
                    key={`${location.rank}-${location.location.replace(/\s+/g, '-')}`}
                    striped={index === 1}
                    isTransitioning={isTransitioning}
                  >
                    <RankNumber direction={location.direction}>{location.change}</RankNumber>
                    <LocationName>{location.location}</LocationName>
                    <RankChange direction={location.direction}>{location.percentage}</RankChange>
                  </LocationItem>
                ))}
              </LocationList>
            )}
          </LensContainer>
        </Card>

        {/* CRM Card - Second */}
        <Card>
          <CardHoverOverlay onClick={() => handleCardNavigation('https://spotter.ai/')}>
            <CardHoverTitle>CRM</CardHoverTitle>
          </CardHoverOverlay>
          <BottomCardContainer>
            <CRMGlow />
            <BottomCardTitle>Recruiting Engine</BottomCardTitle>
            <BottomCardContent>
              <CRMLogoSection>
                <CRMLogoContainer>
                  <CRMLogoSVG viewBox="0 0 944.7 623.7" xmlns="http://www.w3.org/2000/svg">
                    <g id="dots_copy">
                      <circle className="st0" cx="150" cy="472.7" r="147.4" />
                      <circle className="st1" cx="150" cy="150.8" r="147.4" />
                      <circle className="st2" cx="472.3" cy="472.7" r="147.4" />
                      <circle className="st2" cx="794.7" cy="472.7" r="147.4" />
                    </g>
                  </CRMLogoSVG>
                </CRMLogoContainer>
                <CRMBrandText>
                  Spotter <CRMColoredText>CRM</CRMColoredText>
                </CRMBrandText>
              </CRMLogoSection>
            </BottomCardContent>
            <BottomCardSubtitle>Engagement Visibility</BottomCardSubtitle>
          </BottomCardContainer>
        </Card>

        {/* Driver App Card - Third (was First) */}
        <Card>
          <GlassmorphismBackground />
          <CardHoverOverlay onClick={() => handleCardNavigation('https://spotter.ai/')}>
            <CardHoverTitle>Driver App</CardHoverTitle>
          </CardHoverOverlay>
          <RedesignedLoadMatchContainer>
            <AnimatedPieChart
              score={loadData.score}
              rate={loadData.rate.value}
              tolls={loadData.tolls.value}
              fuel={loadData.fuel.value}
              times={loadData.times.value}
              bh={loadData.bh.value}
            />
            <LoadScoreTitle>
              Load <LoadScoreSpan>Score</LoadScoreSpan>
            </LoadScoreTitle>
            <CompactMetricsGrid>
              <CompactMetricRow>
                <MetricLabel>rate</MetricLabel>
                <CompactMetricBar data-metric="rate">
                  <CompactMetricFill
                    width={loadData.rate.value}
                    color={getMetricColor(loadData.rate.value)}
                  />
                </CompactMetricBar>
                <LoadMetricValue>{loadData.rate.label}</LoadMetricValue>
              </CompactMetricRow>
              <CompactMetricRow>
                <MetricLabel>tolls</MetricLabel>
                <CompactMetricBar data-metric="tolls">
                  <CompactMetricFill
                    width={loadData.tolls.value}
                    color={getMetricColor(loadData.tolls.value)}
                  />
                </CompactMetricBar>
                <LoadMetricValue>{loadData.tolls.label}</LoadMetricValue>
              </CompactMetricRow>
              <CompactMetricRow>
                <MetricLabel>fuel</MetricLabel>
                <CompactMetricBar data-metric="fuel">
                  <CompactMetricFill
                    width={loadData.fuel.value}
                    color={getMetricColor(loadData.fuel.value)}
                  />
                </CompactMetricBar>
                <LoadMetricValue>{loadData.fuel.label}</LoadMetricValue>
              </CompactMetricRow>
              <CompactMetricRow>
                <MetricLabel>times</MetricLabel>
                <CompactMetricBar data-metric="times">
                  <CompactMetricFill
                    width={loadData.times.value}
                    color={getMetricColor(loadData.times.value)}
                  />
                </CompactMetricBar>
                <LoadMetricValue>{loadData.times.label}</LoadMetricValue>
              </CompactMetricRow>
              <CompactMetricRow>
                <MetricLabel>bh</MetricLabel>
                <CompactMetricBar data-metric="bh">
                  <CompactMetricFill
                    width={loadData.bh.value}
                    color={getMetricColor(loadData.bh.value)}
                  />
                </CompactMetricBar>
                <LoadMetricValue>{loadData.bh.label}</LoadMetricValue>
              </CompactMetricRow>
            </CompactMetricsGrid>
          </RedesignedLoadMatchContainer>
        </Card>

        {/* TMS Card - Fourth */}
        <Card>
          <GlassmorphismBackground />
          <AnimatedTruck delay={5} />
          <CardHoverOverlay onClick={() => handleCardNavigation('/tms')}>
            <CardHoverTitle>TMS</CardHoverTitle>
          </CardHoverOverlay>
          <BottomCardContainer>
            <TMSGlow />
            <BottomCardTitle>Visibility engine</BottomCardTitle>
            <BottomCardContent>
              <TMSLogoSection>
                <TMSLogoContainer>
                  <TMSLogoSVG viewBox="0 0 944.7 623.7" xmlns="http://www.w3.org/2000/svg">
                    <g id="dots_copy">
                      <circle className="st0" cx="150" cy="472.7" r="147.4" />
                      <circle className="st1" cx="150" cy="150.8" r="147.4" />
                      <circle className="st2" cx="472.3" cy="472.7" r="147.4" />
                      <circle className="st2" cx="794.7" cy="472.7" r="147.4" />
                    </g>
                  </TMSLogoSVG>
                </TMSLogoContainer>
                <TMSBrandText>
                  Spotter <TMSColoredText>TMS</TMSColoredText>
                </TMSBrandText>
              </TMSLogoSection>
            </BottomCardContent>
            <BottomCardSubtitle>Data automation</BottomCardSubtitle>
          </BottomCardContainer>
        </Card>

        {/* Sentinel Card - Fifth */}
        <Card>
          <CardHoverOverlay onClick={() => handleCardNavigation('/sentinel')}>
            <CardHoverTitle>Sentinel</CardHoverTitle>
          </CardHoverOverlay>
          <BottomCardContainer>
            <BottomCardTitle>Safety Automation</BottomCardTitle>
            <BottomCardContent>
              <SentinelScoreContainer>
                <SentinelScoreHeader>
                  <ScoreValueInline>64</ScoreValueInline>
                  <ValueBadgeContainer>
                    <ScoreBadge>Moderate</ScoreBadge>
                  </ValueBadgeContainer>
                </SentinelScoreHeader>
                <SentinelGrade>Grade D</SentinelGrade>
              </SentinelScoreContainer>
            </BottomCardContent>
          </BottomCardContainer>
        </Card>

        {/* Extension Card - Sixth */}
        <Card>
          <CardHoverOverlay onClick={() => handleCardNavigation('https://extension.spotter.ai/')}>
            <CardHoverTitle>Extension</CardHoverTitle>
          </CardHoverOverlay>
          <BottomCardContainer>
            <ExtensionGlow />
            <BottomCardTitle>Load Board Automation</BottomCardTitle>
            <BottomCardContent>
              <ModifiedIconContainer>
                <ChromeIcon>
                  <ChromeSVG viewBox="0 0 190.5 190.5" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(90.669 -507.469)">
                      {/* White outer circle */}
                      <circle cx="4.583" cy="602.714" r="47.627" className="chrome-white" />

                      {/* Green section */}
                      <path
                        d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
                        className="chrome-green"
                      />

                      {/* Yellow section */}
                      <path
                        d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z"
                        className="chrome-yellow"
                      />

                      {/* Blue center circle */}
                      <circle cx="4.583" cy="602.724" r="37.705" className="chrome-center" />

                      {/* Red section */}
                      <path
                        d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z"
                        className="chrome-red"
                      />
                    </g>
                  </ChromeSVG>
                </ChromeIcon>
                <FirefoxIcon>
                  <img src={firefoxIcon} alt="Firefox Icon" />
                </FirefoxIcon>
              </ModifiedIconContainer>
            </BottomCardContent>
            <BottomCardSubtitle>Browser Extension</BottomCardSubtitle>
          </BottomCardContainer>
        </Card>
      </DashboardInner>
    </S.DashboardContainer>
  );
};

export default DashboardArtifact;
