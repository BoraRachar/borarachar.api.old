export enum LogLevel {
  Error = "error",
  Warn = "warn",
  Info = "info",
  HTTP = "http",
  Verbose = "verbose",
  Debug = "debug",
  Silly = "silly",
}

const allLogLevels: string[] = [
  LogLevel.Error,
  LogLevel.Warn,
  LogLevel.Info,
  LogLevel.HTTP,
  LogLevel.Verbose,
  LogLevel.Debug,
  LogLevel.Silly,
];

export function isLogLevel(value: unknown): value is LogLevel {
  if (typeof value !== "string") {
    return false;
  }
  return allLogLevels.indexOf(value) !== -1;
}
