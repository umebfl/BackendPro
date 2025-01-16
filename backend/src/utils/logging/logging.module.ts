import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context || 'App'}] ${level}: ${message}${
          trace ? `\n${trace}` : ''
        }`;
      }),
    ),
  }),
  new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }),
];

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      // level: 'info',
      format: winston.format.json(),
      transports,
    }),
  ],
  exports: [WinstonModule],
})
export class LoggingModule {}
