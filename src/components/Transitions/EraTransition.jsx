import './EraTransition.css';

export default function EraTransition({ fromEra, toEra, title, subtitle }) {
  return (
    <div className={`era-trans era-trans--${fromEra}-to-${toEra}`}>
      <div className="era-trans__backdrop"></div>
      <div className="era-trans__vortex">
        <div className="era-trans__ring ring-1"></div>
        <div className="era-trans__ring ring-2"></div>
        <div className="era-trans__ring ring-3"></div>
      </div>
      <div className="era-trans__content">
        <span className="era-trans__tag">TRANSITIONING SONIC ERA</span>
        <h3 className="era-trans__title">{title}</h3>
        <p className="era-trans__sub">{subtitle}</p>
        <div className="era-trans__down-arrow">↓</div>
      </div>
    </div>
  );
}
