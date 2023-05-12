/** @format */

import React, { useContext, useEffect, useState } from 'react';
import Paper from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import axios from 'axios';
import { MachineContext } from '../context/MachineContext';

function Machines() {
  const selected = localStorage.getItem('op_mach');
  const selectedClient = localStorage.getItem('op_mach_client');
  const clientID = localStorage.getItem('op_client');
  const { setMachineID } = useContext(MachineContext);

  const [machines, setMachines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (selected && clientID === selectedClient) {
      setMachineID(selected);
      return selected;
    } else return 0;
  });
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get('../machines.php', {
        params: { cid: clientID },
        cancelToken: source.token,
      })
      .then(result => {
        setMachines(result.data);
        if (selectedClient !== clientID || !selected) {
          localStorage.setItem('op_mach_client', clientID);
          localStorage.setItem('op_mach', result.data[0].apiToken);
          setSelectedIndex(result.data[0].apiToken);
          setMachineID(result.data[0].apiToken);
        }
      })
      .catch(error => console.log(error));
    return () => {
      source.cancel();
    };
  }, [clientID]);
  const handleListItemClick = (event, index) => {
    localStorage.setItem('op_mach', index);
    localStorage.setItem('op_mach_client', clientID);
    setSelectedIndex(index);
    setMachineID(index);
  };
  return (
    <div
      style={{
        height: { xs: "auto", sm: "50%" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        fontSize={"3.3vh"}
        variant="h4"
        fontWeight={"bold"}
        display={"inline"}
        sx={{
          textDecoration: "Underline",
          color: "black",
          mb: 0.5,
          textAlign: "left",
          fontSize: { xs: "2.5vh", sm: "3vh", md: "3.2vh" },
        }}
      >
        MACHINES
      </Typography>

      <Paper
        sx={{
          flex: 1,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "1vh",
          display: "flex",
        }}
      >
        {machines[0]?.length !== 0 ? (
          <List
            component="nav"
            aria-label="secondary"
            sx={{
              flex: 1,
              minHeight: "auto",
              maxHeight: { xs: "300px", sm: "43vh" },
              overflow: "auto",
              borderRadius: "1vh",
            }}
          >
            {machines.map((row) => {
              return (
                <>
                  <ListItemButton
                    sx={{ padding: "0.3rem 1rem" }}
                    divider
                    key={row.id}
                    selected={selectedIndex === row.apiToken}
                    onClick={(event) =>
                      handleListItemClick(event, row.apiToken)
                    }
                  >
                    <ListItemText
                      primary={row.name}
                      sx={{ m: 0, fontSize: "2vh !important" }}
                    />
                  </ListItemButton>
                </>
              );
            })}
          </List>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "2vh",
              margin: "3vh",
              width: "100%",
            }}
          >
            Selected customer has no Machine.
          </Typography>
        )}
      </Paper>
    </div>
  );
}
export default Machines;
