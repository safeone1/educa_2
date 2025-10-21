"use server";

import { redirect } from "next/dist/server/api-utils";
import { LoginFormData } from "./schema";
import { auth } from "@/lib/auth";

export const addUser = async (data: LoginFormData) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: data.email.split("@")[0],
        email: data.email,
        password: data.password,
      },
    });

    console.log("User added successfully");
  } catch (error) {
    console.error("Error in addUser:", error);
    throw error;
  }
};
