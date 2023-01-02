const { constructCourseObj, getRegistrationDetails } = require('../course/helper.js')

describe('Testing the helper.js function', () => {
  test('Construct an object with the given properties', () => {

    const inpArray = ['PYTHON', 'JOHN', '05062022', 1, 3];
    const arrayLength = inpArray.length;

    expect(constructCourseObj(inpArray)).toEqual({
      courseId: 'OFFERING-PYTHON-JOHN',
      courseDate: '05062022',
      minEmp: 1,
      maxEmp: 3,
      instructor: 'JOHN',
      courseName: 'PYTHON',
      availableSeats: 3,
      registrations: []
    })
  });

  test('Construct the Registration object', () => {
    const details = ['WOO@GMAIL.COM', 'OFFERING-PYTHON-JOHN'];
    const courseDetails = {
      courseName: 'PYTHON',
      instructor: 'JOHN',
      courseDate: '05062022'
    };

    expect(getRegistrationDetails(courseDetails, details)).toEqual({
      registrationId: 'REG-COURSE-WOO-PYTHON',
      employeeEmail: 'WOO@GMAIL.COM',
      courseId: 'OFFERING-PYTHON-JOHN',
      courseName: 'PYTHON',
      instructor: 'JOHN',
      date: '05062022',
      status: 'COMFIRMED'
    })
  });

})