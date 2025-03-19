import { useGetUsersQuery, useDeleteUserMutation } from "../redux/api/usersApiSlice";
import { Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const UserList = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      {users?.map((user) => (
        <Card key={user._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography color="textSecondary">{user.email}</Typography>
            <Button onClick={() => handleDelete(user._id)} color="error">
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
