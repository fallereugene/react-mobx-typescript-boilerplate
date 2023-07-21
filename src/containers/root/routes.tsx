import React from 'react';
import { NotFound } from '@routes/not-found';
import { Main } from '@routes/main';
import { Store } from '@/services/store';
import { Route } from '@/constants';

// eslint-disable-next-line
export const getRoutes = (_store: Store) => [
    {
        path: Route.Root,
        children: [
            {
                index: true,
                element: <Main />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
