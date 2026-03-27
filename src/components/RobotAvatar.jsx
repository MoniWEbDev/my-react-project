import React from 'react';

export default function RobotAvatar({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="robot-avatar"
    >
      {/* Head - Rounded rectangle */}
      <rect x="22" y="8" width="76" height="58" rx="16" fill="#d4e9f0" stroke="#5fa8bf" strokeWidth="2.5" />

      {/* Left Eye */}
      <circle cx="42" cy="32" r="9" fill="#3a8fb5" />
      <circle cx="43" cy="31" r="3" fill="#ffffff" />

      {/* Right Eye */}
      <circle cx="78" cy="32" r="9" fill="#3a8fb5" />
      <circle cx="79" cy="31" r="3" fill="#ffffff" />

      {/* Smile */}
      <path d="M 48 48 Q 60 56 72 48" stroke="#3a8bf5" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Body - Rounded pill shape */}
      <rect x="28" y="68" width="64" height="55" rx="12" fill="#d4e9f0" stroke="#5fa8bf" strokeWidth="2.5" />

      {/* Chest detail - lighter circle */}
      <circle cx="60" cy="95" r="15" fill="#b3d9e8" stroke="#5fa8bf" strokeWidth="1.5" />

      {/* Left arm */}
      <ellipse cx="16" cy="85" rx="12" ry="14" fill="#d4e9f0" stroke="#5fa8bf" strokeWidth="2" />
      {/* Left hand - rounded */}
      <circle cx="8" cy="92" r="6" fill="#22c55e" />

      {/* Right arm */}
      <ellipse cx="104" cy="85" rx="12" ry="14" fill="#d4e9f0" stroke="#5fa8bf" strokeWidth="2" />
      {/* Right hand - rounded */}
      <circle cx="112" cy="92" r="6" fill="#22c55e" />

      {/* Left leg */}
      <rect x="36" y="125" width="14" height="12" rx="3" fill="#4a8fb5" />

      {/* Right leg */}
      <rect x="70" y="125" width="14" height="12" rx="3" fill="#4a8fb5" />
    </svg>
  );
}
