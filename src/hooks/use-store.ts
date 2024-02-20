import React from 'react';
import { StoreContext } from '@/bootstrap';

/**
 * Хук для работы со стором приложения
 */
export const useStore = () => React.useContext(StoreContext);
