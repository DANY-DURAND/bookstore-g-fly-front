"use client"

import Landing from "@/components/landing"
import { Button } from "@/components/ui/button"
import Textblock from "@/components/ui/textblock"
import { useState, useEffect } from "react"
import { Categories } from "@/interface/interface"
import axios from "axios"
import ProductGrid from "@/components/ui/products"
import useFetchProducts from "@/lib/useProducts"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleDot } from "lucide-react"


const getCategories = async (): Promise<Categories[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  return response.data
}

export default function Homepage() {
  const products = useFetchProducts()
  const [ categories, setCategories ] = useState<Categories[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch(err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories()
  }, [])

    const [ isActive, setIsActive ] = useState(null)
    const handleButtonClick = (category:any) => {
      if (category === null) {
        setIsActive(null);
        setActiveCategory("All");
      } else {
        setIsActive(category.id);
        setActiveCategory(category.name);
      }
    };
    const [ activeCategory, setActiveCategory ] = useState("All")
    const handleFiltering = (product:any) => {
      if(activeCategory === "All") {
        return true;
      } else {
        return product.category.name === activeCategory
      }
    }

    return (
        <>
        <Landing />
{/*         <Textblock title="About the store" 
          description="Welcome to G-Fly Store, your one-stop destination for all your literary needs. Dive into a world of captivating stories, insightful knowledge, and endless adventures with our vast collection of books. Whether you're a bookworm, a casual reader, or a student on a quest for knowledge, we've got you covered. Explore a treasure trove of genres, from bestsellers to hidden gems, and find your next favorite read. With easy online browsing, secure transactions, and swift doorstep delivery, we make the joy of reading just a click away. Discover the magic of words at G-Fly Store – Where Books Take Flight!" />
*/}
        <div className="lg:flex sm:w-full sm:hidden lg:mx-16 sm:mx-4 lg:gap-1 sm:gap-0 my-8 border p-1 lg:w-fit rounded-md">
          <Button
            variant="ghost" 
            className={`text-sm ${isActive === null ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
            onClick={() => handleButtonClick(null)}
          >
            All
          </Button>
            {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`text-sm ${isActive === category.id ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
                  onClick={() => handleButtonClick(category)}
                >
                  {category.name}
                </Button>
            ))}
        </div>
        <div className="sm:flex lg:hidden mx-4 py-2 px-4 border w-fit rounded-md">
        <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center"><CircleDot size={16} />Categories</DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-start w-full mx-4 my-4 bg">
          <DropdownMenuLabel>          <Button
            variant="ghost"
            className={`text-sm ${isActive === null ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
            onClick={() => handleButtonClick(null)}
          >
            All
          </Button></DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`text-sm ${isActive === category.id ? 'bg-slate-100 text-slate-800' : 'text-slate-500'} font-medium hover:text-slate-800`}
                  onClick={() => handleButtonClick(category)}
                >
                  {category.name}
                </Button>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
        </div>
        <div className="flex gap-4 flex-wrap sm:m-4 lg:mx-16 lg:mt-4 lg:mb-16 justify-start">
          <ProductGrid filterBy={products.filter(handleFiltering)} sortBy={products} ifNotFound="No products to display yet!"/>
        </div>
        </>
    )
}
