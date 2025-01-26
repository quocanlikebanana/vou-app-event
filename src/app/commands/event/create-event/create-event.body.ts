import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDate, IsNumber, IsUrl, IsArray } from "class-validator";

export class CreateEventBody {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsUrl()
	image: string;

	@IsDate()
	@Type(() => Date)
	startDate: Date;

	@IsDate()
	@Type(() => Date)
	endDate: Date;

	@IsString()
	partnerId: string;

	@IsNumber()
	aboutToStartMark: number;

	@IsArray({ each: true })
	@Type(() => CreateGameOfEventBody)
	gameOfEvents: CreateGameOfEventBody[];
}


export class CreateGameOfEventBody {
	@IsString()
	gameTypeId: string;

	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsUrl()
	image: string;
}