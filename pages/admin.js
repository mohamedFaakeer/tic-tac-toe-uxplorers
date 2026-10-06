import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async u => {
      setUser(u);
      if (u) {
        const adminSnap = await getDoc(doc(db, 'admins', u.uid));
        const allowed = adminSnap.exists() && adminSnap.data().allowed === true;
        setIsAdmin(allowed);
        if (allowed) loadComments();
      } else { setIsAdmin(false); }
    });
    return () => unsub();
  }, []);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const login = async () => {
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (e) { console.error(e); }
  };
  const loginEmail = async () => {
    try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { console.error(e); }
  };

  const loadComments = async () => {
    const snap = await getDocs(collection(db, 'comments'));
    setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const approve = async (id) => {
    await updateDoc(doc(db, 'comments', id), { approved: true });
    loadComments();
  };

  if (!user) {
    return (
      <main style={{ minHeight: '100vh', background: '#0b0c15', color: '#e8e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Admin Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:'0.5rem',borderRadius:'8px',margin:'0.2rem',width:'260px'}} />
        <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} style={{padding:'0.5rem',borderRadius:'8px',margin:'0.2rem',width:'260px'}} />
        <button onClick={loginEmail} style={{ padding: '0.7rem 1.5rem', borderRadius: '50px', background: '#ff00aa', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop:'0.3rem' }}>Login with Email</button>
        <button onClick={login} style={{ padding: '1rem 2rem', borderRadius: '50px', background: '#00f0ff', color: '#0b0c15', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Login with Google</button>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main style={{ minHeight: '100vh', background: '#0b0c15', color: '#e8e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
        <h2>Access Denied</h2>
        <p>You are not authorized as admin.</p>
        <a href="/" style={{ color: '#00f0ff' }}>Back to Game</a>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0b0c15', color: '#e8e8f0', padding: '2rem' }}>
      <h1>Admin Panel</h1>
      <button onClick={loadComments} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#ff00aa', color: '#fff', border: 'none', cursor: 'pointer' }}>Load Comments</button>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {comments.map(c => (
          <div key={c.id} style={{ background: '#12132a', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.2)' }}>
            <p style={{ margin: '0 0 0.5rem' }}>{c.text}</p>
            <small style={{ opacity: 0.6 }}>By: {c.userName || 'Anonymous'} | Approved: {c.approved ? 'Yes' : 'No'}</small>
            {!c.approved && <button onClick={() => approve(c.id)} style={{ marginTop: '0.5rem', padding: '0.3rem 1rem', borderRadius: '8px', background: '#00f0ff', color: '#0b0c15', border: 'none', cursor: 'pointer' }}>Approve</button>}
          </div>
        ))}
      </div>
    </main>
  );
}
