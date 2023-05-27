import React, { useEffect, useState } from "react";
import { FaFileAlt, FaFileArchive, FaFileAudio, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileVideo, FaFileWord, FaUserCircle } from 'react-icons/fa';
import { FiArrowRight, FiFileText, FiInfo, FiUsers } from 'react-icons/fi';
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { AdminNavbar } from "../../../components";
import { getAllCourseEnrollments, getCourse } from "../../../helper";

const CourseDetails = () => {
  const iconMap = {
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': FaFilePowerpoint,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FaFileWord,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FaFileExcel,
    'application/vnd.ms-powerpoint': FaFilePowerpoint,
    'application/vnd.ms-word': FaFileWord,
    'application/pdf': FaFilePdf,
    'image/png': FaFileImage,
    'image/jpeg': FaFileImage,
    'image/jpg': FaFileImage,
    'image/gif': FaFileImage,
    'image/bmp': FaFileImage,
    'image/webp': FaFileImage,
    'application/msword': FaFileWord,
    'application/vnd.ms-excel': FaFileExcel,
    'text/plain': FaFileAlt,
    'application/zip': FaFileArchive,
    'audio/mpeg': FaFileAudio,
    'video/mp4': FaFileVideo,
    'audio/wav': FaFileAudio,
    'audio/mp3': FaFileAudio,
    'audio/ogg': FaFileAudio,
    'video/ogg': FaFileVideo,
    'video/webm': FaFileVideo,
    'video/quicktime': FaFileVideo,
    'video/3gpp': FaFileVideo,
    'video/3gpp2': FaFileVideo,
  };
  const [course, setCourse] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const { title } = useParams();


  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getCourse({ title });
      response.course.materials = response.materials;
      response.course.assessments = response.assessments;
      setCourse(response.course);
    };
    const fetchLearners = async () => {
      const courseTitle = title;
      const response = await getAllCourseEnrollments({ courseTitle });
      setEnrollments(response.enrollments);
    };
    fetchProduct();
    fetchLearners();
  }, [title]);

  function CourseDetail({ course }) {
    return (
      <>
        <img
          src={`data:image/jpeg;base64,${course.image}`}
          alt={course.title}
          className="w-1/2 h-64 mb-4 mx-auto"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-2">Author:</h2>
            <p className="text-gray-500 mb-4">{course.author}</p>

            <h2 className="text-xl font-bold mb-2">Category:</h2>
            <p className="text-gray-500 mb-4">{course.category}</p>

            <h2 className="text-xl font-bold mb-2">Price:</h2>
            <p className="text-gray-500 mb-4">{course.price}</p>

            <h2 className="text-xl font-bold mb-2">Start Date:</h2>
            <p className="text-gray-500 mb-4">{course.startDate}</p>

            <h2 className="text-xl font-bold mb-2">End Date:</h2>
            <p className="text-gray-500 mb-4">{course.endDate}</p>
          </div>

          <div className="bg-gray-50 p-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-2">Description:</h2>
            <p className="text-gray-500 mb-4">{course.description}</p>
          </div>
        </div>
      </>
    );
  }

  function CourseMaterials({ course }) {
    return (
      <div className="bg-gray-50 p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-2">Materials:</h2>
        <div className="flex flex-col">
          {course.materials &&
            course.materials.map((material, index) => (
              <div
                key={index}
                className="flex items-center mb-4 mr-4 bg-gray-300 p-2 rounded-md justify-between"
              >
                <div className="flex flex-row items-center">
                  {React.createElement(iconMap[material.materialType], {
                    className: 'text-blue-500 mr-2',
                  })}
                  <p>{material.materialName}</p>
                </div>
                <a
                  href={`data:${material.materialType};base64,${material.material}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={material.materialName}
                  className="ml-2 text-blue-500 underline hover:text-blue-700"
                >
                  Download
                </a>
              </div>
            ))}
        </div>
      </div>
    );
  }

  function CourseLearners({ enrollments }) {
    return (
      <div className="bg-gray-50 p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-2">Learners:</h2>
        <div className="flex flex-col">
          {/* print enrollments size */}
          {enrollments &&
            enrollments.map((learner, index) => (
              <div
                key={index}
                className="flex items-center mb-4 mr-4 bg-gray-300 p-2 rounded-md justify-between"
              >
                <div className="flex flex-row items-center">
                  <FaUserCircle className="text-blue-500 mr-2" />
                  <p>{learner.studentEmail}</p>
                </div>
                <div className="flex flex-row items-center">
                  <p className="mr-2">{20}%</p>
                  <div className="bg-gray-500 h-2 w-32 rounded-lg overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${20}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  function CourseAssessments({ course }) {
    return (
      <div className="bg-gray-50 p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-2">Assessments:</h2>
        <div className="flex flex-col">
          {course.assessments &&
            course.assessments.map((assessment, index) => (
              <div
                key={index}
                className="flex flex-col mb-4 mr-4 bg-gray-300 p-2 rounded-md"
              >
                <div className="flex flex-row items-center">
                  <FiArrowRight className="text-blue-500 mr-2" />
                  <p className="font-bold">{assessment.title}</p>
                </div>
                <div className="mt-2 ml-4">
                  <p><span className="font-bold">Duration:</span> {assessment.duration}</p>
                  <p><span className="font-bold">Number of Questions:</span> {assessment.numQuestions}</p>
                  <p><span className="font-bold">Passing Criteria:</span> {assessment.passingCriteria}</p>
                </div>
                <div className="mt-2 ml-4">
                  <p className="font-bold">Questions:</p>
                  {assessment.questions && assessment.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mt-2">
                      <p><span className="font-bold">Question {qIndex + 1}:</span> {question.question}</p>
                      <div className="ml-4">
                        <p className="font-bold">Options:</p>
                        {question.options && question.options.map((option, oIndex) => (
                          <div key={oIndex} className="mt-2">
                            <span className="mr-2">{oIndex + 1}.</span>

                            <label htmlFor={`q${qIndex}-o${oIndex}`} className="ml-2">{option}</label>
                          </div>
                        ))}
                      </div>
                      <p><span className="font-bold">Correct Option:</span> {question.correctOption}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }





  function CourseTabs({ course }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <div>
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          className="border-b border-gray-200 rounded-t-lg"
        >
          <TabList className="flex">
            <Tab
              className={`${selectedIndex === 0
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                } py-4 px-6 font-medium mb-10 rounded-tl-lg`}
            >
              <FiInfo className="inline-block w-6 h-6 mr-2" />
              Details
            </Tab>
            <Tab
              className={`${selectedIndex === 1
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                } py-4 px-6 font-medium mb-10 rounded-tl-lg`}
            >
              <FiFileText className="inline-block w-6 h-6 mr-2" />
              Materials
            </Tab>
            <Tab
              className={`${selectedIndex === 2
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                } py-4 px-6 font-medium mb-10 rounded-tl-lg`}
            >
              <FiFileText className="inline-block w-6 h-6 mr-2" />
              Assessments
            </Tab>
            <Tab
              className={`${selectedIndex === 3
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                } py-4 px-6 font-medium mb-10 rounded-tl-lg`}
            >
              <FiUsers className="inline-block w-6 h-6 mr-2" />
              Learners
            </Tab>
          </TabList>

          <TabPanel className="bg-white">
            <CourseDetail course={course} />
          </TabPanel>
          <TabPanel className="bg-white">
            <CourseMaterials course={course} />
          </TabPanel>
          <TabPanel className="bg-white">
            <CourseAssessments course={course} />
          </TabPanel>
          <TabPanel className="bg-white">
            <CourseLearners enrollments={enrollments} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }



  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <CourseTabs course={course} />
        </div>
      </div>
    </>
  )
}

export default CourseDetails;