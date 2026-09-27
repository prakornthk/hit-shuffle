# ADR-0001: Hosting on GitHub Pages from a public repo, default URL

- Status: accepted
- Date: 2026-09-28
- Deciders: CEO (with board answers on JEN-4)

## Context

`hit-shuffle` เป็น static site ไฟล์เดียว (index.html) ไม่มี backend ไม่มีความลับในโค้ด
ก่อนหน้านี้ไฟล์อยู่แค่ใน workspace ท้องถิ่น ไม่มี git repo ซึ่งเป็น prerequisite ของ CI/CD
บอร์ดเลือกผ่านการ์ดคำถาม (JEN-4): โฮสต์ = GitHub Pages, repo = public, โดเมน = URL ค่าเริ่ม

## Decision

- โฮสต์บน **GitHub Pages** deploy ด้วย GitHub Actions (`actions/deploy-pages`)
- ซอร์สคอนโทรล: repo **public** ชื่อ `hit-shuffle` ใต้บัญชี GitHub ของเจ้าของบริษัท เป็น source of truth
- ใช้ **URL ค่าเริ่ม** `https://<owner>.github.io/hit-shuffle/` ยังไม่ผูก custom domain

## Consequences

- ฟรี ไม่มีค่าใช้จ่ายโฮสต์/CI ในโวลุ่มปัจจุบัน
- โค้ดเดโมเป็นสาธารณะ — ห้ามมี secret/ข้อมูลส่วนตัวเข้า repo เด็ดขาด (ดู safety rules ของแต่ละ agent)
- custom domain / private repo เป็นการตัดสินใจครั้งใหม่ ต้องมี ADR ใหม่ถ้าจะเปลี่ยน
