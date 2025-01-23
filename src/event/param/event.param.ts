import { IsBoolean, IsBooleanString, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { boolean } from "zod";



export class ValidateEventApprovalParam {
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsBooleanString()
    @Type(() => boolean)
    isApproved: boolean;
}

abstract class UserInEventParamBase {
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class LikeEventParam extends UserInEventParamBase { }

export class UnlikeEventParam extends UserInEventParamBase { }

export class JoinEventParam extends UserInEventParamBase { }

export class LeaveEventParam extends UserInEventParamBase { }

export class ReduceTurnParam {
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @Type(() => Number)
    turn: number;
}

export class GiveTurnParam extends ReduceTurnParam {
    @IsString()
    @IsNotEmpty()
    userTakeId: string;
}