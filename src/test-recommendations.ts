#!/usr/bin/env tsx

/**
 * Test script for the recommendation engine
 * Run with: yarn tsx src/test-recommendations.ts
 */

import { PrismaClient } from '@prisma/client'
import { RecommendationEngine } from './services/RecommendationEngine'
import { generateAnonymousUserId } from './api/recommendations'

const prisma = new PrismaClient()

async function testRecommendationEngine() {
  console.log('🧪 Testing FlickLit Recommendation Engine...\n')

  const engine = new RecommendationEngine(prisma)
  const testUserId = generateAnonymousUserId()

  try {
    // Test 1: Get recommendations for new user (should return popular books)
    console.log('📚 Test 1: Getting recommendations for new user...')
    const initialRecs = await engine.getRecommendations({
      userId: testUserId,
      limit: 5
    })
    
    console.log(`Found ${initialRecs.recommendations.length} recommendations`)
    initialRecs.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. Work ID: ${rec.workId.substring(0, 8)}... (Score: ${rec.finalScore.toFixed(3)})`)
      console.log(`     Reasons: ${rec.reasons.join(', ') || 'Popular recommendation'}`)
    })
    console.log()

    if (initialRecs.recommendations.length === 0) {
      console.log('❌ No recommendations found. Make sure you have imported some books first.')
      console.log('   Run: yarn import:authors && yarn import:works')
      return
    }

    // Test 2: Simulate user interactions
    console.log('👍 Test 2: Simulating user interactions...')
    const firstWork = initialRecs.recommendations[0]
    const secondWork = initialRecs.recommendations[1]
    
    // User likes first book, dislikes second
    await engine.recordInteraction(testUserId, firstWork.workId, true)
    console.log(`✅ Recorded LIKE for work ${firstWork.workId.substring(0, 8)}...`)
    
    await engine.recordInteraction(testUserId, secondWork.workId, false)
    console.log(`❌ Recorded DISLIKE for work ${secondWork.workId.substring(0, 8)}...`)
    console.log()

    // Test 3: Get updated recommendations
    console.log('🔄 Test 3: Getting updated recommendations after interactions...')
    const updatedRecs = await engine.getRecommendations({
      userId: testUserId,
      limit: 5,
      excludeWorkIds: [firstWork.workId, secondWork.workId]
    })

    console.log(`Found ${updatedRecs.recommendations.length} updated recommendations`)
    if (updatedRecs.userProfile) {
      console.log(`User profile: ${updatedRecs.userProfile.totalLikes} likes, ${updatedRecs.userProfile.totalDislikes} dislikes`)
      
      const topSubjects = Object.entries(updatedRecs.userProfile.subjectPreferences)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([subject, score]) => `${subject}(${score.toFixed(2)})`)
      
      if (topSubjects.length > 0) {
        console.log(`Top subject preferences: ${topSubjects.join(', ')}`)
      }
    }

    updatedRecs.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. Work ID: ${rec.workId.substring(0, 8)}... (Score: ${rec.finalScore.toFixed(3)})`)
      console.log(`     Content: ${rec.contentScore.toFixed(3)}, Collaborative: ${rec.collaborativeScore.toFixed(3)}, Novelty: ${rec.noveltyBonus.toFixed(3)}, Negative: ${rec.negativeMultiplier.toFixed(3)}`)
      console.log(`     Reasons: ${rec.reasons.join(', ') || 'No specific reasons'}`)
    })
    console.log()

    // Test 4: Test anonymous user recommendations
    console.log('👤 Test 4: Testing anonymous user recommendations...')
    const anonRecs = await engine.getRecommendations({
      limit: 3
    })

    console.log(`Found ${anonRecs.recommendations.length} anonymous recommendations`)
    anonRecs.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. Work ID: ${rec.workId.substring(0, 8)}... (Score: ${rec.finalScore.toFixed(3)})`)
    })
    console.log()

    console.log('✅ All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the tests
testRecommendationEngine().catch(console.error)