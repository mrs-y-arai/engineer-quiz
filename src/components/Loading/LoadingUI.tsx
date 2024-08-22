export function LoadingUI() {
  return (
    <>
      <div
        className="bg-light-gray/70 z-loading fixed left-0 top-0 flex h-screen w-screen items-center justify-center"
        aria-label="読み込み中"
      >
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </>
  );
}
