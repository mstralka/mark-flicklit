# Data Consolidation Strategy for FlickLit

## Overview

We now have three sources of book metadata:
1. **OpenLibrary** - Raw, messy data (4.5M works)
2. **WorldCat** - High-quality library cataloging data
3. **Google Books** - Commercial metadata with ratings/images

This document outlines how to consolidate these sources into authoritative Work records.

## Data Quality Hierarchy

### **1. Language Detection (Priority: High)**
- **WorldCat**: ISO 639-2 codes (eng, fre, spa) - **Most Reliable**
- **Google Books**: ISO 639-1 codes (en, fr, es) - **Reliable**
- **OpenLibrary**: Missing/unreliable - **Fallback only**

### **2. Publication Details**
- **WorldCat**: Professional cataloging - **Most Authoritative**
- **Google Books**: Good for modern books - **Reliable**
- **OpenLibrary**: Inconsistent formatting - **Fallback**

### **3. Descriptions/Summaries**
- **Google Books**: Commercial descriptions - **Best for Users**
- **WorldCat**: Academic summaries - **Most Accurate**
- **OpenLibrary**: Often missing - **Limited Value**

### **4. Subject/Genre Classification**
- **WorldCat**: Library of Congress Subject Headings - **Most Authoritative**
- **Google Books**: Commercial categories - **User Friendly**
- **OpenLibrary**: Inconsistent tags - **Supplementary**

### **5. Author Information**
- **WorldCat**: Standardized author names - **Most Reliable**
- **Google Books**: Consistent formatting - **Good**
- **OpenLibrary**: Messy, inconsistent - **Needs Cleanup**

## Consolidation Algorithm

### **Phase 1: Language Classification**
```sql
-- Priority order: WorldCat → Google Books → Heuristics
UPDATE works 
SET detectedLanguage = CASE
  WHEN EXISTS (SELECT 1 FROM worldcat_books WHERE workId = works.id AND language = 'eng') THEN 'eng'
  WHEN EXISTS (SELECT 1 FROM google_books WHERE workId = works.id AND language = 'en') THEN 'eng'
  ELSE detectedLanguage
END,
isEnglish = CASE
  WHEN EXISTS (SELECT 1 FROM worldcat_books WHERE workId = works.id AND language = 'eng') THEN true
  WHEN EXISTS (SELECT 1 FROM google_books WHERE workId = works.id AND language = 'en') THEN true
  ELSE isEnglish
END,
languageConfidence = CASE
  WHEN EXISTS (SELECT 1 FROM worldcat_books WHERE workId = works.id AND language = 'eng') THEN 0.95
  WHEN EXISTS (SELECT 1 FROM google_books WHERE workId = works.id AND language = 'en') THEN 0.90
  ELSE languageConfidence
END;
```

### **Phase 2: Enhanced Work Fields**
Add consolidated fields to Work model:
```prisma
model Work {
  // ... existing fields
  
  // Consolidated authoritative data
  authoritative_title       String?   // Best title from all sources
  authoritative_author      String?   // Primary author (standardized)
  authoritative_language    String?   // ISO language code
  authoritative_year        Int?      // Publication year
  authoritative_publisher   String?   // Publisher name
  authoritative_description String?   // Best description
  authoritative_subjects    String[]  // Standardized subjects
  authoritative_genres      String[]  // User-friendly genres
  
  // Data source tracking
  data_sources              String[]  // ['openlibrary', 'worldcat', 'google']
  consolidation_score       Float?    // 0-1 confidence in consolidated data
  consolidation_date        DateTime?
}
```

### **Phase 3: Consolidation Rules**

#### **Title Consolidation**
1. Use WorldCat title if available (most authoritative)
2. Fall back to Google Books title (commercial clean)
3. Use OpenLibrary as last resort

#### **Author Consolidation**
1. WorldCat author names (standardized)
2. Google Books authors (consistent formatting)
3. Clean up OpenLibrary author names

#### **Description Priority**
1. Google Books description (user-friendly)
2. WorldCat summary (academic)
3. OpenLibrary description (often missing)

#### **Subject/Genre Mapping**
1. Map WorldCat subjects to user-friendly genres
2. Supplement with Google Books categories
3. Use OpenLibrary subjects as additional tags

## Implementation Plan

### **Step 1: Import External Data**
```bash
yarn import:worldcat      # Import WorldCat metadata
yarn import:google-books  # Import Google Books metadata
```

### **Step 2: Add Consolidation Fields**
- Update Prisma schema with authoritative fields
- Run database migration

### **Step 3: Build Consolidation Engine**
```typescript
class DataConsolidationEngine {
  async consolidateWork(workId: number): Promise<ConsolidatedWork> {
    // Fetch all data sources for this work
    // Apply consolidation rules
    // Return consolidated record
  }
  
  async consolidateAllWorks(): Promise<void> {
    // Batch process all works
  }
}
```

### **Step 4: Language Filtering**
```sql
-- Filter to English works only using consolidated data
SELECT * FROM works 
WHERE authoritative_language IN ('eng', 'en') 
   OR (authoritative_language IS NULL AND isEnglish = true)
   AND consolidation_score > 0.7;
```

## Expected Results

### **Before Consolidation**
- 4.5M works with messy OpenLibrary data
- No reliable language information
- Inconsistent titles/authors
- Poor subject classification

### **After Consolidation**
- ~1-2M high-quality English works
- Reliable language classification (95%+ accuracy)
- Standardized titles and authors
- Professional subject headings + user-friendly genres
- Rich descriptions and metadata

## Quality Metrics

Track consolidation success:
```sql
-- Works with external data
SELECT 
  COUNT(*) as total_works,
  COUNT(CASE WHEN EXISTS (SELECT 1 FROM worldcat_books WHERE workId = works.id) THEN 1 END) as with_worldcat,
  COUNT(CASE WHEN EXISTS (SELECT 1 FROM google_books WHERE workId = works.id) THEN 1 END) as with_google,
  AVG(consolidation_score) as avg_consolidation_score
FROM works 
WHERE isEnglish = true;
```

This strategy will transform our raw OpenLibrary data into a curated, high-quality dataset suitable for book recommendations.