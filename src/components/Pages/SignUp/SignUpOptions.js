export const branches = [
  "Computer Science Engineering",
  "Information Technology Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Mechanical Engineering",
];

export const languagesArr = [
  { value: "C++", label: "C++" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "No preference", label: "No preference" },
];

export const domainsArr = [
  { value: "Competitive Programming", label: "Competitive Programming" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "App Development", label: "App Development" },
  { value: "Web Development", label: "Web Development" },
  { value: "IOT", label: "IOT" },
  { value: "BlockChain", label: "BlockChain" },
  { value: "Open Source", label: "Open Source" },
  { value: "No preference", label: "No preference" },
];

export const collegesArr = ["IGDTUW", "DTU", "NSUT", "IIITD"];

export const years = ["1st", "2nd", "3rd", "4th"];
export const genders = ["Male", "Female", "Prefer not to mention"];
export const hostellers = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const getArray = (arrObj) => {
  const arr = arrObj.map((ele) => {
    return ele.value;
  });
  return arr;
};
