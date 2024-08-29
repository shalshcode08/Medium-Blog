import { Blog } from "../hooks";
import { Appbar } from "./Appbar"
import { ProfileIcon } from "./BlogCard";

export const Fullblog = ({blog} : {blog:Blog}) => {
  return (
    <div>
    <Appbar/>
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8">
            <div className="text-5xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                Posted on 2nd Dec 2023
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            Author
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <ProfileIcon size="big" name={blog.author.name||"Anonymous"}/>
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Random phrase about the author's ability to grab the user attention
                    </div>
                </div>  
            </div> 
        </div>
      </div>
    </div>
    </div>
  );
};
