import { Logger } from '@services/logger';
import { LogLevel } from '@services/logger/constants';

describe('Logger service', () => {
    const LOG_STRING = 'any log string';
    const GROUP_NAME = 'groupName';
    const LOG_OBJECT = {
        key1: 'value1',
        key2: 'value2',
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.spyOn(global.console, 'info').mockImplementation(() => {});
        jest.spyOn(global.console, 'groupCollapsed').mockImplementation(() => {});
        jest.spyOn(global.console, 'groupEnd').mockImplementation(() => {});
    });

    it('should set default log level (0) if level is not passing as argument', async () => {
        const logger = new Logger();

        expect(logger.getLogLevel()).toBe(LogLevel.Error);
    });

    it('should invoke console.groupCollapsed() with console.groupEnd()', async () => {
        const logger = new Logger(LogLevel.Info);
        const spyGroupCollapsed = jest.spyOn(global.console, 'groupCollapsed').mockImplementation(() => {});
        const spyGroupEnd = jest.spyOn(global.console, 'groupEnd').mockImplementation(() => {});

        logger.info(GROUP_NAME, LOG_OBJECT);

        expect(spyGroupCollapsed).toHaveBeenCalled();
        expect(spyGroupCollapsed).toHaveBeenCalledWith(expect.stringContaining(GROUP_NAME));
        expect(spyGroupEnd).toHaveBeenCalled();
        expect(spyGroupEnd).toHaveBeenCalledWith();
    });

    describe('info() method', () => {
        it('should invoke console.info method if debug level', async () => {
            const logger = new Logger(LogLevel.Debug);
            const spyGroupCollapsed = jest.spyOn(global.console, 'groupCollapsed').mockImplementation(() => {});
            const spyGroupEnd = jest.spyOn(global.console, 'groupEnd').mockImplementation(() => {});
            const spy = jest.spyOn(global.console, 'info').mockImplementation(() => {});

            logger.info(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
            spyGroupCollapsed.mockRestore();
            spyGroupEnd.mockRestore();
        });

        it('should invoke console.info method if info level', async () => {
            const logger = new Logger(LogLevel.Info);
            const spy = jest.spyOn(global.console, 'info').mockImplementation(() => {});

            logger.info(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should not invoke console.info method if warn level', async () => {
            const logger = new Logger(LogLevel.Warn);
            const spy = jest.spyOn(global.console, 'info').mockImplementation(() => {});

            logger.info(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });

        it('should not invoke console.info method if error level', async () => {
            const logger = new Logger(LogLevel.Error);
            const spy = jest.spyOn(global.console, 'info').mockImplementation(() => {});

            logger.info(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });
    });

    describe('warn() method', () => {
        it('should invoke console.warn method if warn level', async () => {
            const logger = new Logger(LogLevel.Warn);
            const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

            logger.warn(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should invoke console.warn method if info level', async () => {
            const logger = new Logger(LogLevel.Info);
            const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

            logger.warn(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should invoke console.warn method if debug level', async () => {
            const logger = new Logger(LogLevel.Debug);
            const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

            logger.warn(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should not invoke console.warn method if error level', async () => {
            const logger = new Logger(LogLevel.Error);
            const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

            logger.warn(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });
    });

    describe('error() method', () => {
        it('should invoke console.error if error log level', async () => {
            const logger = new Logger(LogLevel.Error);
            const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

            logger.error(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should invoke console.error if warn log level', async () => {
            const logger = new Logger(LogLevel.Warn);
            const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

            logger.error(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should invoke console.error if info log level', async () => {
            const logger = new Logger(LogLevel.Info);
            const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

            logger.error(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should invoke console.error if debug log level', async () => {
            const logger = new Logger(LogLevel.Debug);
            const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

            logger.error(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });
    });

    describe('debug() method', () => {
        it('should invoke console.log if debug log level', async () => {
            const logger = new Logger(LogLevel.Debug);
            const spy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

            logger.debug(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(expect.stringContaining(LOG_STRING));

            spy.mockRestore();
        });

        it('should not invoke console.log if info log level', async () => {
            const logger = new Logger(LogLevel.Info);
            const spy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

            logger.debug(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });

        it('should not invoke console.log if warn log level', async () => {
            const logger = new Logger(LogLevel.Warn);
            const spy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

            logger.debug(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });

        it('should not invoke console.log if error log level', async () => {
            const logger = new Logger(LogLevel.Warn);
            const spy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

            logger.debug(GROUP_NAME, LOG_STRING);

            expect(spy).toHaveBeenCalledTimes(0);

            spy.mockRestore();
        });
    });
});
