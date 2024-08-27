import { CREATED_YEAR } from '~/constants';

export function Footer() {
  const year = new Date().getFullYear();
  const copyRightYear = () => {
    if (year === CREATED_YEAR) return year;

    return `${CREATED_YEAR} - ${year}`;
  };

  return (
    <>
      <footer className="border-t px-5 pb-20 pt-3 text-center">
        <small>&copy; {copyRightYear()} Yuki Arai</small>
      </footer>
    </>
  );
}
