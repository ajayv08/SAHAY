import React from 'react';

interface SahayLogoProps {
  variant?: 'horizontal' | 'full' | 'emblem' | 'wordmark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SahayLogo: React.FC<SahayLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  // Color tokens from the logo
  const NAVY = '#0B2A5C';
  const ORANGE = '#F5821F';
  const GREEN = '#2E9E4F';

  // The central circular Ashoka Chakra with 24 spokes
  const renderAshokaChakra = (cx: number, cy: number, r: number) => {
    const spokes = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const x2 = cx + r * 0.85 * Math.cos(rad);
      const y2 = cy + r * 0.85 * Math.sin(rad);
      spokes.push(
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke={NAVY}
          strokeWidth="1.2"
        />
      );
    }
    return (
      <g id="ashoka-chakra">
        <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={NAVY} strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={r * 0.22} fill={NAVY} />
        {spokes}
        <circle cx={cx} cy={cy} r={r * 0.88} fill="none" stroke={NAVY} strokeWidth="1" />
      </g>
    );
  };

  // The Emblem SVG (Gear + Tricolor Arcs + Chakra + Handshake Lightbulb + Orbit Rings)
  const renderEmblem = (width = 100, height = 100) => (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* 1. Orbiting planetary rings */}
      {/* Left Orange Orbit Arc */}
      <path
        d="M 28 85 C 10 105, 30 135, 75 140 C 95 142, 105 138, 115 132"
        stroke={ORANGE}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Orange Orbit Planetary Node */}
      <circle cx="28" cy="85" r="5" fill={ORANGE} />

      {/* Right Green Orbit Arc */}
      <path
        d="M 85 68 C 120 62, 185 70, 172 108 C 165 125, 140 138, 115 132"
        stroke={GREEN}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Green Orbit Planetary Node */}
      <circle cx="170" cy="90" r="5" fill={GREEN} />

      {/* 2. Top Gear / Cogwheel */}
      <g id="gear-teeth">
        <path
          d="M 72 42 L 76 28 L 86 28 L 89 40 
             M 93 39 L 98 25 L 108 25 L 112 39 
             M 117 41 L 126 28 L 136 30 L 137 45 
             M 65 47 L 55 35 L 63 29 L 75 42
             M 60 55 L 48 48 L 54 40 L 67 48"
          stroke={NAVY}
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Solid gear arc rim */}
        <path
          d="M 52 75 C 50 45, 70 34, 103 34 C 136 34, 154 48, 153 75"
          stroke={NAVY}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 3. Tricolor Arcs inside the bulb */}
      {/* Orange/Saffron arc on left */}
      <path
        d="M 74 96 C 68 76, 78 52, 103 48"
        stroke={ORANGE}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Green arc on right */}
      <path
        d="M 103 48 C 128 52, 138 76, 132 96"
        stroke={GREEN}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* 4. Central Ashoka Chakra */}
      {renderAshokaChakra(103, 76, 20)}

      {/* 5. Lightbulb Shell & Clasped Handshake */}
      <g id="handshake-bulb">
        {/* Left hand (Orange) */}
        <path
          d="M 76 100 C 76 112, 85 125, 96 128 C 99 129, 102 129, 104 126 L 98 120 L 92 122 L 96 114 L 88 114 L 92 106 L 85 106 Z"
          fill={ORANGE}
        />
        <path
          d="M 73 98 C 76 114, 88 128, 102 134"
          stroke={NAVY}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right hand (Navy) */}
        <path
          d="M 130 98 C 127 114, 116 128, 102 134"
          stroke={NAVY}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 130 98 C 130 110, 120 125, 106 130 L 102 126 C 108 122, 115 116, 116 108 L 108 108 C 114 102, 118 98, 122 98 Z"
          fill={NAVY}
        />

        {/* Clasped fingers interlocking detail */}
        <g id="fingers-clasp">
          <rect x="94" y="118" width="16" height="4" rx="2" fill={ORANGE} transform="rotate(25 94 118)" />
          <rect x="98" y="123" width="14" height="3.5" rx="1.7" fill={ORANGE} transform="rotate(25 98 123)" />
          <rect x="100" y="112" width="16" height="4" rx="2" fill={NAVY} transform="rotate(-25 100 112)" />
          <rect x="96" y="117" width="14" height="3.5" rx="1.7" fill={NAVY} transform="rotate(-25 96 117)" />
        </g>
      </g>

      {/* 6. Lightbulb Threaded Screw Base */}
      <g id="bulb-base">
        <rect x="92" y="138" width="22" height="4.5" rx="2.2" fill={NAVY} />
        <rect x="94" y="145" width="18" height="4" rx="2" fill={NAVY} />
        <rect x="97" y="151" width="12" height="3.5" rx="1.7" fill={NAVY} />
        <path d="M 100 156 Q 103 160 106 156 Z" fill={NAVY} />
      </g>
    </svg>
  );

  // Stylized SAHAY Wordmark with orange triangle in first A and green triangle in second A
  const renderWordmark = (textClass = 'text-2xl') => (
    <div className="flex items-baseline tracking-tight font-black select-none text-[#0B2A5C]">
      {/* S */}
      <span className={`${textClass} font-extrabold tracking-tight mr-0.5`}>S</span>

      {/* First A with Orange Triangle */}
      <span className="relative inline-flex items-center justify-center">
        <span className={`${textClass} font-extrabold tracking-tight`}>A</span>
        {/* Solid Orange Triangle in Counter */}
        <svg
          className="absolute pointer-events-none"
          style={{ width: '42%', height: '36%', top: '38%', left: '29%' }}
          viewBox="0 0 10 9"
          fill="none"
        >
          <polygon points="5,0 10,9 0,9" fill={ORANGE} />
        </svg>
      </span>

      {/* H */}
      <span className={`${textClass} font-extrabold tracking-tight mx-0.5`}>H</span>

      {/* Second A with Green Triangle */}
      <span className="relative inline-flex items-center justify-center">
        <span className={`${textClass} font-extrabold tracking-tight`}>A</span>
        {/* Solid Green Triangle in Counter */}
        <svg
          className="absolute pointer-events-none"
          style={{ width: '42%', height: '36%', top: '38%', left: '29%' }}
          viewBox="0 0 10 9"
          fill="none"
        >
          <polygon points="5,0 10,9 0,9" fill={GREEN} />
        </svg>
      </span>

      {/* Y */}
      <span className={`${textClass} font-extrabold tracking-tight ml-0.5`}>Y</span>
    </div>
  );

  if (variant === 'emblem') {
    const dim = size === 'sm' ? 36 : size === 'md' ? 48 : size === 'lg' ? 64 : 96;
    return <div className={`inline-block ${className}`}>{renderEmblem(dim, dim)}</div>;
  }

  if (variant === 'wordmark') {
    const textClass =
      size === 'sm'
        ? 'text-xl'
        : size === 'md'
        ? 'text-2xl sm:text-3xl'
        : size === 'lg'
        ? 'text-4xl sm:text-5xl'
        : 'text-5xl sm:text-6xl';
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {renderWordmark(textClass)}
      </div>
    );
  }

  // Horizontal variant (default, optimized for Header navbar)
  if (variant === 'horizontal') {
    const emblemDim = size === 'sm' ? 38 : size === 'md' ? 48 : 56;
    const textClass = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl';

    return (
      <div className={`flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
        {renderEmblem(emblemDim, emblemDim)}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {renderWordmark(textClass)}
            <span className="hidden xl:inline-flex items-center text-[10px] font-bold text-[#2E9E4F] bg-[#2E9E4F]/10 border border-[#2E9E4F]/20 px-1.5 py-0.2 rounded-none uppercase tracking-wide">
              Govt. Innovation Hub
            </span>
          </div>
          {/* Subtext and Tagline */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[2px] w-3 bg-[#F5821F] inline-block"></span>
            <span className="text-[10px] font-semibold text-[#0B2A5C] tracking-tight uppercase whitespace-nowrap">
              Startup Assistance & Govt Innovation Hub
            </span>
            <span className="h-[2px] w-3 bg-[#2E9E4F] inline-block"></span>
          </div>
          <span className="text-[8px] font-bold tracking-[0.2em] text-[#596780] uppercase mt-0.5">
            Discover. Pilot. Validate. Scale.
          </span>
        </div>
      </div>
    );
  }

  // Full variant (Complete vertical banner logo as in the reference image)
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-white border border-[#E2E5EA] shadow-none ${className}`}
    >
      {/* Emblem at Top */}
      <div className="mb-2">{renderEmblem(130, 130)}</div>

      {/* Stylized Brand Wordmark */}
      <div className="mb-3">{renderWordmark('text-4xl sm:text-5xl md:text-6xl')}</div>

      {/* Subtitle Rule: [Orange Line] Startup Assistance & Government Innovation Hub [Green Line] */}
      <div className="flex items-center justify-center gap-3 w-full max-w-md my-1">
        <span className="h-[2.5px] w-12 bg-[#F5821F] inline-block flex-shrink-0"></span>
        <span className="text-xs sm:text-sm font-extrabold text-[#0B2A5C] text-center tracking-normal whitespace-nowrap">
          Startup Assistance & Government Innovation Hub
        </span>
        <span className="h-[2.5px] w-12 bg-[#2E9E4F] inline-block flex-shrink-0"></span>
      </div>

      {/* Tagline */}
      <div className="mt-2 text-center">
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#0B2A5C] uppercase">
          D I S C O V E R . &nbsp; P I L O T . &nbsp; V A L I D A T E . &nbsp; S C A L E .
        </span>
      </div>
    </div>
  );
};
