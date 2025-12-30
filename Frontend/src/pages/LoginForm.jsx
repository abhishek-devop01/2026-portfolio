import { useForm } from "react-hook-form";
import { LogIn, User, Lock } from "lucide-react";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { currentuser, setLoading } from "../store/slices/UserSlice";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/admin/LoadingSpinner";

export default function LoginForm() {
    // Fix: Use the same selector as ProtectedRoute
    const user = useSelector((state) => state.user?.user);
    const loading = useSelector((state) => state.user?.loading);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Redirect if already logged in
    if (user && !loading) {
        return <Navigate to="/admin" replace />;
    }

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.post("/api/admin/login", data, {
                withCredentials: true,
            });
            dispatch(currentuser(res.data.user));
        } catch (error) {
            console.log("Error logging in!", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EF6A93]/20 flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-[#EF6A93]" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-white/60 text-sm sm:text-base">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-white/80 text-sm font-medium mb-2"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    id="username"
                                    type="text"
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Username must be at least 3 characters",
                                        },
                                    })}
                                    className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-white/80 text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#EF6A93] transition-colors"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="w-full py-3 sm:py-3.5 px-4 bg-[#EF6A93] rounded-lg hover:bg-[#EF6A93]/80 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#EF6A93] focus:ring-offset-2 focus:ring-offset-transparent mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner size="sm" color="white" />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
