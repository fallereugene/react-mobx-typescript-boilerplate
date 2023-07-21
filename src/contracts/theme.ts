import { SxProps as MUISxProps } from '@mui/material/styles';

import theme from '@/theme';

// тип для стилей sx с поддержкой нашей темы
export type SxProps = MUISxProps<typeof theme>;
