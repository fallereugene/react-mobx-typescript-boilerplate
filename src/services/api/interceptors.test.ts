import '@testing-library/jest-dom';

import { setInterceptors } from '@services/api';
import httpService from '@services/http';

// jest.mock('@services/http');

describe('interceptors tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it('setInterceptors service properly invoked', async () => {
        expect.hasAssertions();
        const onResponseErrorFnMock = jest.fn();
        const config: any = {
            onResponseError: onResponseErrorFnMock,
        };

        const httpServiceInterceptorUseFnMock = jest.spyOn(httpService.service.interceptors.response, 'use');

        setInterceptors(httpService, config);

        expect(httpServiceInterceptorUseFnMock).toHaveBeenCalledTimes(1);
        expect(httpServiceInterceptorUseFnMock).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
    });
});
