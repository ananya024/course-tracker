import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast";


// eg: my-postgress-store.com
// const BASE_URL = "http://localhost:3000";
// base url wil be dynamic depending on environment (development or production)
const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:3000" : ""

export const useCourseStore = create((set, get) => ({
    // course starte
    courses:[],
    loading:false,
    error: null,
    currentCourse:null,

    // form state
    formData:{
        title: "",
        instructor: "",
        category: "",
        image: "",
        status: "To-Do",
        resource_url: "",
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({formData: { title: "", instructor: "", category: "", image: "", status: "To-Do" , resource_url: ""}}),

    fetchCourses: async () => {
        set({loading: true});
        try 
        {
            const response = await axios.get(`${BASE_URL}/api/courses`);
            set({courses: response.data.data, error: null});
            console.log("Course all fetched:");

        }
        catch (error)
        {    
            console.log("Error fetching courses:", error);
            if (error.status === 429) 
                set({error: "Too many requests", courses: []});
            else 
                set({error: "An error occurred while fetching courses", courses: []});
        }
        finally
        {
            set({loading: false});
        }
    },

    searchCourse: async (str) => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/courses/search/${str}`);
            set({courses:response.data.data, error:null});
            if (response.data.data.length===0)
            {
                toast.error("No suchu courses");
                // get().fetchCourses();
            }
            // get().fetchCourses();
        } catch (error) {    
            console.log("Error fetching courses:", error);
            if (error.status === 429) 
                set({error: "Too many requests", courses: []});
            else 
                set({error: "An error occurred while searching for courses", courses: []});
        } finally {
            set({loading: false});
        }
    },


    fetchCourse: async (id) => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/courses/${id}`);
            set({currentCourse: response.data.data,
                formData: response.data.data, 
                error: null});
            console.log("Course i fetched:");
        } catch (error) {
            console.log("Error fetching course:", error);
            set({error: "An error occurred while fetching the course", currentCourse: null});
        } finally {
            set({loading: false});
        }
    },

    addCourse: async (e) => {
        e.preventDefault();
        set({loading: true});
        try {
            const {formData}= get();
            console.log("from add: ",formData);
            await axios.post(`${BASE_URL}/api/courses`, formData);
            toast.success("course added successfully");
            await get().fetchCourses();
            get().resetForm();
            
            // close modal x
            document.getElementById("add_course_modal").close();
        }
        catch (error) {
            console.log("Error adding course:", error);
            toast.error("Failed to add course. Please try again.");
        }
        finally {set({loading: false});}
    },
    
    updateCourse: async (id) => {
        set({loading: true});
        try {
            const {formData} = get();
            // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            // console.log("formData: ", formData);
            // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            // const responseg = await axios.get(`${BASE_URL}/api/courses/${id}`);
            // console.log("responseg: ", responseg);
            // console.log("responseg.data.data.title: ", responseg.data.data.title);
            const response = await axios.put(`${BASE_URL}/api/courses/${id}`, formData);
            // console.log(response, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
            toast.success("course updated successfully");
            get().fetchCourses();
        } catch (error) {
            console.log("Error updating course:", error);
            // console.error("Server Message:", error.response?.data?.message);
            toast.error("Failed to update course. Please try again.");
        } finally {
            set({loading: false});
        }
    },

    deleteCourse: async (id) => {
        console.log("Deleting course with id:", id);
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/courses/${id}`);
            set(prev => ({courses: prev.courses.filter(course => course.id!==id)}));
            toast.success("course deleted successfully");
            // After deletion, fetch the updated list of courses
            get().fetchCourses();
        } catch (error) {
            console.log("Error deleting course:", error);
            toast.error("Failed to delete course. Please try again.");
        }
        finally {
            set({ loading: false });
        }
    },

    
    toggleCourseStatus: async (id) => {
        const { courses } = get();
        const course = courses.find((c) => c.id === id);
        if (!course) return;

        // Cycle logic: To-Do -> In Progress -> Completed -> To-Do
        const statusOrder = ["To-Do", "In Progress", "Completed"];
        const currentIndex = statusOrder.indexOf(course.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

        set({ loading: true });
        try {
            await axios.put(`${BASE_URL}/api/courses/${id}`, { ...course, status: nextStatus });
            toast.success(`Marked as ${nextStatus}`);
            get().fetchCourses(); // Refresh list
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            set({ loading: false });
        }
    },
}));
