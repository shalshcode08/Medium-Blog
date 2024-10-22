import { Link } from "react-router-dom"
import { ProfileIcon } from "./BlogCard"

export const Appbar = () =>{
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'}className="flex flex-col justify-center font-bold cursor-pointer">
                Medium
            </Link>
            
            <div>
            <Link to={'/publish'}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4">New</button>
            </Link>
            
                <ProfileIcon name="Somya" size="big" />
            </div>
        </div>
    )
}