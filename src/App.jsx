import React, { useMemo, useState } from 'react'

const tabs = [
  { key: 'input', label: 'Input' },
  { key: 'research', label: 'Research' },
  { key: 'generate', label: 'Generate' },
  { key: 'output', label: 'Output' },
]

export default function App() {
  const [active, setActive] = useState('input')
  const [sources, setSources] = useState({ url: '', raw: '' })
  const [contentType, setContentType] = useState('banhang')
  const [outline, setOutline] = useState('')
  const [result, setResult] = useState('')

  const generated = useMemo(() => {
    if (!outline) return ''
    return [
      `🎯 Dạng bài: ${mapType(contentType)}`,
      '',
      `#TravelWithABTRIP`,
      '',
      '---',
      outline
        .split('\n')
        .map((l, i) => `${i + 1}. ${l.trim()}`)
        .join('\n'),
    ].join('\n')
  }, [outline, contentType])

  return (
    <div className="container">
      <header className="topbar">
        <h1>ABTRIP Marketing Tool</h1>
        <p className="sub">Gen Z mode: on. Đẩy content lên net lẹ 💨</p>
      </header>

      <nav className="tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={\`tab \${active === t.key ? 'active' : ''}\`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="panel">
        {active === 'input' && (
          <section className="card">
            <h2>Input nguồn</h2>
            <label>Link nguồn (YouTube/TikTok/Facebook…)</label>
            <input
              placeholder="https://…"
              value={sources.url}
              onChange={e => setSources(s => ({ ...s, url: e.target.value }))}
            />
            <label>Hoặc dán nội dung gốc</label>
            <textarea
              rows={8}
              placeholder="Dán transcript/bài viết tại đây…"
              value={sources.raw}
              onChange={e => setSources(s => ({ ...s, raw: e.target.value }))}
            />
            <div className="grid2">
              <div>
                <label>Loại content</label>
                <select value={contentType} onChange={e => setContentType(e.target.value)}>
                  <option value="banhang">Bài bán hàng</option>
                  <option value="story">Kể chuyện</option>
                  <option value="share">Chia sẻ kiến thức</option>
                  <option value="viral">Bắt trend/viral</option>
                  <option value="faq">Hỏi - đáp (FAQ)</option>
                </select>
              </div>
              <div>
                <label>Action</label>
                <button
                  className="btn"
                  onClick={() => alert('Demo: parse nguồn/ trích keywords/ summary.\n(Tích hợp AI sau)')}
                >
                  Phân tích nguồn (demo)
                </button>
              </div>
            </div>
          </section>
        )}
        {active === 'research' && (
          <section className="card">
            <h2>Research & Outline</h2>
            <p className="hint">Viết dàn ý bullet. Tool sẽ biến thành bài viết ở tab Generate.</p>
            <textarea
              rows={12}
              value={outline}
              onChange={e => setOutline(e.target.value)}
            />
          </section>
        )}
        {active === 'generate' && (
          <section className="card">
            <h2>Generate</h2>
            <textarea rows={14} readOnly value={generated} />
            <button className="btn" onClick={() => { setResult(generated); setActive('output') }}>Đưa sang Output</button>
          </section>
        )}
        {active === 'output' && (
          <section className="card">
            <h2>Output</h2>
            <textarea rows={14} value={result} onChange={e => setResult(e.target.value)} />
            <button className="btn" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
          </section>
        )}
      </main>

      <footer className="foot">© ABTRIP • #TravelWithABTRIP</footer>
    </div>
  )
}

function mapType(v) {
  return {
    banhang: 'Bài bán hàng',
    story: 'Kể chuyện',
    share: 'Chia sẻ kiến thức',
    viral: 'Bắt trend/viral',
    faq: 'Hỏi - đáp (FAQ)',
  }[v] || v
}