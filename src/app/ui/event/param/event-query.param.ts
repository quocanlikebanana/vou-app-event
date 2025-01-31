import { IsString, IsOptional, IsIn, IsArray, Validate, ValidateNested, IsEnum } from "class-validator";
import { PagingParamSup } from "../common/paging.param.sup";
import { Type } from "class-transformer";
import { EventStatus } from "@prisma/client";

class EventSortingDTO {
	@IsString()
	@IsIn(['name', 'startDate', 'endDate'])
	sortBy: 'name' | 'startDate' | 'endDate';

	@IsString()
	@IsIn(['asc', 'desc'])
	sortOrder: 'asc' | 'desc';
}

export class EventQueryParam extends PagingParamSup {
	@IsString()
	@IsOptional()
	nameKeyword?: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => EventSortingDTO)
	@IsOptional()
	sort?: EventSortingDTO[];


	@IsArray()
	@IsEnum(EventStatus, { each: true })
	@IsOptional()
	filterStatus?: EventStatus[];
}