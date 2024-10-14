const studentRepository = require("../repositories/students");

exports.getStudents = (name, nickName, bachelor) => {
    return studentRepository.getStudents(name, nickName, bachelor);
};