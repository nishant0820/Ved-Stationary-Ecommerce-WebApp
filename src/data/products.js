import { supabase } from '@/lib/supabaseClient';

export const products = []; 

export const categories = [
  { id: 'notebooks', name: 'Notebooks & Journals' },
  { id: 'pens', name: 'Pens & Pencils' },
  { id: 'art', name: 'Art Supplies' },
  { id: 'office', name: 'Office Supplies' }
];


export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
};


export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
  return data;
};

export const getProductsByCategory = async (categoryId) => {
  if (!categoryId) return getAllProducts();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categoryId);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data;
};

export const searchProducts = async (query) => {
  const lowercaseQuery = query.toLowerCase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${lowercaseQuery}%,description.ilike.%${lowercaseQuery}%`);

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }
  return data;
};