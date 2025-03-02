import {Button, Typography} from '@mui/material';
import type {FC} from 'react';

export const HoverButton: FC<HoverButtonProps> = ({text, ...props}) => (
    <Button
        disableRipple
        key={`${text} button`}
        sx={{
            display       : 'flex',
            p             : '0.5rem',
            color         : 'inherit',
            justifyContent: 'center',
            alignItems    : 'center',
            transition    : 'color 0.2s ease-in-out',
            '&:hover'     : {
                color: 'deepskyblue',
            },
        }}
        {...props.buttonProps}
    >
        <Typography
            noWrap
            sx={{fontWeight: 'semibold', textTransform: 'none'}}
            variant="h6"
        >
            {text}
        </Typography>
    </Button>
);

interface HoverButtonProps {
    text: string;
    buttonProps: {
        to?: string;
        onClick?: () => void;
        onClick?: () => Promise<void>;
    }
}
