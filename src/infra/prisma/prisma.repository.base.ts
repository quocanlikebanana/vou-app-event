import { Injectable } from "@nestjs/common";
import { PrismaUnitOfWork } from "./prisma.unit-of-work";

@Injectable()
export class PrismaRepositoryBase {
	constructor(
		protected readonly uow: PrismaUnitOfWork
	) { }
}