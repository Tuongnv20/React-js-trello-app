import React, { useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import Column from '../Column/Column'
import { initData } from '../../actions/initData'
import _ from 'lodash'
import { mapOrder } from '../../utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utilities/dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [isShowAddList, setIsShowAddList] = useState(false)
    const [valueInput, setValueInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        if (isShowAddList === true && inputRef && inputRef.current) {
            inputRef.current.focus()
        }

    }, [isShowAddList])


    useEffect(() => {
        const boardInitData = initData.boards.find(item => item.id === 'board-1')
        if (boardInitData) {
            setBoard(boardInitData)

            //sort columns
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        }
    }, [])

    if (_.isEmpty(board)) {
        return (
            <>
                <div className='not-found'>Board not FOUND</div>
            </>
        )
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column.id)

        setColumns(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(column => column.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id)
            setColumns(newColumns)
        }
    }

    const handleAddList = () => {
        if (!valueInput) {
            if (inputRef && inputRef.current) {
                inputRef.current.focus()
            }
        }
        const _columns = _.cloneDeep(columns);
        _columns.push({
            id: uuidv4(),
            boardId: board.id,
            title: valueInput,
            cards: []
        })
        setColumns(_columns)
        setValueInput('')
        inputRef.current.focus()
    }

    const onUpdateColumn = (newColumn) => {
        const columIdUpdate = newColumn.id
        let ncols = [...columns]
        let index = ncols.findIndex(item => item.id === columIdUpdate)
        if (newColumn._destroy) {
            ncols.splice(index, 1)
        } else {
            ncols[index] = newColumn
        }
        setColumns(ncols)
    }

    return (
        <div className='board-columns'>
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns && columns.length > 0 && columns.map((column, index) => {
                    return (
                        <Draggable key={column.id}>
                            <Column
                                column={column}
                                onCardDrop={onCardDrop}
                                onUpdateColumn={onUpdateColumn}
                            />
                        </Draggable>
                    )
                })}
            </Container>
            {!isShowAddList ?
                <div
                    className='add-new-column'
                    onClick={() => setIsShowAddList(true)}
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-plus"
                        size='lg'
                        style={{ marginRight: '5px' }}

                    />
                    Add Board
                </div>
                :
                <div className='content-add-column'>
                    <input
                        type='text'
                        className='form-control'
                        ref={inputRef}
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                    />
                    <div className='group-btn'>
                        <button className='btn btn-success'
                            onClick={() => handleAddList()}
                        >
                            Add
                        </button>
                        <FontAwesomeIcon
                            icon="fa-solid fa-xmark"
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                            size='xl'
                            onClick={() => setIsShowAddList(false)} />
                    </div>

                </div>
            }



        </div>
    )
}

export default BoardContent