import { generateUUID } from "src/utils/id"
import { CreateNewEventParam } from "../param/event.param"

const imageUrl = "https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws="

const day = 1000 * 60 * 60 * 24;
const base = new Date(Date.now() + day * 1);

export const mockCreateEventParams: CreateNewEventParam[] = [
    {
        name: "Spring Boot",
        description: "Spring Boot is a project built on the top of the Spring framework. It provides a simpler and faster way to set up, configure, and run both simple and web-based applications.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day),
        turnsPerDay: 1,
        partnerId: generateUUID()
    },
    {
        name: "Angular Workshop",
        description: "A comprehensive workshop on Angular framework, covering all the basics and advanced topics.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day * 2),
        turnsPerDay: 2,
        partnerId: generateUUID()
    },
    {
        name: "React Conference",
        description: "Join us for a full-day conference on React, featuring talks from core team members and community experts.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day * 5),
        turnsPerDay: 3,
        partnerId: generateUUID()
    },
    {
        name: "Vue.js Meetup",
        description: "A meetup for Vue.js enthusiasts to share knowledge and network with fellow developers.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day * 3),
        turnsPerDay: 1,
        partnerId: generateUUID()
    },
    {
        name: "Node.js Bootcamp",
        description: "An intensive bootcamp to learn Node.js from scratch, including building and deploying applications.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day * 4),
        turnsPerDay: 2,
        partnerId: generateUUID()
    },
    {
        name: "DevOps Summit",
        description: "A summit focused on DevOps practices, tools, and methodologies to improve software delivery.",
        image: imageUrl,
        startDate: new Date(base),
        endDate: new Date(base.getTime() + day * 6),
        turnsPerDay: 3,
        partnerId: generateUUID()
    }
]

