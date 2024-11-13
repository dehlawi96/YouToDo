export function deadLine(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  
  if (isNaN(due.getTime())) {
    return '';
  }

  const timeDifference = due.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysRemaining > 1) {
    return `(Deadline in ${daysRemaining} days)`;
  } else if (daysRemaining === 1) {
    return `(Deadline tomorrow)`;
  } else if (daysRemaining === 0) {
    return `(Deadline today)`;
  } else {
    return `(Past deadline)`;
  }
}
