import {sql} from  "../config/db.js";

// CRUD operations for courses
// Create, Read, Update, Delete

export const getCourses = async (req, res) => {
    try
    {
        const courses = await sql `select * from courses order by created_at desc`;
        console.log("fetched courses", courses);
        res.status(200).json({success: true, data: courses});
    }
    catch (error)
    {
        console.error("Error fetching courses:", error);
        res.status(500).json({success: false, message: "Failed to fetch courses"});
    }
};

export const searchCourse = async (req, res) => {
    const {str}=req.params;
    try {
        // const course= await sql`select * from courses where title like '%${str}%' or category like '%${str}%' or instructor like '%${str}%'`;
        const course= await sql`select * from courses where title ilike ${'%' + str + '%'} or category ilike ${'%' + str + '%'} or instructor ilike ${'%' + str + '%'}`;
        if (course.length === 0)
        {
            return res.status(404).json({success: false, message: "course not found"});
        }
        res.status(200).json({success: true, data: course});
    }
    catch(error)
    {
        console.error("Error fetching course:", error);
        res.status(500).json({success: false, message: "Failed to fetch course"});
    }
};


export const createCourse = async (req, res) => {
    
    const { title, instructor, category, image, resource_url } = req.body;
    // app.use(express.json()); // to parse the json data from the request body
    // this line is server.js helps us do {name,orice,image}
    if (!title||!category||!image||!instructor||!resource_url)
    {
        return res.status(400).json({success: false, message: "Please provide name, price and image"});
    }
    try 
    { 
        const newCourse = await sql`
            insert into courses (title, instructor, category, image, resource_url) 
            values (${title}, ${instructor}, ${category}, ${image}, ${resource_url}) 
            returning *
            `;
        console.log("created course", newCourse);
        res.status(201).json({success: true, data: newCourse[0]});
        // 201 when resourse has been created successfully
    }
    catch(error)
    {
        console.error("Error creating course:", error);
        res.status(500).json({success: false, message: "Failed to create course"});
    }

};

export const getCourse = async (req, res) => {
    const {id}=req.params;
    try {
        const course= await sql`select * from courses where id=${id}`;
        if (course.length === 0)
        {
            return res.status(404).json({success: false, message: "course not found"});
        }
        res.status(200).json({success: true, data: course[0]});
    }
    catch(error)
    {
        console.error("Error fetching course:", error);
        res.status(500).json({success: false, message: "Failed to fetch course"});
    }
};

export const updateCourse = async (req, res) => {
    const {id}=req.params;
    const { title, instructor, category, image, status, resource_url } = req.body;
    try 
    {
        const updatedProd= await sql`update courses set title=${title}, instructor=${instructor}, category=${category}, image=${image}, status=${status}, resource_url=${resource_url} where id=${id} returning *`;
        if (updatedProd.length === 0)
        {
            return res.status(404).json({success: false, message: "course not found"});
        }
        res.status(200).json({success: true, data: updatedProd[0]});
    }
    catch(error)
    {
        console.error("Error updating course:", error);
        res.status(500).json({success: false, message: "Failed to update course"});
    }
};

export const deleteCourse = async (req, res) => {
    const {id}=req.params;
    try 
    {
        const deletedProd= await sql`delete from courses where id=${id} returning *`;
        if (deletedProd.length === 0)
        {
            return res.status(404).json({success: false, message: "course not found"});
        }
        res.status(200).json({success: true, data: deletedProd[0]});
    }
    catch(error)
    {
        console.error("Error deleting course:", error);
        res.status(500).json({success: false, message: "Failed to delete course"});
    }
};