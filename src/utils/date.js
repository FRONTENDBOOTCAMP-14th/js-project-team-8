/** 오늘 날짜 포맷 생성
 * - 반환값: String(YYYY-MM-DD)
 */
export function getYearMonthDateFormat(date = new Date()) {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-');
}
