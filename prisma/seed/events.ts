import { Event } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export const events: Event[] = [
    {
        id: uuidv4(),
        name: "Music Concert",
        description: "A live music concert featuring popular bands.",
        image: "concert.jpg",
        eventStatus: $Enums.EventStatus.APPROVED,
        startDate: new Date("2023-11-01T18:00:00Z"),
        endDate: new Date("2023-11-01T21:00:00Z"),
        turnsPerDay: 3,
        partnerId: uuidv4()
    },
    {
        id: uuidv4(),
        name: "Art Exhibition",
        description: "An exhibition showcasing contemporary art.",
        image: "art_exhibition.jpg",
        eventStatus: $Enums.EventStatus.PENDING,
        startDate: new Date("2023-12-15T10:00:00Z"),
        endDate: new Date("2023-12-15T17:00:00Z"),
        turnsPerDay: 2,
        partnerId: uuidv4()
    },
    {
        id: uuidv4(),
        name: "Tech Conference",
        description: "A conference discussing the latest in technology.",
        image: "tech_conference.jpg",
        eventStatus: $Enums.EventStatus.REJECTED,
        startDate: new Date("2024-01-20T09:00:00Z"),
        endDate: new Date("2024-01-20T18:00:00Z"),
        turnsPerDay: 4,
        partnerId: uuidv4()
    },
    {
        id: uuidv4(),
        name: "Food Festival",
        description: "A festival celebrating diverse culinary traditions.",
        image: "food_festival.jpg",
        eventStatus: $Enums.EventStatus.APPROVED,
        startDate: new Date("2024-02-10T11:00:00Z"),
        endDate: new Date("2024-02-10T20:00:00Z"),
        turnsPerDay: 3,
        partnerId: uuidv4()
    },
    {
        id: uuidv4(),
        name: "Marathon",
        description: "A city-wide marathon event.",
        image: "marathon.jpg",
        eventStatus: $Enums.EventStatus.PENDING,
        startDate: new Date("2024-03-05T06:00:00Z"),
        endDate: new Date("2024-03-05T14:00:00Z"),
        turnsPerDay: 1,
        partnerId: uuidv4()
    }
];