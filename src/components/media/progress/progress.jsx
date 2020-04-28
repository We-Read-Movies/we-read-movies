import React, { useState, useRef } from 'react';
import { func, number, string, oneOf, elementType } from 'prop-types';
import cx from 'classnames';
import { useMouseHovered } from '../../../hooks';
import { toTitleCase } from '../../../util';
import styles from './progress.module.css';

function getPercentage(value, max) {
    return max ? (value / max) * 100 : 0;
}

function getSecondsPerPercentage(max) {
    return max / 100;
}

function getStyle(color, percentage) {
    return {
        '--seek-value': `${percentage}%`,
        color
    };
}

function getSizeClass(size) {
    return `progress${toTitleCase(size)}`;
}

function getPreviewPosition({ inElementX, elementWidth }) {
    return {
        left: Math.min(Math.max(inElementX, 0), elementWidth)
    };
}

function getPercentageFromPosition({ inElementX, elementWidth }, step) {
    if (elementWidth <= 0) return 0;
    const rawPercentage = inElementX / elementWidth;
    const steps = rawPercentage / step;
    const closestStep = Math.round(steps) * step;

    return closestStep;
}

const Progress = ({ className, color, label = '', max, onChange, size = 'md', PreviewComponent, step, value }) => {
    const [showingPreview, setShowingPreview] = useState(false);
    const ref = useRef(null);
    const mouseInfo = useMouseHovered(ref, { bound: false, whenHovered: true });
    const percentageFromPosition = getPercentageFromPosition(mouseInfo, step);
    const normalizedValue = percentageFromPosition * max;

    const percentage = getPercentage(value, max);
    const secondsPerPercentage = getSecondsPerPercentage(max);

    return (
        <div className={styles.progressContainer}>
            {PreviewComponent && showingPreview && (
                <span className={styles.preview} style={getPreviewPosition(mouseInfo)}>
                    <PreviewComponent value={normalizedValue} />
                </span>
            )}
            <input
                aria-label={label}
                className={cx(styles.progress, styles[getSizeClass(size)], className)}
                max={100}
                min={0}
                onChange={e => {
                    onChange(e.target.value * secondsPerPercentage);
                }}
                onMouseEnter={() => setShowingPreview(true)}
                onMouseLeave={() => setShowingPreview(false)}
                ref={ref}
                step={step}
                style={getStyle(color, percentage)}
                type="range"
                value={percentage}
            />
        </div>
    );
};

Progress.propTypes = {
    PreviewComponent: elementType,
    className: string,
    color: string,
    label: string,
    max: number,
    onChange: func,
    size: oneOf(['sm', 'md']),
    step: number,
    value: number
};

export default Progress;
