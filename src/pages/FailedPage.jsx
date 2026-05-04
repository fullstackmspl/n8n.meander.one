import ConversationTable from '../components/ConversationTable';

export default function FailedPage({ data }) {
  const failed = data.filter(c => c.status === 'failed');
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Failed Messages</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>
          <span style={{ color: '#dc2626', fontWeight: 600 }}>{failed.length} messages</span>  messages failed to deliver — handle these manually
        </div>
      </div>
      {failed.length === 0 ? (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '48px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}></div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>No failed messages!</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>Everything is running smoothly</div>
        </div>
      ) : (
        <ConversationTable data={failed} onRowClick={() => {}} search="" />
      )}
    </div>
  );
}