# NEXWORKTECH — Website + Team Work Panel

Next.js 16 + MongoDB (Mongoose) + Cloudinary (images) + GitHub (commits).

## 1. Setup

```bash
npm install
cp .env.example .env.local     # phir .env.local mein apni keys bharein
npm run dev                    # http://localhost:3000
```

`.env.local` mein ye 6 cheezein chahiye:

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
* Dashboard mein "5. Password & Security" tab se password badlein.
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

## 5. Images (Cloudinary)

Gallery aur owner photo upload karne par file seedhe Cloudinary par jaati hai, DB mein sirf URL save hota hai (URL paste karne ka option bhi hai).

## 6. Deploy (Vercel)

Repo push karein, Vercel mein upar wali saari env variables daalein, deploy. MongoDB Atlas mein Network Access me `0.0.0.0/0` allow karein (Vercel ke liye).

## Database collections

`users`, `projects`, `tasks`, `updates`, `commits`, `galleryitems`, `reviews`, `enquiries`, `settings`.
