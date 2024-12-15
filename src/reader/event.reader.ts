export default abstract class EventReader {
    abstract getAll(): void;
    abstract getQuery(orderBy: string, page: number, perPage: number): void;
}