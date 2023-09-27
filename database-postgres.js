import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres{
    #videos = new Map();

    async list(search = '') {
        let videos;

        if (search){
            videos = sql`select * from videos where title ilike ${"%" + search + "%"}`;
        } else {
            videos = sql`select * from videos`
        }

        return videos
    }

    async create(video) {
        const videoID = randomUUID();

        const { title, description } = video;

        await sql`insert into videos (id, title, description, duration) VALUES (${videoID}, ${title}), ${description}, ${duration})`;
    }

    async update(id, video) {
        const { title, description } = video;
        
        await sql`update video set title = ${title}), description = ${description}, duration = ${duration}) WHERE id = ${id}`;
    }
    
    

    async delete(id) {
        const { title, description } = video;

        await sql`delete from videos where id = ${id}`
    }
}