# CONTEXT — hit-shuffle (วงล้อเพลงฮิต)

หน้าเว็บไฟล์เดียวสำหรับสุ่มเพลงฮิตประจำเดือน พร้อมลิงก์ YouTube / Spotify — ไม่มี build step, ไม่มี dependency รันไทม์

## Glossary

| คำ | ความหมายในโปรเจกต์นี้ |
|---|---|
| **SONGS** | อาร์เรย์ข้อมูลเพลงใน `index.html` — ต้นทางความจริงเดียวของชุดเพลง (`{t, a, ym, g}`) |
| `t` / `a` | ชื่อเพลง / ชื่อศิลปิน |
| `ym` | เดือนประจำเพลง รูปแบบ `YYYY-MM` (ชุด seed คือ 2024-01 ถึง 2025-12) |
| `g` | แนวเพลง (`thai`, `intl`, `kpop`, `latin`) — เพิ่มค่าใหม่ได้ CI จะเตือนเป็น warning |
| **วงล้อ (deck)** | กองสุ่มของเดือนที่เลือก — สุ่มไม่ซ้ำจนครบเดือนแล้วค่อยเริ่มรอบใหม่ |
| **บัตรผลลัพธ์ (result card)** | การ์ดแสดงเพลงที่สุ่มได้ พร้อมปุ่ม YouTube / Spotify / คัดลอกลิงก์ |
| **ลิงก์ค้นหา** | ลิงก์ผลลัพธ์เป็นลิงก์ค้นหาของแพลตฟอร์ม ไม่ใช่ลิงก์ตรงรายเพลง (ข้อจำกัดที่รับไว้ตอนส่งมอบ) |

## การรันและตรวจ

- เปิดหน้าเว็บ: เปิด `index.html` ตรง ๆ ได้เลย (ไม่ต้อง build / serve)
- ตรวจชุดข้อมูล: `node scripts/validate.mjs` — เช็กครบ 24 เดือน, ฟิลด์ครบ, `ym` ถูกรูปแบบ, ไม่มีรายการซ้ำ
- CI/CD: `.github/workflows/ci.yml` — validate ทุก push/PR, deploy ขึ้น GitHub Pages เมื่อลง main, จับภาพหน้าจอ desktop/mobile เป็น artifact (ดู ADR-0003)

## Decision register

| ADR | การตัดสินใจ | สถานะ |
|---|---|---|
| [0001](docs/adr/0001-hosting-github-pages.md) | โฮสต์บน GitHub Pages จาก repo public `hit-shuffle` ใช้ URL ค่าเริ่ม | accepted 2026-09-28 |
| [0002](docs/adr/0002-platform-ownership.md) | จ้าง DevOps/Platform Engineer เป็นเจ้าของ deploy/CI-CD | accepted 2026-09-28 |
| [0003](docs/adr/0003-release-model.md) | merge = deploy; งานภาพให้ Vela ตรว, งาน QA ให้ Ash ตรว ก่อน merge | accepted 2026-09-28 |
