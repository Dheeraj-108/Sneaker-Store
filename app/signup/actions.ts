"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formdata: FormData) {
    const supabase = await createClient();

    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        redirect("/signup?error=" + encodeURIComponent(error.message));
    }

    redirect("/signup/check-email");
}
