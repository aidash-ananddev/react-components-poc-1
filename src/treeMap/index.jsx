import React from 'react'
import classes from './treeMap.module.css'

const mockTree = [
  {
    id: 'p1',
    name: 'Firm 1',
    type: 'firm',
    children: [
      {
        id: 'pl1',
        name: 'Platform 1',
        type: 'platform',
        children: [
          { id: 'pr1', type: 'product', name: 'Product 1' },
          { id: 'pr2', type: 'product', name: 'Product 2' },
          { id: 'pr3', type: 'product', name: 'Product 3' },
          { id: 'pr4', type: 'product', name: 'Product 4' },
        ],
      },
    ],
  },
  {
    id: 'f2',
    name: 'Firm 2',
    type: 'firm',
    children: [
      {
        id: 'pl2',
        name: 'Platform 2',
        type: 'platform',
        children: [
          { id: 'pr1', type: 'product', name: 'Product 1' },
          { id: 'pr2', type: 'product', name: 'Product 2' },
          { id: 'pr3', type: 'product', name: 'Product 3' },
          { id: 'pr4', type: 'product', name: 'Product 4' },
        ],
      },
    ],
  },
]

const NodeChart = () => {
  const {
    nodeWrapper,
    column,
    nodeContainer,
    leftBridge,
    activeNode,
    rightBridge,
    nodeName,
  } = classes

  const renderNode = (node: any) => {
    return (
      <div className={nodeContainer} key={node.id}>
        {<div className={leftBridge} />}
        <div className={`${nodeName} ${node.isActive ? activeNode : ''}`}>
          <span>{node.name}</span>
        </div>
        {<div className={rightBridge} />}
      </div>
    )
  }

  let columns: any = {}
  const transformTreeData = (treeData: any[any]) => {
    treeData.map((column: any) => {
      if (!columns[column.type]) {
        columns[column.type] = [column]
      } else {
        columns[column.type] = [...columns[column.type], column]
      }

      if (column.children) {
        transformTreeData(column.children)
      }
    })
    return columns
  }

  const renderTree = () => {
    const treeMap = transformTreeData(mockTree)
    const columnKeys = Object.keys(treeMap)
    return columnKeys.map((key: any) => {
      return (
        <div className={column} key={key}>
          {treeMap[key].map((node: any) => {
            return renderNode(node)
          })}
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Node Chart</h1>
      <div className={nodeWrapper}>{renderTree()}</div>
    </div>
  )
}

export default React.memo(NodeChart)
