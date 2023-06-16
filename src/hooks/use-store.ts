import React from 'react';
import { StoreContext } from '@/index';

export const useStore = () => React.useContext(StoreContext);
