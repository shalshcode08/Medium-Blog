import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { Appbar } from './../components/Appbar';
import { Skeleton } from './../components/Skeleton';

export const Blogs = () => {
    const {loading,blogs} = useBlogs();
    if(loading){
        return (
        <div>
            <Appbar/>
        <div className="flex justify-center">
            <div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            </div>
        </div>
        </div>
        )
    }

    return (
        <div>
            <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard 
                id = {blog.id}
                authorName = {blog.author.name || "Anonymous"}
                title = {blog.title}
                content = {blog.content}
                publishedDate = {"15/08/2024"}
                >
                </BlogCard>)}
            </div>
        </div>
    </div>
    )
}