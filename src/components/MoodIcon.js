import React from 'react';
import getColors from '../moodColors';
import './moodIcon.css';

export default function MoodIcon(props) {
    const { mood, animate, width, height } = props;

    const canvasSize = 200;
    const canvasCenter = canvasSize / 2;
    const iconRadius = canvasSize / 4;
    const colors = getColors(mood);

    function getPoint(angle) {
        let x = canvasCenter + iconRadius * Math.cos(angle);
        let y = canvasCenter + iconRadius * Math.sin(angle);
        return { x, y };
    }

    function getControlPoint(start, end, value) {
        const midpointX = (start.x + end.x) / 2;
        const midpointY = (start.y + end.y) / 2;

        const dx = end.x - start.x;
        const dy = end.y - start.y;
    
        const normal = { x: dy, y: -dx };
    
        const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
        const normalized = { x: normal.x / length, y: normal.y / length };
        const distance = value * iconRadius;

        return {
            x: midpointX + distance * normalized.x, 
            y: midpointY + distance * normalized.y 
        };
    }

    function getScale(mood) {
        return (Math.abs(mood) < 50)
            ? 0.98 - 0.004 * Math.abs(mood)
            : 0.78 - 0.0025 * (Math.abs(mood) - 50);
    }

    function getAngle(mood) {
        return mood < 0
            ? '.4rad'
            : '.3rad';
    }

    function getPath(mood) {
        const pointsCount = mood < 0 
            ? 8
            : 5;

        const controlPointValue = mood < 0
            ? 0.15 - mood / 100
            : 0.40 + mood / 100;

        const points = new Array(pointsCount)
            .fill(0)
            .map((_, i) => getPoint((i / pointsCount) * Math.PI * 2));

        return points.reduce((acc, start, i) => {
            const end = points[(i + 1) % pointsCount];
            const control = getControlPoint(start, end, controlPointValue);
            return acc + `Q ${control.x},${control.y} ${end.x},${end.y} `;
        }, `M ${points[0].x},${points[0].y} `); 
    }

    function getStyles() {
        return {
            width: width ?? '100px',
            height: height ?? '100px',
            background: `radial-gradient(circle, ${colors.backgroundSecondary} 0%, ${colors.backgroundPrimary} 50%)`
        }
    }
    
    function getWaveClass(mood, i) {
        return [
            'wave',
            `wave${i}`,
            animate ? 'animate' : '',
            mood < -50 ? 'negative' : ''
        ].join(' ');
    }

    function getWaveTransform(mood, i) {
        if (mood > -50) return '';
        return `rotate(${(mood + 50) / 10 * i}deg)`;
    }

    return (
        <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} style={getStyles()}>
            <defs>
                <radialGradient id="gradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="35%" fx="50%" fy="50%">
                    <stop offset="33%" style={{stopColor: colors.primary}} />
                    <stop offset="100%" style={{stopColor: colors.secondary}} />
                </radialGradient>
            </defs>
            <g style={{transformOrigin: '50% 50%', transform: `scale(${getScale(mood)}) rotate(${getAngle(mood)})`}}>
                {[1,2,3,4].map(i => 
                    <g style={{transformOrigin: '50% 50%', transform: getWaveTransform(mood, i)}}>
                        <path d={getPath(mood)} fill="url(#gradient)" className={getWaveClass(mood, i)} stroke={colors.primary} />
                    </g>
                )}
                <path d={getPath(mood)} fill="url(#gradient)" className="big" stroke={colors.secondary} stroke-width="2" />
                <path d={getPath(mood)} fill={colors.secondary} className="small" />
            </g>
        </svg>
    );
}