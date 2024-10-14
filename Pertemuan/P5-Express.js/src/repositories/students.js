const students = require("../../data/students.json");

exports.getStudents = (name, nickName, bachelor) => {
  const searchedStudent = students.filter((student) => {
    // Do filter logic here
    let result = true;
    if (name) {
      const isFoundName = student.name
        .toLowerCase()
        .includes(name.toLowerCase());
      result = result && isFoundName;
    }
    if (nickName) {
      const isFoundNickName = student.nickName
        .toLowerCase()
        .includes(nickName.toLowerCase());
      result = result && isFoundNickName;
    }
    if (bachelor) {
      const isFoundBachelor = student.education.bachelor
        .toLowerCase()
        .includes(bachelor.toLowerCase());
      result = result && isFoundBachelor;
    }

    return result;
  });
  return searchedStudent;
};
