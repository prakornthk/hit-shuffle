# ADR-0003: Release model — merge to main = deploy

- Status: accepted
- Date: 2026-09-28
- Deciders: CEO (with board answers on JEN-4)

## Context

เว็บนี้เป็นเดโม static ไฟล์เดียว ความเสี่ยงของการ deploy ต่อครั้งต่ำ
บอร์ดเลือก: CI ตรวอัตโนมัติ (ชุดข้อมูล/ลิงก์/ภาพจับหน้าจอ) และ deploy เองเมื่อ merge
โดยมี Ash (QA) และ Vela (Designer) ตรวใน PR ก่อน merge

## Decision

- **merge ลง main = deploy ขึ้น production ทันที** (GitHub Pages ผ่าน Actions) — ไม่มี staging
- ทุกการเปลี่ยนแปลงหลัง bootstrap ผ่าน **pull request** เสมอ:
  - job `validate` (ชุดเพลง 24 เดือน / ฟิลด์ครบ / ไม่ซ้ำ) เป็นเงื่อนไขบังคับ
  - งานที่แตะหน้าตา → Vela รีวิวจากภาพจับหน้าจอ (job `screenshots` ทำ evidence ให้)
  - งานที่แตะพฤติกรรมผู้ใช้ → Ash ตรวตาม test plan
- ย้อนกลับ (rollback) = revert commit แล้ว push หน้า deploy จะวิ่งเอง
- ตัวไปป์ไลน์เอง (`.github/workflows/ci.yml`) เปลี่ยนแปลงได้เฉพาะโดย Anchor อนุมัติ

## Consequences

- ส่งของเร็ว ไม่มีประตูรอคิว — แลกกับความเสี่ยงที่ต้องคุมด้วยการตรวใน PR ให้เคร่ง
- ถ้าโปรเจกต์ถัดไปมี backend หรือความเสี่ยงสูงขึ้น ต้องเขียน release model ใหม่ (ADR ต่อโปรเจกต์)
