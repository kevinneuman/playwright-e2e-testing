type ErrorResponse = {
  error: string
}

type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export const apiRequest = async <T>(
  method: 'GET' | 'DELETE',
  endpoint: string,
): Promise<ApiResponse<T>> => {
  const unknownErrorMessage = 'An unknown error occurred'

  try {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method,
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorResponse: ErrorResponse = await res.json()
      throw new Error(errorResponse.error || unknownErrorMessage)
    }

    const data: T = await res.json()
    return { data, error: null }
  } catch (error) {
    console.error(error)

    return {
      data: null,
      error: error instanceof Error ? error.message : unknownErrorMessage,
    }
  }
}
