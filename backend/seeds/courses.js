import { sql } from "../config/db.js";

const SAMPLE_COURSES = [
  {
    title: "Full-Stack Web Development",
    instructor: "Angela Yu",
    category: "Development",
    image: "https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?s=612x612&w=0&k=20&c=jlYes8ZfnCmD0lLn-vKvzQoKXrWaEcVypHnB5MuO-g8=",
    resource_url: "https://www.youtube.com/watch?v=lfmg-EJ8gm4&t=9s",
  },
  {
    title: "Advanced Data Structures & Algorithms",
    instructor: "Abdul Bari",
    category: "Computer Science",
    image: "https://img.freepik.com/free-photo/computer-program-coding-screen_53876-138060.jpg?semt=ais_user_personalization&w=740&q=80",
    resource_url: "https://www.youtube.com/watch?v=HGTJBPNC-Gw&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3",
  },
  {
    title: "Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    category: "Machine Learning",
    image: "https://www.shutterstock.com/image-photo/colorcoded-code-network-config-hex-600nw-2679792993.jpg",
    resource_url: "https://www.youtube.com/watch?v=5OdVJbNCSso&list=PLZPZq0r_RZOPP5Yjt6IqgytMRY5uLt4y3&index=5",
  },
  {
    title: "Modern UI/UX Design",
    instructor: "Gary Simon",
    category: "Design",
    image: "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_1280.jpg",
    resource_url: "https://www.youtube.com/watch?v=pJdTyvufOdg",
  },
  {
    title: "Complete Python Bootcamp",
    instructor: "Jose Portilla",
    category: "Programming",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-blue-binary-code-digital-rain-background-stock-photo-image_16189770.jpg",
    resource_url: "https://www.youtube.com/watch?v=lx3YJj0nJVk",
  },
  {
    title: "Intro to Cybersecurity",
    instructor: "NetworkChuck",
    category: "Cybersecurity",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Code-1076536.jpg",
    resource_url: "https://www.youtube.com/watch?v=2kS4Uw-aQ1khttps://www.youtube.com/@NetworkChuck",
  },
];
async function seedDatabase() {
  try {
    // 1. Clear existing course data and reset the ID counter
    await sql`TRUNCATE TABLE courses RESTART IDENTITY`;

    // 2. Insert all courses
    for (const course of SAMPLE_COURSES) {
      await sql`
        INSERT INTO courses (title, instructor, category, image, status, resource_url)
        VALUES (${course.title}, ${course.instructor}, ${course.category}, ${course.image}, 'To-Do', ${course.resource_url})
      `;
    }

    console.log("Database seeded with courses successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}
seedDatabase();