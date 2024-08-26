import { SupabaseClient } from "@supabase/supabase-js";
import { NextRouter } from "next/router";

class AuthService {
  private _userMetadata: UserMetadata | undefined;

  private $setAuthStatus: any;
  private $setIsAuthorized: any;
  private $setNeedsAuth: any;
  private $setMessage: any;
  private $setUserMetadata: any;

  constructor(private _router: NextRouter, private _supabase: SupabaseClient) {
    console.log("AuthService initialized");
  }

  // Login
  public async logIn(email: string, password: string) {
    const { error } = await this._supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);

      this.$setMessage({
        message: error.message,
        type: "error",
      });
    } else {
      window.location.href = "/";
    }
  }

  // Sign up
  public async signUp(email: string, password: string) {
    const { error } = await this._supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);

      this.$setMessage({
        message: error.message,
        type: "error",
      });
    } else {
      this._router.push("/");
    }
  }

  // Logout
  public async logOut() {
    const { error } = await this._supabase.auth.signOut();
    if (error) {
      console.error(error);
    }

    this._router.push("/");
  }

  public async renameUser(username: string) {
    const user_id = this._userMetadata!.id!;

    // Update the username in the profiles table
    const { error } = await this._supabase
      .from("profiles")
      .update({ username })
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
      this.$setMessage({
        message: error.message,
        type: "error",
      });
    } else {
      this.$setMessage({
        message: "Username updated successfully",
        type: "success",
      });

      // Update the local user metadata with the new username
      this._userMetadata!.username = username;
      this.$setUserMetadata(this._userMetadata);
    }
  }

  // get user
  public async getUser(): Promise<UserMetadata | null> {
    const user = await this._supabase.auth.getUser();

    // return data user
    const { data, error } = user;
    if (error) {
      return null;
    }

    const userMetadata = data.user as UserMetadata;

    // Retrieve additional information from the 'profiles' table
    const { data: profileData, error: profileError } = await this._supabase
      .from("profiles")
      .select("username")
      .eq("user_id", userMetadata.id)
      .single();

    if (profileError) {
      console.error(profileError);
      return null;
    }

    const profile = profileData as any;
    userMetadata.username = profile.username || profile.email || "Any";

    // Add initials to userMetadata
    const nameParts = userMetadata.username!.split(" ");
    if (nameParts.length > 1) {
      userMetadata.initials =
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase();
    } else {
      userMetadata.initials = nameParts[0].charAt(0).toUpperCase();
    }

    return userMetadata;
  }

  public async init() {
    const userMetadata = await this.getUser();

    if (userMetadata) {
      this.$setAuthStatus("done");
      this.$setIsAuthorized(true);

      this._userMetadata = userMetadata;
      this.$setUserMetadata(this._userMetadata);
    } else {
      this.$setAuthStatus("done");
      this.$setNeedsAuth(true);
    }
  }

  public get userMetadata() {
    return this._userMetadata;
  }

  public provideStates(states: States) {
    this.$setAuthStatus = states.setAuthStatus;
    this.$setIsAuthorized = states.setIsAuthorized;
    this.$setNeedsAuth = states.setNeedsAuth;
    this.$setMessage = states.setMessage;
    this.$setUserMetadata = states.setUserMetadata;
  }

  public dispose() {}
}

interface States {
  setAuthStatus: (value: "pending" | "done") => void;
  setIsAuthorized: (value: boolean) => void;
  setNeedsAuth: (value: boolean) => void;
  setMessage: (value: Message | null) => void;
  setUserMetadata: (value: UserMetadata | null) => void;
}

export interface Message {
  message: string;
  type: "error" | "success";
}

export interface UserMetadata {
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  role: string;
  updated_at: string;
  user_metadata: any;
  username?: string;
  initials?: string;
  [key: string]: any;
}

export default AuthService;
