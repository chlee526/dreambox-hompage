type ChevronDirection = 'up' | 'down' | 'left' | 'right';

interface ChevronIconProps {
    direction?: ChevronDirection;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
    strokeWidth?: number;
    className?: string;
}

const paths: Record<ChevronDirection, string> = {
    up: 'M7 14.5834L12.0008 10L17 14.5834',
    down: 'M7 9.4166L12.0008 14L17 9.4166',
    left: 'M15 17L10 12L15 7',
    right: 'M10 7L15 12L10 17',
};

export default function ChevronIcon({
    direction = 'up',
    color = 'currentColor',
    size = 24,
    width,
    height,
    strokeWidth = 2,
    className,
}: ChevronIconProps) {
    return (
        <svg
            width={width ?? size}
            height={height ?? size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d={paths[direction]}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
