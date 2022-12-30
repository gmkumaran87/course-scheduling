class Utility {

  addCourse(courseName, instructor) {
    console.log(`OFFERING-${courseName}-${instructor}`);

  }

  registeration(employeeName, courseName) {
    console.log(`REG-COURSE-${employeeName}-${courseName}`);
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
