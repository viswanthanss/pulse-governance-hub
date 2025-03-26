
export const downloadDocument = (documentId: string, title: string) => {
  // In a real application, this would make a request to your backend API
  // to fetch the document and initiate a download.
  console.log(`Downloading document: ${title} (ID: ${documentId})`);
  
  // Simulate download delay
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log(`Download complete for: ${title}`);
      resolve(true);
    }, 1500);
  });
};
