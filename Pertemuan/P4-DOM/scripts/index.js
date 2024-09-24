  // import json data from data/student.json
  import studentData from "../data/student.json" with {type:"json"};

  // with common js 
  // const studentsData = require("../data/students.json")
  console.log(studentData);

  const studentContent = document.getElementById("student-content");
  searchStudentContent("")

  const search = document.getElementById("search");
  const searchForm = document.getElementById("search-form");

  search.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    searchStudentContent(searchValue)
  });

  search.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  function searchStudentContent(search) {
  studentContent.innerHTML = "<h1> Loading...</h1>";

  const filteredStudents = studentData.filter((student) => {
    return student.name.toLowerCase().includes(search) || student.education.bachelor.toLowerCase().includes(search);

  });

  let studentContentHTML ="";
  filteredStudents.map((student) => {
    const studentContent = `
              <div class="col-md-3 m-3">
                <div class="card" style="width: 18rem">
                  <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                    ${student.education.bachelor}
                    </h6>
                    <p class="card-text">
                      My name is ${student.name}, used to be called ${student.nickname}, I am from ${student.address.city}, ${student.address.province}. And I am a student of ${student.education.bachelor}.
                    </p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
          `;
          studentContentHTML += studentContent;
  });
  studentContent.innerHTML = studentContentHTML;
    
  }

  const getStudentData = async () => {
    const response = await fetch("/data/student.json");
    const  data = await response.json();
    return data;
  };

  getStudentData().then(() => {
    searchStudentContent("");
  });