import { useCourseStore } from '../store/useCourseStore';
import { PlusCircleIcon, ImageIcon, Text } from 'lucide-react';
import React from 'react'

function AddCourseModal() {
    const {addCourse, formData, setFormData, loading}= useCourseStore();
    
  return (
    <dialog id="add_course_modal" className="modal">
        <div className="modal-box">
            {/* CLOSE BUTTON */}
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            {/* MODAL HEADER */}
            <h3 className='font-bold text-xl mb-8'>Add New course</h3>
            {/* MODAL FORM */}
            <form onSubmit={(e)=>addCourse(e)} className='space-y-6'>
                <div className="grid gap-6">
                    {/* course title INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">course title</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Text className="size-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter course title"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* course category INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">category</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Text className="size-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="enter category"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* course instructor INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">instructor</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Text className="size-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="enter instructor"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.instructor}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* course resource_url INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">resource_url</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Text className="size-5" />
                            </div>
                            <input
                                type="url"
                                placeholder="enter resource_url"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.resource_url}
                                onChange={(e) => setFormData({ ...formData, resource_url: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* course IMAGE */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Image URL</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <ImageIcon className="size-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                    </div>
                </div>


                {/* MODAL ACTIONS */}
                <div className="modal-action">
                    {/* vid had forms, but gemini gave b=this bcoz no nested formssupporterd */}
                    <button 
                        type="button" 
                        className="btn btn-ghost"
                        onClick={() => document.getElementById("add_course_modal").close()}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary min-w-[120px]"
                        disabled={!formData.title || !formData.category|| !formData.instructor || !formData.image || !formData.resource_url || loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <>
                            <PlusCircleIcon className="size-5 mr-2" />
                            Add course
                            </>
                        )}
                    </button>
                </div>


            </form>
        </div>

        {/* BACKDROP */}
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

    </dialog>
  );
}

export default AddCourseModal;