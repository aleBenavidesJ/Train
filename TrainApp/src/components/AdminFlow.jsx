import { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button, Box } from '@mui/material';
import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const AdminFlow = ({ data }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [desde, setDesde] = useState('');
  const [hacia, setHacia] = useState('');
  const [distancia, setDistancia] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [nextEdgeId, setNextEdgeId] = useState(1);
  const [nextNodeId, setNextNodeId] = useState(1);

  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem('nodes')) || data.nodes;
    const savedEdges = JSON.parse(localStorage.getItem('edges')) || data.edges;
    setNodes(savedNodes);
    setEdges(savedEdges);
    setNextNodeId(savedNodes.length + 1);
    setNextEdgeId(savedEdges.length + 1);
  }, [data.nodes, data.edges]);

  useEffect(() => {
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [edges]);

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
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, edges.length - page * rowsPerPage);

  return (
    <Grid container direction="row" sx={{ height: '100vh' }}>
      <Grid item xs={25} sx={{ bgcolor: 'white', padding: 2 }}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {edges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((edge) => (
                  <TableRow key={edge.id}>
                    <TableCell>{edge.id}</TableCell>
                    <TableCell>{getNodeLabel(edge.source)}</TableCell>
                    <TableCell>{getNodeLabel(edge.target)}</TableCell>
                    <TableCell>{edge.distance}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
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
      </Grid>
    </Grid>
  );
};

export default AdminFlow;
