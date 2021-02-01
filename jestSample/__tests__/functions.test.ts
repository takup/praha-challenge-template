// todo: ここに単体テストを書いてみましょう！

import { sumOfArray, asyncSumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong, NameApiServiceInterface, DatabaseInterface } from "../functions"

const sumOfArrayCases = () => {
  return [
    {
      in: [1, 1],
      out: 2,
    },
    {
      in: [1, 2],
      out: 3,
    },
  ]
}

const mockDatabase = jest.fn<DatabaseInterface, []>().mockImplementation( () => {
  return {
    save: (_: number[]) => {
    }
  }
} )

const mockThrowExceptionDatabase = jest.fn<DatabaseInterface, []>().mockImplementation( () => {
  return {
    save: (_: number[]) => {
      throw new Error("fail!");
    }
  }
} )

const mockNameApiService = jest.fn<NameApiServiceInterface, []>().mockImplementation( () => {
  return {
    getFirstName: () => {
      return Promise.resolve("foo bar")
    }
  }
} )


test("sumOfArray", () => {
  const cases = sumOfArrayCases()

  cases.forEach( c => {
    expect(sumOfArray(c.in)).toBe(c.out)
  } )

})


test("asyncSumOfArray", () => {
  const cases = sumOfArrayCases()

  cases.forEach( c => {
    expect(asyncSumOfArray(c.in)).resolves.toBe(c.out)
  } )
})


test("asyncSumOfArraySometimesZero", () => {
  const cases = sumOfArrayCases()

  cases.forEach( c => {
    expect(asyncSumOfArraySometimesZero(c.in, new mockDatabase)).resolves.toBe(c.out)
  } )
})

test("getFirstNameThrowIfLong", () => {

  const cases = [
    {
      in: {
        maxNameLength: 10,
        nameApiService: new mockNameApiService,
      },
      out: "foo bar",
    }
  ]

  cases.forEach( c => {
    expect(getFirstNameThrowIfLong(c.in.maxNameLength, c.in.nameApiService)).resolves.toBe(c.out)
  } )
})


test("Throw getFirstNameThrowIfLong", () => {
  expect(getFirstNameThrowIfLong(1, new mockNameApiService)).rejects.toThrow()
})

test("Throw asyncSumOfArraySometimesZero", () => {
  expect(asyncSumOfArraySometimesZero([1, 1], new mockThrowExceptionDatabase)).resolves.toBe(0)
})
