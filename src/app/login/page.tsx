"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockKeyhole, Mail, GraduationCap } from "lucide-react";
import { LoginFormData, loginSchema } from "@/server/schema";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login data:", data);
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-slate-50">
      <div className="absolute top-0 left-0 right-0 py-4 px-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-slate-700" />
          <h1 className="text-slate-900 font-serif text-lg font-semibold">
            Academic Portal
          </h1>
        </div>
      </div>

      <Card className="w-full max-w-md mx-4 bg-white shadow-lg border-slate-200">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-2xl font-serif font-semibold text-slate-900 text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-slate-600 text-center text-sm">
            Faculty & Staff Access
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700 text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@university.edu"
                  className="pl-9 h-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 text-sm">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-9 h-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium h-10 mt-6 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 text-slate-500 bg-white">OR</span>
              </div>
            </div>

            {/* SSO buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
              >
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
              >
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                  <path fill="#00A4EF" d="M11.4 0H0v11.4h11.4V0z" />
                  <path fill="#FFB900" d="M24 0H12.6v11.4H24V0z" />
                  <path fill="#00A4EF" d="M11.4 12.6H0V24h11.4V12.6z" />
                  <path fill="#00A4EF" d="M24 12.6H12.6V24H24V12.6z" />
                </svg>
                Microsoft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-slate-500">
          © 2025 Academic Institution •{" "}
          <a href="#" className="hover:text-slate-700">
            Help
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
