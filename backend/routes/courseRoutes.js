const express = require('express')
const router = express.Router()
const {addCourse, updateCourse, deleteCourse, getAllCourses, getCourse, getCourseCount, getCourseStudents} = require('../controllers/courseController')
// const {requireAuth} = require('../middleware/auth')


// GET  api/courseRoute/status/
router.get('/status',(req,res) => {
    res.status(200).send("App Status : Working (Course)")
})

// POST api/courseRoute/add/
router.post('/add',addCourse)

// PUT  api/courseRoute/update/
router.put('/update',updateCourse)

// DELETE  api/courseRoute/delete/
router.delete('/delete',deleteCourse)

// GET  api/courseRoute/getAll/
router.get('/getAll',getAllCourses)

// POST  api/courseRoute/get/
router.post('/get',getCourse)

// GET api/courseRoute/getCourseCount/
router.get('/getCourseCount',getCourseCount)

// GET api/courseRoute/getCourseStudents/
router.get('/getCourseStudents',getCourseStudents)

module.exports = router