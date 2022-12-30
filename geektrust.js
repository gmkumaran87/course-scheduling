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
                const { courseName, instructor } = course.createCourse(restParams);
                utility.addCourse(courseName, instructor);
                break;
            case appConstants.REGISTER: {
                course.registration(restParams);
                return;
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
