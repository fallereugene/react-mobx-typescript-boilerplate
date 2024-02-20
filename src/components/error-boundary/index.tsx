import React from 'react';

export type State = {
    isErrorOccurred: boolean;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isErrorOccurred: false,
        };
    }

    componentDidCatch() {
        this.setState(() => ({ isErrorOccurred: true }));
    }

    render() {
        const { isErrorOccurred } = this.state;
        const { children } = this.props;
        if (isErrorOccurred) {
            return <div className="error-boundary">ERROR OCCURRED</div>;
        }
        return children;
    }
}
