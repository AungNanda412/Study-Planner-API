import { prisma } from "../lib/prisma";



export async function getTopic() {

    const topics = await prisma.topic.findMany({
        orderBy: { name: 'asc' },
    }) 
    
    return topics;
}

export async function createTopicService() {
    
}