import { Injectable } from '@nestjs/common';

@Injectable()
export class ReaderService {
    constructor(
        private readonly prisma
    ) { }
}
