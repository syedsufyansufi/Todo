import React from 'react';
import { Box, TextField, Button, IconButton, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const TaskToolbar = ({ onSearch, onRefresh, onAddTask }) => {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/24-512.png" />
        <Typography variant="h6" component="div">
          Tasks
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size="small"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
        <Button variant="contained" color="secondary" onClick={onAddTask}>
          New Task
        </Button>
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskToolbar;
