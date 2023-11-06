"use client"

import { Button } from "@/components/ui/button";
import Textblock from "@/components/ui/textblock";
import useFetchPosts from "@/lib/usePosts";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function BlogPage() {
  const router = useRouter()
  const posts = useFetchPosts()
    const formatDate = (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})
    }
    return (
        <div>
            <Textblock title="Your Source for Literary Delights" description="Dive into the enchanting world of literature with Book Buzz Blog. We're your go-to destination for the latest book news, insightful reviews, and thought-provoking discussions on all things literary. Whether you're an avid reader, a book enthusiast, or just curious about the literary universe, we've got you covered. Explore our captivating articles that showcase new releases, author interviews, book recommendations, and in-depth reviews, all served with a side of passion and expertise. Join our community of fellow book lovers and stay up-to-date with the ever-evolving world of words. Book Buzz Blog – Where Books Come to Life" />
            <div className="lg:ml-[32px] sm:ml-[0px]">
                    {posts.length > 0 ? (
                        <Fragment>
                            <div className="flex gap-4 flex-wrap lg:mx-16 sm:mx-4 mb-16">
                                {posts?.map((post) => (
                                    <div key={post.id} className="flex gap-4 flex-shrink-0  flex-col p-6 rounded-lg bg-white lg:w-[300px] sm:w-full shadow-sm border">
                                        <Image src={post.imageUrl} alt="Blog post cover." width={287} height={180} className="h-[180px] lg:w-[287px] sm:w-full object-cover rounded-lg"/>
                                        <h1 className="font-bold text-lg">{post.name}</h1>
                                        <span className="flex text-sm gap-2 items-center text-slate-500"><Calendar size={16} />{formatDate(post.date)}</span>
                                        <p className="text-slate-500">{post.content.slice(0,132) + "..."}</p>
                                        <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push(`/blog/${post.id}`)}>Read more</Button>
                                    </div>
                                ))}
                            </div>
                        </Fragment>
                    ) : null}
                </div>
            </div>
    )
}