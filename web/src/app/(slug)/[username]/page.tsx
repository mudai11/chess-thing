interface pageProps {
  params: {
    username: string;
  };
}

export default async function Profile({ params: { username } }: pageProps) {
  return (
    <main className="flex flex-col items-center justify-center">
      {username.slice(3)}
    </main>
  );
}
