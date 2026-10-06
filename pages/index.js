import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe By UXplorers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <main style={{ minHeight: '100vh', background: '#0b0c15', color: '#e8e8f0', fontFamily: "'Orbitron', system-ui, sans-serif", padding: '1rem' }}>
        <h1 style={{ fontSize: 'clamp(1.4rem,5vw,2.2rem)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>
          Tic Tac Toe <span style={{ color: '#00f0ff', textShadow: '0 0 20px #00f0ff' }}>By UXplorers</span>
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '0.15em' }}>
          Multiplayer · Leaderboard · Tournaments · <span style={{ color: '#00f0ff' }}>● 42 online</span>
        </p>
        <p id="join-toast" style={{ textAlign: 'center', fontSize: '0.7rem', color: '#ff00aa', minHeight: '1.2rem', letterSpacing: '0.05em' }}></p>
        <div id="game-root" style={{ marginTop: '2rem' }}>
          <iframe src="/game.html" style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '16px' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="/login" style={{ padding: '0.7rem 2rem', borderRadius: '50px', background: '#fff', color: '#0b0c15', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.1em' }}>Login / Sign Up</a>
        </div>
      </main>
    </>
  );
}
