# SeraGPT Database Setup Guide

This guide explains how to set up the database schema for the SeraGPT application using Supabase.

## Prerequisites

1. **Supabase Project**: Create a new project at [supabase.com](https://supabase.com)
2. **Supabase CLI**: Install the Supabase CLI
   ```bash
   npm install -g supabase
   ```

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended for first setup)

1. **Open Supabase Dashboard**
   - Go to your project dashboard
   - Navigate to `SQL Editor`

2. **Run the Migration**
   - Copy the contents of `migrations/20241201000001_create_auth_tables.sql`
   - Paste into the SQL Editor
   - Click `Run` to execute

3. **Verify Setup**
   - Go to `Table Editor` and verify all tables are created:
     - `user_profiles`
     - `user_tokens`
     - `user_sessions`
     - `user_preferences`
     - `user_activity_log`

### Option 2: Using Supabase CLI

1. **Initialize Supabase in your project**
   ```bash
   supabase init
   ```

2. **Link to your remote project**
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

3. **Run the migration**
   ```bash
   supabase db push
   ```

### Option 3: Using Direct SQL (Development)

For development purposes, you can also run the SQL directly:

```bash
psql -h YOUR_DB_HOST -p 5432 -U postgres -d postgres -f database/migrations/20241201000001_create_auth_tables.sql
```

## Environment Variables

Make sure to set up your environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

## Database Structure

### Tables Created

1. **user_profiles** - Extended user information
   - Personal info (name, company, phone)
   - Location data
   - Professional information
   - Subscription details
   - Preferences and settings

2. **user_tokens** - Token management
   - Token balance tracking
   - Usage statistics
   - Purchase history
   - Free token management

3. **user_sessions** - Session management
   - Active session tracking
   - Device information
   - Security features

4. **user_preferences** - User settings
   - UI preferences
   - Notification settings
   - Default values for analyses

5. **user_activity_log** - Activity tracking
   - User action logging
   - Performance metrics
   - Audit trail

### Key Features

- **Row Level Security (RLS)** enabled on all tables
- **Automatic profile creation** when users sign up
- **Token consumption tracking** with balance checks
- **Activity logging** for analytics and audit
- **Flexible JSON fields** for extensibility

## Testing the Setup

After running the migration, you can test the setup:

1. **Create a test user** through your application's signup flow
2. **Check if profile, tokens, and preferences are created automatically**
3. **Test token consumption** by using analysis features
4. **Verify RLS** by trying to access other users' data

## Functions Available

The migration creates several utility functions:

- `handle_new_user()` - Automatically creates profile, tokens, and preferences
- `update_user_login_stats(user_id)` - Updates login statistics
- `consume_user_token(user_id, amount, activity_type, resource_type, resource_id)` - Safely consumes tokens
- `reset_daily_token_usage()` - Resets daily usage counters
- `reset_monthly_token_usage()` - Resets monthly usage counters

## Scheduled Tasks (Optional)

For production, you may want to set up scheduled tasks:

```sql
-- Reset daily token usage at midnight
SELECT cron.schedule('reset-daily-tokens', '0 0 * * *', 'SELECT reset_daily_token_usage();');

-- Reset monthly token usage on the 1st of each month
SELECT cron.schedule('reset-monthly-tokens', '0 0 1 * *', 'SELECT reset_monthly_token_usage();');
```

## Backup and Recovery

### Backup Schema
```bash
supabase db dump --schema-only > schema_backup.sql
```

### Backup Data
```bash
supabase db dump --data-only > data_backup.sql
```

### Restore
```bash
psql -h YOUR_DB_HOST -p 5432 -U postgres -d postgres -f schema_backup.sql
psql -h YOUR_DB_HOST -p 5432 -U postgres -d postgres -f data_backup.sql
```

## Troubleshooting

### Common Issues

1. **Migration fails with permission error**
   - Ensure you're using the correct database URL and credentials
   - Check if you have admin/service role access

2. **RLS policies not working**
   - Verify that `auth.uid()` is properly set in your application
   - Check if the user is properly authenticated

3. **Functions not executing**
   - Ensure the functions have the correct permissions
   - Check if the database user has EXECUTE privileges

4. **Trigger not firing**
   - Verify the trigger is created and enabled
   - Check if the referenced function exists

### Debug Queries

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name LIKE 'user_%';

-- Check if functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_type = 'FUNCTION';

-- Check if triggers exist
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Check RLS policies
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies WHERE schemaname = 'public';
```

## Next Steps

After setting up the database:

1. **Update your auth hooks** to use the new types and functions
2. **Implement token consumption** in your analysis services
3. **Set up activity logging** throughout your application
4. **Configure notifications** based on user preferences
5. **Implement admin functions** for user management

For any issues or questions, refer to the [Supabase Documentation](https://supabase.com/docs) or check the application logs.
