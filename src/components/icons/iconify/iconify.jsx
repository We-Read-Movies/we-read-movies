import React from 'react';
import { number, oneOf } from 'prop-types';
import { Icon } from '@iconify/react';
import googlePodcastIcon from '@iconify/icons-mdi/google-podcast';
import rssIcon from '@iconify/icons-mdi/rss';
import paletteIcon from '@iconify/icons-mdi/palette';
import spotifyIcon from '@iconify/icons-fa-brands/spotify';
import itunesNoteIcon from '@iconify/icons-fa-brands/itunes-note';
import instagramIcon from '@iconify/icons-fa-brands/instagram';
import facebookIcon from '@iconify/icons-fa-brands/facebook-f';
import twitterIcon from '@iconify/icons-fa-brands/twitter';
import podcastIcon from '@iconify/icons-fa/podcast';
import playCircleIcon from '@iconify/icons-fa/play-circle';
import pauseCircleIcon from '@iconify/icons-fa/pause-circle';
import volumeUpIcon from '@iconify/icons-fa-solid/volume-up';
import volumeMuteIcon from '@iconify/icons-fa-solid/volume-mute';

const SUPPORTED_ICONS = {
    // Brands
    applePodcast: podcastIcon,
    googlePodcast: googlePodcastIcon,
    spotify: spotifyIcon,
    rss: rssIcon,
    itunesNote: itunesNoteIcon,
    facebook: facebookIcon,
    instagram: instagramIcon,
    twitter: twitterIcon,
    // Controls
    volumeUp: volumeUpIcon,
    mute: volumeMuteIcon,
    playCircle: playCircleIcon,
    pauseCircle: pauseCircleIcon,
    // General
    palette: paletteIcon
};

const Iconify = ({ name, size = 24, ...props }) => {
    const icon = SUPPORTED_ICONS[name];

    return <Icon height={size} icon={icon} width={size} {...props} />;
};

Iconify.propTypes = {
    ...Icon.propTypes,
    name: oneOf(Object.keys(SUPPORTED_ICONS)),
    size: number
};
export default Iconify;
