import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";

function GlobalStat() {
  const [globalStat, setGlobalStat] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/global_stat`)
      .then((response) => {
        setGlobalStat(response.data);
      });
  }, []);

  return (
    <div className="global-stats">
      <div className="global-stats__headers">
        <div className="global-stats__headers-number">Место в рейтинге</div>
        <div className="global-stats__headers-avatar">Аватар</div>
        <div className="global-stats__headers-name">Имя</div>
        <div className="global-stats__headers-correct-answers">
          Правильные ответы
        </div>
        <div className="global-stats__headers-incorrect-answers">
          Неправильные ответы
        </div>
        <div className="global-stats__headers-total-games">Количество игр</div>
      </div>
      {globalStat?.map((el, index) => (
        <div className="global-stats__statistic" key={uuidv4()}>
          <div className="global-stats__headers-number">{index + 1}</div>
          <div className="global-stats__statistic-avatar">
            <img
              src={
                el.avatar_url !== "null"
                  ? `${process.env.REACT_APP_STATIC_PATH}/${el.avatar_url}`
                  : `${process.env.REACT_APP_STATIC_PATH}/defaultUser.png`
              }
              width="40"
              height="30"
              alt="avatar"
            />
          </div>
          <div className="global-stats__statistic-name"> {el.username} </div>
          <div className="global-stats__statistic-correct-answers">
            {" "}
            {el.correctAnswers}{" "}
          </div>
          <div className="global-stats__statistic-incorrect-answers">
            {" "}
            {el.wrongAnswers}{" "}
          </div>
          <div className="global-stats__statistic-total-games">
            {" "}
            {el.gamesCount}{" "}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GlobalStat;
