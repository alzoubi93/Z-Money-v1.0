# Z.Money v0.7 — Android / APK

## المتطلبات
- Node.js 20+
- Java 17
- Android Studio + Android SDK
- Android SDK Platform 35
- Gradle (يأتي مع مشروع Android)

## التثبيت
npm install

## إضافة مشروع Android لأول مرة
npx cap add android

## بناء نسخة الويب ثم مزامنتها
npm run build
npx cap sync android

## فتح Android Studio
npx cap open android

ثم من Android Studio:
Build → Generate App Bundles or APKs → Generate APK(s)

## التخزين
- Web: LocalStorage للاختبار.
- Android: SQLite عبر @capacitor-community/sqlite.

## ملاحظة
ملف `android/` غير مولد داخل هذه الحزمة لأن توليده يعتمد على بيئة Android SDK/Gradle المحلية. بعد `npm install` نفذ `npx cap add android` ثم `npx cap sync android`.
