const AIGradient = () => {
  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="none">
      <defs>
        <linearGradient
          id="12_lg1"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0"
          x2="400%"
          y2="0"
          spreadMethod="reflect"
        >
          <animate
            begin="indefinite"
            attributeName="x1"
            from="0%"
            to="400%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <animate
            begin="indefinite"
            attributeName="x2"
            from="400%"
            to="800%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <stop offset="0" stop-color="#0468FF"></stop>
          <stop offset="0.25" stop-color="#BF63F3"></stop>
          <stop offset="0.5" stop-color="#FFA900"></stop>
          <stop offset="0.75" stop-color="#BF63F3"></stop>
          <stop offset="1" stop-color="#0468FF"></stop>
        </linearGradient>
        <linearGradient
          id="12_lg2"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="-100%"
          x2="0"
          y2="300%"
          spreadMethod="reflect"
        >
          <animate
            begin="indefinite"
            attributeName="y1"
            from="-100%"
            to="300%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <animate
            begin="indefinite"
            attributeName="y2"
            from="300%"
            to="700%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <stop offset="0" stop-color="#0468FF"></stop>
          <stop offset="0.25" stop-color="#BF63F3"></stop>
          <stop offset="0.5" stop-color="#FFA900"></stop>
          <stop offset="0.75" stop-color="#BF63F3"></stop>
          <stop offset="1" stop-color="#0468FF"></stop>
        </linearGradient>
        <linearGradient
          id="12_lg3"
          gradientUnits="userSpaceOnUse"
          x1="300%"
          y1="0"
          x2="700%"
          y2="0"
          spreadMethod="reflect"
        >
          <animate
            begin="indefinite"
            attributeName="x1"
            from="300%"
            to="-100%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <animate
            begin="indefinite"
            attributeName="x2"
            from="700%"
            to="300%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <stop offset="0" stop-color="#0468FF"></stop>
          <stop offset="0.25" stop-color="#0468FF"></stop>
          <stop offset="0.5" stop-color="#FFA900"></stop>
          <stop offset="0.75" stop-color="#0468FF"></stop>
          <stop offset="1" stop-color="#0468FF"></stop>
        </linearGradient>
        <linearGradient
          id="12_lg4"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="400%"
          spreadMethod="reflect"
        >
          <animate
            begin="indefinite"
            attributeName="y1"
            from="0%"
            to="-400%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <animate
            begin="indefinite"
            attributeName="y2"
            from="400%"
            to="0%"
            repeatCount="indefinite"
            dur="3s"
          ></animate>
          <stop offset="0" stop-color="#0468FF"></stop>
          <stop offset="0.25" stop-color="#0468FF"></stop>
          <stop offset="0.5" stop-color="#FFA900"></stop>
          <stop offset="0.75" stop-color="#BF63F3"></stop>
          <stop offset="1" stop-color="#0468FF"></stop>
        </linearGradient>
      </defs>
      <g stroke-width="16">
        <path
          stroke="url(#12_lg1)"
          d="M0 0h24"
          vector-effect="non-scaling-stroke"
        ></path>
        <path
          stroke="url(#12_lg2)"
          d="M24 0v24"
          vector-effect="non-scaling-stroke"
        ></path>
        <path
          stroke="url(#12_lg3)"
          d="M24 24H0"
          vector-effect="non-scaling-stroke"
        ></path>
        <path
          stroke="url(#12_lg4)"
          d="M0 24V0"
          vector-effect="non-scaling-stroke"
        ></path>
      </g>
    </svg>
  );
};

export default AIGradient;
