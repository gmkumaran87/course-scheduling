const { constructCourseObj } = require('./helper');

class Course {

  constructor() {
    this.courseMap = new Map();
  }

  createCourse(courseDetails) {
    const { courseId, ...restObj } = constructCourseObj(courseDetails);
    this.courseMap.set(courseId, restObj);

    console.log('Creating Course', this.courseMap);
    return { courseName: restObj.courseName, instructor: restObj.instructor };
  }

  registration(details) {
    const [employeeEmail, courseId] = details;

    if (this.courseMap.has(courseId)) {
      const courseValues = this.courseMap.get(courseId)
    }

  }

}

module.exports = Course;
