import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../hooks/use-toast";

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validatePhone = (phone: string) => /^\+?\d{7,15}$/.test(phone);

type Props = {
  open: boolean;
  onClose: () => void;
};

export const EditProfileModal: React.FC<Props> = ({ open, onClose }) => {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

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
      // Update user in Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        email: form.email,
        data: { name: form.name, phone: form.phone },
      });
      if (updateError) throw updateError;
      setUser({ ...user!, ...form });
      toast({ title: "Profile updated!", description: "Your info was saved." });
      onClose();
    } catch (err) {
      setError("Update failed. Please try again.");
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
        <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
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
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="w-full text-gray-600 underline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}; 