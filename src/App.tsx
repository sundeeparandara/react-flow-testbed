import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CalculatorNode from './components/CalculatorNode';

const nodeTypes = {
  calculator: CalculatorNode,
};

function App() {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [operation, setOperation] = useState('add');

  const initialNodes: Node[] = [
    {
      id: 'input1',
      type: 'calculator',
      position: { x: 100, y: 100 },
      data: { 
        type: 'input',
        value: input1,
        onChange: setInput1
      },
    },
    {
      id: 'input2',
      type: 'calculator',
      position: { x: 100, y: 200 },
      data: { 
        type: 'input',
        value: input2,
        onChange: setInput2
      },
    },
    {
      id: 'process',
      type: 'calculator',
      position: { x: 300, y: 150 },
      data: { 
        type: 'process',
        operation: operation,
        onChange: setOperation
      },
    },
    {
      id: 'output',
      type: 'calculator',
      position: { x: 500, y: 150 },
      data: { 
        type: 'output',
        input1: input1,
        input2: input2,
        operation: operation
      },
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: 'input1', target: 'process' },
    { id: 'e2-3', source: 'input2', target: 'process' },
    { id: 'e3-4', source: 'process', target: 'output' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when inputs or operation changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'input1') {
          node.data = { ...node.data, value: input1 };
        }
        if (node.id === 'input2') {
          node.data = { ...node.data, value: input2 };
        }
        if (node.id === 'process') {
          node.data = { ...node.data, operation };
        }
        if (node.id === 'output') {
          node.data = { ...node.data, input1, input2, operation };
        }
        return node;
      })
    );
  }, [input1, input2, operation, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
