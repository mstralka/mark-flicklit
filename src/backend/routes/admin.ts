import { Router } from 'express'
import { AuthorController } from '../http/controllers/Admin/AuthorController'
import { DashboardController } from '../http/controllers/Admin/DashboardController'

const router = Router()

// Initialize controllers (similar to Laravel's controller instantiation)
const authorController = new AuthorController()
const dashboardController = new DashboardController()

// Dashboard routes
router.get('/stats', (req, res) => dashboardController.stats(req, res))
router.get('/analytics', (req, res) => dashboardController.analytics(req, res))

// Author resource routes (Laravel-style resource routing)
router.get('/authors', (req, res) => authorController.index(req, res))
router.get('/authors/:id', (req, res) => authorController.show(req, res))

// Cleanup middleware (Laravel-style service provider cleanup)
router.use(async (req, res, next) => {
  res.on('finish', async () => {
    // Clean up controller resources after response is sent
    // In a real Laravel-style app, this would be handled by service providers
    // For now, we'll handle it manually
  })
  next()
})

export default router