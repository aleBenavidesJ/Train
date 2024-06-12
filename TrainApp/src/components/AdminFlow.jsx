import { useState, useEffect } from 'react';
import {
  Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Button, Box, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const AdminFlow = ({ data, updateNodes, updateEdges }) => {
  const [nodes, setNodes] = useState(data.nodes);
  const [edges, setEdges] = useState(data.edges);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [desde, setDesde] = useState('');
  const [hacia, setHacia] = useState('');
  const [distancia, setDistancia] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [nextEdgeId, setNextEdgeId] = useState(edges.length + 1);
  const [nextNodeId, setNextNodeId] = useState(nodes.length + 1);

  const [cedula, setCedula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges);

    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getNodeLabel = (id) => {
    const node = nodes.find((node) => node.id === id);
    return node ? node.data.label : '';
  };

  const handleAddEdge = () => {
    let sourceNode = nodes.find((node) => node.data.label === desde);
    let targetNode = nodes.find((node) => node.data.label === hacia);

    let newNodes = [...nodes];
    let newEdges = [...edges];

    if (!sourceNode) {
      sourceNode = {
        id: nextNodeId.toString(),
        position: { x: parseFloat(x), y: parseFloat(y) },
        data: { label: desde },
      };
      newNodes.push(sourceNode);
      setNextNodeId(nextNodeId + 1);
    }

    if (!targetNode) {
      targetNode = {
        id: (nextNodeId + 1).toString(),
        position: { x: parseFloat(x) + 100, y: parseFloat(y) + 100 },
        data: { label: hacia },
      };
      newNodes.push(targetNode);
      setNextNodeId(nextNodeId + 2);
    }

    const newEdge = { id: `e${nextEdgeId}`, source: sourceNode.id, target: targetNode.id, distance: distancia };

    newEdges.push(newEdge);
    setNextEdgeId(nextEdgeId + 1);
    setNodes(newNodes);
    setEdges(newEdges);
    setDesde('');
    setHacia('');
    setDistancia('');
    setX('');
    setY('');

    updateNodes(newNodes);
    updateEdges(newEdges);
  };

  const handleEditEdge = (edgeId) => {
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return;

    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);

    setDesde(sourceNode ? sourceNode.data.label : '');
    setHacia(targetNode ? targetNode.data.label : '');
    setDistancia(edge.distance);
  };

  const handleDeleteEdge = (edgeId) => {
    const newEdges = edges.filter((edge) => edge.id !== edgeId);
    const edgeToDelete = edges.find((edge) => edge.id === edgeId);

    const sourceNode = nodes.find((node) => node.id === edgeToDelete.source);
    const targetNode = nodes.find((node) => node.id === edgeToDelete.target);

    const isSourceConnectedToOthers = newEdges.some((e) => e.source === sourceNode.id || e.target === sourceNode.id);
    const isTargetConnectedToOthers = newEdges.some((e) => e.source === targetNode.id || e.target === targetNode.id);

    const newNodes = nodes.filter((node) => {
      const isSource = edgeToDelete.source === node.id;
      const isTarget = edgeToDelete.target === node.id;
      return !((isSource && !isSourceConnectedToOthers) || (isTarget && !isTargetConnectedToOthers));
    });

    setEdges(newEdges);
    setNodes(newNodes);
    updateNodes(newNodes);
    updateEdges(newEdges);
  };

  const handleAddAdmin = () => {
    if (!cedula || !contrasena) return;

    const newAdmin = { id: admins.length + 1, cedula, contrasena };
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));

    setCedula('');
    setContrasena('');
  };

  const handleDeleteAdmin = (adminId) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== adminId);
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, edges.length - page * rowsPerPage);

  return (
    <Grid container direction="row" sx={{ height: '100vh' }}>
      <Grid item xs={12} sx={{ bgcolor: 'white', padding: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ width: '100%', height: '300px', backgroundColor: '#1B1B1B', mb: 2 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              minZoom={1}
              defaultEdgeOptions={{ type: 'smoothstep' }}
              nodesConnectable={false}
              fitView
              fitViewOptions={{ padding: 0.5 }}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Desde"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Posición X Desde"
              value={x}
              onChange={(e) => setX(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Posición Y Desde"
              value={y}
              onChange={(e) => setY(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hacia"
              value={hacia}
              onChange={(e) => setHacia(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Posición X Hacia"
              value={parseFloat(x) + 100}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Posición Y Hacia"
              value={parseFloat(y) + 100}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Distancia"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddEdge} fullWidth>
              Agregar Ruta
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Desde</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Hacia</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Distancia</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {edges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((edge) => (
                  <TableRow key={edge.id}>
                    <TableCell>{edge.id}</TableCell>
                    <TableCell>{getNodeLabel(edge.source)}</TableCell>
                    <TableCell>{getNodeLabel(edge.target)}</TableCell>
                    <TableCell>{edge.distance}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditEdge(edge.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEdge(edge.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={edges.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
          />
          <Button variant="contained" onClick={handleAddAdmin} fullWidth>
            Agregar Administrador
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cédula</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contraseña</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>{admin.cedula}</TableCell>
                  <TableCell>{admin.contrasena}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteAdmin(admin.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminFlow;
