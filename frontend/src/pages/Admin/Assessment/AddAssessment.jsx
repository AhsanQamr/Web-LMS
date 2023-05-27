import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { AdminNavbar } from "../../../components";
import { addAssessment, getAllCourses } from "../../../helper";

function AddAssessment() {
    const [formData, setFormData] = useState({
        title: "",
        duration: "",
        course: [],
        passingCriteria: 0,
        questions: [],
        numQuestions: 0,
    });

    const { title, duration, course, passingCriteria,  numQuestions  } = formData;
    const [courseOptions, setCourseOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                if (response.status === 200) {
                    const options = response.courses.map((course) => ({
                        value: course.title,
                        label: course.title,
                    }));
                    setCourseOptions(options);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = (selectedOptions) => {
        setFormData((prevState) => ({
            ...prevState,
            course: selectedOptions.map(option => option.value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (passingCriteria > numQuestions) {
                alert("Passing criteria should be less than number of questions");
                return;
            }
            const questions = [];
            for (let i = 1; i <= numQuestions; i++) {
                const question = {
                    question: e.target[`question${i}`].value,
                    options: [
                        e.target[`question${i}-option1`].value,
                        e.target[`question${i}-option2`].value,
                        e.target[`question${i}-option3`].value,
                        e.target[`question${i}-option4`].value,
                    ],
                    correctOption: e.target[`question${i}-correctOption`].value,
                };
                questions.push(question);
            }
            const response = await addAssessment({ title, duration, course, passingCriteria, numQuestions, questions });
            if (!response) {
                alert("Can not reach Server");
                return;
            }
            if (response.status === 200) {
                alert("Assessment Added Successfully");
                navigate("/admin/dashboard");
            }
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
            
        } finally {
            setIsLoading(false);
        }
    }

    function generateFields() {
        const fields = [];

        for (let i = 1; i <= numQuestions; i++) {
            fields.push(
                <div key={i} className="mb-8">
                    <h3 className="font-bold mb-2">Question {i}</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Question:
                            <input
                                type="text"
                                name={`question${i}`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Option 1:
                            <input
                                type="text"
                                name={`question${i}-option1`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Option 2:
                            <input
                                type="text"
                                name={`question${i}-option2`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Option 3:
                            <input
                                type="text"
                                name={`question${i}-option3`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Option 4:
                            <input
                                type="text"
                                name={`question${i}-option4`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Correct option:
                            <input
                                type="text"
                                name={`question${i}-correctOption`}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                                onChange={onChange}
                            />
                        </label>
                    </div>
                </div>
            );
        }

        return fields;
    }

    return (
        <>
            <AdminNavbar />
            <div className="mt-20 flex justify-center items-center flex-col overflow-y-hidden">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">Add Assessment</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-[700px] mb-8 border border-gray-300">
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Assessment Name:
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={onChange}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Duration:
                            <input
                                type="text"
                                name="duration"
                                value={duration}
                                onChange={onChange}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Course:
                            <Select
                            isMulti
                            options={courseOptions}
                            value={courseOptions.filter(option => course.includes(option.value))}
                            onChange={handleCourseSelect}
                        />
                        </label>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Passing Criteria:
                            <input
                                type="number"
                                name="passingCriteria"
                                value={passingCriteria}
                                onChange={onChange}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                            />
                        </label>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-2 mr-3">
                            Number of questions:
                            <input
                                type="number"
                                name="numQuestions"
                                value={numQuestions}
                                onChange={onChange}
                                className="border border-gray-300 p-2 rounded w-80 ml-4"
                                required
                            />
                        </label>
                    </div>
                    {generateFields()}
                    <button type="submit" className="mb-20 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
                    {isLoading ? <div className="loader"></div> : "Add Assessment"}</button>
                </form>
                
            </div>
        </>
    );
}

export default AddAssessment;
