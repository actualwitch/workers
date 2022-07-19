import { useMemo } from "react";



export function Loading({ size = 32, color = 'pink' }) {

    const { center, strokeWidth, r, c, offset, viewBox, from, to } =
        useMemo(() => {
            const center = size / 2;
            const strokeWidth = 4;
            const r = center - strokeWidth;
            const c = 2 * r * Math.PI;
            const offset = c - (1 / 4) * c;
            return {
                center,
                strokeWidth,
                r,
                c,
                offset,
                viewBox: `0 0 ${size} ${size}`,
                from: `0 ${center} ${center}`,
                to: `360 ${center} ${center}`,
            };
        }, [size]);

    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            strokeWidth={strokeWidth}
        >
            <circle
                role="presentation"
                cx={center}
                cy={center}
                r={r}
                stroke="rgba(28, 180, 160, 0.12)"
            />
            <circle
                role="presentation"
                cx={center}
                cy={center}
                r={r}
                stroke={color}
                strokeDasharray={c}
                strokeDashoffset={offset}
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    begin="0s"
                    dur="1s"
                    from={from}
                    to={to}
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}
