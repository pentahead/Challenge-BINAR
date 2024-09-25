const studentContent = document.getElementById("student-content");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

search.addEventListener("input", (e) => {
    // If the search is change, the function will be running
    const searchValue = e.target.value.toLowerCase();
    searchStudentContent(searchValue);
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Normal function
async function searchStudentContent(search) {
    studentContent.innerHTML = "<h1>Loading...</h1>";

    const data = await getStudentData(search);
    if (data.length === 0) {
        studentContent.innerHTML = `<h1>Searching ${search} not found!</h1>`;
        return;
    }

    // Frontend
    let studentContentHTML = "";
    data.map((student) => {
        // variable that will be show in student-content id
        const studentContent = `
            <div class="col-md-3">
                <div class="card" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">${student.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            ${student.education.bachelor}
                        </h6>
                        <p class="card-text">
                            My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.
                        </p>
                    </div>
                </div>
            </div>
        `;
        studentContentHTML += studentContent;
    });
    studentContent.innerHTML = studentContentHTML;
}

// Arrow function, this function is to get students.json data that can be rendered to html file
const getStudentData = async (search) => {
    const response = await fetch("./data/student.json");
    const data = await response.json();

    // search student by input (Backend)
    const filteredData = data.filter((student) => {
        return (
            student.name.toLowerCase().includes(search) ||
            student.education.bachelor.toLowerCase().includes(search)
        );
    });

    return filteredData;
};

/* Show all student data */
searchStudentContent("");