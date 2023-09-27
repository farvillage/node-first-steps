import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify({
    logger: true,
});

const database = new DatabaseMemory();

server.post("/videos", (request, reply) => {
    const { title, description, duration } = request.body;

    database.create({
        title: title,
        description: description,
        duration: duration,
    });

    reply.status(201).send({ value: request.body });
});

server.get("/videos", (request, reply) => {
    const videos = database.list(request);
    reply.send({ videos });
});


server.put('/videos/:id', (request, reply) => {
    const videoID = request.params.id;
    const { title, description, duration } = request.body;

    const video = database.update(videoID, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
});

server.delete('/videos/:id', (request, reply) => {
    const videoID = request.params.id;

    database.delete(videoID)

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