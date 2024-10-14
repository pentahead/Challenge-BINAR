const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const students = require("../../data/students.json");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  const searchedStudents = await prisma.students.findMany({
    where: {
      OR: [
        { name: { contains: name, mode: "insensitive" } },
        { nick_name: { contains: nickName, mode: "insensitive" } },
      ],
    },
    include: {
      classes: true,
      universities: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = (id) => {
  // find student by id
  // const searchedStudents = await prisma.students
  // const student = students.find((student) => student.id == id);
  // return student;
};

exports.createStudent = async (data) => {
  // const maxIdResult = await prisma.students.findMany({
  //   select: {
  //     id: true,
  //   },
  //   orderBy: {
  //     id: 'desc',
  //   },
  //   take: 1,
  // });

 
  // const maxId = maxIdResult.length > 0 ? Number(maxIdResult[0].id) : 0;
  // const newId = maxId + 1;

  const newStudent = await prisma.students.create({
    data: {
      // id: newId, 
      name: data.name,
      nick_name: data.nick_name,
      class_id: data.class_id,
      university_id: data.university_id,
      profile_picture: data.profile_picture,
    },
  });

  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};


// exports.createStudent = async (data) => {
//   // Find the max index to defnine the new data id
//   const newStudent = await prisma.students.create({
//     data: {
//       name: data.name,
//       nick_name: data.nick_name,
//       class_id: data.class_id,
//       university_id: data.university_id,
//       profile_picture: data.profile_picture,
//     },
//   });
//   const serializedStudents = JSONBigInt.stringify(newStudent);
//   return JSONBigInt.parse(serializedStudents);
// };
// const maxId = students.reduce(
//     (max, student) => student.id > max && student.id,
//     0
// );

// const newStudent = {
//     id: maxId + 1,
//     ...data,
// };

// /* Add data to current array students */
// students.push(newStudent);

// // Save the latest data to json
// fs.writeFileSync(
//     "./data/students.json",
//     JSON.stringify(students, null, 4),
//     "utf-8"
// );

// return newStudent;

exports.updateStudent = (id, data) => {
  // Find the existing student data
  const student = students.find((student) => student.id === Number(id));
  if (!student) {
    // Make a error class
    throw new NotFoundError("Student is Not Found!");
  }

  // Update the data
  Object.assign(student, data);

  // Update the json data
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  return student;
};

exports.deleteStudentById = (id) => {
  // Find index
  const studentIndex = students.findIndex((student) => student.id == id);

  if (studentIndex < 0) {
    // If no index found
    return null;
  }

  const deletedStudent = students.splice(studentIndex, 1);

  // Update the json
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );
  return deletedStudent;
};
