export const getDateRangeWhereClause = (
  fieldName: string,
  dateStart?: Date,
  dateEnd?: Date,
) =>
  dateStart && dateEnd
    ? {
        [fieldName]: {
          lte: dateEnd,
          gte: dateStart,
        },
      }
    : {};
