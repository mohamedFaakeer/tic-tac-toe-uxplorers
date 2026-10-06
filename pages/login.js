import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState('login');
  const [msg, setMsg] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockMsg, setLockMsg] = useState('');

  const sanitizeMsg = (msg) => {
    if (!msg) return '';
    return msg.toString().replace(/[<>]/g, '').substring(0, 120);
  };
  const [hoverSocial, setHoverSocial] = useState(null);

  const handleEmail = async () => {
    if (locked) { setMsg('Too many attempts. Try again in 30s.'); return; }
    try {
      if (mode === 'signup') await createUserWithEmailAndPassword(auth, email, pass);
      else await signInWithEmailAndPassword(auth, email, pass);
      setAttempts(0);
      setMsg('Welcome! 🎮');
    } catch (e) {
      const newAtt = attempts + 1;
      setAttempts(newAtt);
      if (newAtt >= 3) { setLocked(true); setMsg('Too many attempts. Try again in 30s.'); setTimeout(() => { setLocked(false); setAttempts(0); setMsg(''); }, 30000); }
      else { setMsg(sanitizeMsg(e.message) || 'Login failed'); }
    }
  };

  const guest = async () => {
    try {
      await signInAnonymously(auth);
      setMsg('Guest mode activated! 🎮');
    } catch (e) { setMsg(sanitizeMsg(e.message) || 'Guest login failed'); }
  };

  const google = async () => await signInWithPopup(auth, new GoogleAuthProvider());
  const github = async () => await signInWithPopup(auth, new GithubAuthProvider());
  const facebook = async () => await signInWithPopup(auth, new FacebookAuthProvider());

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b0c15 0%, #12132a 50%, #1a1033 100%)',
      color: '#e8e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Orbitron', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glowing orbs background */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(255,0,170,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        animation: 'fadeSlideUp 0.7s ease-out'
      }}>
        <style>{`
          @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(0,240,255,0.3); } 50% { box-shadow: 0 0 40px rgba(0,240,255,0.5); } }
        `}</style>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
            background: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(0,240,255,0.4)',
            fontWeight: 700
          }}>
            {mode === 'signup' ? 'Join the Arena' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            {mode === 'signup' ? 'Create your profile and climb the leaderboard.' : 'Sign in to continue your streak and dominate tournaments.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              color: '#e8e8f0',
              fontFamily: "inherit",
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all 0.25s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#00f0ff'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              color: '#e8e8f0',
              fontFamily: "inherit",
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all 0.25s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#00f0ff'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />

          <button
            onClick={handleEmail}
            style={{
              padding: '0.9rem 1.5rem',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
              color: '#0b0c15',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(0,240,255,0.35), 0 4px 15px rgba(255,0,170,0.3)',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px) scale(1.02)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0) scale(1)'}
          >
            {mode === 'signup' ? 'Create Account' : 'Login'}
          </button>

          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ff00aa',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.target.style.color = '#00f0ff'}
            onMouseLeave={e => e.target.style.color = '#ff00aa'}
          >
            {mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>

        <button
          onClick={guest}
          style={{
            width: '100%',
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1.5px solid rgba(255,255,255,0.1)',
            color: '#e8e8f0',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            marginTop: '0.3rem',
            letterSpacing: '0.05em'
          }}
        >
          👤 Play as Guest
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.2rem 0 0.2rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: '0.65rem', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={google}
            onMouseEnter={() => setHoverSocial('google')}
            onMouseLeave={() => setHoverSocial(null)}
            style={{
              padding: '0.7rem 1.4rem',
              borderRadius: '12px',
              background: hoverSocial === 'google' ? '#fff' : 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#e8e8f0',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: hoverSocial === 'google' ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>G</span> Google
          </button>
          <button
            onClick={github}
            onMouseEnter={() => setHoverSocial('github')}
            onMouseLeave={() => setHoverSocial(null)}
            style={{
              padding: '0.7rem 1.4rem',
              borderRadius: '12px',
              background: hoverSocial === 'github' ? '#333' : 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#e8e8f0',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: hoverSocial === 'github' ? '0 0 20px rgba(255,255,255,0.15)' : 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>●</span> GitHub
          </button>
          <button
            onClick={facebook}
            onMouseEnter={() => setHoverSocial('facebook')}
            onMouseLeave={() => setHoverSocial(null)}
            style={{
              padding: '0.7rem 1.4rem',
              borderRadius: '12px',
              background: hoverSocial === 'facebook' ? '#1877f2' : 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: hoverSocial === 'facebook' ? '0 0 20px rgba(24,119,242,0.4)' : 'none'
            }}
          >
            <span style={{ fontSize: '1rem' }}>f</span> Facebook
          </button>
        </div>

        {msg && (
          <div style={{
            marginTop: '0.8rem',
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            background: msg.includes('Success') ? 'rgba(0,240,255,0.1)' : 'rgba(255,0,170,0.1)',
            border: `1px solid ${msg.includes('Success') ? 'rgba(0,240,255,0.3)' : 'rgba(255,0,170,0.3)'}`,
            color: msg.includes('Success') ? '#00f0ff' : '#ff00aa',
            fontSize: '0.75rem',
            textAlign: 'center',
            animation: 'fadeSlideUp 0.3s ease-out',
            letterSpacing: '0.02em'
          }}>
            {msg}
          </div>
        )}

        <a href="/" style={{
          display: 'block',
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#00f0ff',
          textDecoration: 'none',
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          transition: 'color 0.2s ease'
        }} onMouseEnter={e => e.target.style.color = '#ff00aa'} onMouseLeave={e => e.target.style.color = '#00f0ff'}>
          ← Back to Game
        </a>
      </div>
    </main>
  );
}
