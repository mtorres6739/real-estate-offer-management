-- Check existing buckets
select * from storage.buckets;

-- Check bucket policies
select * from pg_policies where schemaname = 'storage';
