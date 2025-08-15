import React, { useMemo, useState } from 'react'
import assets from '../assets/assets'
import { login, signup } from '../firebase';
import { Link } from 'react-router';
import { useForm } from "react-hook-form";

function Login() {

    const [signState, setSignState] = useState("Sign In");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    // Watch password field for live updates
    const passwordValue = watch("password", "");

    // Calculate password strength
    const passwordStrength = useMemo(() => {
        if (!passwordValue) return { level: "", color: "", suggestions: [] };

        let score = 0;
        const suggestions = [];

        if (passwordValue.length >= 6) score++;
        else suggestions.push("At least 6 characters");

        if (/[A-Z]/.test(passwordValue)) score++;
        else suggestions.push("Add an uppercase letter");

        if (/[0-9]/.test(passwordValue)) score++;
        else suggestions.push("Add a number");

        if (/[^A-Za-z0-9]/.test(passwordValue)) score++;
        else suggestions.push("Add a special character");

        let level = "";
        let color = "";
        if (score <= 1) {
            level = "Weak";
            color = "text-red-500";
        } else if (score === 2 || score === 3) {
            level = "Medium";
            color = "text-yellow-500";
        } else if (score === 4) {
            level = "Strong";
            color = "text-green-500";
        }

        return { level, color, suggestions };
    }, [passwordValue]);



    const userAuth = async (data) => {
        setLoading(true);

        try {
            if (signState === "Sign In") {
                await login(data.email, data.password);
            } else {
                await signup(data.name, data.email, data.password);
            }
            reset();
        } catch (error) {
            console.error("Auth Error:", error.message);
        }

        setLoading(false);
    };


    return loading ? (
        <div className="w-full h-screen flex items-center justify-center">
            <img
                src={assets.netflix_spinner}
                alt="netflix_spinner"
                className="w-14"
            />
        </div>
    ) : (
        <div className='min-h-screen bg-[linear-gradient(#0000007e,_#0000007e),url(/background_banner.jpg)] bg-center bg-cover py-4 px-[5%] md:py-5 md:px-[8%]'>
            <img
                src={assets.logo}
                alt="logo"
                className='w-[150px]'
            />

            <div className="w-full max-w-[450px] bg-[#000000bf] rounded p-5 mt-14 md:p-14 md:mx-auto">
                <h1 className='text-3xl font-bold mb-7'>{signState}</h1>

                <form onSubmit={handleSubmit(userAuth)}>
                    {signState === "Sign Up" && (
                        <div>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full bg-[#33333359] text-white my-2 border border-[#535353] outline-0 rounded py-4 px-5 font-medium"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            className="w-full my-2 bg-[#33333359] text-white border border-[#535353] outline-0 rounded py-4 px-5 font-medium"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            className="w-full bg-[#33333359] text-white my-2 border border-[#535353] outline-0 rounded py-4 px-5 font-medium"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        {/* Live password strength indicator */}
                        {signState !== "Sign In" && passwordValue && (
                            <div className="mt-1">
                                <p className={`font-medium ${passwordStrength.color}`}>
                                    Strength: {passwordStrength.level}
                                </p>
                                {passwordStrength.suggestions.length > 0 && (
                                    <ul className="text-xs text-gray-300 mt-1 list-disc list-inside">
                                        {passwordStrength.suggestions.map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full border-0 outline-0 p-2 bg-[#e50914] hover:bg-[#e50914db] duration-300 transition-all text-white rounded font-medium mt-5 cursor-pointer"
                    >
                        {signState}
                    </button>

                    {
                        signState === "Sign In" && (
                            <>
                                <div className='mt-5 text-center'>OR</div>

                                <button
                                    type="button"
                                    className="w-full border-0 outline-0 p-2 bg-[#333] hover:bg-[#333333bc] duration-300 transition-all text-white rounded font-medium mt-5 cursor-pointer"
                                >
                                    Use a sign-in code
                                </button>

                                <div className="mt-5 text-center">
                                    <Link
                                        to="#"
                                        className="underline hover:text-[#b0b0b0] duration-300 transition-all cursor-pointer"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="form-help flex items-center justify-between text-[#b3b3b3] text-sm mt-4">
                                    <div className="remember flex items-center gap-1.5">
                                        <input type="checkbox" className='w-4 h-4 accent-gray-400' />
                                        <label htmlFor="">Remember Me</label>
                                    </div>
                                    <p>Need Help?</p>
                                </div>
                            </>
                        )
                    }
                </form>

                <div className="form-switch mt-10 text-[#737373]">
                    {
                        signState === "Sign In" ?
                            <p>New to Netflix?
                                <span
                                    onClick={() => setSignState("Sign Up")}
                                    className='ml-1.5 text-white font-medium cursor-pointer'>Sign Up Now</span>
                            </p>
                            :
                            <p>Already have account?
                                <span
                                    onClick={() => setSignState("Sign In")}
                                    className='ml-1.5 text-white font-medium cursor-pointer'>Sign In Now</span>
                            </p>
                    }

                </div>
            </div>
        </div>
    )
}

export default Login
