import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const weekData = [
  { day: 'Mon', messages: 34 }, { day: 'Tue', messages: 52 },
  { day: 'Wed', messages: 41 }, { day: 'Thu', messages: 67 },
  { day: 'Fri', messages: 89 }, { day: 'Sat', messages: 43 },
  { day: 'Sun', messages: 21 },
];

const responseTime = [
  { time: '9AM', sec: 2.1 }, { time: '10AM', sec: 1.8 },
  { time: '11AM', sec: 1.4 }, { time: '12PM', sec: 1.9 },
  { time: '1PM', sec: 2.3 }, { time: '2PM', sec: 1.6 },
  { time: '3PM', sec: 1.2 }, { time: '4PM', sec: 1.4 },
];

const Card = ({ children, title, sub }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'Syne', fontSize: 13.5, fontWeight: 600 }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>}
    </div>
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

export default function AnalyticsPage({ data }) {
  const sent      = data.filter(c => c.status === 'sent').length;
  const failed    = data.filter(c => c.status === 'failed').length;
  const pending   = data.filter(c => c.status === 'pending').length;
  const escalated = data.filter(c => c.status === 'escalated').length;

  const pieData = [
    { name: 'Replied',   value: sent,      color: '#25D366' },
    { name: 'Failed',    value: failed,    color: '#ef4444' },
    { name: 'Pending',   value: pending,   color: '#f59e0b' },
    { name: 'Escalated', value: escalated, color: '#6366f1' },
  ];

  const topTopics = Object.entries(
    data.reduce((acc, c) => { acc[c.topic] = (acc[c.topic] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Analytics</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Performance aur trends</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <Card title="Weekly Messages" sub="This week's traffic">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9e9e98' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9e9e98' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="messages" fill="#25D366" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Status Breakdown" sub="Conversation outcomes">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {pieData.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card title="Avg Response Time" sub="Groq latency throughout the day">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={responseTime}>
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9e9e98' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9e9e98' }} axisLine={false} tickLine={false} unit="s" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="sec" stroke="#25D366" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Top Topics" sub="Most frequently asked topics">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topTopics.map(([topic, count], i) => {
              const max = topTopics[0][1];
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-2)', textTransform: 'capitalize' }}>{topic}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(count / max) * 100}%`, background: 'var(--accent)', borderRadius: 4, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
