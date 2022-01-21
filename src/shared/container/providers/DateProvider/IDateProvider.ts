interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  toUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
