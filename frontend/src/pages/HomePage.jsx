import { useState, useEffect } from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { PlusCircleIcon, RefreshCwIcon,PackageIcon, SearchIcon } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import AddCourseModal from '../components/AddCourseModal';

function HomePage() {
  const {courses, loading, error, fetchCourses, searchCourse} = useCourseStore();

  // useEffect(()=> {fetchCourses();} , [fetchCourses]); //bcoz ab search hai so no need rto rerender each tieme fetch chnages, bcoz search ka useEffect taling care of that
  useEffect(()=> {fetchCourses();} , []); //[] means render once
  const [str, setStr]= useState("");
  // useEffect(()=> {
  //   if (str.trim!=="") 
  //     searchCourse(str); 
  //   else 
  //     fetchCourses();
  // },[str]);  
  useEffect(()=> {
    const timer = setTimeout(()=> {
      if (str.trim()!=="")
        searchCourse(str);
      else
        fetchCourses();
    },500); //waits for 0.5 sec
    return () => clearTimeout(timer);  //clear timer if user not tpye
  }, [str, searchCourse, fetchCourses]);

  const sortedCourses = [...courses].sort((a,b) => {
      const priority = {"In Progress":1,"To-Do":2,"Completed":3};
      return (priority[a.status] || 4)-(priority[b.status] || 4);
      
  });

  const todoCount = courses.filter(c => c.status === "To-Do").length;
  const inProgressCount = courses.filter(c => c.status === "In Progress").length;
  // console.log("courses", courses);
  
  return(
    <main className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <button 
          className="btn btn-primary" 
          onClick={()=> document.getElementById("add_course_modal").showModal()}
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add course
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchCourses}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <div className="flex mb-6 items-center px-3 h-10 w-[400px] border border-[#303030] rounded-full bg-base-content/5">
          <input
            type="text"
            placeholder="search here"
            className="flex-1 h-full bg-transparent border-none outline-none px-4 text-base-content text-sm"
            value={str}
            onChange={(e)=> setStr(e.target.value)}
          />  
          <SearchIcon className='size-4'/>
          
      </div>
      
      <AddCourseModal />
      
      <div className="rounded-full hover:bg-base-200 transition-colors">
        <span className="badge indicator-item">To-Do: {todoCount}</span>      
        <span className="badge indicator-item">In Progress: {inProgressCount}</span>      
      </div>

      <div className='p-2'/> 
      {/* for space */}

      {error && <div className="alert alert-error mb-4">{error}</div>}

      {courses.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No courses found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first course to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ?(
          <div className ="flex justify-center items-center h-64">
            <div className='loading loading-spinner loading-lg'/>
          </div> 
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {sortedCourses.map((courses) => (
              <CourseCard key={courses.id} course={courses} />
            ))}
          </div>
        )
      }
      
    </main>
  );
}

export default HomePage;