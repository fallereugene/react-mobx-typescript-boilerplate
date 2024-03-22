import { LogLevel } from './log-level';

export const LEVEL: { [key in LogLevel]: LogLevel[] } = {
    [LogLevel.Info]: [LogLevel.Info, LogLevel.Warn, LogLevel.Error],
    [LogLevel.Warn]: [LogLevel.Warn, LogLevel.Error],
    [LogLevel.Error]: [LogLevel.Error],
    [LogLevel.Debug]: [LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error],
};
