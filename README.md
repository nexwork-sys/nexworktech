# NEXWORKTECH — Website + Admin + Team Panel

Next.js 16 + MongoDB (Mongoose) + Cloudinary (images) + GitHub (commits). Sab kuch Vercel par deploy hota hai.

## 1. Setup

```bash
npm install
cp .env.example .env.local     # phir .env.local mein apni keys bharein
npm run dev                    # http://localhost:3000
```

`.env.local` mein ye cheezein chahiye (`.env.example` dekhein):

| Key | Kahan se |
|---|---|
| `MONGODB_URI` | MongoDB Atlas -> Connect -> Drivers (database name last mein, jaise `/nexworktech`) |
| `JWT_SECRET` | koi bhi 32+ character random text |
| `ADMIN_RESET_KEY` | aapki apni secret key — admin password bhool jaane par reset ke liye |
| `CLOUDINARY_*` | Cloudinary dashboard -> API Keys |
| `GITHUB_TOKEN` | (sirf private repo ke liye) GitHub -> Settings -> Developer settings -> Fine-grained token, repo ka "Contents: read" |
| `GITHUB_WEBHOOK_SECRET` | koi bhi random text (neeche webhook step mein wahi daalna hai) |

## 2. Admin login

* Pehli baar: **password `12345`** (username `admin` fixed hai, website ke Admin Login mein sirf password poochta hai).
* Dashboard mein "7. Password & Security" tab se password badlein.
* Password bhool gaye: Admin Login -> **"Password bhool gaye?"** -> `ADMIN_RESET_KEY` + naya password.
* Password badalne par baaki sab devices automatic logout ho jaate hain.

## 3. Team Panel (`/team`)

Admin dashboard ke upar **"Team Panel"** button hai, ya seedha `/team` kholein (admin aur employees dono yahin login karte hain).

**Admin kar sakta hai**
1. *Employees* tab: employee banao (username + temporary password + GitHub username). Password reset / deactivate / delete.
2. *Projects* tab: project banao, GitHub repo jodo, team members chuno (admin khud bhi member ban sakta hai).
3. Project ke andar: tasks banao aur kisi ko (admin ko bhi) assign karo, deadline/priority do.
4. *Overview*: kaun kitne tasks complete kar chuka, last 7 din mein kitne commits, last active kab.

**Employee dekhta hai**
* *My Work*: apne tasks, status badalna (To Do / In Progress / In Review / Done).
* *My Projects*: sirf jin projects mein add hai; progress, team ka kaam, commits, daily updates.
* Daily update likh sakta hai ("aaj kya kiya / kahan atka hu").

Har project mein: progress %, har member ka tasks + commits, GitHub commit feed, aur activity log (kisne kaunsa task kis status mein daala). Page 20 second mein khud refresh hota hai.

## 4. GitHub / VS Code tracking

Employees VS Code mein kaam karte hain aur code GitHub par push karte hain — panel **GitHub commits** se dikhata hai kaun kitna kaam kar raha hai. (VS Code ke andar ki live typing nahi dikhti; jaise hi commit/push hota hai, wo dikh jaata hai.)

Setup:
1. Employee ka **GitHub username** Employees tab mein daalein (isse commits sahi bande se match hote hain).
2. Project mein repo daalein (`owner/repo`).
3. Instant updates ke liye webhook: GitHub repo -> Settings -> Webhooks -> Add webhook
   * Payload URL: `https://YOUR-DOMAIN/api/github/webhook`
   * Content type: `application/json`
   * Secret: wahi jo `GITHUB_WEBHOOK_SECRET` mein hai
   * Events: *Just the push event*
4. Webhook na lagao toh bhi project page par **Sync GitHub** button se latest commits aa jaate hain.

Tip: sab employees ek hi repo mein alag branches par kaam karein, ya team ke liye ek org repo use karein.

## 5. Admin Dashboard tabs (website par jo dikhta hai sab yahin se)

| Tab | Kya karta hai |
|---|---|
| 1. Client Enquiries | Website ke enquiry form ke messages |
| 2. Services & Showcase | **AI Automation / AIoT** cards ka text + features edit/add/delete. Neeche **Showcase** photos (AI Automation ya AIoT category) — ye Services section ke andar filter ke saath dikhte hain |
| 3. Projects | "Our Projects": image(s) upload/URL + project link + description + highlights. UI par wahi dikhta hai |
| 4. Reviews | Jo review aap "Select to Show" karoge **sirf wahi** website par dikhega (koi limit nahi) |
| 5. Owner & Social Links | Owner photo/bio/contact + LinkedIn, Instagram, Facebook, WhatsApp, YouTube links. Link daalte hi icon owner drawer, founder card aur footer mein aa jaata hai |
| 6. Remote Work | Neeche section 6 dekhein |
| 7. Password & Security | Password badlein |

Images (Cloudinary): file upload karne par seedhe Cloudinary par jaati hai, DB mein sirf URL save hota hai (URL paste karne ka option bhi hai).

## 6. Remote Work

Website par navbar mein **Remote Work** (ya Remote Work section ka button) dabate hi popup puchta hai: *"Mujhe kaam dena hai"* ya *"Mujhe kaam chahiye"*.

* **Kaam dena hai** → visitor naam, contact, kaam ki detail, budget bhejta hai → Admin > Remote Work > *Logon ka kaam*.
* **Kaam chahiye** → visitor admin ke post kiye hue kaam dekhta hai (**rate + description + skills**) → "Mujhe interest hai" → apni detail (naam, contact, skills, link, message) bhejta hai → Admin > Remote Work > *Interested log*.
* Admin > Remote Work > *Meri taraf se kaam*: naya kaam post karo (title, description, rate, fixed/hourly/monthly, skills). Open/Closed karne se UI se hide/show.

## 7. Smart Home demo

* `public/demo/smart-home.html` — static interactive demo (website par "Test Right Here" iframe isi ko kholta hai). Alag server / Render ki zaroorat nahi, Vercel par hi chalta hai.

## 8. Team chat + kaam submit

* `/team` mein **Chat** tab: admin har employee se alag thread mein baat karta hai (unread count dikhta hai); employee ko **Chat with Admin** milta hai. Har 4 sec mein refresh.
* Admin Projects mein task banakar employee ko assign karta hai. Employee **My Work** mein **Submit Work** (note + link) karta hai → task "In Review" → admin **Approve** (Done) ya **Changes chahiye** (feedback ke saath wapas In Progress).

## 9. Deploy (Vercel)

Repo push karein, Vercel mein upar wali saari env variables daalein, deploy. MongoDB Atlas mein Network Access me `0.0.0.0/0` allow karein (Vercel ke liye).

## Database collections

`users`, `projects`, `tasks`, `updates`, `commits`, `messages`, `galleryitems`, `services`, `portfolioprojects`, `reviews`, `enquiries`, `remotejobs`, `workrequests`, `jobapplications`, `settings`.
