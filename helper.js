const constructCourseObj = (inputStr) => {
  const courseObj = {};

  const [courseName, instructor, date, minEmp, maxEmp] = inputStr;

  courseObj.courseId = `OFFERING-${courseName}-${instructor}`;
  courseObj.courseDate = date;
  courseObj.minEmp = minEmp;
  courseObj.maxEmp = maxEmp;
  courseObj.instructor = instructor;
  courseObj.courseName = courseName;
  courseObj.availableSeats = maxEmp;

  return courseObj;
}

module.exports = { constructCourseObj }