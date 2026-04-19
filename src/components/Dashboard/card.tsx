import card from "./Card.module.css"
interface Card {
  value : number,
  icon : string,
  title : string,
  desc : string
};

export const Card = ({value, icon, title, desc} : Card) => (
    <>
      <div className={card.title}>
        <h1>{title}</h1>
        <img src={icon} className={card.icon} alt={`Ícono para ${title}`}/>
      </div>
      <strong className={`${card.number}`}>{value}</strong>
      <p>{desc}</p>
    </>
  );
