import { EditIcon, Trash2Icon ,ExternalLinkIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourseStore } from '../store/useCourseStore';
import React from 'react'

function CourseCard({course}) {
//   console.log(course);
  const {deleteCourse, toggleCourseStatus}= useCourseStore();

  const getStatusColor = (status) => {
    if (status === "In Progress") return "badge-warning";
    if (status === "Completed") return "badge-success";
    return "badge-secondary"; // Default for To-Do
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex-row mx-auto w-full">
        {/* course IAMEG */}
        <div className="w-[302px] h-full flex-shrink-0 relative overflow-hidden">
            <figure className="relative pt-[56.25%]">
                <a href={course.resource_url} target="blank">
                    <img src={course.image} alt={course.title} className="absolute hover:scale-105 top-0 left-0 w-32 h-full"/>
                    <ExternalLinkIcon className="size-4" />
                </a>
            </figure>
        </div>
        <div className="card-body">
            {/* course IFNO */}
            <h2 className='card-title text-lg font-semibold'>{course.title}</h2>
            <p className="text-sm opacity-70">By: {course.instructor}</p>
            <p className="text-xs font-semibold uppercase tracking-wider">{course.category}</p>
            <div className="card-actions justify-end mt-4">
            {/* THE TOGGLE BUTTON */}
                <button 
                    onClick={() => toggleCourseStatus(course.cid)}
                    className="btn btn-sm btn-outline btn-primary"
                >
                    Update Status
                </button>
            </div>
            <div className={`badge ${getStatusColor(course.status)}`}>{course.status}</div>

            {/* CARD ACTIONS */}
            <div className="card-actions justify-end mt-4">
                <Link to={`/course/${course.uid}/${course.cid}`} className="btn btn-sm btn-info btn-outline">
                    <EditIcon className="size-4" />
                </Link>

                <button 
                    className="btn btn-sm btn-error btn-outline"
                    onClick = {() => deleteCourse(course.cid)}
                >
                    <Trash2Icon className="size-4" />
                </button>
            </div>

        </div>
    </div>
  );
}

export default CourseCard;
