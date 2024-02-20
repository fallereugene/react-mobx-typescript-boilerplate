import classnames from 'classnames';
import * as _react from 'react';
import * as _reactDOM from 'react-dom';

/* eslint-disable */
declare global {
    const React: typeof _react;
    const cx: typeof classnames;
    const ReactDOM: typeof _reactDOM;
    const JSX: React.ElementType;
}

declare module '*.html' {
    const rawHtmlFile: string;
    export = rawHtmlFile;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}
