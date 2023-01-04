const appConstants = require("../constants/constant");
class Utility {

  addCourseValidation(arrayElements) {

    if (arrayElements.length !== appConstants.COURSE_ARR_LENGTH) {
      console.log(appConstants.INPUT_DATA_ERROR)
      return false;
    }
    return true;
  }
  addCourse(courseId) {
    console.log(courseId);

  }

  registerationUtility(arrayElements) {
    if (arrayElements.length !== appConstants.REGISTRATION_ARR_LENGTH) {
      console.log(appConstants.INPUT_DATA_ERROR);
      return false;
    }
    return true;
  }

  registeration(registrationStatus) {
    const { status, registrationId = '' } = registrationStatus
    status === 'ACCEPTED' ?
      console.log(`${registrationId} ${status}`)
      : console.log(status);
  }

  displayError(errorMessage) {
    console.log(errorMessage);
  }

  cancellation({ registrationId, status }) {
    console.log(`${registrationId} ${status}`)
  }
  courseAllotment(objArray) {

    objArray.sort((a, b) => {
      return a.registrationId < b.registrationId
        ? -1
        : (a.registrationId > b.registrationId)
          ? 1
          : 0
    }).forEach(obj => {
      const { registrationId, courseName, instructor, employeeEmail, courseId, date, status } = obj;
      console.log(`${registrationId} ${employeeEmail} ${courseId} ${courseName} ${instructor} ${date} ${status}`);
    }
    );
  }
}
module.exports = Utility;
