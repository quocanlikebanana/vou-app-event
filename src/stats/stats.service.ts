import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/persistence/prisma.service';

enum TimeWindow {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month' // 30 days
}

@Injectable()
export class StatsService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getEventsGroupedByDay(start: Date, end: Date): Promise<any[]> {
        const startString = start.toISOString();
        const endString = end.toISOString();
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                DATE_TRUNC('day', "createdAt") AS "day",
                COUNT(*)::int AS "count"
            FROM "Event"
            WHERE "createdAt" >= ${startString}::timestamp
                AND "createdAt" <= ${endString}::timestamp
            GROUP BY DATE_TRUNC('day', "createdAt")
            ORDER BY "day" ASC;
        `;
        return result;
    }

    async topMostJoinedEvents(top: number): Promise<any[]> {
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                "Event".*
                "eventId",
                COUNT(*)::int AS "user_count"
            FROM "User_Join_Event" AS "U" 
            JOIN "Event" ON "U"."eventId" = "Event"."id"
            GROUP BY "U"."eventId", "Event"."id", "Event"."name", "Event"."partnerId", "Event"."createdAt"
            ORDER BY "user_count" DESC
            LIMIT ${top};
        `;
        return result;
    }

    async topMostCreatedEvents(top: number): Promise<any[]> {
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                "partnerId",
                COUNT(*)::int AS "count"
            FROM "Event"
            GROUP BY "partnerId"
            ORDER BY "count" DESC
            LIMIT ${top};
        `;
        return result;
    }

    async getEventAggregateStats(eventId: string): Promise<any> {
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                "Event".*,
                (SELECT COUNT(*)::int FROM "User_Join_Event" WHERE "eventId" = ${eventId}) AS "joinCount",
                (SELECT COUNT(*)::int FROM "User_Like_Event" WHERE "eventId" = ${eventId}) AS "likeCount"
            FROM "Event"
            WHERE "Event"."id" = ${eventId};
        `;
        return result;
    }

    async getAllEventAggregateStats(): Promise<any> {
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                "Event".*,
                COUNT("User_Join_Event"."id")::int AS "joinCount",
                COUNT("User_Like_Event"."id")::int AS "likeCount"
            FROM "Event"
            LEFT JOIN "User_Join_Event" ON "Event"."id" = "User_Join_Event"."eventId"
            LEFT JOIN "User_Like_Event" ON "Event"."id" = "User_Like_Event"."eventId"
            GROUP BY "Event"."id", "Event"."name", "Event"."partnerId", "Event"."createdAt"
        `;
        return result;
    }

    async topMostJoinedEventsOfPartner(top: number, partnerId: string): Promise<any[]> {
        const result = await this.prismaService.$queryRaw<any[]>`
            SELECT
                "Event".*,
                COUNT("User_Join_Event"."id")::int AS "joinCount"
            FROM "Event"
            LEFT JOIN "User_Join_Event" ON "Event"."id" = "User_Join_Event"."eventId"
            WHERE "Event"."partnerId" = ${partnerId}
            GROUP BY "Event"."id"
            ORDER BY "joinCount" DESC
            LIMIT ${top};
        `;
        return result;
    }
}
