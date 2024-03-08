export type FetchResult<T> = {
  result?: T,
  isSuccess: boolean,
  isError: boolean,
  statusCode: number,
  error?: string
}


export const successResult : <T>(result: T, statusCode: number) => FetchResult<T> = (result, statusCode) => {
  return {
    result,
    isSuccess: true,
    isError: false,
    statusCode
  }
}

export const failureResult : <T>(error: string, statusCode: number) => FetchResult<T> = (error, statusCode) => {
  return {
    isSuccess: false,
    isError: true,
    statusCode,
    error
  }
}
