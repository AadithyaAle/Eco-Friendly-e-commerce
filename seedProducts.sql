-- Run this in your Supabase SQL Editor to seed 12 premium eco-friendly products

INSERT INTO public.products (name, description, price, discount_price, image, category, stock, featured, material, eco_score)
VALUES 
  (
    'Premium Eco Tote Bag', 
    'A beautiful, durable everyday carry engineered from completely upcycled materials. Spacious enough for your laptop and daily essentials while making a positive impact on the planet.', 
    1499, 1299, 
    'https://images.unsplash.com/photo-1544816155-12df9643f361?auto=format&fit=crop&w=800&q=80', 
    'Tote Bags', 50, true, 
    'Recycled thick canvas cotton & upcycled denim lining.', 
    'Saved 2.1kg textile waste and 14 liters of water.'
  ),
  (
    'Upcycled Denim Yoga Mat Cover', 
    'Carry your yoga mat in style with our minimalist, zero-waste sleeve made from pre-loved jeans and organic cotton.', 
    1299, null, 
    'https://images.unsplash.com/photo-1601121840801-44eb1c9676e1?auto=format&fit=crop&w=800&q=80', 
    'Yoga Covers', 30, true, 
    '100% Upcycled Denim', 
    'Saved 1.5kg CO2.'
  ),
  (
    'Eco Minimalist Bottle Cover', 
    'Keep your drinks insulated and your hands dry. Complete with an adjustable strap for easy carrying.', 
    599, null, 
    'https://images.unsplash.com/photo-1620330925769-d4cbae08c5c7?auto=format&fit=crop&w=800&q=80', 
    'Bottle Covers', 100, false, 
    'Repurposed Canvas', 
    'Saved 0.5kg CO2.'
  ),
  (
    'Heritage Upcycled Tiffin Bag', 
    'Perfect for your daily lunch run. Its insulating interior layer keeps food fresh while the outer upcycled fabric looks incredibly premium.', 
    899, 799, 
    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80', 
    'Accessories', 0, false, 
    'Upcycled Cotton Blend', 
    'Saved 1.2kg CO2.'
  ),
  (
    'Canvas Travel Organizer', 
    'Organize your toiletries, tech accessories, or makeup in this sturdy travel pouch made from factory offcuts.', 
    1199, null, 
    'https://images.unsplash.com/photo-1584305581177-84bc3623fa55?auto=format&fit=crop&w=800&q=80', 
    'Accessories', 25, false, 
    'Canvas & Recycled Leather', 
    'Saved 2.5kg CO2.'
  ),
  (
    'Zero-Waste Laptop Sleeve 15"', 
    'Hand-stitched laptop sleeve featuring a protective upcycled foam interior and a chic block-printed exterior.', 
    1599, 1499, 
    'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80', 
    'Accessories', 40, true, 
    'Organic Cotton & Plant-based Foam', 
    'Saved 3kg CO2.'
  ),
  (
    'Sage Green Shopper Tote', 
    'Your perfect companion for grocery runs or farmer market trips. Folds tiny but holds massive weight.', 
    999, null, 
    'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?auto=format&fit=crop&w=800&q=80', 
    'Tote Bags', 60, false, 
    'Organic Linen Blend', 
    'Saved 1.2kg textle waste.'
  ),
  (
    'Kraft Brown Messenger Bag', 
    'A rugged, eco-conscious messenger bag designed for urban commuters who care about their carbon footprint.', 
    2499, 1999, 
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 
    'Tote Bags', 15, true, 
    'Heavy-duty Recycled Canvas', 
    'Saved 4.5kg CO2.'
  ),
  (
    'Boho Chic Yoga Sling', 
    'A lightweight, beautiful, and functional sling for your yoga mat, featuring intricate traditional embroidery.', 
    799, null, 
    'https://images.unsplash.com/photo-1518606473117-e85df64985db?auto=format&fit=crop&w=800&q=80', 
    'Yoga Covers', 20, false, 
    'Upcycled Cotton Saris', 
    'Saved 1kg textile waste.'
  ),
  (
    'Insulated Flask Jacket', 
    'Protects your metal flasks from dents and temperature drops. Fits standard 1L bottles comfortably.', 
    649, null, 
    'https://images.unsplash.com/photo-1558227092-2fe2ba18e7e1?auto=format&fit=crop&w=800&q=80', 
    'Bottle Covers', 80, false, 
    'Recycled Neoprene & Canvas', 
    'Saved 0.8kg CO2.'
  ),
  (
    'Minimalist Passport Wallet', 
    'Keep your travel documents safe in this slim upcycled wallet that patinas beautifully over time.', 
    499, null, 
    'https://images.unsplash.com/photo-1627005959648-959c99684128?auto=format&fit=crop&w=800&q=80', 
    'Accessories', 45, false, 
    'Upcycled Faux Leather', 
    'Saved 0.3kg CO2.'
  ),
  (
    'Earth Tones Weekend Duffel', 
    'Spacious enough for a 3-day getaway, structured from extremely durable factory-surplus textiles.', 
    2999, 2499, 
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 
    'Accessories', 10, true, 
    'Surplus Factory Textiles', 
    'Saved 5kg textile waste.'
  );
