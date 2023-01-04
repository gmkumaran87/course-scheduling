const { constructCourseObj, getRegistrationDetails, getEmployeeName, getRegistrationId } = require('../course/helper.js')

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

    const courseDetails = {
      courseName: 'PYTHON',
      instructor: 'JOHN',
      courseDate: '05062022'
    };

    expect(getRegistrationDetails('OFFERING-PYTHON-JOHN', courseDetails, 'WOO@GMAIL.COM')).toEqual({
      registrationId: 'REG-COURSE-WOO-PYTHON',
      employeeEmail: 'WOO@GMAIL.COM',
      courseId: 'OFFERING-PYTHON-JOHN',
      courseName: 'PYTHON',
      instructor: 'JOHN',
      date: '05062022',
      status: 'COMFIRMED'
    })
  });

  test('Return the employee name when employee email-id is provided', () => {
    expect(getEmployeeName('muthu@gmail.com')).toBe('muthu');
  });

  test('Return the registrationId when entered employee name and course name is provided', () => {
    expect(getRegistrationId('MUTHU', 'PYTHON')).toBe('REG-COURSE-MUTHU-PYTHON')
  });

})