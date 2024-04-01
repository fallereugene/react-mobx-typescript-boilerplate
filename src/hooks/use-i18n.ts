import React from 'react';
import { useTranslation, I18nContext } from 'react-i18next';

/**
 * Хук для работы с локализацией
 */
export const useI18n = () => {
    const { t } = useTranslation();
    return {
        ...React.useContext(I18nContext),
        t,
    };
};
