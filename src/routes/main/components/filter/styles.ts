import { SxProps } from '@/contracts/theme';

export const styles: SxProps = {
    margin: '20px 0',
    '& .MuiButtonBase-root': {
        '&.active': {
            cursor: 'default',
            opacity: 0.5,
        },
    },
};
