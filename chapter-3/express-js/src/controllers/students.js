const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = async (req, res, next) => {
    // Call the usecase or service
    const data = await studentService.getStudents(
        req.query?.name,
        req.query?.nickName
    );
    successResponse(res, data);
};

exports.getStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    // Get student by id
    const data = studentService.getStudentById(id);
    successResponse(res, data);
};

exports.createStudent = async (req, res, next) => {
    // Create the new student
    const data = await studentService.createStudent(req.body, req.files);
    successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await studentService.updateStudent(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = studentService.deleteStudentById(id);
    successResponse(res, data);
};