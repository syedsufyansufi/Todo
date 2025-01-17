import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Typography,
  TextField,
  Button,
  TablePagination,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TaskDialog from './TaskDialog';
const initialTasks = [
  {
    id: 1,
    assignedTo: 'User 1',
    status: 'Completed',
    dueDate: '2024-10-12',
    priority: 'Low',
    comments: 'This task is good',
  },
  {
    id: 2,
    assignedTo: 'User 2',
    status: 'In Progress',
    dueDate: '2024-09-14',
    priority: 'High',
    comments: 'This is pending.',
  },
  {
    id: 3,
    assignedTo: 'User 3',
    status: 'Not Started',
    dueDate: '2024-08-18',
    priority: 'Low',
    comments: 'Needs review.',
  },
  {
    id: 4,
    assignedTo: 'User 4',
    status: 'In Progress',
    dueDate: '2024-06-12',
    priority: 'Normal',
    comments: 'This task is good',
  },
];

const TaskManagementTable = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleRefresh = () => {
    setTasks(initialTasks);
    setSearchTerm('');
  };

  const handleOpenDialog = (task = null) => {
    setEditTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSaveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    }
    setDialogOpen(false);
  };

  const handleOpenDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setDeleteDialogOpen(false);
  };

  const filteredTasks = tasks.filter((task) =>
    Object.values(task).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/24-512.png" />
          <Typography variant="h6">Tasks</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}
            onClick={() => handleOpenDialog()}
          >
            New Task
          </Button>
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.comments}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpenDialog(task)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleOpenDeleteDialog(task)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
      <TaskDialog
        open={dialogOpen}
        task={editTask}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
      />
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ bgcolor: 'red', color: 'white' }}>Delete</DialogTitle>
        <DialogContent>
          Do you want to delete task <strong>{taskToDelete?.assignedTo}</strong>?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ bgcolor: 'grey', color: 'white', '&:hover': { bgcolor: 'darkgrey' } }}
          >
            No
          </Button>
          <Button
            onClick={handleDeleteTask}
            sx={{ bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskManagementTable;
