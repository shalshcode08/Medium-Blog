import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { Fullblog } from './../components/Fullblog';
import { Skeleton } from './../components/Skeleton';
import { Appbar } from './../components/Appbar';


export const Blog =  () => { 
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id: id || ""
    });


    if(loading || !blog){
        return (
            <div>

            <Appbar/>
            <div className="flex justify-center mt-10">
                <Skeleton/>
            </div>
            </div>
        )
    }

    return(
        <div>
            <Fullblog blog={blog}/>
        </div>
    )
}