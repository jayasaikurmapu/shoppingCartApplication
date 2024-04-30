import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const ConfigureVendor = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://localhost:8080/signup/all`).then((response) => {
      const responseData = response.data;
      const vendorsData = responseData.filter(data => data.vendor === true);
      setVendors(vendorsData);
    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
  };

  const acceptVendor = (vendor) => {
    axios.put('http://localhost:8080/signup/status', vendor)
      .then(response => {
        console.log('Response:', response.data);
        getData(); // Refresh vendor list after accepting
      })
      .catch(error => {
        console.error('Error is:', error);
      });
  };

  const rejectVendor = (vendor) => {
    axios.put('http://localhost:8080/signup/status2', vendor)
      .then(response => {
        console.log('Response:', response.data);
        getData(); // Refresh vendor list after rejecting
      })
      .catch(error => {
        console.error('Error is:', error);
      });
  };

  const deleteVendor = (id) => {
    axios.delete(`http://localhost:8080/signup/delete/${id}`).then((response) => {
      console.log(response.data);
      getData(); // Refresh the vendor list after deletion
    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <div>
      <h2 style={{ paddingTop: '20px' }}>Vendor's List</h2>
      <center>

        <Table
          sx={{
            '& tr > *:not(:first-child)': { textAlign: 'right' },
            width: '90%',
            background: '#BFD8E9',
            "& th": {
              color: "rgba(96, 96, 96)",
              backgroundColor: "#D3D3F7",
            },
          }}
          stickyHeader
          // stickyFooter
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th style={table2CellStyle}>Name</th>
              <th style={table2CellStyle}>Email</th>
              <th style={table2CellStyle}>Phone Number</th>
              <th style={table2CellStyle}>Status</th>
              <th style={table2CellStyle}>Actions</th>
              <th style={table2CellStyle}>Remove Vendor</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={vendor.sno}>
                <td style={table2CellStyle}>{vendor.username}</td>
                <td style={table2CellStyle}>{vendor.email}</td>
                <td style={table2CellStyle}>{vendor.number}</td>
                <td style={table2CellStyle}>{vendor.status}</td>
                <td style={table2CellStyle}>
                  {vendor.status === 'Pending' ? (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexDirection: 'column' }}>
                        <Button
                          style={{ width: 110 }}
                          variant="soft"
                          onClick={() => { acceptVendor(vendor); vendor.status = 'Accepted'; }}
                          endDecorator={<ThumbUpOffAltIcon />}
                          color="success"
                        >
                          Accept
                        </Button>
                        
                        <Button
                          style={{ width: 110 }}
                          variant="soft"
                          onClick={() => { rejectVendor(vendor); vendor.status = 'Rejected'; }}
                          endDecorator={<ThumbDownOffAltIcon />}
                          color="danger"
                        >
                          Reject
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      {vendor.status === 'Accepted' ?
                        <Button
                          style={{ width: 110 }}
                          variant="soft"
                          endDecorator={<ThumbUpOffAltIcon />}
                          color="success"
                        >
                          Accepted
                        </Button>
                        :
                        <Button
                          style={{ width: 110 }}
                          variant="soft"
                          endDecorator={<ThumbDownOffAltIcon />}
                          color="danger"
                        >
                          Rejected
                        </Button>
                      }
                    </>
                  )}
                </td>
                <td style={table2CellStyle}>
                  <Button
                    style={{ width: 110 }}
                    variant="soft"
                    onClick={() => deleteVendor(vendor.username)}
                    endDecorator={<DeleteOutlineIcon />}
                    color="danger"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </center>
    </div>
  );
};

export default ConfigureVendor;
