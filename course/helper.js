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
  courseObj.registrations = [];

  return courseObj;
}

const getRegistrationDetails = (courseValues, details) => {
  const [employeeEmail, courseId] = details;

  const employeeName = employeeEmail.split('@')[0];
  const registrationId = `REG-COURSE-${employeeName}-${courseValues.courseName}`;

  const registrationDetails = {
    registrationId,
    employeeEmail,
    courseId,
    courseName: courseValues.courseName,
    instructor: courseValues.instructor,
    date: courseValues.courseDate,
    status: 'COMFIRMED'
  }
  return registrationDetails;
}
module.exports = { constructCourseObj, getRegistrationDetails }