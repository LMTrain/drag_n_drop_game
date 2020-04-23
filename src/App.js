import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

const itemsFromBackend = [
  { id: '1', content: 'Disc 1' },
  { id: '2', content: 'Disc 2'},
  { id: '3', content: 'Disc 3' },
  { id: '4', content: 'Disc 4' },
  { id: '5', content: 'Disc 5' },
  { id: '6', content: 'Disc 6' },
  { id: '7', content: 'Disc 7'},
  { id: '8', content: 'Disc 8' },
  { id: '9', content: 'Disc 9' },
  { id: '10', content: 'Disc 10' },
];
const columnsFromBackend =
  {
    [uuid()]: {
      name: 'Pole A',
      items: itemsFromBackend
    },
    [uuid()]: {
      name: 'Pole B',
      items: []
    },
    [uuid()]: {
      name: 'Pole C',
      items: []
    },
    // [uuid()]: {
    //   name: 'Done',
    //   items: []
    // }
  };

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      {/* <DragDropContext onDragEnd={result => console.log(result)}> */}
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'bottom'}}>
              <h2 style={{textAlign: 'center', marginTop: '80px'}}>{column.name}</h2>
              <div style={{margin: 8}}>
                <Droppable droppableId={id} key={id} position='bottom'>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'lightgreen',
                          padding: 4,
                          width: 250,
                          minHeight: 450
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      height: '5px',
                                      borderRadius: '30px',
                                      boxShadow: '0 5px 8px #6f6666, 0 5px 8px #6f6666',
                                      marginLeft: 
                                        item.content === 'Disc 1' ? '90px' : item.content === 'Disc 2' ? '80px' :
                                        item.content === 'Disc 3' ? '70px' : item.content === 'Disc 4' ? '60px' :
                                        item.content === 'Disc 5' ? '50px' : item.content === 'Disc 6' ? '40px' :
                                        item.content === 'Disc 7' ? '30px' : item.content === 'Disc 8' ? '20px' :
                                        item.content === 'Disc 9' ? '10px' : item.content === 'Disc 10' ? '0px' : '0px',
                                      width: 
                                        item.content === 'Disc 1' ? '40px' : item.content === 'Disc 2' ? '60px' :
                                        item.content === 'Disc 3' ? '80px' : item.content === 'Disc 4' ? '100px' :
                                        item.content === 'Disc 5' ? '120px' : item.content === 'Disc 6' ? '140px' :
                                        item.content === 'Disc 7' ? '160px' : item.content === 'Disc 8' ? '180px' :
                                        item.content === 'Disc 9' ? '200px' : item.content === 'Disc 10' ? '220px' : '250px',
                                      backgroundColor: 
                                        item.content === 'Disc 1' ? 'blue' : item.content === 'Disc 2' ? 'green' :
                                        item.content === 'Disc 3' ? 'pink' : item.content === 'Disc 4' ? 'yellow' :
                                        item.content === 'Disc 5' ? 'brown' : item.content === 'Disc 6' ? 'cyan' :
                                        item.content === 'Disc 7' ? 'gold' : item.content === 'Disc 8' ? 'purple' :
                                        item.content === 'Disc 9' ? 'red' : item.content === 'Disc 10' ? 'black' : '#456C86',
                                      // backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                      color: 'orange',
                                      ...provided.draggableProps.style
                                    }}                                
                                  >
                                    <div style={{textAlign: 'center', marginTop: '-5px'}}>{item.content}</div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}

      </DragDropContext>
     
    </div>
  );
}

export default App;
