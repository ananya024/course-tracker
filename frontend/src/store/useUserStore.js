import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";


const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:3000" : ""
// const [loggedIn, setLoggedIn]=useState(false);

export const useUserStore = create(
    persist(

    (set, get) => ({
        users:[],
        loading:false,
        error: null,
        currentUser:null,
        formData: { name: "", password: "" },
        
        setFormData: (formData) => set({ formData }),    
        resetForm: () => set({ formData: { name: "", password: "" } }), 

        register: async (e) => {
            console.log("hi from store");
            e.preventDefault();
            set({loading: true});
            try {
                console.log("hi from store try block register");
                const {formData}= get();
                await axios.post(`${BASE_URL}/api/users/register`, formData); // Send to Backend
                console.log("hi from store after await register");
                toast.success("User registered successfully, you may login now");
                get().resetForm();
            } catch (error) {
                toast.error("Username already exists, use another username");
                console.log("failed to add",error);
            } finally {
                set({loading: false});
            }
        },

        login: async (e) => {
            console.log("hi from store login");
            if (e) e.preventDefault();
            set({ loading: true });
            try {
                const { formData } = get(); 
                console.log("hi from store try block login");
                const response = await axios.post(`${BASE_URL}/api/users/login`, formData);
                console.log("hi from store after await login responce.data.data:", response.data.data);
                // no error means mil gaya match
                set({ currentUser: response.data.data, error: null });
                toast.success(`Welcome back, ${response.data.data.name}!`);
                get().resetForm(); 
                return true; // if things go correctly
                // setLoggedIn(true);
            } catch (error) {
                console.log("Login Error:", error);
                toast.error("Invalid credentials");
                set({ error: error.response?.data?.message, currentUser: null });
                return false;
            } finally {
                set({ loading: false });
            }
            // return loggedIn;
        },

        logout: () => {
            set({ currentUser: null });
            toast.success("Logged out successfully");
        },
    }),
    {
        name:"user-storage",
        storage: createJSONStorage(() => localStorage),
    })
);