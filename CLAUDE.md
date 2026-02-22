# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

한동대학교 신입생 수강신청 가이드 — Next.js 기반 다국어 정적 사이트 (8개 언어 × 8개 페이지 = 64페이지).

## Commands

- `npm run dev` — 개발 서버
- `npm run build` — 정적 빌드 (`output: "export"`, `/out` 생성)
- `npm run lint` — ESLint

## Architecture

**라우팅:** `src/app/[lang]/[slug]/page.tsx` — 동적 언어+슬러그 라우팅. 루트 `page.tsx`는 `localStorage`의 `preferred-lang`을 읽어 리다이렉트만 수행.

**콘텐츠:** `content/{lang}/{slug}.md` — 각 언어별 마크다운 파일. `gray-matter`로 프론트매터 파싱 후 `unified` 파이프라인(remark→rehype)으로 HTML 변환.

**핵심 라이브러리:** `src/lib/markdown.ts`에서 Wiki Link 변환(`[[제목]]` → 내부 링크), Mermaid 코드블록 Base64 인코딩, 시간 범위 틸데 이스케이프(`~` → `\~`) 처리.

**상수:** `src/lib/constants.ts` — `LANGUAGES`(8개), `SLUGS`(8개), `NAV_ITEMS`(언어별 네비게이션 라벨/아이콘) 정의. 새 언어나 페이지 추가 시 여기부터 수정.

**레이아웃:** Notion 스타일 UI. 좌측 고정 사이드바(`Navbar.tsx`) + 우측 TOC(`Sidebar.tsx`, xl 이상만). CSS 변수 기반 테마(`globals.css`), 다크모드 지원(`next-themes`).

## Key Patterns

- **새 언어 추가:** `constants.ts`에 언어 코드 추가 → `content/{lang}/` 디렉토리에 8개 마크다운 파일 생성 → `NAV_ITEMS`에 해당 언어 네비게이션 추가 → `Disclaimer.tsx`에 면책 문구 추가
- **새 페이지 추가:** `SLUGS`에 슬러그 추가 → 모든 8개 언어 디렉토리에 마크다운 파일 생성 → `NAV_ITEMS` 전체 언어에 항목 추가
- **Wiki Link:** `markdown.ts`의 `WIKI_LINK_MAP`에 매핑 추가 필요
- **정적 내보내기:** `next.config.ts`에 `output: "export"` 설정. 이미지 최적화 비활성화됨.
- **경로 별칭:** `@/*` → `./src/*`
