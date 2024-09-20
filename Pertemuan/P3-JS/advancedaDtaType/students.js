const students = ["David", "Fariq", "Zaky"];
console.log(students[1]);

const david = {
  name: "David Vincent",
  nickname: "david",
  class: "FSW-1",
  address: {
    class: "FSW-1",
    province: "North Sumatera",
    city: "Medan",
  },
  education: {
    bachelor: "Universitas Teknologi Deli",
  },
};
console.log("My name is", david.name, "used to called",  david.nickname , ". Now i am student of ", david.education.bachelor, ". I am from ", david.address.city,",", david.address.province);

//normal string
const describeDavid = 
    "My name is " + 
    david.name +
    " used to called " +
    david.nickname +
    ". Now i am student of " +
    david.education.bachelor +
    ". I am from " +
    david.address.city + ", " +
    david.address.province;
console.log(describeDavid);

// backtick (recommended)
const describeDavidWithBacktick = `My name is ${david.name}, used to called ${david.nickname}. Now I am student of ${david.education.bachelor}. I am From ${david.address.city}, ${david.address.province}.`;
console.log(describeDavidWithBacktick);
