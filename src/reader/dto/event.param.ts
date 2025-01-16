import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsBooleanString, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { EventStatus } from "src/common/type";

export enum EventOrderByQuery {
    STARTDATE = "startDate",
    ENDDATE = "endDate",
    NAME = "name",
}

export enum UserEventStatusQuery {
    UPCOMING = "UPCOMING",
    STARTING = "STARTING",
    ENDED = "ENDED",
}

export class SortParam {
    @IsString()
    @IsEnum(EventOrderByQuery)
    field: string;

    @IsBoolean()
    isAsc: boolean;
}

export class EventQueryParam {
    @IsString()
    @IsOptional()
    searchName?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SortParam)
    @Transform(({ value }) => (Array.isArray(value) ? value : []))
    sorts: SortParam[];

    @IsArray()
    @IsEnum(EventStatus, { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : []))
    statusFilter: EventStatus[];

    @IsArray()
    @IsEnum(UserEventStatusQuery, { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : []))
    userStatusFilter: UserEventStatusQuery[];

    @IsNumber({ maxDecimalPlaces: 0 })
    @Type(() => Number)
    @Min(1)
    page: number;

    @IsNumber({ maxDecimalPlaces: 0 })
    @Type(() => Number)
    @Min(1)
    perPage: number;
}

export class EventQueryParamFromUser extends EventQueryParam {
    @IsString()
    userId: string;
}

export class EventQueryParamFromPartner extends EventQueryParam {
    @IsString()
    partnerId: string;
}