import { useEffect, useState } from "react";
import { FaBook, FaCertificate, FaUserCheck, FaUsers } from "react-icons/fa";
import { AdminNavbar } from "../../components";
import {
  getCourseCount,
  getMaterialCount,
  getStudentCount,
  getAllLearners,
} from "../../helper";
import { Chart } from "react-google-charts";

const AdminDashboard = () => {
  const [activeLearners, setActiveLearners] = useState(0);
  const [totalLearners, setTotalLearners] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response0 = await getAllLearners();

        const chartData = [["Title", "Count"]];
        response0.data.forEach((item) => {
          chartData.push([item.title, item.count]);
        });
        setChartData(chartData);

        const response1 = await getMaterialCount();
        setActiveLearners(response1.materialCount);

        const response2 = await getStudentCount();
        setTotalLearners(response2.studentsCount);

        const response3 = await getCourseCount();
        setTotalCourses(response3.courseCount);

        const response4 = 2;
        setTotalCertificates(response4);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-4 gap-4">
          <div className="card mb-3 bg-red-300 w-full py-10">
            <div className="card-body text-white">
              <div className="flex items-center">
                <div className="mx-4">
                  <FaUserCheck size={40} />
                </div>
                <div>
                  <h5 className="card-title mb-2 font-bold text-lg">
                    Total Materials
                  </h5>
                  <p className="text-2xl font-bold">{activeLearners}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 bg-blue-300 w-full py-10">
            <div className="card-body text-white">
              <div className="flex items-center">
                <div className="mx-4">
                  <FaUsers size={40} />
                </div>
                <div>
                  <h5 className="card-title mb-2 font-bold text-lg">
                    Total Learners
                  </h5>
                  <p className="text-2xl font-bold">{totalLearners}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3 bg-blue-300 w-full py-10">
            <div className="card-body text-white">
              <div className="flex items-center">
                <div className="mx-4">
                  <FaBook size={40} />
                </div>
                <div>
                  <h5 className="card-title mb-2 font-bold text-lg">
                    Total Courses
                  </h5>
                  <p className="text-2xl font-bold">{totalCourses}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 bg-red-300 w-full py-10">
            <div className="card-body text-white">
              <div className="flex items-center">
                <div className="mx-4">
                  <FaCertificate size={40} />
                </div>
                <div>
                  <h5 className="card-title mb-2 font-bold text-lg">
                    Certificates Issued
                  </h5>
                  <p className="text-2xl font-bold">{totalCertificates}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: "Learners by Course",
        }}
      />
    </>
  );
};

export default AdminDashboard;
