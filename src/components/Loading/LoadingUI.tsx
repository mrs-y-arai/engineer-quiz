export function LoadingUI() {
  return (
    <>
      <div
        className="bg-light-gray/70 fixed left-0 top-0 z-loading flex h-screen w-screen items-center justify-center"
        aria-label="読み込み中"
      >
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </>
  );
}
