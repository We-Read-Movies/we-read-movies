import React from 'react';
import { bool, func, number } from 'prop-types';
import { PlayCircle, PauseCircle } from '../../icons';
import styles from './play-pause-button.module.css';

const DEFAULT_SIZE = 52;

const PlayPauseButton = ({ isPlaying = false, onClick, size = DEFAULT_SIZE }) => {
    const Icon = isPlaying ? PauseCircle : PlayCircle;
    const label = isPlaying ? 'pause' : 'play';

    return (
        <button aria-label={label} onClick={onClick}>
            <Icon className={styles.icon} size={size} />
        </button>
    );
};

PlayPauseButton.propTypes = {
    isPlaying: bool,
    onClick: func,
    size: number
};

export default PlayPauseButton;
