import { fastify } from 'fastify';
//import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify({
    logger: true,
});

//const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title: title,
        description: description,
        duration: duration,
    });

    reply.status(201).send({ value: request.body });
});

server.get("/videos", async (request, reply) => {
    const videos = await database.list(request);
    reply.send({ videos });
});


server.put('/videos/:id', async (request, reply) => {
    const videoID = request.params.id;
    const { title, description, duration } = request.body;

    const video = await database.update(videoID, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
});

server.delete('/videos/:id', async (request, reply) => {
    const videoID = request.params.id;

    await database.delete(videoID)

    return reply.status(204).send()
});


server.listen({
        port: 3333,
    },
    (err, addres) => {

        console.log(addres);
        if (err) {
            console.log(err);
            process.exit(1);
        }
});