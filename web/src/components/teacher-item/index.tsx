import React from 'react';
import profileIcon from '../../assets/images/icons/user.svg';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

export interface Teacher {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  subject: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
  const createConnections = async () => {
    try {
      await api.post('connections', {user_id: teacher.id});
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar ? teacher.avatar : profileIcon}
          alt="Profile Icon"
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}t</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>{teacher.cost} €</strong>
        </p>
        <a
          target="blank"
          onClick={createConnections}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contacto
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
