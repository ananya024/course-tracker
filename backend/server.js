// const express = reuire("express");

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // if PORT is not defined in the .env file, we will use 3000 as the default port

const __dirname = path.resolve();

console.log(PORT);


app.use(express.json()); // to parse the json data from the request body
app.use(cors()); // to prevent any course errors

app.use(helmet({
    contentSecurityPolicy:false,
}));  // security, secured from hackers
app.use(morgan("dev")); // log the requests in the console, for debugging purposes


// apply arcjet rate-limit to all routes
app.use(async(req,res,next) => {
    try{
        const decision = await aj.protect(req, { 
            requested:1 //specifies that each request comsumes 1 token
        })

        if (decision.isDenied()){
            if (decision.reason.isRateLimit())
            {
                res.status(429).json({error:"Too many Req"});
            }
            else if (decision.reason.isBot())
            {
                 res.status(403).json({error:"Bot access denied"});
            }
            else
            {
                res.status(403).json({error:"Forbidden"});
            }
            return
        }
        //checl for spoofed bots (when bot ied to act no like a bot)
        next();
    }
    catch (error)
    {
        console.log("Arcjet error", error);
        next(error);
    }
})


// we will use the course route for all the course related route
app.use("/api/courses", courseRoutes);

if(process.env.NODE_ENV==="production")
{
    // serve our react appl
    const distPath = path.join(__dirname, "frontend", "dist");
    app.use(express.static(distPath));
    app.get(".all", (req,res)=> {
        res.sendFile(path.resolve(distPath,"index.html"));
    })
}


async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                instructor VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                status VARCHAR(50) DEFAULT 'To-Do', 
                image VARCHAR(255),
                resource_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `; 
        console.log("Course Tracker Database Ready!");
    } catch (error) {
        console.error("DB Init Error:", error);
    }
}


initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
});