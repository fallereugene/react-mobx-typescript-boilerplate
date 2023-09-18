import React from 'react';
import { StoreContext } from '@/bootstrap';

export const useStore = () => React.useContext(StoreContext);
