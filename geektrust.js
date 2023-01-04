const fs = require("fs")
const appConstants = require('./constants/constant');
const Course = require("./course/course.class");
const Utility = require("./course/utility.class");

const course = new Course();
const utility = new Utility();

const filename = process.argv[2]
fs.readFile(filename, "utf8", (err, data) => {

    if (err) throw new Error('Could not read file ' + filename);

    const inputLines = data.toString().replace(/\r/g, '').split("\n");

    // Traversing each line from the file.
    for (const line of inputLines) {
        const action = line.split(' ')[0];
        const restParams = line.split(' ').slice(1);

        switch (action) {
            case appConstants.ADD_COURSE:
                if (!utility.addCourseValidation(restParams)) {
                    break
                }
                const courseId = course.createCourse(restParams);
                utility.addCourse(courseId);
                break;
            case appConstants.REGISTER: {
                if (!utility.registerationUtility(restParams)) {
                    break;
                }
                const registrationStatus = course.registration(restParams);
                // console.log('After registration', registrationStatus);
                utility.registeration(registrationStatus);

                break;
            }
            case appConstants.CANCEL: {
                const cancellationStatus = course.cancelRegistration(restParams[0]);
                utility.cancellation(cancellationStatus);

                break;
            }
            case appConstants.ALLOT_COURSE: {
                const objArray = course.courseAllotment(restParams[0]);
                utility.courseAllotment(objArray);
                break;
            }
            default:
                throw new Error('Invalid registration type');

        }
    }

})