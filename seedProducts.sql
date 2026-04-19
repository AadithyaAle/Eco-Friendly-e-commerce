-- 1. First, remove all existing old products
DELETE FROM public.products;

-- 2. Insert new, detailed products
INSERT INTO public.products (
  name, slug, short_description, full_description, price, discount_price, stock, category,
  material, dimensions, care_instructions, eco_score, image, best_seller, featured, active
) VALUES 
(
  'Deluxe Weekend Travel Duffel',
  'deluxe-weekend-travel-duffel',
  'Spacious and incredibly durable weekend bag for short getaways.',
  'A spacious and incredibly durable weekend bag crafted from premium upcycled canvas. Features multiple inner compartments, a reinforced faux-leather base, and adjustable shoulder straps for maximum comfort during transit.',
  2999, 2599, 12, 'Accessories',
  '100% Upcycled Heavy Canvas & Vegan Leather',
  '20" L x 10" W x 12" H',
  'Wipe exterior clean with a damp cloth. Do not machine wash. Air dry in shade.',
  'Saved 4.5kg textile waste and 20 liters of water.',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  true, true, true
),
(
  'Signature Eco Tote Bag',
  'signature-eco-tote-bag',
  'Your everyday elegant carry-all for work and errands.',
  'Designed for the modern professional. This tote effortlessly holds a 15-inch laptop, notebooks, and groceries while maintaining a sleek, minimalist silhouette.',
  1499, null, 45, 'Tote Bags',
  'Organic Cotton Canvas',
  '16" H x 14" W x 5" D',
  'Gentle cold hand wash. Do not wring or tumble dry.',
  'Saved 2.1kg CO2 emissions.',
  'https://images.unsplash.com/photo-1544816155-12df9643f361?auto=format&fit=crop&w=800&q=80',
  true, false, true
),
(
  'Artisan Yoga Mat Sling',
  'artisan-yoga-mat-sling',
  'Carry your yoga mat with hands-free ease and bohemian style.',
  'This lightweight sling features traditional block printing on upcycled cotton. The adjustable straps fit any standard yoga mat securely.',
  1299, 999, 25, 'Yoga Covers',
  'Upcycled Cotton Saris',
  '28" L x 6" Diameter',
  'Machine wash cold on delicate cycle. Wash with similar colors.',
  'Saved 1.5kg textile waste.',
  'https://images.unsplash.com/photo-1601121840801-44eb1c9676e1?auto=format&fit=crop&w=800&q=80',
  false, true, true
),
(
  'Thermal Bottle Sleeve',
  'thermal-bottle-sleeve',
  'Protect your metal flasks from dents and maintain temperatures.',
  'Fits standard 1-liter insulated bottles. Engineered with a neoprene inner lining salvaged from wetsuit manufacturing waste.',
  599, null, 80, 'Bottle Covers',
  'Recycled Neoprene & Canvas',
  '10" H x 3.5" Diameter',
  'Spot clean only. Do not soak.',
  'Saved 0.8kg CO2 and repurposed industrial rubber.',
  'https://images.unsplash.com/photo-1620330925769-d4cbae08c5c7?auto=format&fit=crop&w=800&q=80',
  false, false, true
),
(
  'Zero-Waste 15" Laptop Sleeve',
  'zero-waste-15-laptop-sleeve',
  'Padded protection for your tech essentials.',
  'Hand-stitched laptop sleeve featuring a highly protective plant-based foam interior to keep your devices safe from drops and scratches.',
  1599, 1399, 30, 'Accessories',
  'Organic Cotton & Plant-based Foam',
  '15.5" L x 11" H x 1" D',
  'Dry clean recommended to maintain foam structure.',
  'Saved 3kg CO2 compared to synthetic sleeves.',
  'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
  true, true, true
),
(
  'Insulated Tiffin Carrier',
  'insulated-tiffin-carrier',
  'Keep your home-cooked meals warm for hours.',
  'Features a structured zip-top design with a reflective thermal lining. Perfectly sized for standard 3-tier steel tiffin boxes.',
  899, null, 15, 'Tiffin Covers',
  'Upcycled Cotton Blend & Thermal Foil',
  '8" Diameter x 10" H',
  'Wipe interior with a warm soapy sponge. Let it air dry open.',
  'Saved 1.2kg CO2.',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
  false, false, true
);
