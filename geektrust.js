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

        console.log('Processing files', line);
        switch (action) {
            case appConstants.ADD_COURSE:
                if (!utility.addCourseValidation(restParams)) {
                    break
                }
                const courseId = course.createCourse(restParams);
                utility.addCourse(courseId);
                break;
            case appConstants.REGISTER: {
                console.log('REGISTER', action)
                if (!utility.registerationUtility(restParams)) {
                    return;
                }
                const { status, registrationId = '' } = course.registration(restParams);
                status === 'ACCEPTED' ?
                    utility.registeration(registrationId)
                    : utility.registeration(status);
                break;
            }
            case appConstants.CANCEL: {
                return;
            }
            case appConstants.ALLOT_COURSE: {
                return;
            }
            default:
                throw new Error('Invalid registration type');

        }
    }

})
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log('Memory usage', Math.round(used * 100) / 100 + 'MB')
