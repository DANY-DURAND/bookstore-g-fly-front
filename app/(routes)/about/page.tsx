"use client"

import Textblock from "@/components/ui/textblock";
import ProductGrid from "@/components/ui/products";
import useFetchProducts from "@/lib/useProducts";

export default function AboutPage() {
  const products = useFetchProducts()
    return (
        <div className="flex flex-col">
            <Textblock title="About" description="Welcome to G-Fly Store, your one-stop destination for all your literary needs. Dive into a world of captivating stories, insightful knowledge, and endless adventures with our vast collection of books. Whether you're a bookworm, a casual reader, or a student on a quest for knowledge, we've got you covered. Explore a treasure trove of genres, from bestsellers to hidden gems, and find your next favorite read. With easy online browsing, secure transactions, and swift doorstep delivery, we make the joy of reading just a click away. Discover the magic of words at G-Fly Store – Where Books Take Flight!" />
            <video controls width={1000} height={400} className="md:w-[1000px] md:h-[400px] sm:w-full sm:h-auto self-center sm:px-8 md:px-0 rounded-lg" src="/sampleVideo.mp4" poster="/front.png"></video>
            <ProductGrid 
              containerStyle="flex flex-col items-center justify-center gap-4 lg:m-16 sm:m-8" 
              title="Check Out Featured Products" 
              titleStyle="font-bold uppercase text-center w-full my-8" 
              filterBy={products.filter((product) => product.isFeatured)} 
              sortBy={products.filter((product) => product.isFeatured)} 
              ifNotFound="No featured products yet!"
            />
        </div>
    )
}