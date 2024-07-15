import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const Flow = ({ data }) => {
  const { nodes, edges } = data;
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#1B1B1B' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        minZoom={1}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        nodesConnectable={false}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flow;
