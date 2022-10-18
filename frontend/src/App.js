import Container from '@mui/material/Container';
import {AddUserForm, UserList, UpdateUserForm, DeleteUserForm, CurrencyList} from './components/all';
import { useState } from 'react';

export default function App() {
  const [isListChanged, setIsListChanged] = useState(false);

  return (
    <Container maxWidth="xl">
      <UserList listChanged={isListChanged} />
      <AddUserForm onListChanged={() => setIsListChanged(!isListChanged)} />
      <UpdateUserForm onListChanged={() => setIsListChanged(!isListChanged)} />
      <DeleteUserForm onListChanged={() => setIsListChanged(!isListChanged)} />
      <CurrencyList />
    </Container>
  );
}