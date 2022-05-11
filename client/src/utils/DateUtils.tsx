export const formatToFullDate = (string: string, locale?: string) => {
  const toDate = new Date(string);
  const year = toDate.getFullYear();
  const month = toDate.getMonth() + 1;
  const date = toDate.getDate();

  if (locale === 'fr')
    return `${date > 9 ? date : '0' + date}/${
      month > 9 ? month : '0' + month
    }/${year}`;
  return `${year}-${month > 9 ? month : '0' + month}-${
    date > 9 ? date : '0' + date
  }`;
};

export const dateIsLate = (date: string) => {
  const todoDate = Date.parse(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isLate: boolean = todoDate <= Date.parse(yesterday.toString());
  return isLate;
};
