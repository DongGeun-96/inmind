interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return (
    <div style={{ padding: 32, fontFamily: 'monospace' }}>
      <h1>POST_DEBUG_MIN</h1>
      <p>id: {id}</p>
    </div>
  );
}
