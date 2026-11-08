import './EraSection.css';

export default function EraSection({ era, index, children }) {
  return (
    <section
      id={era.id}
      className={`era-section era-section--${era.id}`}
      style={{
        '--era-primary': era.colors.primary,
        '--era-secondary': era.colors.secondary,
        '--era-accent': era.colors.accent,
        '--era-bg': era.colors.bg,
        '--era-surface': era.colors.surface,
        '--era-text': era.colors.text,
      }}
    >
      <div className="era-section__bg-glow"></div>
      <div className="era-section__giant-num">{era.number}</div>

      <div className="era-section__header-wrap">
        <div className="era-section__meta-top">
          <span className="era-section__badge">ERA {era.number} // 50 YEARS OF SOUND</span>
          <span className="era-section__year-span">{era.year}</span>
        </div>
        <h2 className="era-section__title">{era.title}</h2>
        <p className="era-section__tagline">{era.tagline}</p>
      </div>

      <div className="era-section__body">{children}</div>
    </section>
  );
}
