const fs = require("fs")
const appConstants = require('./constant');
const Course = require("./course.class");
const Utility = require("./utility.class");

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
                    return;
                }
                const registrationStatus = course.registration(restParams);
                utility.registeration(registrationStatus);

                break;
            }
            case appConstants.CANCEL: {
                course.cancelRegistration(restParams[0]);
                break;
            }
            case appConstants.ALLOT_COURSE: {
                course.courseAllotment(restParams[0]);
                break;
            }
            default:
                throw new Error('Invalid registration type');

        }
    }

})
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log('Memory usage', Math.round(used * 100) / 100 + 'MB')
