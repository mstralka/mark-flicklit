import { z } from 'zod'
import { Request } from 'express'

/**
 * Request validation for Author listing
 * Similar to Laravel's FormRequest
 */
export class AuthorListRequest {
  private static validationSchema = z.object({
    cursor: z.string().optional(),
    limit: z.string().optional().transform((val) => val ? Math.min(parseInt(val, 10), 100) : 25),
    search: z.string().optional(),
    sortBy: z.enum(['name', 'birthDate', 'createdAt', 'id']).optional().default('id'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  })

  public static validate(req: Request) {
    return this.validationSchema.parse(req.query)
  }

  public static rules() {
    return {
      cursor: 'optional|string',
      limit: 'optional|integer|max:100',
      search: 'optional|string',
      sortBy: 'optional|in:name,birthDate,createdAt,id',
      sortOrder: 'optional|in:asc,desc',
    }
  }
}