import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент, показываемый пользователю в случае, если, например, страница не найдена (не найдено
 * соответствие url в роутинге)
 */
export const NotFound: React.FunctionComponent<{}> = () => {
    return (
        <>
            <h1 style={{ textAlign: `center` }}>
                404.
                <br />
                <small>Page not found</small>
            </h1>
            <Link className="link" to="/">
                Go to main
            </Link>
        </>
    );
};
