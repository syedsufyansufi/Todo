import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, MenuItem } from '@mui/material';

const TaskDialog = ({ open, onClose, onSave, task, isEditing }) => {
  const [formValues, setFormValues] = React.useState(task || { assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });

  React.useEffect(() => {
    setFormValues(task || { assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formValues);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Task' : 'New Task'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                label="Assigned To"
                name="assignedTo"
                value={formValues.assignedTo}
                onChange={handleChange}
                required
                fullWidth
              >
                {['User 1', 'User 2', 'User 3', 'User 4'].map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                required
                fullWidth
              >
                {['Not Started', 'In Progress', 'Completed'].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                label="Due Date"
                name="dueDate"
                value={formValues.dueDate}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Priority"
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
                required
                fullWidth
              >
                {['Low', 'Normal', 'High'].map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="comments"
                value={formValues.comments}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="warning" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
