import { SignupInput } from "@somu2030/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    }
    catch(e){
      //aalert the user here that request fail

    }
    
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center ">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-slate-400">
               {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-2 underline" to={type === "signup" ? "/signin": "/signup" }>
                {type=="signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>

          <div className="pt-8">
            {type === "signup" ? <LabeledInput
              label="Name"
              placeholder="somu shrestha.."
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            ></LabeledInput>:null}

            <LabeledInput
              label="Email"
              placeholder="somushrestha@gmail.com.."
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            ></LabeledInput>

            <LabeledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            ></LabeledInput>
          </div>
          <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8">{type=== "signup" ? "Sign Up" : "Sign In"}</button>
        </div>
      </div>
    </div>
  );
};



interface LabeledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInputTypes) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-bold text-black pt-3">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
