import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty } from "class-validator";
import { CreateEventBody } from "../create-event/create-event.body";

export class UpdateEventBody extends OmitType(PartialType(CreateEventBody), ['partnerId', 'startDate', 'endDate']) {
	@IsString()
	@IsNotEmpty()
	id: string;
}