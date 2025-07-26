import { Router } from 'express'
import { authenticate } from '../../middleware/auth'
import { GoogleBooksController } from '../../http/controllers/Admin/GoogleBooksController'

const router = Router()
const googleBooksController = new GoogleBooksController()

// Apply authentication middleware to all admin routes
router.use(authenticate)

/**
 * GET /api/admin/google-books
 * Get paginated list of Google Books with intelligent pagination for millions of records
 */
router.get('/', (req, res) => googleBooksController.index(req, res))

/**
 * GET /api/admin/google-books/stats
 * Get Google Books statistics for dashboard
 */
router.get('/stats', (req, res) => googleBooksController.stats(req, res))

/**
 * GET /api/admin/google-books/:id
 * Get specific Google Book details
 */
router.get('/:id', (req, res) => googleBooksController.show(req, res))

/**
 * GET /api/admin/google-books/filters/options
 * Get filter options for dropdowns
 */
router.get('/filters/options', (req, res) => googleBooksController.filterOptions(req, res))

export default router