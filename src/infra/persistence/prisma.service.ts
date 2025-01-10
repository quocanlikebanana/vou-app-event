import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { env } from 'process';

function logQueryMiddleware(): Prisma.Middleware {
    return async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();

        console.log(`Query: ${params.model}.${params.action}`);
        console.log(`Params: ${JSON.stringify(params.args)}`);
        console.log(`Duration: ${after - before}ms`);

        return result;
    };
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
