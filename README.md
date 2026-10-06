# Youssef El-Badry — Video Editor Portfolio
# بورتفوليو يوسف البدري — محرر فيديو وسرد بصري

A modern, high-end editorial portfolio built for **Youssef El-Badry (يوسف البدري)**, Lead Video Editor for prominent Islamic institutes (**Bilqalam**, **IslamRoots**, **Quran Grace**).

---

## ✨ Features / المميزات

1. **Dual Language (Arabic & English) / ثنائي اللغة:**
   - Seamless toggle between Arabic (عربي) and English (EN).
   - Full native RTL (Right-to-Left) support with Arabic typography (`Cairo`).
2. **Dual Theme / المظهر الداكن والفاتح:**
   - Cinematic Obsidian Dark Mode & Crisp Gallery Light Mode with instant toggle.
3. **Institutional Social Proof / شركاء النجاح:**
   - Dedicated showcase highlighting Youssef's role as the Lead Social Platform Editor for:
     - **Bilqalam (بالقلم)**
     - **IslamRoots (جذور الإسلام)**
     - **Quran Grace (نعمة القرآن)**
4. **Interactive Before/After Slider / مقارنة الألوان والصوت:**
   - Interactive split slider demonstrating the transformation from **Raw Flat Log Footage** to **Cinematic Color Grade & Mastered Audio**.
5. **Video Showcase with Hover-to-Play & Modal / معرض الفيديوهات التفاعلي:**
   - Category filtering: All, Short-form Reels & Shorts (9:16), YouTube (16:9), Documentaries.
   - Videos automatically play muted on hover.
   - Clicking opens a fullscreen cinematic video player with custom controls (play/pause, timeline scrubber, audio toggle, fullscreen).
6. **Instant Contact & Booking / التواصل المباشر:**
   - Direct WhatsApp chat link (`+201144735499`).
   - One-click copy email button (`youssefalbadry02@gmail.com`).
   - Direct Instagram profile link (`@youssef.elbadry_0`).

---

## 📁 How to Add or Change Videos / كيفية إضافة وتغيير الفيديوهات

You can either use **local video files** or **direct online URLs**:

### 1. Using Local MP4 Files (Free & Fastest):
1. Put your video files (e.g. `my-reel.mp4`) into the `public/videos/` folder.
2. Open `src/data/projectsData.js`.
3. Change the `videoUrl` to:
   ```javascript
   videoUrl: '/videos/my-reel.mp4',
   ```

### 2. Updating Titles, Thumbnails & Metrics:
All project information is centralized in [`src/data/projectsData.js`](file:///d:/Programming/Yussuf/src/data/projectsData.js).
You can adjust:
- `titleAr` & `titleEn`
- `clientAr` & `clientEn`
- `views` (e.g. `2.5M`)
- `duration` (e.g. `0:45` or `12:30`)
- `tagsAr` & `tagsEn`

---

## 🛠️ Development & Running Locally / التشغيل

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Build for production (ready for Vercel, Netlify, or GitHub Pages)
npm run build
```

---

## 🚀 Free Deployment Guide / نشر الموقع مجاناً

You can deploy this portfolio in under 2 minutes on **Vercel** or **Netlify**:
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
3. Import your repository and click **Deploy**.
4. Your portfolio will be live with a free custom SSL domain!
