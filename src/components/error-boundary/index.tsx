import React from 'react';

export interface IState {
    isErrorOccurred: boolean;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, IState> {
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
