import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useUserStore} from './useUserStore';


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


    fetchCourses: async (uid) => {
        if (!uid) 
            return;
        set({loading: true});
        try{
            const response = await axios.get(`${BASE_URL}/api/courses/${uid}`);
            set({courses: response.data.data, error: null});
            console.log("Course all fetched:");

        }catch (error){    
            console.log("Error fetching courses:", error);
            if (error.status === 429) 
                set({error: "Too many requests", courses: []});
            else 
                set({error: "An error occurred while fetching courses", courses: []});
        }finally{
            set({loading: false});
        }
    },

    searchCourse: async (str) => {
        const uid = useUserStore.getState().currentUser?.uid;
        if (!uid)
            return;
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/courses/${uid}/search/${str}`);
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


    fetchCourse: async (cid) => {
        const uid = useUserStore.getState().currentUser?.uid;
        if (!uid)
            return;
        set({loading: true});
        try {
            console.log("uid:", uid, "cid: ", cid);
            const response = await axios.get(`${BASE_URL}/api/courses/${uid}/${cid}`);
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
        const uid = useUserStore.getState().currentUser?.uid;
        set({loading: true});
        try {
            // const uid = useUserStore.getState().currentUser?.uid;
            const {formData}= get();
            console.log("from add: ",formData);
            // Explaining useUserStore.getState().currentUser?.uid
            // Since you are inside useCourseStore, you can’t use "hooks" like useUserStore() the normal way (because you are in a regular JavaScript file, not a React Component). Zustand provides a special backdoor called .getState().
            // useUserStore: This is your store that holds the login info.
            // .getState(): This is like opening the fridge door. It says, "Give me a snapshot of everything inside this store right now."
            // .currentUser: This looks for the user object you saved during login.
            // ?.uid: This is Optional Chaining. It means: "Look for the uid, but if currentUser is null (because nobody is logged in), don't crash—just return undefined."
            if (!uid) {
                toast.error("You must be logged in to add a course");
                return;
            }
            await axios.post(`${BASE_URL}/api/courses/${uid}`, formData);
            toast.success("course added successfully");
            await get().fetchCourses(uid);
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
    
    updateCourse: async (cid) => {
        const uid = useUserStore.getState().currentUser?.uid;
        if (!uid)
            return;
        set({loading: true});
        console.log("uid:", uid, "cid: ", cid);

        try {
            const {formData} = get();
            // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            // console.log("formData: ", formData);
            // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            // const responseg = await axios.get(`${BASE_URL}/api/courses/${uid}/${id}`);
            // console.log("responseg: ", responseg);
            // console.log("responseg.data.data.title: ", responseg.data.data.title);
            const response = await axios.put(`${BASE_URL}/api/courses/${uid}/${cid}`, formData);
            // console.log(response, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
            toast.success("course updated successfully");
            get().fetchCourses(uid);
        } catch (error) {
            console.log("Error updating course:", error);
            // console.error("Server Message:", error.response?.data?.message);
            toast.error("Failed to update course. Please try again.");
        } finally {
            set({loading: false});
        }
    },

    deleteCourse: async (cid) => {
        const uid = useUserStore.getState().currentUser?.uid;
        if (!uid)
            return;
        console.log("Deleting course with id:", cid);
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/courses/${uid}/${cid}`);
            set(prev => ({courses: prev.courses.filter(course => course.cid!==cid)}));
            toast.success("course deleted successfully");
            // After deletion, fetch the updated list of courses
            get().fetchCourses(uid);
        } catch (error) {
            console.log("Error deleting course:", error);
            toast.error("Failed to delete course. Please try again.");
        }
        finally {
            set({ loading: false });
        }
    },

    
    toggleCourseStatus: async (cid) => {
        const uid = useUserStore.getState().currentUser?.uid;
        if (!uid)
            return;
        const { courses } = get();
        const course = courses.find((c) => c.cid === cid);
        if (!course) return;

        // Cycle logic: To-Do -> In Progress -> Completed -> To-Do
        const statusOrder = ["To-Do", "In Progress", "Completed"];
        const currentIndex = statusOrder.indexOf(course.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

        set({ loading: true });
        try {
            await axios.put(`${BASE_URL}/api/courses/${uid}/${cid}`, { ...course, status: nextStatus });
            toast.success(`Marked as ${nextStatus}`);
            get().fetchCourses(uid); // Refresh list
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            set({ loading: false });
        }
    },
}));
