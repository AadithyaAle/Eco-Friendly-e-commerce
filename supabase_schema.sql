-- Supabase Schema Setup for RVO Admin Dashboard & Product CMS

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id text PRIMARY KEY,
  full_name text,
  email text,
  role text DEFAULT 'customer',
  created_at timestamp DEFAULT now()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (true);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp DEFAULT now()
);

-- Seed Categories
INSERT INTO public.categories (name)
VALUES 
  ('Tote Bags'), 
  ('Yoga Covers'), 
  ('Bottle Covers'), 
  ('Tiffin Covers'), 
  ('Accessories')
ON CONFLICT (name) DO NOTHING;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 slug text UNIQUE,
 short_description text,
 full_description text,
 price numeric NOT NULL,
 discount_price numeric,
 stock int DEFAULT 0,
 sku text,
 category text,
 subcategory text,
 material text,
 dimensions text,
 weight text,
 care_instructions text,
 color text,
 tags text[],
 eco_score text,
 featured boolean DEFAULT false,
 best_seller boolean DEFAULT false,
 active boolean DEFAULT true,
 image text,
 gallery jsonb,
 created_at timestamp DEFAULT now()
);

-- Note: We omit RLS for products/categories here assuming public read is fine, 
-- but you should restrict write via Supabase Auth policies or strictly handle it from backend.
-- For now, allow public read:
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Users can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Users can delete products" ON public.products FOR DELETE USING (true);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories viewable by everyone." ON public.categories FOR SELECT USING (true);
CREATE POLICY "Users can manage categories" ON public.categories FOR ALL USING (true);

-- 4. Storage Bucket Setup Instructions
-- Go to Supabase Dashboard -> Storage -> Create a new bucket named 'product-images'
-- Make it a "Public bucket" 
-- Ensure that storage policies allow authenticated users to upload and public to select.
