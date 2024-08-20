// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;

    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeRecord;
}

function createEmployeeRecords(arrayOfArrays) {
  const employeeRecords = arrayOfArrays.map(nestedArray => {
    const [firstName, familyName, title, payPerHour] = nestedArray;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  });

  return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    if (!employeeRecord.timeInEvents) {
      employeeRecord.timeInEvents = [];
    }
  
    const [date, hour] = dateTimeString.split(" ");
    const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date
  };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    if (!employeeRecord.timeOutEvents) {
      employeeRecord.timeOutEvents = [];
    }
  
    const [date, hour] = dateTimeString.split(" ");
    const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date
};
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    let hoursWorked = parseInt(timeOutEvent.hour) - parseInt(timeInEvent.hour);
    if (hoursWorked < 0) {
      hoursWorked += 24;
}
    return hoursWorked/100;
}

function wagesEarnedOnDate(employeeRecord, date, payPerHour) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((timeInEvent) => timeInEvent.date);

  let totalPay = 0;
  datesWorked.forEach((date) => {
    const wagesEarned = wagesEarnedOnDate(employeeRecord, date, employeeRecord.payPerHour);
    totalPay += wagesEarned;
  });

  return totalPay;
}

function calculatePayroll(employeeRecords) {
  let totalPay = 0;

  for (const employeeRecord of employeeRecords) {
    const wages = allWagesFor(employeeRecord);
    totalPay += wages;
  }

  return totalPay;
}