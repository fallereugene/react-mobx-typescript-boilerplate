/* eslint-disable  no-console */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { LogLevel, LEVEL } from './constants';

/**
 * Логгер
 * Поддерживаются следующие уровни логгирования: error (0), warn (1), info (2), debug (3).
 */
export class Logger {
    private static readonly UTC_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

    constructor(private logLevel: LogLevel = LogLevel.Error) {}

    info(groupName: string, payload: any) {
        this.shouldLog(LogLevel.Info) && Logger.log(groupName, payload, 'info');
    }

    warn(groupName: string, payload: any) {
        this.shouldLog(LogLevel.Warn) && Logger.log(groupName, payload, 'warn');
    }

    error(groupName: string, payload: any) {
        this.shouldLog(LogLevel.Error) && Logger.log(groupName, payload, 'error');
    }

    debug(groupName: string, payload: any) {
        this.shouldLog(LogLevel.Debug) && Logger.log(groupName, payload, 'debug');
    }

    getLogLevel() {
        return this.logLevel;
    }

    private static log(groupName: string, payload: any, severity: Lowercase<keyof typeof LogLevel>) {
        console.groupCollapsed(`[${dayjs.extend(utc).utc().format(Logger.UTC_FORMAT)}] ${groupName}`);
        console[severity === 'debug' ? 'log' : severity](payload);
        console.groupEnd();
    }

    private shouldLog(severity: LogLevel) {
        return LEVEL[this.logLevel].includes(severity);
    }
}
