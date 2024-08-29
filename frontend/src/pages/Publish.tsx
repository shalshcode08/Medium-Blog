import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const navigate = useNavigate();


    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full pt-10">
                    <input onChange={(e)=>{
                        setTitle(e.target.value);
                    }} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:outline-none w-full p-3" placeholder="Title">
                    </input>
                    
                    <textarea onChange={(e)=>{
                        setContent(e.target.value);
                    }} id="message" rows={8} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none mt-5" placeholder="Write your content here..."></textarea>
                    
                    <button onClick={async()=>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        }, {
                            headers:{
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-300 hover:bg-green-800 mt-3">
                    Publish post</button>
                </div>
            </div>
        </div>

    )
}