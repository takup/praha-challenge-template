export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export type DatabaseInterface = {
  save: (arg0: number[]) => void
}
export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database: DatabaseInterface,
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export type NameApiServiceInterface = {
  getFirstName: () => Promise<string>,
}

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiService: NameApiServiceInterface,
): Promise<string> => {
  const firstName = await nameApiService.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
