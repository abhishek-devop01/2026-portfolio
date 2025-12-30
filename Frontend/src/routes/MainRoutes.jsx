import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllPages from "../pages/AllPages";
import LoadingSpinner from "../components/admin/LoadingSpinner";
import NotFound from "../components/NotFound";

// Lazy load all admin-related components
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AdminProjects = lazy(() => import("../components/admin/AdminProjects"));
const AdminResume = lazy(() => import("../components/admin/AdminResume"));
const AdminHonors = lazy(() => import("../components/admin/AdminHonors"));
const AdminSkill = lazy(() => import("../components/admin/AdminSkill"));
const LoginForm = lazy(() => import("../pages/LoginForm"));
const ProtectedRoute = lazy(() => import("../components/admin/ProtectedRoute"));

const AdminLoadingFallback = () => (
    <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner
            size="lg"
            text="Loading admin panel..."
            color="#EF6A93"
        />
    </div>
);

const MainRoutes = () => {
    const user = useSelector((state) => state.auth?.user);
    const isAuthenticated = user && user.role === "admin";

    return (
        <Routes>
            <Route path="/" element={<AllPages />} />

            {/* Lazy loaded login route */}
            <Route
                path="/admin/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/admin" replace />
                    ) : (
                        <Suspense fallback={<AdminLoadingFallback />}>
                            <LoginForm />
                        </Suspense>
                    )
                }
            />

            {/* Lazy loaded protected admin routes */}
            <Route
                path="/admin"
                element={
                    <Suspense fallback={<AdminLoadingFallback />}>
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    </Suspense>
                }
            >
                <Route
                    index
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpinner
                                    size="lg"
                                    text="Loading projects..."
                                />
                            }
                        >
                            <AdminProjects />
                        </Suspense>
                    }
                />
                <Route
                    path="skills"
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpinner
                                    size="lg"
                                    text="Loading skills..."
                                />
                            }
                        >
                            <AdminSkill />
                        </Suspense>
                    }
                />
                <Route
                    path="honors"
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpinner
                                    size="lg"
                                    text="Loading honors..."
                                />
                            }
                        >
                            <AdminHonors />
                        </Suspense>
                    }
                />
                <Route
                    path="resume"
                    element={
                        <Suspense
                            fallback={
                                <LoadingSpinner
                                    size="lg"
                                    text="Loading resume..."
                                />
                            }
                        >
                            <AdminResume />
                        </Suspense>
                    }
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;
