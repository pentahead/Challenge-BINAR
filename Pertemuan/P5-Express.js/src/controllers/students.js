const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = (req, res, next) => {
    // Call the usecase or service
    const data = studentService.getStudents(
        req.query?.name,
        req.query?.nickName,
        req.query?.bachelor
    );

    successResponse(res, data);
};