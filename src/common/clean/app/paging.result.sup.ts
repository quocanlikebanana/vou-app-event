export class PagingResultSup<T> {
	totalRecord: number;
	totalPage: number;
	page: number;
	perPage: number;
	data: T[];
}