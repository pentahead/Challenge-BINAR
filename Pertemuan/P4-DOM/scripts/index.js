// import json data from data/student.json
import studentData from "../data/student.json" with {type:"json"};

// with common js 
// const studentsData = require("../data/students.json")
console.log(studentData);

const studentContent = document.getElementById("student-content");

// helper variable
let studentContentHTML = ""; 


function renderStudents(data) {
    let htmlContent = "";
    data.map((student) => { 
        
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
        htmlContent += studentContent;
    });
    return htmlContent;
}

// Initial loading message
studentContent.innerHTML = "<h1> Loading...</h1>";

// Render all students after timeout
setTimeout(() => {
    studentContentHTML = renderStudents(studentData); 
    studentContent.innerHTML = studentContentHTML;
}, 3000);

// Start search functionality
const search = document.getElementById("search");


search.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredStudents = studentData.filter(student => 
        student.name.toLowerCase().includes(searchValue) || 
        student.nickname.toLowerCase().includes(searchValue) || 
        student.education.bachelor.toLowerCase().includes(searchValue)
    );    
    studentContent.innerHTML = renderStudents(filteredStudents);
});












//-------------------------------------------------------
// test dom title
// const title = document.getElementById("title");
// setTimeout(() => {
//   console.log("I Executed after 5 seconds program run!");
//   title.innerText = "Document Object Mapping";
// }, 5000);
