import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import cx from 'classnames';
import { useAudio } from 'react-use';
import { secondsToTimestamp } from '../../../util/time-formatters';
import Box from '../../layout/box';
import PlayPauseButton from '../play-pause-button';
import Progress from '../progress';
import styles from './audio-player.module.css';
import VolumeControl from '../volume-control';
import ProgressPreview from '../progress-preview/progress-preview';

const AudioPlayer = ({ src }) => {
    const [audio, state, controls] = useAudio({
        src,
        autoPlay: false
    });

    const [time, setTime] = useState(state.time);
    useEffect(() => {
        setTime(state.time);
    }, [setTime, state.time]);

    function seek(val) {
        setTime(val);
        controls.seek(val);
    }

    return (
        <div className={styles.audioPlayer}>
            {audio}
            <Box className={styles.playerContainer}>
                <div className={styles.playButton}>
                    <PlayPauseButton
                        isPlaying={!state.paused}
                        onClick={state.paused ? controls.play : controls.pause}
                    />
                </div>
                <div className={styles.player}>
                    <div className={styles.upperControls}>
                        <span className={cx(styles.time)}>{secondsToTimestamp(time)}</span>
                        <span className={cx(styles.time)}>{secondsToTimestamp(state.duration)}</span>
                    </div>
                    <div className={styles.progressContainer}>
                        <Progress
                            label="Seek"
                            max={state.duration}
                            onChange={value => {
                                const isPaused = state.paused;
                                if (!isPaused) controls.pause();
                                seek(value);
                                if (!isPaused) controls.play();
                            }}
                            PreviewComponent={ProgressPreview}
                            step={0.01}
                            value={time}
                        />
                    </div>
                    <div className={styles.lowerControls}>
                        <VolumeControl
                            isMuted={state.muted}
                            onChange={controls.volume}
                            onMute={controls.mute}
                            onUnmute={controls.unmute}
                            size="sm"
                            value={state.volume}
                        />
                    </div>
                </div>
            </Box>
        </div>
    );
};

AudioPlayer.propTypes = {
    src: string.isRequired
};

export default AudioPlayer;
