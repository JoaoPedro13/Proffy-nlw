import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomeScreen from './screens/home';
import TeacherListScreen from './screens/teacher-list';
import TeacherFormScreen from './screens/teacher-form';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/study" component={TeacherListScreen} />
      <Route path="/give-classes" component={TeacherFormScreen} />
    </BrowserRouter>
  );
};
