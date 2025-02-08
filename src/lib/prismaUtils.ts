export const getDateRangeWhereClause = (
  fieldName: string,
  dateStart?: string,
  dateEnd?: string,
) =>
  dateStart && dateEnd
    ? {
        [fieldName]: {
          lte: new Date(dateEnd),
          gte: new Date(dateStart),
        },
      }
    : {};
