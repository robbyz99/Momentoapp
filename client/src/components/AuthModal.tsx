import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validatePhone = (phone: string) => /^\+?\d{7,15}$/.test(phone);

const PrivacyNotice = () => (
  <div className="text-xs text-gray-500 mt-2">
    By signing up, you agree to our <button type="button" className="underline" onClick={() => alert('Your data is stored securely and only used to save your progress. We never sell your data. See our privacy policy for details.')}>Privacy Notice</button>.
  </div>
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  isDeferred?: boolean;
};

export const AuthModal: React.FC<Props> = ({ open, onClose, onSuccess, isDeferred }) => {
  const { setUser, progress, signInWithProvider } = useUser();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Name is required.");
    if (!validateEmail(form.email)) return setError("Please enter a valid email address.");
    if (!validatePhone(form.phone)) return setError("Please enter a valid phone number.");
    setLoading(true);
    try {
      // TODO: Integrate with Supabase here to create user and save progress
      // Example:
      // await supabase.from('users').insert({ name: form.name, email: form.email, phone: form.phone });
      // await supabase.from('progress').insert({ user_id: user.id, data: progress });
      const user = {
        id: Date.now().toString(),
        ...form,
        isGuest: false,
      };
      setUser(user);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setUser({
      id: "guest-" + Date.now(),
      name: "Guest",
      email: "",
      phone: "",
      isGuest: true,
    });
    onClose();
  };

  const handleSocial = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setError("");
    try {
      await signInWithProvider(provider);
    } catch (err) {
      setError("Social sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative"
        onSubmit={handleSubmit}
        aria-modal="true"
        role="dialog"
      >
        <h2 className="text-xl font-bold mb-2">
          {isDeferred ? "Save Your Progress" : "Welcome!"}
        </h2>
        <p className="mb-4 text-gray-600">
          {isDeferred
            ? "Sign up to save your work and access it from any device."
            : "Sign up or continue as a guest. You can always sign up later to save your progress."}
        </p>
        <div className="flex flex-col gap-2 mb-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded py-2 font-semibold hover:bg-gray-200"
            onClick={() => handleSocial('google')}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            <span className="i-mdi:google text-lg" aria-hidden="true" />
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded py-2 font-semibold hover:bg-gray-200"
            onClick={() => handleSocial('apple')}
            disabled={loading}
            aria-label="Sign in with Apple"
          >
            <span className="i-mdi:apple text-lg" aria-hidden="true" />
            Continue with Apple
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <label className="block mb-2">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
            required
            autoFocus
            disabled={loading}
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
            required
            disabled={loading}
          />
        </label>
        <label className="block mb-4">
          Phone
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 mt-1"
            required
            disabled={loading}
          />
        </label>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold mb-2 flex items-center justify-center"
          disabled={loading}
        >
          {loading && <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
          {loading ? "Signing up..." : "Sign Up / Sign In"}
        </button>
        <button
          type="button"
          className="w-full text-gray-600 underline"
          onClick={handleSkip}
          disabled={loading}
        >
          Continue as Guest
        </button>
        <PrivacyNotice />
      </form>
    </div>
  );
}; 