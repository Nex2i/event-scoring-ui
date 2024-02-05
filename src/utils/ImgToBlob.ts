async function ImgUrlToBlob(url: string): Promise<Blob | void> {
  const options = {
    referrerPolicy: 'no-referrer',
  } as RequestInit;

  const response = await fetch(url, options)
    .then((data) => data.blob())
    .catch((err) => {
      console.error(err);
    });
  return response;
}

export { ImgUrlToBlob };
