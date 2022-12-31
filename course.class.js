const appConstants = require('./constant');
const { constructCourseObj, getRegistrationDetails } = require('./helper');

class Course {

  constructor() {
    this.courseMap = new Map();
    this.registrationMap = new Map();
    this.allotment = false;
  }

  createCourse(courseDetails) {
    const { courseId, ...restObj } = constructCourseObj(courseDetails);
    this.courseMap.set(courseId, restObj);

    // console.log('Creating Course', this.courseMap);
    return courseId;
  }

  registration(details) {
    const [employeeEmail, courseId] = details;

    const courseValues = this.courseMap.get(courseId)

    if (courseValues.availableSeats > 0) {

      if (this.courseMap.has(courseId)) {

        // Getting registration details
        const registrationDetails = getRegistrationDetails(courseValues, details);

        // Reducing a seat from the courseMap
        this.courseMap.set(courseId, {
          ...courseValues,
          availableSeats: courseValues.availableSeats - 1,
          registrations: [registrationDetails.registrationId]
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

  courseCancellation() {

  }

}

module.exports = Course;
