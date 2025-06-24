import React from 'react';
import { SvgXml } from 'react-native-svg';

/**
 * PayXchangeable Logo Component
 * 
 * An animated logo showing money flowing into the X and transforming into code streams flowing out
 */
const PayXchangeableLogo = ({ width = 300, height = 150 }) => {
  const logoSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
  <defs>
    <!-- Money Bill Pattern -->
    <pattern id="billPattern" patternUnits="userSpaceOnUse" width="30" height="15">
      <rect width="28" height="13" x="1" y="1" rx="2" ry="2" fill="none" stroke="#85BB65" stroke-width="1"/>
      <circle cx="7" cy="7.5" r="3" fill="none" stroke="#85BB65" stroke-width="0.7"/>
      <rect width="10" height="5" x="15" y="5" rx="1" ry="1" fill="none" stroke="#85BB65" stroke-width="0.7"/>
    </pattern>

    <!-- Code Pattern -->
    <pattern id="codePattern" patternUnits="userSpaceOnUse" width="60" height="20">
      <text x="5" y="15" font-family="monospace" font-size="10" fill="#888888">01010</text>
      <text x="5" y="25" font-family="monospace" font-size="10" fill="#888888">10101</text>
    </pattern>

    <!-- Animation Paths -->
    <path id="billPath" d="M100,150 Q 180,150 250,210"/>
    <path id="codePath1" d="M350,200 Q 400,180 450,150"/>
    <path id="codePath2" d="M350,200 Q 400,230 450,250"/>
    <path id="codePath3" d="M350,200 Q 380,150 400,100"/>

    <!-- Animation for bills -->
    <linearGradient id="billGradient">
      <stop offset="0%" stop-color="#85BB65" stop-opacity="0"/>
      <stop offset="50%" stop-color="#85BB65" stop-opacity="1"/>
      <stop offset="100%" stop-color="#85BB65" stop-opacity="0"/>
      <animate attributeName="x1" from="0%" to="100%" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" from="100%" to="200%" dur="3s" repeatCount="indefinite"/>
    </linearGradient>

    <!-- Animation for code -->
    <linearGradient id="codeGradient">
      <stop offset="0%" stop-color="#888888" stop-opacity="0"/>
      <stop offset="50%" stop-color="#888888" stop-opacity="1"/>
      <stop offset="100%" stop-color="#888888" stop-opacity="0"/>
      <animate attributeName="x1" from="0%" to="100%" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="x2" from="100%" to="200%" dur="2s" repeatCount="indefinite"/>
    </linearGradient>
  </defs>

  <!-- PayXchangeable Text -->
  <text x="300" y="140" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#4B0082">PayXchangeable</text>
  <text x="300" y="170" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#4B0082">.com</text>

  <!-- X Highlight -->
  <text x="300" y="140" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#4B0082" stroke="#F1C40F" stroke-width="1">X</text>

  <!-- Bill Stream (Left to X) -->
  <g>
    <!-- Animated Money Bills Moving Into X -->
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="0.2s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="0.4s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="0.6s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="0.8s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="1.0s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="1.2s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="1.4s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="1.6s" repeatCount="indefinite"/>
    </rect>
    <rect width="30" height="15" fill="url(#billPattern)">
      <animateMotion path="M100,150 Q 180,150 250,210" dur="2s" begin="1.8s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- Code Streams (From X outward) -->
  <g>
    <!-- Code Stream 1 - Upper Right -->
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,180 450,150" dur="1.5s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,180 450,150" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,180 450,150" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,180 450,150" dur="1.5s" begin="0.9s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,180 450,150" dur="1.5s" begin="1.2s" repeatCount="indefinite"/>
    </rect>

    <!-- Code Stream 2 - Lower Right -->
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,230 450,250" dur="1.7s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,230 450,250" dur="1.7s" begin="0.34s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,230 450,250" dur="1.7s" begin="0.68s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,230 450,250" dur="1.7s" begin="1.02s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 400,230 450,250" dur="1.7s" begin="1.36s" repeatCount="indefinite"/>
    </rect>

    <!-- Code Stream 3 - Upper -->
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 380,150 400,100" dur="1.6s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 380,150 400,100" dur="1.6s" begin="0.32s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 380,150 400,100" dur="1.6s" begin="0.64s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 380,150 400,100" dur="1.6s" begin="0.96s" repeatCount="indefinite"/>
    </rect>
    <rect width="40" height="15" fill="url(#codePattern)">
      <animateMotion path="M350,200 Q 380,150 400,100" dur="1.6s" begin="1.28s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- Decorative X Node -->
  <circle cx="300" cy="200" r="8" fill="#F1C40F" stroke="#4B0082" stroke-width="2"/>
</svg>`;

  return <SvgXml xml={logoSvg} width={width} height={height} />;
};

export default PayXchangeableLogo;