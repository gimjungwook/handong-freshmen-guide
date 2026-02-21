"use client";

const NOTEBOOK_URL =
  "https://notebooklm.google.com/notebook/bb775ea3-7895-453b-a664-a3c0371982cd";

export default function ChatButton() {
  return (
    <a
      href={NOTEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3
                 bg-[var(--primary)] text-white rounded-full shadow-lg
                 hover:opacity-90 transition-opacity text-sm font-medium"
      title="AI에게 질문하기"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0M3.75 20.25V4.125C3.75 3.504 4.254 3 4.875 3h14.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H7.5L3.75 20.25z"
        />
      </svg>
      <span className="hidden sm:inline">AI에게 질문하기</span>
    </a>
  );
}
