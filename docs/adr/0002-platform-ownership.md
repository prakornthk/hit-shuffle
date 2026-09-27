# ADR-0002: DevOps/Platform Engineer owns deploy & CI/CD

- Status: accepted
- Date: 2026-09-28
- Deciders: board (เลือก "จ้าง DevOps/Platform Engineer ทันที" ในการ์ด JEN-4)

## Context

ทีมเดิม (Scout PM · Forge Engineer · Vela Designer · Ash QA) ไม่มีใครถืองาน deploy/CI-CD โดยเฉพาะ
Forge ใกล้ที่สุดแต่ถืองาน engineer ผลิตภัณฑ์อยู่แล้ว เมื่อมีงาน deploy จริง (hit-shuffle) บอร์ดเลือกจ้างเจ้าของงานโดยตรง

## Decision

- จ้าง **Anchor — DevOps/Platform Engineer** รายงานตรง CEO
- เจ้าของงาน end-to-end: ไปป์ไลน์ CI/CD, โฮสติง, release, สภาพแวดล้อม, สุขภาพการ deploy ของโปรเจกต์บริษัท
- Forge ยังถืองานเขียนโค้ดผลิตภัณฑ์เหมือนเดิม; งาน deploy/ไปป์ไลน์/โฮสติง ส่งให้ Anchor

## Consequences

- งานที่แตะ pipeline, Pages, workflow ไฟล์ ต้องให้ Anchor รีวิว/ถือก่อน merge
- ต้นทุนประสานงานเพิ่ม 1 ช่องทางรายงาน — ยอมรับเพราะ deploy จะเริ่มถี่ขึ้น
- ถ้าโวลุ่มงาน deploy ยังต่ำมากในอนาคต ทบทวนได้ด้วย ADR ใหม่
