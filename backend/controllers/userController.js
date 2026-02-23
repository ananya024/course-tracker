import {sql} from  "../config/db.js";
import bcrypt from "bcrypt";
// import { useState, useEffect } from "react";
// Delete this! You are in a Node.js backend file. useState and useEffect are
// frontend React hooks—they don't exist and aren't used in the backend. Keeping 
// them there might cause a "module not found" error when you deploy to the server.

export const registerUser = async (req, res) => {
    console.log("hi from controller regiister", req.body);
    const { name, password } = req.body;
    if (!name||!password)
        return res.status(400).json({success: false, message: "Please provide name and password"});
    try 
    { 
        console.log("about to add user")
        const hashedPass =await bcrypt.hash(password,10)
        const newUser = await sql`
            insert into users (name, password) 
            values (${name}, ${hashedPass}) 
            returning *
            `;
        console.log("created user", newUser);
        res.status(201).json({success: true, data: newUser[0]});
        // 201 when resourse has been created successfully
    }
    catch(error) {
        console.error("Error creating User:", error);
        res.status(500).json({success: false, message: "Failed to create user"});
    }
};

export const loginUser = async (req, res) => {
    console.log("hi from controller login", req.body);
    // const {name,inputPassword}=req.body;
    const {name,password}=req.body;  //MUST BE THE SAME KEYWORD!!

    try {
        console.log("about to fetch user", name);
        const user= await sql`select * from users where name=${name}`;
        console.log("got user",user);
        if (user.length===0)
            return res.status(404).json({success: false, message: "user not found"});
        console.log("input:" , password, "hashed: ",user[0].password);
        if (await bcrypt.compare(password, user[0].password)) {
            console.log(`${name} loggen in!`)
            res.status(200).json({success: true, data: user[0]});
        } else {
            res.send('Invalid password')
            console.log("Invalid pass")
        }
    } catch(error) {
        console.error("Error fetching user:", error);
        res.status(500).json({success: false, message: "Failed to fetch user"});
    }
};