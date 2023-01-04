const appConstants = require('../constants/constant');
const { constructCourseObj, getRegistrationDetails, getEmployeeName, getRegistrationId } = require('./helper');

class Course {

  constructor() {
    this.courseMap = new Map();
    this.registrationMap = new Map();
    this.allotment = false;
  }

  createCourse(courseDetails) {
    const { courseId, ...restObj } = constructCourseObj(courseDetails);
    this.courseMap.set(courseId, restObj);
    return courseId;
  }

  registration(details) {
    const [employeeEmail, courseId] = details;
    const courseValues = this.courseMap.get(courseId);

    const employeeName = getEmployeeName(employeeEmail);
    const courseName = courseId.split('-')[1];
    const registrationId = getRegistrationId(employeeName, courseName);

    if (this.registrationMap.has(registrationId)) {
      return { status: appConstants.ALREADY_REGISTERED };
    }
    if (courseValues.availableSeats > 0) {
      if (this.courseMap.has(courseId)) {
        // Getting registration details
        const registrationDetails = getRegistrationDetails(courseValues, details);

        // Reducing a seat from the courseMap
        this.courseMap.set(courseId, {
          ...courseValues,
          availableSeats: courseValues.availableSeats - 1,
          registrations: [...courseValues.registrations, registrationDetails.registrationId]
        });

        // Create a new record in the registration
        this.registrationMap.set(registrationDetails.registrationId, registrationDetails);
        return { status: 'ACCEPTED', registrationId: registrationDetails.registrationId }
      }
    } else {
      return { status: appConstants.COURSE_FULL_ERROR };
    }

  }

  // Course cancellations
  cancelRegistration(registrationId) {
    if (this.allotment) {
      return appConstants.CANCEL_REJECTED;

    } else if (this.registrationMap.has(registrationId)) {

      const registrationDetails = this.registrationMap.get(registrationId);
      const courseId = registrationDetails.courseId;

      const courseObj = this.courseMap.get(courseId);
      const filteredRegistration = courseObj.registrations.filter(el => el !== registrationId);
      const newObj = { ...courseObj, registrations: filteredRegistration };

      // Removing the registration details
      this.courseMap.set(courseId, newObj);
      this.registrationMap.delete(registrationId);
      return appConstants.CANCEL_ACCEPTED;
    } else {
      return appConstants.COURSE_NOT_FOUND_ERROR;
    }
  }

  courseAllotment(courseId) {
    const registrationArray = [];
    let status = '';

    if (this.courseMap.has(courseId)) {
      const { minEmp, registrations } = this.courseMap.get(courseId);

      registrations.forEach(registrationId => {
        // If the minimum registration is not met, then cancel the course Offering
        status = registrations.length < minEmp ? 'CANCELLED' : 'COMFIRMED';

        const registrationObj = this.registrationMap.get(registrationId);

        const newObj = { ...registrationObj, status: status }
        registrationArray.push(newObj);
      });
      return registrationArray;
    }
  }
}

module.exports = Course;
