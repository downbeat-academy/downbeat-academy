interface PlayerButtonProps {
  onClick: () => void;
  ariaLabel: string;
  type:
  'play' |
  'pause' |
  'stop' |
  'rewind' |
  'fast-forward' |
  'previous' |
  'next' |
  'volume' |
  'volume-mute' |
  'volume-quiet';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export type { PlayerButtonProps }