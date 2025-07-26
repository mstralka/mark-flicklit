import { Response } from 'express'

/**
 * Base Controller class with common response methods
 * Similar to Laravel's base Controller
 */
export abstract class BaseController {
  /**
   * Return a successful response with data
   */
  protected success(res: Response, data: any, message?: string, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  }

  /**
   * Return a successful response with paginated data
   */
  protected successWithPagination(
    res: Response, 
    data: any, 
    pagination: any, 
    filters?: any,
    message?: string,
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
      filters,
    })
  }

  /**
   * Return an error response
   */
  protected error(res: Response, message: string, statusCode: number = 500, details?: any) {
    return res.status(statusCode).json({
      success: false,
      error: message,
      ...(details && { details }),
    })
  }

  /**
   * Return a validation error response
   */
  protected validationError(res: Response, errors: any, message: string = 'Validation failed') {
    return res.status(422).json({
      success: false,
      error: message,
      details: errors,
    })
  }

  /**
   * Return a not found response
   */
  protected notFound(res: Response, message: string = 'Resource not found') {
    return res.status(404).json({
      success: false,
      error: message,
    })
  }

  /**
   * Return an unauthorized response
   */
  protected unauthorized(res: Response, message: string = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      error: message,
    })
  }

  /**
   * Return a forbidden response
   */
  protected forbidden(res: Response, message: string = 'Forbidden') {
    return res.status(403).json({
      success: false,
      error: message,
    })
  }
}