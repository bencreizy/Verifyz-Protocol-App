import { useState } from "react";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = String(toastCount++);
    const newToast = { id, title, description, variant };
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toast, toasts };
}