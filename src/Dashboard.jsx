import { Box, Button, Container } from "@material-ui/core";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { getData, updateData } from "./service";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getData();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    { title: "Field Name", field: "fieldName" },
    { title: "Field Value", field: "fieldValue" },
  ];

  const mapData = () => {
    const array = [];
    if (data === null) {
      return array;
    }
    for (var key in data) {
      if (
        key !== "UserSub" &&
        key !== "bv_client" &&
        key !== "email" &&
        key !== "Table"
      ) {
        array.push({
          fieldName: key,
          fieldValue: data[key],
        });
      }
    }
    return array;
  };

  const handleAdd = async (newData) => {
    setLoading(true);
    try {
      const prevData = { ...data };
      prevData[newData.fieldName] = newData.fieldValue;
      await updateData(prevData);
      setData(prevData);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (newData, oldData) => {
    setLoading(true);
    try {
      const prevData = { ...data };
      delete prevData[oldData.fieldName];
      prevData[newData.fieldName] = newData.fieldValue;
      await updateData(prevData);
      setData(prevData);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (oldData) => {
    setLoading(true);
    try {
      const prevData = { ...data };
      delete prevData[oldData.fieldName];
      await updateData(prevData);
      setData(prevData);
    } catch (ex) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location = "https://www.bonovox.net";
  };

  return (
    <Box margin={2}>
      <Container maxWidth="md">
        <Box marginY={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <MaterialTable
          title="Dashboard"
          columns={columns}
          data={mapData()}
          options={{
            actionsColumnIndex: -1,
            maxBodyHeight: 500,
          }}
          isLoading={loading}
          editable={{
            onRowAdd: (newData) => handleAdd(newData),
            onRowUpdate: (newData, oldData) => handleUpdate(newData, oldData),
            onRowDelete: (oldData) => handleDelete(oldData),
          }}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
