import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/page-header';
import TeacherItem, {Teacher} from '../../components/teacher-item';
import Input from '../../components/input';
import Select from '../../components/select';
import api from '../../services/api';
import './styles.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setTeachers(response.data);
    } catch (error) {
      alert('something went wrong');
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form
          id="search-teachers"
          className="container"
          onSubmit={searchTeachers}
        >
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              {value: 'Artes', label: 'Artes'},
              {value: 'Biologia', label: 'Biologia'},
              {value: 'Educação Física', label: 'Educação Física'},
              {value: 'Física', label: 'Física'},
              {value: 'Química', label: 'Química'},
              {value: 'Geografia', label: 'Geografia'},
              {value: 'Português', label: 'Português'},
              {value: 'Matemática', label: 'Matemática'},
              {value: 'História', label: 'História'},
              {value: 'Inglês', label: 'Inglês'},
              {value: 'Filosofia', label: 'Filosofia'},
              {value: 'Programação', label: 'Informática'},
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)}
            options={[
              {value: '0', label: 'Domingo'},
              {value: '1', label: 'Segunda-feira'},
              {value: '2', label: 'Terça-feira'},
              {value: '3', label: 'Quarta-feira'},
              {value: '4', label: 'Quinta-feira'},
              {value: '5', label: 'Sexta-feira'},
              {value: '6', label: 'Sábado'},
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Procurar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
