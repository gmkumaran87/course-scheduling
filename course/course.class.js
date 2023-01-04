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

  checkEmployeeRegistered(employeeEmail, courseId) {
    const employeeName = getEmployeeName(employeeEmail);
    const courseName = courseId.split('-')[1];
    const registrationId = getRegistrationId(employeeName, courseName);
    return this.registrationMap.has(registrationId);
  }

  registerEmployee(courseId, employeeEmail) {
    const courseValues = this.courseMap.get(courseId);
    if (this.courseMap.has(courseId)) {
      // Getting registration details
      const registrationDetails = getRegistrationDetails(courseId, courseValues, employeeEmail);
      // Reducing a seat from the courseMap
      this.courseMap.set(courseId, {
        ...courseValues,
        availableSeats: courseValues.availableSeats - 1,
        registrations: [...courseValues.registrations, registrationDetails.registrationId]
      });
      // Create a new record in the registration
      this.registrationMap.set(registrationDetails.registrationId, registrationDetails);
      return registrationDetails.registrationId
    }
  }

  registration(details) {
    const [employeeEmail, courseId] = details;
    const { availableSeats } = this.courseMap.get(courseId);
    if (this.checkEmployeeRegistered(employeeEmail, courseId)) {
      return { status: appConstants.ALREADY_REGISTERED };
    } else if (!this.courseMap.has(courseId)) {
      return { status: appConstants.COURSE_NOT_REGISTERED };
    } else if (availableSeats > 0) {
      const registrationId = this.registerEmployee(courseId, employeeEmail)
      return { status: 'ACCEPTED', registrationId }
    } else {
      return { status: appConstants.COURSE_FULL_ERROR };
    }
  }

  deleteEmployeeRegistration(registrationId) {
    const registrationDetails = this.registrationMap.get(registrationId);
    const courseId = registrationDetails.courseId;
    const courseObj = this.courseMap.get(courseId);
    const filteredRegistration = courseObj.registrations.filter(el => el !== registrationId);
    const newObj = { ...courseObj, registrations: filteredRegistration };
    // Removing the registration details
    this.courseMap.set(courseId, newObj);
    this.registrationMap.delete(registrationId);
    return { status: 'DELETED' };
  }

  // Course cancellations
  cancelRegistration(registrationId) {
    if (this.allotment) {
      return { status: appConstants.CANCEL_REJECTED, registrationId };
    } else if (this.registrationMap.has(registrationId)) {
      const result = this.deleteEmployeeRegistration(registrationId);
      return result.status === 'DELETED'
        ? { status: appConstants.CANCEL_ACCEPTED, registrationId }
        : '';
    } else {
      return { status: appConstants.COURSE_NOT_FOUND_ERROR, registrationId };
    }
  }

  courseAllotment(courseId) {
    const registrationArray = [];
    let status = '';
    if (this.courseMap.has(courseId)) {
      const { minEmp, registrations } = this.courseMap.get(courseId);
      registrations.forEach(registrationId => {
        // If the minimum registration is not met, then cancel the course Offering
        status = registrations.length < minEmp ? appConstants.COURSE_CANCELED : 'CONFIRMED';
        const registrationObj = this.registrationMap.get(registrationId);
        const newObj = { ...registrationObj, status: status }
        registrationArray.push(newObj);
      });
      return registrationArray;
    }
  }
}

module.exports = Course;
