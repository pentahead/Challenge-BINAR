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
console.log(
  "My name is",
  david.name,
  "used to called",
  david.nickname,
  ". Now i am student of ",
  david.education.bachelor,
  ". I am from ",
  david.address.city,
  ",",
  david.address.province
);

//normal string
const describeDavid =
  "My name is " +
  david.name +
  " used to called " +
  david.nickname +
  ". Now i am student of " +
  david.education.bachelor +
  ". I am from " +
  david.address.city +
  ", " +
  david.address.province;
console.log(describeDavid);

// backtick (recommended)
const describeDavidWithBacktick = `My name is ${david.name}, used to called ${david.nickname}. Now I am student of ${david.education.bachelor}. I am From ${david.address.city}, ${david.address.province}.`;
console.log(describeDavidWithBacktick);

const muridbinar = [
  {
    name: "David Vincent",
    nickname: "david",
    class: "FSW-1",
    address: {
      province: "North Sumatera",
      city: "Medan",
    },
    education: {
      bachelor: "Universitas Teknologi Deli",
    },
  },
  {
    name: "Yudriqul Aulia",
    nickname: "yudi",
    class: "FSW-1",
    address: {
      province: "Jambi",
      city: "jambi",
    },
    education: {
      bachelor: "Universitas Jambi",
    },
  },
  {
    name: "Iko Indra Gunawan",
    nickname: "iko",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "surabaya",
    },
    education: {
      bachelor: "UPN Veteran Jatim",
    },
  },
  {
    name: "Fariq",
    nickname: "iko",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "surabaya",
    },
    education: {
      bachelor: "UPN Veteran Jatim",
    },
  },
];

//there aree three students, David, Yudi, and Iko. David is from Medan, north Sumatera. yudi is form Jambi, Jambi and Iko is from Surabaya, East Java

const tigaMurid = `
there are three students, ${muridbinar[0].name}, ${muridbinar[1].name}, and ${muridbinar[2].name}. ${muridbinar[0].name} is from ${muridbinar[0].address.city}, ${muridbinar[0].address.province}. ${muridbinar[1].name} is from ${muridbinar[1].address.city}, ${muridbinar[1].address.province} and ${muridbinar[2].name} is from ${muridbinar[2].address.city}, ${muridbinar[2].address.province} `;

console.log(tigaMurid);

// My name is David Vincent Gurning, used to called David, Iam From Medan North Sumatera. And I am Student of Universitas Teknologi Deli.
// My name is Yudriqul Aulias, used to called Yudi, Iam From jambi Jambi. And I am Student of Universitas Jambi.
// My name is Iko Gunawan, used to called Iko, Iam From Surabaya East Java. And I am Student of UPN Veteran Jatim.

// muridbinar.forEach((muridbinar) => {
//   const muridUlang = `My name is ${muridbinar.name}, I used to called ${muridbinar.nickname}. I am from ${muridbinar.address.city}, ${muridbinar.address.province}. And I am student of ${muridbinar.education.bachelor}.`;
//   console.log(muridUlang);
// });

// for (let index = 0; index < muridbinar.length; index++) {
//   const muridbinarr = muridbinar[index];
//   const describemurid = `My name is ${muridbinar.name}, I used to called ${muridbinar.nickname}. I am from ${muridbinar.address.city}, ${muridbinar.address.province}. And I am student of ${muridbinar.education.bachelor}.`;
//   console.log(describemurid);
// }

// muridbinar.map((muridbinar) => {
//   const describestudent = `My name is ${muridbinar.name}, I used to called ${muridbinar.nickname}. I am from ${muridbinar.address.city}, ${muridbinar.address.province}. And I am student of ${muridbinar.education.bachelor}.`;
//   console.log(describestudent);
// });

// let toddlers = people.filter(person => person.age <= 3)

// console.log(toddlers)

// const siswa = muridbinar.filter(murid => murid.address.province == "East Java")
// console.log(siswa);



muridbinar.sort((a, b) => a.name.localeCompare(b.name));

// Convert each object to a string and print it out
muridbinar.forEach(murid => {
  const muridString = `
    Name: ${murid.name}
    Nickname: ${murid.nickname}
    Class: ${murid.class}
    Address: ${murid.address.city}, ${murid.address.province}
    Education: ${murid.education.bachelor}
  `;
  console.log(muridString);
});