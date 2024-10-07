const studentService = require("../services/students");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getStudents = (req, res, next) => {
    // Call the usecase or service
    const data = studentService.getStudents(
        req.query?.name,
        req.query?.nickName,
        req.query?.bachelor
    );

    successResponse(res, data);
};

exports.getStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    const data = studentService.getStudentById(id);
    if (!data) {
        // If there is no student with the id that client request, it will response not found
        throw new NotFoundError("Student is Not Found!");
    }

    successResponse(res, data);
};

exports.createStudent = (req, res, next) => {
    const data = studentService.createStudent(req.body);

    successResponse(res, data);
};

exports.updateStudent = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    const data = studentService.updateStudent(id, req.body);
    if (!data) {
        // If there is no student with the id that client request, it will response not found
        throw new NotFoundError("Student is Not Found!");
    }

    successResponse(res, data);
};

exports.deleteStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    const data = studentService.deleteStudentById(id);
    if (!data) {
        // If there is no student with the id that client request, it will response not found
        throw new NotFoundError("Student is Not Found!");
    }

    successResponse(res, data);
};
