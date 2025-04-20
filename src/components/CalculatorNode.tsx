import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

interface CalculatorNodeProps {
  data: {
    type: 'input' | 'process' | 'output';
    value?: number;
    operation?: string;
    onChange?: (value: any) => void;
    input1?: number;
    input2?: number;
  };
}

const CalculatorNode: React.FC<CalculatorNodeProps> = ({ data }) => {
  const [value, setValue] = useState<number>(data.value || 0);

  useEffect(() => {
    if (data.type === 'input' && data.value !== undefined) {
      setValue(data.value);
    }
  }, [data.value, data.type]);

  useEffect(() => {
    if (data.onChange && data.type === 'input') {
      data.onChange(value);
    }
  }, [value, data.onChange, data.type]);

  useEffect(() => {
    if (data.type === 'output' && data.input1 !== undefined && data.input2 !== undefined && data.operation) {
      let result = 0;
      switch (data.operation) {
        case 'add':
          result = data.input1 + data.input2;
          break;
        case 'subtract':
          result = data.input1 - data.input2;
          break;
        case 'multiply':
          result = data.input1 * data.input2;
          break;
        case 'divide':
          result = data.input2 !== 0 ? data.input1 / data.input2 : 0;
          break;
      }
      setValue(result);
    }
  }, [data.type, data.input1, data.input2, data.operation]);

  const handleIncrement = () => {
    setValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setValue(prev => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  if (data.type === 'input') {
    return (
      <div className="calculator-node">
        <Handle type="source" position={Position.Right} />
        <div>
          <button onClick={handleDecrement}>-</button>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
          />
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    );
  }

  if (data.type === 'process') {
    return (
      <div className="calculator-node">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
        <select
          value={data.operation}
          onChange={(e) => {
            if (data.onChange) {
              data.onChange(e.target.value);
            }
          }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
    );
  }

  if (data.type === 'output') {
    return (
      <div className="calculator-node output-node">
        <Handle type="target" position={Position.Left} />
        <div>Output</div>
        <div className="value">{value}</div>
      </div>
    );
  }

  return null;
};

export default CalculatorNode; 