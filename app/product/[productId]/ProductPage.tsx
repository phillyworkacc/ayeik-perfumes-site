'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import EmptySection from '@/components/CustomSection/EmptySection';
import ProductFullPage from '@/components/Product/ProductFullPage';
import Spacing from '@/components/Spacing/Spacing';
import StoreWrapper from '@/components/StoreWrapper/StoreWrapper';
import { Product } from '@/types';

type ProductsPageProps = {
   product: Product;
}

export default function ProductPage ({ product }: ProductsPageProps) {
   return (
      <StoreWrapper>
         <EmptySection bgColor='white' textColor='black'>
            <Breadcrumb
               pages={[
                  { label: "All Products", href: "/products" },
                  { label: product.name, href: "/product/" },
               ]}
               hideDashboardLink
            />
            <Spacing size={2} />
            <ProductFullPage product={product}/>
         </EmptySection>
      </StoreWrapper>
   )
}
