import styles from './GhostButton.module.scss';
import { FC, HTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react';

export type GhostButtonVariant = 'white' | 'blue' | 'yellow' | 'red';

const VARIANT_COLOR_MAPPING = {
  white: ['#E9ECEF', '#151518'],
  blue: ['#00B8D8', '#f8f9fa'],
  yellow: ['#FFB400', '#f8f9fa'],
  red: ['#C4183C', '#f8f9fa']
};

export interface GhostButtonProps {
  variant: GhostButtonVariant;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const GhostButton: FC<
  PropsWithChildren<GhostButtonProps> & HTMLAttributes<HTMLDivElement>
> = ({ variant, children, onClick, ...props }) => (
  <div
    style={{
      ['--backgroundVariant' as any]: VARIANT_COLOR_MAPPING[variant][0],
      ['--colorVariant' as any]: VARIANT_COLOR_MAPPING[variant][1]
    }}
    onClick={onClick}
    {...props}
    className={`${styles.button} ${props.className}`}
  >
    {children}
  </div>
);
