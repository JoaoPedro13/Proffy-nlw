import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import classesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';
import api from '../../services/api';

const Home = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const getConnections = () => {
    api.get('connections').then((res) => {
      const {total} = res.data;
      setTotalConnections(total);
    });
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div id="home">
      <div id="home-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>A sua plataforma de estudos online.</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="classes">
            <img src={classesIcon} alt="Aulas" />
            Dar Aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="coração roxo" />
        </span>
      </div>
    </div>
  );
};

export default Home;
