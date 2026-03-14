"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/context/TranslationContext";

function PaymentsContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get("order_id") ?? "";

  const [manualOrderId, setManualOrderId] = useState("");
  const [activeOrderId, setActiveOrderId] = useState(urlOrderId);
  const [lookupSubmitted, setLookupSubmitted] = useState(!!urlOrderId);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualOrderId.trim()) {
      setActiveOrderId(manualOrderId.trim());
      setLookupSubmitted(true);
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-hero-title">{t("payments_title")}</h1>
        <p className="page-hero-subtitle">{t("payments_subtitle")}</p>
      </section>

      <section className="section">
        <div className="container">
          {/* Order ID Banner — shown when redirected from order form or after lookup */}
          {lookupSubmitted && activeOrderId && (
            <div className="payment-order-banner">
              <div className="payment-order-banner-label">
                {t("payments_order_ref")}
              </div>
              <div className="payment-order-banner-id">{activeOrderId}</div>
              <div className="payment-order-banner-note">
                {t("payments_order_ref_note")}
              </div>
            </div>
          )}

          {/* Phone-order lookup — shown if NOT arrived from order form */}
          {!urlOrderId && (
            <div className="payment-lookup-card">
              <div className="payment-lookup-icon">📞</div>
              <h3 className="payment-lookup-title">
                {t("payments_phone_order_title")}
              </h3>
              <p className="payment-lookup-desc">
                {t("payments_phone_order_desc")}
              </p>
              <form className="payment-lookup-form" onSubmit={handleLookup}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={t("payments_enter_order_id")}
                  value={manualOrderId}
                  onChange={(e) => setManualOrderId(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {t("payments_lookup_btn")}
                </button>
              </form>
            </div>
          )}

          {/* Payment Cards */}
          <div className="payments-grid">
            {/* UPI */}
            <div className="payment-card">
              <div className="payment-icon">📱</div>
              <div className="payment-title">{t("payments_upi_title")}</div>
              <div
                className="payment-detail"
                style={{
                  fontWeight: 700,
                  color: "var(--red)",
                  fontSize: "1rem",
                  marginBottom: 8,
                }}
              >
                {t("payments_upi_id")}
              </div>
              <div className="payment-detail">{t("payments_upi_note")}</div>
              {/* QR Placeholder */}
              <div
                style={{
                  marginTop: 20,
                  width: 120,
                  height: 120,
                  margin: "20px auto 0",
                  background: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border)",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                  textAlign: "center",
                  padding: 8,
                }}
              >
                📷
                <br />
                Add your
                <br />
                UPI QR code here
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="payment-card">
              <div className="payment-icon">🏦</div>
              <div className="payment-title">{t("payments_bank_title")}</div>
              <div className="payment-detail">{t("payments_bank_name")}</div>
              <div className="payment-detail">{t("payments_bank_number")}</div>
              <div className="payment-detail">{t("payments_bank_ifsc")}</div>
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 16px",
                  background: "var(--bg-subtle)",
                  borderRadius: 8,
                  fontSize: "0.82rem",
                  color: "var(--ink-soft)",
                }}
              >
                Contact us at <strong>+91 96790 91725</strong> for full bank
                details.
              </div>
            </div>

            {/* Cash */}
            <div className="payment-card">
              <div className="payment-icon">💵</div>
              <div className="payment-title">{t("payments_cash_title")}</div>
              <div className="payment-detail">{t("payments_cash_desc")}</div>
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 16px",
                  background: "var(--bg-subtle)",
                  borderRadius: 8,
                  fontSize: "0.82rem",
                  color: "var(--ink-soft)",
                }}
              >
                Visit us at:
                <br />
                <strong>
                  Patashpur, Purba Medinipur
                  <br />
                  West Bengal – 721439
                </strong>
              </div>
            </div>
          </div>

          {/* Note Box */}
          <div className="payment-note-box">
            <div className="payment-note-title">
              ⚠️ {t("payments_note_title")}
            </div>
            <div className="payment-note-desc">{t("payments_note_desc")}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "120px 24px", textAlign: "center" }}>
          Loading...
        </div>
      }
    >
      <PaymentsContent />
    </Suspense>
  );
}
