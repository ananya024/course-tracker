import { useEffect } from 'react'
import { useCourseStore } from '../store/useCourseStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon} from 'lucide-react';

function CoursePage() {
  const { currentCourse, formData, setFormData, loading, error, fetchCourse, updateCourse, deleteCourse } = useCourseStore();
  const navigate = useNavigate();
  const {uid,cid} = useParams();

  useEffect(() => {
    fetchCourse(cid)
  }, [fetchCourse, cid]);

  // const handleDelete = async () => {
  //   if (window.confirm("Are you sure you want to delete this Course?")) {
  //     await deleteCourse(id);
  //     navigate("/");
  //   }
  // };
  
  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update this Course?")) {
      await updateCourse(cid);
      navigate("/");
    }
  };

  // console.log("Current Course:", currentCourse);
  // console.log("formData:", formData); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2"/>
        Back to Courses
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course IMG */}
        <img
          src={currentCourse?.image}
          alt={currentCourse?.title}
          className='size-full object-cover'
        />

        {/* Course FORM */}
        <div className='card bg-base-100 shadow-lg'>
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Course</h2>
            <form 
              onSubmit={(e)=> {
              e.preventDefault();
              handleUpdate();
              }} 
              className="space-y-6"
            >

              {/* PROD NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Course Title</span>
                </label>
                <input 
                  type="text"
                  placeholder='enter prod name'
                  className='input input-bordered w-full'
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>


              {/* Course category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter category"
                  className="input input-bordered w-full"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value })}
                />
              </div>

              {/* Course Instructor URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Instructor</span>
                </label>
                <input
                  type="text"
                  placeholder="enter instructor"
                  className="input input-bordered w-full"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
              
              {/* Course resource_url URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">resource_url</span>
                </label>
                <input
                  type="text"
                  placeholder="enter resource_url"
                  className="input input-bordered w-full"
                  value={formData.resource_url}
                  onChange={(e) => setFormData({ ...formData, resource_url: e.target.value })}
                />
              </div>
              
              {/* Course IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                {/* <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Course
                </button> */}

                <button
                  type="submit" 
                  // when we enter, it lets form know ki i wana submit, then the forms submits!!
                  // onClick={handleUpdate}
                  className="btn btn-primary"
                  disabled={loading || !formData.title || !formData.category || !formData.image || !formData.resource_url}
                > 
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage