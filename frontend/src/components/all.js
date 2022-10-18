import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import backendUrl from '../url.js';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AddUserForm({ onListChanged }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addUserErrorMsg, setAddUserErrorMsg] = useState('');

  function addUser(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email })
    };
    fetch(`${backendUrl}/user/add`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(() => { 
          setAddUserErrorMsg(''); 
          setFirstName('');
          setLastName('');
          setEmail('');
          onListChanged();
        })
        .catch((err) => {
          setAddUserErrorMsg(err.message);
        });
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add a new user
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={addUser}
      >
        <TextField label="First Name" variant="outlined" value={firstName} onInput={e => setFirstName(e.target.value)} required />
        <TextField label="Last Name" variant="outlined" value={lastName} onInput={e => setLastName(e.target.value)} required />
        <TextField label="Email" variant="outlined" type="email" value={email} onInput={e => setEmail(e.target.value)} required />
        <Button variant="outlined" size="large" type="submit">Add</Button>
        {addUserErrorMsg && <Alert variant="outlined" severity="error">{addUserErrorMsg}</Alert>}
      </Box>
    </Box>
  );
}

function DeleteUserForm({ onListChanged }) {
  const [email, setEmail] = useState('');
  const [deleteUserErrorMsg, setDeleteUserErrorMsg] = useState('');

  function deleteUser(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    };
    fetch(`${backendUrl}/user/delete`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(() => { 
          setDeleteUserErrorMsg(''); 
          setEmail('');
          onListChanged();
        })
        .catch((err) => {
          setDeleteUserErrorMsg(err.message);
        });
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Delete an existing user
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={deleteUser}
      >
        <TextField label="Email" variant="outlined" type="email" value={email} onInput={e => setEmail(e.target.value)} required />
        <Button variant="outlined" size="large" color="error" type="submit">Delete</Button>
        {deleteUserErrorMsg && <Alert variant="outlined" severity="error">{deleteUserErrorMsg}</Alert>}
      </Box>
    </Box>
  );
}

function UpdateUserForm({ onListChanged }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [updateUserErrorMsg, setUpdateUserErrorMsg] = useState('');

  function updateUser(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email })
    };
    fetch(`${backendUrl}/user/update`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(() => { 
          setUpdateUserErrorMsg(''); 
          setFirstName('');
          setLastName('');
          setEmail('');
          onListChanged();
        })
        .catch((err) => {
          setUpdateUserErrorMsg(err.message);
        });
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update name of an existing user
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={updateUser}
      >
        <TextField label="First Name" variant="outlined" value={firstName} onInput={e => setFirstName(e.target.value)} required />
        <TextField label="Last Name" variant="outlined" value={lastName} onInput={e => setLastName(e.target.value)} required />
        <TextField label="Email" variant="outlined" type="email" value={email} onInput={e => setEmail(e.target.value)} required />
        <Button variant="outlined" size="large" type="submit">Update</Button>
        {updateUserErrorMsg && <Alert variant="outlined" severity="error">{updateUserErrorMsg}</Alert>}
      </Box>
    </Box>
  );
}

function CurrencyList() {
  const [rates, setRates] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const googleFuncUrl = "https://asian-currency-func-4zvqq6zmhq-as.a.run.app/";
  function queryCurrency(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'GET'
    };
    fetch(`${googleFuncUrl}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then((data) => { 
          setErrorMsg(''); 
          setRates(data['rates']);
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Currencies: 
      </Typography>
      <TableContainer sx={{m: 1}}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(rates).map((key, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rates[key]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{m: 1}} variant="outlined" size="large" onClick={queryCurrency}>Get latest currencies</Button>
      {errorMsg && <Alert variant="outlined" severity="error">{errorMsg}</Alert>} 
    </Box>
  );
}

function UserList({ listChanged }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${backendUrl}/user/all`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(data => {
          setUsers(data.map(user => ({first_name: user.first_name, last_name: user.last_name, email: user.email})));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [listChanged]);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All users:
      </Typography>

      <List>
        {users.map((user, idx) => {
          return (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.first_name + ' ' + user.last_name} secondary={user.email} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export {AddUserForm, DeleteUserForm, UpdateUserForm, UserList, CurrencyList};