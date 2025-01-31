import { IsNumber, Min } from "class-validator";

export class PagingParamSup {
	@IsNumber()
	@Min(1)
	page: number;

	@IsNumber()
	@Min(1)
	perPage: number;
}