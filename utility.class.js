const appConstants = require("./constant");

class Utility {

  addCourseValidation(arrayElements) {

    if (arrayElements.length !== 5) {
      console.log(appConstants.INPUT_DATA_ERROR)
      return false;
    }
    return true;
  }
  addCourse(courseId) {
    console.log(courseId);

  }

  registerationUtility(arrayElements) {
    if (arrayElements.length !== 2) {
      console.log(appConstants.INPUT_DATA_ERROR);
      return false;
    }
    return true;
  }

  registeration(registrationId) {
    console.log(registrationId);
  }

  displayError(errorMessage) {
    console.log(errorMessage);
  }

  cancellation(registrationId, status) {
    console.log(`${registrationId} CANCEL_${status}`)
  }
  courseAllotment({ registrationId, employeeName, courseName, instructor, employeeEmail, courseId, date, status }) {

    console.log(`${registrationId} ${employeeEmail} ${courseId} ${courseName} ${instructor} ${date} ${status}`)
  }
}
module.exports = Utility;
