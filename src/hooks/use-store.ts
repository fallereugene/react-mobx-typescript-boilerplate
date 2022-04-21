import React from 'react';
import { StoreContext } from '@/index';

const useStore = () => React.useContext(StoreContext);

export default useStore;
