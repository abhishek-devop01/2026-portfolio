import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FolderKanban,
    FileText,
    Award,
    Code,
    LogOut,
    User,
} from "lucide-react";
import axios from "../utils/axios";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const navItems = [
        { to: "/admin", label: "Projects", icon: FolderKanban, end: true },
        { to: "/admin/resume", label: "Resume", icon: FileText },
        { to: "/admin/honors", label: "Honors", icon: Award },
        { to: "/admin/skills", label: "Skills", icon: Code },
    ];

    const logout = async () => {
        await axios.get("/api/admin/logout", {
            withCredentials: true,
        });
        navigate("/");
    };

    return (
        <div className="relative z-20 min-h-screen w-full  p-6">
            <div className="w-full mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EF6A93] to-[#ff8fab] flex items-center justify-center shadow-[0_0_20px_rgba(239,106,147,0.4)]">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-white">
                            <span className="font-normal text-white/70">
                                Abhishek
                            </span>{" "}
                            Kr Sharma
                        </h2>
                        <p className="text-xs text-white/50">Administrator</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={logout}
                        className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 group"
                    >
                        <LogOut className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            <div className="w-full flex gap-5 h-[calc(100vh-10rem)]">
                {/* Sidebar */}
                <div className="flex flex-col py-6 px-3 gap-2 w-[280px] border border-white/10 bg-gradient-to-b from-[#131313] to-[#0f0f0f] rounded-2xl backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <div className="mb-4 px-3">
                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                            Navigation
                        </h3>
                    </div>

                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? "bg-gradient-to-r from-[#EF6A93]/20 to-[#EF6A93]/10 text-white shadow-[0_0_20px_rgba(239,106,147,0.15)] border border-[#EF6A93]/30"
                                            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`
                                }
                                to={item.to}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#EF6A93] to-[#ff8fab] rounded-r-full shadow-[0_0_10px_rgba(239,106,147,0.5)]" />
                                        )}
                                        <Icon
                                            className={`w-5 h-5 transition-all duration-300 ${
                                                isActive
                                                    ? "text-[#EF6A93]"
                                                    : "text-white/60 group-hover:text-white"
                                            }`}
                                        />
                                        <span className="text-base font-medium">
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-[#EF6A93] shadow-[0_0_8px_rgba(239,106,147,0.6)] animate-pulse" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                <div className="flex-1 parent overflow-auto p-3 border border-white/10 bg-gradient-to-b from-[#131313] to-[#0f0f0f] rounded-2xl backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
