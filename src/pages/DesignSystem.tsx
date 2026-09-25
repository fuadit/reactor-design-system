import { useState } from "react";

import { Header } from "../components/layout/Header";

import { Icon } from "../components/ui/Icon";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
  Input,
} from "../components/ui/Primitives";

import {
  Checkbox,
  CodeInspectorModal,
  Dropdown,
  Drawer,
  EmptyState,
  FormField,
  Modal,
  Radio,
  Select,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  ToastStack,
  Tooltip,
} from "../components/ui/Components";

import type { ToastItem } from "../types";

const codeSnippets = {
  button: `<Button variant="primary" size="md" leftIcon="solar:add-circle-linear">
  إنشاء مشروع
</Button>`,

  field: `<FormField label="البريد الإلكتروني" required description="يُستخدم لإرسال تحديثات المنتج.">
  <Input placeholder="you@company.com" />
</FormField>`,

  badge: `<Badge tone="success">منشور</Badge>`,
};

export function DesignSystem() {
  const [code, setCode] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [notifications, setNotifications] = useState<ToastItem[]>([]);

  // القيمة الداخلية تبقى بالإنجليزية حتى لا تتأثر منطقية الـ Tabs
  const [tab, setTab] = useState("Overview");

  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(true);
  const [toggled, setToggled] = useState(true);

  const pushToast = (
    title: string,
    description: string,
    tone: ToastItem["tone"] = "success",
  ) => {
    const id = Date.now();

    setNotifications((current) => [
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
        setNotifications((current) =>
          current.filter((item) => item.id !== id),
        ),
      4200,
    );
  };

  const inspect = (title: string, content: string) =>
    setCode({ title, content });

  const tabLabels: Record<string, string> = {
    Overview: "نظرة عامة",
    Activity: "النشاط",
    Settings: "الإعدادات",
  };

  return (
    <main className="page-content">
      <Header
        eyebrow="مساحة العمل / المكتبة"
        title="نظام التصميم"
        description="Aurora هي لغة تصميم صغيرة ومدروسة لواجهات SaaS المركزة. كل المعاينات أدناه تفاعلية، قابلة للتركيب، وجاهزة للتوسعة."
        actions={
          <Button
            leftIcon="solar:book-2-linear"
            onClick={() =>
              pushToast(
                "التوثيق",
                "سيكون دليل المساهمة الكامل متاحًا قريبًا.",
                "info",
              )
            }
          >
            قراءة الدليل
          </Button>
        }
      />

      <div className="showcase-grid">
        {/* Intro */}
        <Card className="showcase-intro">
          <div className="showcase-intro-copy">
            <div className="section-kicker">Aurora / الإصدار 0.1</div>

            <h2
              className="page-title"
              style={{
                fontSize: 27,
                marginBlockStart: 9,
              }}
            >
              مكونات صغيرة، وإيقاع بصري واضح.
            </h2>

            <p
              className="page-description"
              style={{
                marginBlockStart: 10,
              }}
            >
              نظام ودود ومضغوط، يمتلك ما يكفي من الشخصية ليكون مميزًا، وما
              يكفي من البساطة ليبقى التركيز على العمل نفسه.
            </p>

            <div className="showcase-chip-row">
              <span className="showcase-chip">موجه لسطح المكتب</span>
              <span className="showcase-chip">يدعم RTL</span>
              <span className="showcase-chip">يعتمد على Design Tokens</span>
              <span className="showcase-chip">حركة منخفضة</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: 150,
              height: 150,
              flex: "0 0 auto",
              borderRadius: 38,
              color: "#fff",
              background:
                "linear-gradient(145deg, var(--secondary), var(--primary))",
              boxShadow:
                "0 24px 40px color-mix(in srgb, var(--secondary) 22%, transparent)",
              transform: "rotate(5deg)",
            }}
          >
            <Icon
              icon="solar:layers-minimalistic-bold-duotone"
              size={70}
            />
          </div>
        </Card>

        {/* Colors */}
        <Card className="showcase-section wide">
          <div className="section-label">
            <div>
              <div className="section-kicker">الأساسيات</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                الألوان و Design Tokens
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect(
                  "طبقة CSS Tokens",
                  `:root {
  --primary: #ef654d;
  --secondary: #7667e8;
  --accent: #37b7a1;
  --radius-md: 14px;
  --shadow-soft: 0 12px 32px rgba(...);
}`,
                )
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div className="color-grid">
            <div
              className="color-swatch"
              style={{ background: "var(--primary)" }}
            >
              اللون الأساسي
              <br />
              <span style={{ opacity: 0.7 }}>#EF654D</span>
            </div>

            <div
              className="color-swatch"
              style={{ background: "var(--secondary)" }}
            >
              اللون الثانوي
              <br />
              <span style={{ opacity: 0.7 }}>#7667E8</span>
            </div>

            <div
              className="color-swatch"
              style={{ background: "var(--accent)" }}
            >
              اللون المميز
              <br />
              <span style={{ opacity: 0.7 }}>#37B7A1</span>
            </div>

            <div
              className="color-swatch"
              style={{ background: "var(--success)" }}
            >
              نجاح
              <br />
              <span style={{ opacity: 0.7 }}>#229C72</span>
            </div>

            <div
              className="color-swatch"
              style={{ background: "var(--warning)" }}
            >
              تحذير
              <br />
              <span style={{ opacity: 0.7 }}>#CE851A</span>
            </div>
          </div>

          <div className="token-list">
            <div className="token-row">
              <span>مقياس المسافات</span>
              <span className="token-value">
                4 · 8 · 12 · 16 · 24 · 32
              </span>
            </div>

            <div className="token-row">
              <span>مستويات الانحناء</span>
              <span className="token-value">
                10 / 14 / 20 / 28px
              </span>
            </div>

            <div className="token-row">
              <span>الحركة</span>
              <span className="token-value">
                140 / 220 / 360ms
              </span>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card className="showcase-section">
          <div className="section-label">
            <div>
              <div className="section-kicker">الأساسيات</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                الخطوط والنصوص
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect(
                  "Typography Tokens",
                  `--font-display: "Space Grotesk";
--font-body: "DM Sans";`,
                )
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div>
            <div className="type-sample">
              <span
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                  letterSpacing: "-.05em",
                }}
              >
                عنوان رئيسي
              </span>

              <span className="type-meta">32 / 700</span>
            </div>

            <div className="type-sample">
              <span
                style={{
                  fontSize: 21,
                  fontWeight: 750,
                }}
              >
                عنوان المستوى الأول
              </span>

              <span className="type-meta">24 / 750</span>
            </div>

            <div className="type-sample">
              <span style={{ fontSize: 14 }}>
                نص أساسي لواجهات المنتجات والتطبيقات
              </span>

              <span className="type-meta">14 / 400</span>
            </div>

            <div className="type-sample">
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text-soft)",
                }}
              >
                وصف مختصر · معلومات مساعدة
              </span>

              <span className="type-meta">11 / 600</span>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card className="showcase-section">
          <div className="section-label">
            <div>
              <div className="section-kicker">الإجراءات</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                الأزرار
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect("Button.tsx", codeSnippets.button)
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div className="preview-column">
            <div className="preview-row">
              <Button>أساسي</Button>
              <Button variant="secondary">ثانوي</Button>
              <Button variant="outline">محدد</Button>
            </div>

            <div className="preview-row">
              <Button
                variant="ghost"
                leftIcon="solar:magic-stick-3-linear"
              >
                شفاف
              </Button>

              <Button
                variant="danger"
                leftIcon="solar:trash-bin-trash-linear"
              >
                حذف
              </Button>

              <Button
                variant="success"
                leftIcon="solar:check-circle-linear"
              >
                نجاح
              </Button>
            </div>

            <div className="preview-row">
              <Button size="sm">صغير</Button>
              <Button>متوسط</Button>
              <Button size="lg">كبير</Button>
              <Button loading>جارٍ الحفظ</Button>
            </div>
          </div>
        </Card>

        {/* Badges & Avatars */}
        <Card className="showcase-section">
          <div className="section-label">
            <div>
              <div className="section-kicker">المحتوى</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                الشارات والصور الشخصية
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect("Badge.tsx", codeSnippets.badge)
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div className="preview-column">
            <div className="preview-row">
              <Badge tone="success">منشور</Badge>
              <Badge tone="warning">بحاجة للمراجعة</Badge>
              <Badge tone="danger">معرض للخطر</Badge>
              <Badge tone="info">قيد التنفيذ</Badge>
              <Badge>مسودة</Badge>
            </div>

            <Divider />

            <div className="preview-row">
              <Avatar initials="NS" size="sm" />
              <Avatar initials="MC" />
              <Avatar initials="OH" size="lg" />

              <div style={{ display: "flex" }}>
                <Avatar initials="NS" size="sm" />
                <Avatar initials="MC" size="sm" />
                <Avatar initials="OH" size="sm" />
              </div>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="showcase-section">
          <div className="section-label">
            <div>
              <div className="section-kicker">الإدخال</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                عناصر النماذج
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect("FormField.tsx", codeSnippets.field)
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div className="preview-column">
            <FormField
              label="اسم مساحة العمل"
              required
              description="اسم مختصر يستطيع أعضاء الفريق تمييزه بسهولة."
            >
              <Input placeholder="مثال: نورث ستار" />
            </FormField>

            <FormField
              label="الخطة"
              error="اختر خطة للمتابعة."
            >
              <Select defaultValue="">
                <option value="" disabled>
                  اختر الخطة
                </option>

                <option value="starter">المبتدئة</option>
                <option value="studio">الاحترافية</option>
              </Select>
            </FormField>

            <FormField label="ملاحظات">
              <Textarea placeholder="أضف بعض التفاصيل..." />
            </FormField>
          </div>
        </Card>

        {/* Controls */}
        <Card className="showcase-section">
          <div className="section-label">
            <div>
              <div className="section-kicker">الاختيار</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                عناصر التحكم
              </h2>
            </div>
          </div>

          <div className="preview-column">
            <Checkbox
              label="أبقني على اطلاع"
              checked={checked}
              onChange={setChecked}
            />

            <Radio
              label="الفوترة الشهرية"
              checked={radio}
              onChange={() => setRadio(true)}
            />

            <Radio
              label="الفوترة السنوية"
              checked={!radio}
              onChange={() => setRadio(false)}
            />

            <Switch
              label="الاقتراحات الذكية"
              checked={toggled}
              onChange={setToggled}
            />
          </div>
        </Card>

        {/* Navigation */}
        <Card className="showcase-section wide">
          <div className="section-label">
            <div>
              <div className="section-kicker">التنقل</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                التبويبات والقوائم والتلميحات
              </h2>
            </div>

            <button
              className="code-button"
              onClick={() =>
                inspect(
                  "Navigation primitives",
                  `<Tabs items={["Overview", "Activity"]} />
<Dropdown label="Filter" items={[...]} />`,
                )
              }
            >
              عرض الكود
              <Icon icon="solar:code-square-linear" size={15} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(220px, 1fr) minmax(200px, .55fr)",
              gap: 18,
              alignItems: "center",
            }}
          >
            <Tabs
              items={["Overview", "Activity", "Settings"]}
              active={tab}
              onChange={setTab}
            />

            <div
              className="preview-row"
              style={{ marginBlockStart: 0 }}
            >
              <Dropdown
                label="تصفية"
                items={["جميع العناصر", "المنشورة", "المسودات"]}
              />

              <Tooltip label="هذه أيقونة Solar Duo">
                <IconButton
                  label="مساعدة"
                  icon="solar:question-circle-bold-duotone"
                />
              </Tooltip>
            </div>
          </div>

          <div
            style={{
              marginBlockStart: 18,
              padding: 14,
              borderRadius: 12,
              color: "var(--text-soft)",
              background: "var(--surface-2)",
              fontSize: 12,
            }}
          >
            يتم عرض حالة تبويب{" "}
            <strong style={{ color: "var(--text)" }}>
              {tabLabels[tab] ?? tab}
            </strong>
            .
          </div>
        </Card>

        {/* Data */}
        <Card className="showcase-section wide">
          <div className="section-label">
            <div>
              <div className="section-kicker">البيانات</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                الجدول والحالة الفارغة
              </h2>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>المكوّن</th>
                  <th>المسؤول</th>
                  <th>نسبة التغطية</th>
                  <th>الحالة</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {[
                  ["Button", "نورا سالم", "98%", "Published"],
                  ["Data table", "مايا تشن", "84%", "In review"],
                  ["Modal", "عمر حداد", "76%", "Draft"],
                ].map(([component, owner, coverage, status]) => (
                  <tr key={component}>
                    <td
                      style={{
                        color: "var(--text)",
                        fontWeight: 750,
                      }}
                    >
                      {component === "Button"
                        ? "الأزرار"
                        : component === "Data table"
                          ? "جدول البيانات"
                          : "النافذة المنبثقة"}
                    </td>

                    <td>
                      <div className="order-cell">
                        <Avatar
                          initials={owner
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                          size="sm"
                        />

                        {owner}
                      </div>
                    </td>

                    <td>{coverage}</td>

                    <td>
                      <Badge
                        tone={
                          status === "Published"
                            ? "success"
                            : status === "Draft"
                              ? "neutral"
                              : "warning"
                        }
                      >
                        {status === "Published"
                          ? "منشور"
                          : status === "Draft"
                            ? "مسودة"
                            : "قيد المراجعة"}
                      </Badge>
                    </td>

                    <td>
                      <IconButton
                        label={`إجراءات إضافية لـ ${component}`}
                        icon="solar:menu-dots-bold"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBlockStart: 22 }}>
            <EmptyState
              title="لا توجد مكونات مؤرشفة"
              description="عند إيقاف استخدام أحد المكونات، سيظهر هنا للرجوع إليه."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon="solar:archive-linear"
                >
                  عرض الأرشيف
                </Button>
              }
            />
          </div>
        </Card>

        {/* Modal */}
        <Card className="showcase-section third">
          <div className="section-label">
            <div>
              <div className="section-kicker">التغذية الراجعة</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                النافذة المنبثقة
              </h2>
            </div>
          </div>

          <p
            className="page-description"
            style={{ margin: 0 }}
          >
            استخدمها للقرارات المركزة التي تحتاج إلى مسار واضح للمتابعة.
          </p>

          <div className="preview-row">
            <Button
              variant="outline"
              onClick={() => setModalOpen(true)}
            >
              فتح النافذة
            </Button>
          </div>
        </Card>

        {/* Drawer */}
        <Card className="showcase-section third">
          <div className="section-label">
            <div>
              <div className="section-kicker">التغذية الراجعة</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                اللوحة الجانبية
              </h2>
            </div>
          </div>

          <p
            className="page-description"
            style={{ margin: 0 }}
          >
            حافظ على السياق ظاهرًا عندما يمكن تنفيذ المهمة بجانب الصفحة.
          </p>

          <div className="preview-row">
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(true)}
            >
              فتح اللوحة
            </Button>
          </div>
        </Card>

        {/* Toast */}
        <Card className="showcase-section third">
          <div className="section-label">
            <div>
              <div className="section-kicker">التغذية الراجعة</div>

              <h2
                className="section-heading"
                style={{ marginBlockStart: 4 }}
              >
                التنبيهات والتحميل
              </h2>
            </div>
          </div>

          <p
            className="page-description"
            style={{ margin: 0 }}
          >
            تغذية راجعة مختصرة ومفيدة للإجراءات التي تكتمل داخل الصفحة.
          </p>

          <div className="preview-row">
            <Button
              variant="outline"
              onClick={() =>
                pushToast(
                  "تم حفظ التغييرات",
                  "المكوّن الآن محدث بأحدث التغييرات.",
                )
              }
            >
              إظهار التنبيه
            </Button>

            <Spinner />
          </div>
        </Card>
      </div>

      {/* Code Inspector */}
      <CodeInspectorModal
        open={Boolean(code)}
        onClose={() => setCode(null)}
        title={code?.title ?? "الكود"}
        code={code?.content ?? ""}
      />

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="نشر المكوّن"
      >
        <p
          style={{
            margin: 0,
            color: "var(--text-soft)",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          أنت على وشك نشر{" "}
          <strong style={{ color: "var(--text)" }}>
            Button / v2.4
          </strong>{" "}
          إلى مكتبة الفريق. سيحافظ هذا الإجراء على واجهة API الحالية
          وخصائص الألوان والتصميم الحالية.
        </p>

        <div
          className="preview-row"
          style={{ justifyContent: "flex-end" }}
        >
          <Button
            variant="ghost"
            onClick={() => setModalOpen(false)}
          >
            إلغاء
          </Button>

          <Button
            onClick={() => {
              setModalOpen(false);

              pushToast(
                "تم نشر المكوّن",
                "أصبح Button / v2.4 متاحًا في مكتبة الفريق.",
              );
            }}
          >
            نشر
          </Button>
        </div>
      </Modal>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="تفاصيل المكوّن"
      >
        <div className="preview-column">
          <Badge tone="success">منشور</Badge>

          <h3
            style={{
              margin: 0,
              fontSize: 23,
              letterSpacing: "-.04em",
            }}
          >
            Button / v2.4
          </h3>

          <p
            className="page-description"
            style={{ margin: 0 }}
          >
            مكوّن إجراءات متوازن يوفر تسلسلًا بصريًا واضحًا، ودعمًا
            للتركيز باستخدام لوحة المفاتيح، وحالة تحميل واضحة.
          </p>

          <Divider />

          <FormField label="المسؤول">
            <Input
              value="نورا سالم"
              readOnly
            />
          </FormField>

          <FormField label="ملاحظات الإصدار">
            <Textarea
              value="تمت إضافة نمط النجاح وتحسين المسافات بين الأيقونات."
              readOnly
            />
          </FormField>

          <Button
            className="btn-block"
            onClick={() => {
              setDrawerOpen(false);

              pushToast(
                "تم طلب المراجعة",
                "تم إعلام أعضاء الفريق بطلب المراجعة.",
                "info",
              );
            }}
          >
            طلب المراجعة
          </Button>
        </div>
      </Drawer>

      <ToastStack
        items={notifications}
        onDismiss={(id) =>
          setNotifications((current) =>
            current.filter((item) => item.id !== id),
          )
        }
      />
    </main>
  );
}