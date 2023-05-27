const API_URL = "http://localhost:3000/api";

// Function to get the stored JWT token
const getToken = () => {
  return localStorage.getItem('token');
};

const getEmail = () => {
  return localStorage.getItem('email');
};

// Function to create headers with the JWT token
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
    'email': `${getEmail()}`
  };
};

// Function to register a student
export const registerUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return await response.json();
};

// Function to delete a student
export const deleteUser = async ({ email }) => {
  const response = await fetch(`${API_URL}/studentRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

// Function to update a student
export const updateUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return await response.json();
}

// Function to get all students
export const getAllStudents = async () => {
  const response = await fetch(`${API_URL}/studentRoute/get`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to login a student
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

// Function to login admin
export const loginAdmin = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/adminRoute/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

// Function to add a course
export const addCourse = async ({title, author, price, description, category, image, startDate, endDate, material, materialName, materialType}) => {
  const response = await fetch(`${API_URL}/courseRoute/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, author, price, description, category, image, startDate, endDate, material, materialName, materialType }),
  });
  return await response.json();
}


// Function to update a course
export const updateCourse = async ({ title, author, price, description, category, image, startDate, endDate }) => {
  const response = await fetch(`${API_URL}/courseRoute/update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ title, author, price, description, category, image, startDate, endDate }),
  });
  return await response.json();
}

// Function to delete a course
export const deleteCourse = async ({ title }) => {
  const response = await fetch(`${API_URL}/courseRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  return await response.json();
}

// Function to get all courses
export const getAllCourses = async () => {
  const response = await fetch(`${API_URL}/courseRoute/getAll`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

export const getAllStudentCourses = async (studentEmail) => {
  const response = await fetch(`${API_URL}/courseRoute/getAllStudentCourses`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ studentEmail }),
  });
  return await response.json();
}

// Function to get a course
export const getCourse = async ({ title }) => {
  const response = await fetch(`${API_URL}/courseRoute/get/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  return await response.json();
}

// Function to add a material
export const addMaterial = async ({material, materialName, materialType, courses}) => {
  const response = await fetch(`${API_URL}/materialRoute/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ material, materialName, materialType, courses }),
  });
  return await response.json();
}

// Function to get all materials
export const getAllMaterials = async () => {
  const response = await fetch(`${API_URL}/materialRoute/getAll`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to delete a material
export const deleteMaterial = async ({ _id }) => {
  const response = await fetch(`${API_URL}/materialRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ _id }),
  });
  return await response.json();
}

// Function to get course count
export const getCourseCount = async () => {
  const response = await fetch(`${API_URL}/courseRoute/getCourseCount`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to get student count
export const getStudentCount = async () => {
  const response = await fetch(`${API_URL}/studentRoute/getStudentCount`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to get material count
export const getMaterialCount = async () => {
  const response = await fetch(`${API_URL}/materialRoute/getMaterialCount`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to add enrollment
export const addEnrollment = async ({studentEmail, courseTitle}) => {
  const response = await fetch(`${API_URL}/enrollmentRoute/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ studentEmail, courseTitle }),
  });
  return await response.json();
}

// Function to delete enrollment
export const deleteEnrollment = async ({studentEmail, courseTitle}) => {
  const response = await fetch(`${API_URL}/enrollmentRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ studentEmail, courseTitle }),
  });
  return await response.json();
}

// Function to get all enrollments
export const getAllEnrollments = async () => {
  const response = await fetch(`${API_URL}/enrollmentRoute/getAll`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to get all enrollments for a course
export const getAllCourseEnrollments = async ({courseTitle}) => {
  const response = await fetch(`${API_URL}/enrollmentRoute/getCourseEnrollments`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ courseTitle }),
  });
  return await response.json();
}

// Function to get all enrollments for a student
export const addAssessment = async ({title, duration, course, passingCriteria, numQuestions, questions}) => {
  const response = await fetch(`${API_URL}/assessmentRoute/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, duration, course, passingCriteria, numQuestions, questions }),
  });
  return await response.json();
}

// Function to get learners for all courses
export const getAllLearners = async () => {
  const response = await fetch(`${API_URL}/courseRoute/getCourseStudents`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}