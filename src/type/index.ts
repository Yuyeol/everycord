export interface IBookmark {
  id: string;
  shop_name: string;
  product_name: string;
  category?: string;
  url: string;
  image?: string;
  created_at: string;
  updated_at?: string;
}

export interface IBookmarkForm {
  product_name: string;
  url: string;
  shop_name: string;
  category?: string;
}

export interface IProductData {
  img: string;
  name: string;
  originalPrice: string;
  price: string;
}
