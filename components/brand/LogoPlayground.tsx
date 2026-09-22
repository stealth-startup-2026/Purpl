'use client';

import Link from 'next/link';
import { usePurplModel, finishes, type Finish } from './usePurplModel';
import styles from './LogoPlayground.module.css';

export function LogoPlayground() {
  const { host, settings, finish, setFinish, paused, setPaused, status, morph, setMorph, folderOpen, setFolderOpen } = usePurplModel();

  return (
    <main className={styles.lab}>
      <div className={styles.sticky}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>purpl<span>®</span></Link>
        <span className={styles.eyebrow}>Shape studies / 001</span>
        <Link href="/">Back to site ↗</Link>
      </header>
      <div className={styles.layout}>
        <section className={styles.copy}>
          <p className={styles.eyebrow}>From an idea to something real.</p>
          <h1>Ideas <br />take <em>shape.</em></h1>
          <p className={styles.description}>A little possibility. A considered process. Something beautifully built.</p>
          <div className={styles.finishes} aria-label="Material finishes">
            {(Object.keys(finishes) as Finish[]).map(value => (
              <button key={value} aria-pressed={finish === value} onClick={() => {
                settings.current.finish = value; setFinish(value);
              }}><span className={styles[value]} />{finishes[value].label}</button>
            ))}
          </div>
          <div className={styles.actions}>
            <button onClick={() => { settings.current.reset += 1; }}>Reset view ↺</button>
            <button aria-pressed={paused} onClick={() => {
              settings.current.paused = !paused; setPaused(!paused);
            }}>{paused ? 'Resume motion' : 'Pause motion'}</button>
          </div>
          <label className={styles.morphControl}>Idea → our work
            <input aria-label="Morph from blob to folder" type="range" min="0" max="1" step="0.01" value={morph} onChange={event => {
              const value = Number(event.target.value); settings.current.manualMorph = true; settings.current.morph = value; setMorph(value);
              if (value < 0.8) { settings.current.folderOpen = false; setFolderOpen(false); }
            }} />
          </label>
          <div className={styles.actions}>
            <button aria-expanded={folderOpen} onClick={() => {
              settings.current.manualMorph = true; settings.current.folderOpen = !folderOpen; settings.current.morph = 1;
              setMorph(1); setFolderOpen(!folderOpen);
            }}>{folderOpen ? 'Close folder' : 'Open folder'}</button>
            <Link href="/work">See original work page ↗</Link>
          </div>
          <a className={styles.download} href="/models/purpl-pebble.glb" download>Download 3D model <span>GLB ↓</span></a>
        </section>
        <section className={styles.stage} aria-label="Logo model preview">
          <div className={styles.stageLabel}><span>Purpl / material exploration</span><span>01—03</span></div>
          <div className={styles.shadow} />
          <div ref={host} className={styles.canvas} />
          <p className={styles.hint} role="status">{status === 'Drag to explore the shape' ? (morph > 0.9 ? (folderOpen ? 'Click the folder to close it' : 'Click the folder to open it') : 'Scroll to shape the folder ↓') : status}</p>
        </section>
      </div>
      <footer className={styles.footer}><span>01 / The idea <span className={styles.progressTrack}><span style={{ width: `${morph * 100}%` }} /></span> 02 / Our work</span><span>Scroll study · September 2026</span></footer>
      </div>
    </main>
  );
}
