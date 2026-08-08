// Schuljahr beginnt immer nach den Sommerferien, pauschal am 1. Juli, und
// laeuft bis Ende Juni des Folgejahres, z. B. "2026/27" von Juli 2026 bis
// Juni 2027.
const SCHOOL_YEAR_START_MONTH = 6; // Juli (0-indexiert)

export function getSchoolYearLabel(date: Date = new Date()): string {
  const startYear =
    date.getMonth() >= SCHOOL_YEAR_START_MONTH ? date.getFullYear() : date.getFullYear() - 1;
  return `${startYear}/${String(startYear + 1).slice(-2)}`;
}

// Die Anmeldung fuer die 5. Klasse laeuft jedes Jahr vom 1. November bis zum
// 1. April vor dem beworbenen Schuljahr (das im darauffolgenden Sommer
// beginnt), z. B. November 2026 bis April 2027 fuer das Schuljahr 2027/28.
export function getEnrollmentInfo(date: Date = new Date()): {
  isOpen: boolean;
  schoolYearLabel: string;
} {
  const month = date.getMonth(); // 0 = Januar
  const day = date.getDate();

  const isNovDec = month === 10 || month === 11;
  const isJanToMar = month >= 0 && month <= 2;
  const isAprilFirst = month === 3 && day === 1;

  const isOpen = isNovDec || isJanToMar || isAprilFirst;
  if (!isOpen) {
    return { isOpen: false, schoolYearLabel: "" };
  }

  const startYear = isNovDec ? date.getFullYear() + 1 : date.getFullYear();
  return { isOpen: true, schoolYearLabel: `${startYear}/${String(startYear + 1).slice(-2)}` };
}
