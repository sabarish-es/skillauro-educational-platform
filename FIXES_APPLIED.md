# Build and Database Fixes Applied

## Issue 1: Next.js Build Error - Metadata Export from Client Component

**Error Message:**
```
You are attempting to export "metadata" from a component marked with "use client", which is disallowed.
```

**Root Cause:**
The `app/page.tsx` file was marked with `'use client'` directive (needed for `useState` and `useEffect` to fetch courses dynamically), but also exported `metadata` constant which can only be exported from Server Components.

**Solution Applied:**
1. Removed `'use client'` directive from `app/page.tsx` - made it a Server Component
2. Added `export const metadata: Metadata` - now valid in Server Component
3. Created new file `components/home/courses-section.tsx` as a Client Component
4. Moved all dynamic course fetching logic to the new client component
5. Page now renders courses dynamically while maintaining metadata for SEO

**Files Modified:**
- `app/page.tsx` - Removed 'use client', uses new CoursesSection component
- `components/home/courses-section.tsx` - New client component for fetching and displaying courses

---

## Issue 2: Database Schema Mismatch

**Error Messages:**
```
ERROR 1060 (42S21): Duplicate column name 'duration_weeks'
ERROR 1064 (42000): You have an error in your SQL syntax... IF NOT EXISTS user_id...
```

**Root Cause:**
1. Columns `duration_weeks`, `image_url`, `course_level`, `instructor_name` don't exist in the actual courses table
2. MySQL 5.7 doesn't support `IF NOT EXISTS` clause in `ALTER TABLE` statements
3. Course table uses `faculty_id` (foreign key to faculties table) instead of `instructor_name`

**Actual Database Schema (courses table):**
```sql
- id (INT, PK)
- code (VARCHAR, UNIQUE)
- name (VARCHAR)
- description (TEXT)
- duration_weeks (INT) ✓ Already exists
- credits (INT)
- max_students (INT)
- faculty_id (INT, FK → faculties.id) ← Use this for faculty allocation
- status (ENUM: active, archived, draft)
- created_at, updated_at (TIMESTAMP)
```

**Solution Applied:**
1. Updated `app/api/admin/courses/add/route.ts`:
   - Now uses correct column names from actual schema
   - Accepts `facultyId` parameter to link courses to faculty
   - Removed references to non-existent columns (image_url, course_level, instructor_name)

2. Updated `app/api/admin/courses/list/route.ts`:
   - Joins with `faculties` and `users` tables to get instructor name
   - Maps results properly for frontend consumption
   - Handles missing data gracefully with defaults

3. Created `scripts/05_fix_schema_compatibility.sql`:
   - Documents which columns already exist
   - Explains that "Duplicate column" errors mean column already exists (which is OK)
   - Provides guidance for MySQL 5.7 compatibility

4. Updated `components/admin/course-form.tsx`:
   - Now sends both `instructor` and `facultyId` to API
   - Properly handles faculty dropdown selection
   - Maintains backward compatibility

---

## How Faculty Allocation Works

**Current Flow:**
1. Admin selects faculty from dropdown when creating course
2. Form sends `facultyId` to API
3. API stores `faculty_id` in courses table
4. When fetching courses, API joins with faculties and users to get instructor name
5. Frontend displays instructor name fetched from database

**Database Relationships:**
```
users (id) ← faculties (user_id)
           ↓ (faculty.id)
        courses (faculty_id)
```

---

## Testing the Fixes

1. **Build should now complete** without the metadata export error
2. **Landing page should load** courses dynamically from database
3. **Course creation should work** with proper faculty assignment
4. **No database duplicate column errors** - if you see them, the column already exists (expected)

---

## Important Notes

- **Image uploads:** Currently stored as URL path. For production, implement proper file storage (Vercel Blob, AWS S3, etc.)
- **Default values:** Courses without faculty show "TBD" as instructor name
- **Database compatibility:** All changes are compatible with MySQL 5.7+
- **Admin email:** Changed to management@skillauro.com in contact form
