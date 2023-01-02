const Course = require('../course/course.class.js');
const course = new Course();

describe('Testing the Course class file', () => {
  test('Testing the create course method', () => {
    const courseDetails = ['PYTHON', 'JOHN', '05062022', 1, 2];

    expect(course.createCourse(courseDetails)).toBe('OFFERING-PYTHON-JOHN')
  });

  test('Testing the Registration method', () => {
    const details = ['WOO@GMAIL.COM', 'OFFERING-PYTHON-JOHN']

    expect(course.registration(details)).toEqual({
      status: 'ACCEPTED',
      registrationId: 'REG-COURSE-WOO-PYTHON'
    })
  });


  test('Testing the Registration method', () => {
    const details = ['BOB@GMAIL.COM', 'OFFERING-PYTHON-JOHN']

    expect(course.registration(details)).toEqual({
      status: 'ACCEPTED',
      registrationId: 'REG-COURSE-BOB-PYTHON'
    })
  });

  test('Testing the Cancel registration method', () => {
    expect(course.cancelRegistration('REG-COURSE-WOO-PYTHON')).toBe('CANCEL_ACCEPTED')
  });

  test('Testing the Cancel registration method if Allotment is done', () => {
    course.allotment = true;
    expect(course.cancelRegistration('REG-COURSE-WOO-PYTHON')).toBe('CANCEL_REJECTED');
  })

  test('Testing the Registration method and should return COURSE_FULL_ERROR', () => {
    const details = ['BOBY@GMAIL.COM', 'OFFERING-PYTHON-JOHN']

    expect(course.registration(details)).toEqual({
      status: 'COURSE_FULL_ERROR'
    })
  });

  test('Testing the Course allotment method and should return the array of Objects', () => {

    expect(course.courseAllotment('OFFERING-PYTHON-JOHN')).toEqual([
      expect.objectContaining({
        registrationId: expect.any(String),
        employeeEmail: expect.any(String),
        instructor: expect.any(String),
        courseId: expect.any(String),
        date: expect.any(String),
        status: expect.any(String),
      }),
    ])
  });
})