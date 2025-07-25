#!/usr/bin/env tsx

/**
 * Test script specifically for collaborative filtering features
 * Run with: yarn tsx src/test-collaborative.ts
 */

import { PrismaClient } from '@prisma/client'
import { CollaborativeFilter } from './services/CollaborativeFilter'
import { generateAnonymousUserId } from './api/recommendations'

const prisma = new PrismaClient()

async function testCollaborativeFiltering() {
  console.log('🤝 Testing Collaborative Filtering...\n')

  const collaborativeFilter = new CollaborativeFilter(prisma)
  
  // Create test users
  const user1 = generateAnonymousUserId()
  const user2 = generateAnonymousUserId()
  const user3 = generateAnonymousUserId()

  try {
    // Get some works to test with
    const works = await prisma.work.findMany({
      take: 10,
      select: { id: true, title: true }
    })

    if (works.length < 5) {
      console.log('❌ Need at least 5 works in database. Import some books first.')
      console.log('   Run: yarn import:authors && yarn import:works')
      return
    }

    console.log(`📚 Found ${works.length} works to test with`)
    console.log()

    // Test 1: Create similar user profiles
    console.log('👥 Test 1: Creating similar user interaction patterns...')
    
    // User 1 and 2 like similar books
    await prisma.userInteraction.create({
      data: { userId: user1, workId: works[0].id, liked: true }
    })
    await prisma.userInteraction.create({
      data: { userId: user2, workId: works[0].id, liked: true }
    })
    
    await prisma.userInteraction.create({
      data: { userId: user1, workId: works[1].id, liked: true }
    })
    await prisma.userInteraction.create({
      data: { userId: user2, workId: works[1].id, liked: true }
    })
    
    await prisma.userInteraction.create({
      data: { userId: user1, workId: works[2].id, liked: false }
    })
    await prisma.userInteraction.create({
      data: { userId: user2, workId: works[2].id, liked: false }
    })

    // User 2 likes a book that user 1 hasn't seen
    await prisma.userInteraction.create({
      data: { userId: user2, workId: works[3].id, liked: true }
    })

    // User 3 has different preferences
    await prisma.userInteraction.create({
      data: { userId: user3, workId: works[2].id, liked: true } // Likes what others dislike
    })
    await prisma.userInteraction.create({
      data: { userId: user3, workId: works[4].id, liked: true }
    })

    console.log('✅ Created interactions for 3 test users')
    console.log()

    // Test 2: Find similar users
    console.log('🔍 Test 2: Finding similar users...')
    const similarUsers = await collaborativeFilter.findSimilarUsers(user1)
    
    console.log(`Found ${similarUsers.length} similar users for user1:`)
    similarUsers.forEach((similar, index) => {
      console.log(`  ${index + 1}. User ${similar.userId.substring(0, 8)}... (Similarity: ${similar.similarity.toFixed(3)}, Common: ${similar.commonInteractions})`)
    })
    console.log()

    // Test 3: Get collaborative recommendations
    console.log('🎯 Test 3: Getting collaborative recommendations...')
    const recommendations = await collaborativeFilter.getCollaborativeRecommendations(user1, [], 5)
    
    console.log(`Found ${recommendations.length} collaborative recommendations for user1:`)
    recommendations.forEach((rec, index) => {
      const work = works.find(w => w.id === rec.workId)
      console.log(`  ${index + 1}. '${work?.title || 'Unknown'}' (Score: ${rec.score.toFixed(3)}, Confidence: ${rec.confidence.toFixed(3)})`)
      console.log(`     Supported by ${rec.supportingUsers.length} user(s)`)
    })
    console.log()

    // Test 4: Get collaborative stats
    console.log('📊 Test 4: Getting collaborative statistics...')
    const stats = await collaborativeFilter.getCollaborativeStats(user1)
    
    console.log('Collaborative stats for user1:')
    console.log(`  Similar users: ${stats.similarUsers}`)
    console.log(`  Total recommendations: ${stats.totalRecommendations}`)
    console.log(`  Average confidence: ${stats.averageConfidence.toFixed(3)}`)
    console.log()

    // Test 5: Test edge cases
    console.log('🧪 Test 5: Testing edge cases...')
    const newUser = generateAnonymousUserId()
    const newUserSimilar = await collaborativeFilter.findSimilarUsers(newUser)
    const newUserRecs = await collaborativeFilter.getCollaborativeRecommendations(newUser)
    
    console.log('New user (no interactions):')
    console.log(`  Similar users: ${newUserSimilar.length}`)
    console.log(`  Recommendations: ${newUserRecs.length}`)
    console.log()

    console.log('✅ All collaborative filtering tests completed!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  } finally {
    // Clean up test data
    await prisma.userInteraction.deleteMany({
      where: {
        userId: { in: [user1, user2, user3] }
      }
    })
    await prisma.$disconnect()
  }
}

// Run the tests
testCollaborativeFiltering().catch(console.error)