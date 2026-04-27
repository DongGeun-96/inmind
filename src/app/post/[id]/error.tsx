'use client';

export default function PostError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div style={{ padding: 32, fontFamily: 'monospace', fontSize: 14 }}>
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>POST_ERROR_DEBUG</h1>
      <p><b>name:</b> {error.name}</p>
      <p><b>message:</b> {error.message}</p>
      <p><b>digest:</b> {error.digest || '(none)'}</p>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f5f5f5', padding: 12, marginTop: 12 }}>{error.stack}</pre>
    </div>
  );
}
