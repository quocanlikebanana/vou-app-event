import { EventAggregate } from '../event.agg';

describe('EventAggregate', () => {
    beforeEach(() => {
    });

    it('should create an instance of EventAggregate', () => {
        const twoDaysFromNow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        const fourDaysFromNow = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000);
        const eventAggregate = EventAggregate.create({
            name: "Spring Boot",
            description: "Spring Boot is a project built on the top of the Spring framework. It provides a simpler and faster way to set up, configure, and run both simple and web-based applications.",
            image: "https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws=",
            startDate: twoDaysFromNow,
            endDate: fourDaysFromNow,
            turnsPerDay: 1,
            partnerId: "123",
            usersJoin: [],
            usersLike: [],
        });
        expect(eventAggregate).toBeDefined();
    });
});