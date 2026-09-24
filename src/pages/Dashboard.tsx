import { useState } from "react";

import { Header } from "../components/layout/Header";

import { Icon } from "../components/ui/Icon";

import {
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
} from "../components/ui/Primitives";

import { ToastStack } from "../components/ui/Components";

import type { Order, ToastItem } from "../types";

const metrics = [
  {
    label: "صافي الإيرادات",
    value: "$48,290",
    change: "+12.8%",
    note: "مقارنة بالشهر الماضي",
    icon: "solar:wad-of-money-bold-duotone",
    color: "var(--primary)",
  },
  {
    label: "العملاء النشطون",
    value: "2,481",
    change: "+8.2%",
    note: "مقارنة بالشهر الماضي",
    icon: "solar:users-group-rounded-bold-duotone",
    color: "var(--secondary)",
  },
  {
    label: "معدل التحويل",
    value: "6.24%",
    change: "+2.1%",
    note: "مقارنة بالشهر الماضي",
    icon: "solar:graph-up-bold-duotone",
    color: "var(--accent)",
  },
  {
    label: "متوسط قيمة الطلب",
    value: "$184.60",
    change: "+4.6%",
    note: "مقارنة بالشهر الماضي",
    icon: "solar:cart-large-4-bold-duotone",
    color: "var(--warning)",
  },
];

const orders: Order[] = [
  {
    id: "#10482",
    customer: "مايا تشن",
    initials: "MC",
    product: "الخطة الاحترافية السنوية",
    amount: "$1,240.00",
    status: "Paid",
    date: "اليوم، 10:42",
  },
  {
    id: "#10481",
    customer: "عمر حداد",
    initials: "OH",
    product: "خطة الفريق الشهرية",
    amount: "$480.00",
    status: "Pending",
    date: "اليوم، 09:18",
  },
  {
    id: "#10480",
    customer: "إيلينا روسي",
    initials: "ER",
    product: "الخطة المبتدئة السنوية",
    amount: "$290.00",
    status: "Paid",
    date: "أمس",
  },
  {
    id: "#10479",
    customer: "جون بيل",
    initials: "JB",
    product: "خطة الفريق الشهرية",
    amount: "$480.00",
    status: "Refunded",
    date: "أمس",
  },
];

const activityItems = [
  {
    icon: "solar:palette-bold-duotone",
    text: "قامت نورا بتحديث مكوّن الأزرار",
    time: "منذ 12 دقيقة",
    tone: "var(--primary)",
  },
  {
    icon: "solar:users-group-rounded-bold-duotone",
    text: "انضم عمر إلى مراجعة التصميم",
    time: "منذ 48 دقيقة",
    tone: "var(--secondary)",
  },
  {
    icon: "solar:check-circle-bold-duotone",
    text: "تم نشر الإصدار 2.4",
    time: "منذ ساعتين",
    tone: "var(--accent)",
  },
  {
    icon: "solar:chat-round-bold-duotone",
    text: "أضافت مايا تعليقًا على Design Tokens",
    time: "منذ 3 ساعات",
    tone: "var(--warning)",
  },
];

export function Dashboard() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = (
    title: string,
    description: string,
    tone: ToastItem["tone"] = "success",
  ) => {
    const id = Date.now();

    setToasts((current) => [
      ...current,
      {
        id,
        title,
        description,
        tone,
      },
    ]);

    window.setTimeout(
      () =>
        setToasts((current) =>
          current.filter((item) => item.id !== id),
        ),
      4200,
    );
  };

  return (
    <main className="page-content">
      <Header
        eyebrow="مساحة العمل / نظرة عامة"
        title="صباح الخير، فؤاد"
        description="إليك نظرة هادئة وسريعة على أهم ما يحدث في مساحة العمل الخاصة بك اليوم."
        actions={
          <>
            <Button
              variant="outline"
              leftIcon="solar:download-minimalistic-linear"
              onClick={() =>
                pushToast(
                  "تمت إضافة التصدير إلى قائمة الانتظار",
                  "سيكون ملف CSV الخاص بك جاهزًا خلال لحظات.",
                  "info",
                )
              }
            >
              تصدير
            </Button>

            <Button
              leftIcon="solar:add-circle-linear"
              onClick={() =>
                pushToast(
                  "الإجراء السريع جاهز",
                  "هذا تفاعل تجريبي للعرض فقط.",
                )
              }
            >
              إنشاء تقرير
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <section
        className="metric-grid"
        aria-label="المؤشرات الرئيسية"
      >
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="metric-card"
            style={
              {
                "--metric-color": metric.color,
              } as React.CSSProperties
            }
          >
            <div className="metric-top">
              <span className="metric-label">
                {metric.label}
              </span>

              <span className="metric-icon">
                <Icon icon={metric.icon} size={20} />
              </span>
            </div>

            <div className="metric-value">
              {metric.value}
            </div>

            <div className="metric-foot">
              <span className="metric-trend">
                <Icon
                  icon="solar:arrow-up-linear"
                  size={13}
                />

                {metric.change}
              </span>

              <span className="muted">
                {metric.note}
              </span>
            </div>
          </Card>
        ))}
      </section>

      {/* Main dashboard */}
      <section className="dashboard-grid">
        {/* Revenue chart */}
        <Card className="chart-wrap">
          <div className="chart-header">
            <div>
              <div className="section-kicker">
                نظرة عامة على الإيرادات
              </div>

              <div className="chart-amount">
                $128,240.40{" "}
                <span
                  style={{
                    color: "var(--success)",
                    fontSize: 12,
                    fontWeight: 750,
                  }}
                >
                  +14.6%
                </span>
              </div>
            </div>

            <select
              className="select"
              style={{
                width: 108,
                height: 34,
                fontSize: 11,
              }}
              aria-label="النطاق الزمني"
            >
              <option>آخر 30 يومًا</option>
              <option>آخر 90 يومًا</option>
            </select>
          </div>

          <div className="chart-area">
            <svg
              className="chart-line"
              viewBox="0 0 800 220"
              preserveAspectRatio="none"
              aria-label="مخطط اتجاه الإيرادات"
              role="img"
            >
              <path
                d="M0 164 L48 149 L96 160 L152 118 L208 136 L264 94 L320 108 L376 62 L432 78 L488 45 L544 68 L600 28 L664 48 L728 15 L800 32"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M0 190 L48 181 L96 185 L152 161 L208 172 L264 141 L320 152 L376 122 L432 135 L488 107 L544 120 L600 91 L664 106 L728 82 L800 94"
                fill="none"
                stroke="var(--secondary)"
                strokeWidth="2"
                strokeDasharray="5 7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-dot" />
              الفترة الحالية
            </span>

            <span>
              <i className="legend-dot secondary" />
              الفترة السابقة
            </span>
          </div>
        </Card>

        {/* Team activity */}
        <Card className="card-pad">
          <div className="section-label">
            <div>
              <div className="section-kicker">
                نشاط الفريق
              </div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                ما الذي يحدث؟
              </h2>
            </div>

            <IconButton
              label="المزيد من النشاط"
              icon="solar:menu-dots-bold"
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: 18,
              marginBlockStart: 24,
            }}
          >
            {activityItems.map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  gap: 11,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    flex: "0 0 auto",
                    width: 31,
                    height: 31,
                    borderRadius: 10,
                    color: item.tone,
                    background: `color-mix(in srgb, ${item.tone} 12%, transparent)`,
                  }}
                >
                  <Icon
                    icon={item.icon}
                    size={16}
                  />
                </span>

                <div>
                  <div
                    style={{
                      color: "var(--text-soft)",
                      fontSize: 11,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    style={{
                      marginBlockStart: 4,
                      color: "var(--text-faint)",
                      fontSize: 10,
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Orders + Quick actions */}
      <section
        className="dashboard-grid"
        style={{ marginBlockStart: 18 }}
      >
        {/* Recent orders */}
        <Card>
          <div className="card-pad section-label">
            <div>
              <div className="section-kicker">
                التجارة
              </div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                أحدث الطلبات
              </h2>
            </div>

            <Button
              variant="ghost"
              size="sm"
              rightIcon="solar:arrow-right-linear"
              onClick={() =>
                pushToast(
                  "صفحة الطلبات",
                  "يمكن بناء وحدة طلبات كاملة اعتمادًا على هذا الجدول.",
                  "info",
                )
              }
            >
              عرض الكل
            </Button>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>الطلب</th>
                  <th>المنتج</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th aria-label="الإجراءات" />
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="order-cell">
                        <Avatar
                          initials={order.initials}
                          size="sm"
                        />

                        <span>
                          {order.customer}

                          <small
                            style={{
                              display: "block",
                              marginBlockStart: 3,
                              color: "var(--text-faint)",
                              fontSize: 10,
                            }}
                          >
                            {order.id}
                          </small>
                        </span>
                      </div>
                    </td>

                    <td>{order.product}</td>

                    <td
                      style={{
                        color: "var(--text)",
                        fontWeight: 750,
                      }}
                    >
                      {order.amount}
                    </td>

                    <td>
                      <Badge
                        tone={
                          order.status === "Paid"
                            ? "success"
                            : order.status === "Pending"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {order.status === "Paid"
                          ? "مدفوع"
                          : order.status === "Pending"
                            ? "معلّق"
                            : "مسترد"}
                      </Badge>
                    </td>

                    <td>{order.date}</td>

                    <td>
                      <IconButton
                        label={`إجراءات الطلب ${order.id}`}
                        icon="solar:menu-dots-bold"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="card-pad">
          <div className="section-label">
            <div>
              <div className="section-kicker">
                اختصارات
              </div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                إجراءات سريعة
              </h2>
            </div>

            <Icon
              icon="solar:bolt-circle-bold-duotone"
              size={22}
              color="var(--warning)"
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: 9,
              marginBlockStart: 18,
            }}
          >
            <Button
              variant="outline"
              className="btn-block"
              leftIcon="solar:palette-linear"
              onClick={() =>
                pushToast(
                  "تم فتح النظام",
                  "الانتقال إلى معرض مكونات النظام.",
                  "info",
                )
              }
            >
              استعراض المكونات
            </Button>

            <Button
              variant="outline"
              className="btn-block"
              leftIcon="solar:users-group-rounded-linear"
              onClick={() =>
                pushToast(
                  "تم نسخ رابط الدعوة",
                  "يمكنك مشاركته مع أحد أعضاء الفريق عندما تكون جاهزًا.",
                )
              }
            >
              دعوة عضو للفريق
            </Button>

            <Button
              variant="outline"
              className="btn-block"
              leftIcon="solar:settings-linear"
              onClick={() =>
                pushToast(
                  "التفضيلات",
                  "إعدادات المظهر والتخطيط موجودة في الشريط العلوي.",
                  "warning",
                )
              }
            >
              إعدادات مساحة العمل
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBlockStart: 25,
              padding: 12,
              borderRadius: 13,
              color: "var(--text-soft)",
              background: "var(--surface-2)",
              fontSize: 11,
              lineHeight: 1.5,
            }}
          >
            <Icon
              icon="solar:info-circle-bold-duotone"
              size={17}
              color="var(--info)"
            />

            جميع العناصر هنا مبنية باستخدام مكونات Aurora الأساسية.
          </div>
        </Card>
      </section>

      <ToastStack
        items={toasts}
        onDismiss={(id) =>
          setToasts((current) =>
            current.filter((item) => item.id !== id),
          )
        }
      />
    </main>
  );
}