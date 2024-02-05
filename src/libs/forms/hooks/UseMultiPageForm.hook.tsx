import { ReactElement, useState } from 'react';

export type MultiPageForm = {
  label: string;
  page: ReactElement;
};

export type PageItem = {
  label: string;
  isValid: boolean;
  isTouched: boolean;
};

export function useMultiPageForm(pages: MultiPageForm[]) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageIsValid, setPageIsValid] = useState<Record<number, boolean>>(
    pages.reduce((acc, _curr, index) => ({ ...acc, [index]: false }), {})
  );
  const [pageIsTouched, setPageIsTouched] = useState<Record<number, boolean>>(
    pages.reduce((acc, _curr, index) => ({ ...acc, [index]: false }), {})
  );

  function nextPage() {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  }

  function goToPage(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIndex !== currentPageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  }

  function markPageValidity(isValid: boolean, pageIndex: number = currentPageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIsValid[pageIndex] !== isValid) {
      setPageIsValid((prev) => ({ ...prev, [pageIndex]: isValid }));
    }
  }

  function markPageAsTouched(pageIndex: number = currentPageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length && !pageIsTouched[pageIndex]) {
      setPageIsTouched((prev) => ({ ...prev, [pageIndex]: true }));
    }
  }

  function getPageItems(): PageItem[] {
    return pages.map((page, index) => ({
      label: page.label,
      isValid: pageIsValid[index],
      isTouched: pageIsTouched[index],
    }));
  }

  return {
    isFirstPage: currentPageIndex === 0,
    isLastPage: currentPageIndex === pages.length - 1,
    currentPage: pages[currentPageIndex].page,
    currentPageIndex,
    isCurrentPageValid: pageIsValid[currentPageIndex],
    isCurrentPageTouched: pageIsTouched[currentPageIndex],
    nextPage,
    prevPage,
    goToPage,
    getPageItems,
    markPageValidity,
    markPageAsTouched,
  };
}
