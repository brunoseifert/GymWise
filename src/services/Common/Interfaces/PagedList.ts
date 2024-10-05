export interface PagedList<T> {
    pageNumber: number
    pageSize: number
    totalCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    items: T[]
  }
  