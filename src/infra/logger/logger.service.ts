import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigurationService } from 'src/utils/configuration';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export default class LoggerService {
    private readonly logger: Logger;

    constructor(
        private readonly configService: ConfigurationService
    ) {
        let logDir = this.configService.logDir;
        if (logDir == null || !fs.existsSync(logDir)) {
            logDir = path.join(__dirname, '../../../log/');
        }

        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
            transports: [
                new transports.File({
                    filename: 'info.log',
                    dirname: logDir,
                    level: 'info',
                }),
                new transports.File({
                    filename: 'error.log',
                    dirname: logDir,
                    level: 'error',
                })
            ]
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }
}