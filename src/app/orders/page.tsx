"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/context/TranslationContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SP-${date}-${rand}`;
}
export default function OrdersPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [form, setForm] = useState({ phone: "", order_desc: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const order_id = generateOrderId();

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from("orders")
          .insert([
            { phone: form.phone, order_id, order_desc: form.order_desc },
          ]);
        if (error) throw error;
      } catch (err) {
        console.error("Order save failed:", err);
      }
    }

    router.push(`/payments?order_id=${encodeURIComponent(order_id)}`);
  };

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-title">{t("orders_title")}</h1>
        <p className="page-hero-subtitle">{t("orders_subtitle")}</p>
      </section>

      <section className="section">
        <div className="container">
          <div className="orders-info-box">
            <span>{t("orders_id_auto_note")}</span>
          </div>

          <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                {t("orders_phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder={t("orders_phone_placeholder")}
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="order_desc">
                {t("orders_desc")}
              </label>
              <textarea
                id="order_desc"
                name="order_desc"
                className="form-textarea"
                placeholder={t("orders_desc_placeholder")}
                value={form.order_desc}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? t("orders_submitting")
                : t("orders_submit")}
            </button>

            {status === "error" && (
              <div className="form-message error">{t("orders_error")}</div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
