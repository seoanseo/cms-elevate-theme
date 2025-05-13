import { useState, useEffect } from 'react';

/**
 * Hook to retrieve the document language attribute from the HTML element
 * Falls back to undefined when no language is set or when running on server
 *
 * Must be used in an island or client component
 */
export const useDocumentLang = (): string | undefined => {
  const [documentLang, setDocumentLang] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Set document language when component mounts in the browser
    if (typeof document !== 'undefined') {
      setDocumentLang(document.documentElement.lang || undefined);
    }
  }, []);

  return documentLang;
};

export default useDocumentLang;
