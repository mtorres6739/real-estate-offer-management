-- Check existing buckets
SELECT * FROM storage.buckets;

-- Check existing policies
SELECT * FROM pg_policies WHERE schemaname = 'storage';
