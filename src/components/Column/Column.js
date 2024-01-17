import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import ConfirmModal from '../Common/ConfimModal';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../utilities/const';

const Column = (props) => {

    const { column, onCardDrop, onUpdateColumn } = props

    const [isShowModalDelete, setShowModalDelete] = useState(false)
    const [titleColumn, setTitleColumn] = useState("")
    const [isFirstClick, setIsFirstClick] = useState(true)
    const [isShowAddNewCard, setIsShowAddNewCard] = useState(false)
    const [valueTextArea, setValueTextArea] = useState("")

    const inputRef = useRef(null)
    const textAreaRef = useRef(null)

    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    useEffect(() => {
        if (isShowAddNewCard === true & textAreaRef & textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [isShowAddNewCard])

    useEffect(() => {
        if (column && column.title) {
            setTitleColumn(column.title)
        }
    }, [column])

    const toggleModal = () => {
        setShowModalDelete(!isShowModalDelete)
    }

    const onModalAction = (type) => {
        if (type === MODAL_ACTION_CLOSE) {
            //do Nothing
        }

        if (type === MODAL_ACTION_CONFIRM) {
            //remove column
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)

        }

        toggleModal()
    }

    const selectAllText = (event) => {
        setIsFirstClick(false)
        if (isFirstClick) {
            event.target.select()
        } else {
            inputRef.current.setSelectionRange(titleColumn.length, titleColumn.length)
        }
        // event.target.focus();
        // event.target.select()
    }

    const handleClickOutside = () => {
        setIsFirstClick(true)
        const newColumn = {
            ...column,
            title: titleColumn,
            _destroy: false
        }
        onUpdateColumn(newColumn)
    }

    const handleAddNewCard = () => {
        if (!valueTextArea) {
            textAreaRef.current.focus()
            return;
        }
        const newCard = {
            id: uuidv4(),
            boardId: column.boardId,
            columnId: column.id,
            title: valueTextArea,
            image: null
        }

        let newColumn = { ...column }
        newColumn.cards = [...newColumn.cards, newCard]
        newColumn.cardOrder = newColumn.cards.map(card => card.id)
        onUpdateColumn(newColumn)
        setValueTextArea("")
        setIsShowAddNewCard(false)
    }



    return (
        <>
            <div className='column'>
                <header className='column-drag-handle'>
                    <div className='column-title'>
                        <Form.Control
                            size='sm'
                            type='text'
                            value={titleColumn}
                            className='customize-input-column'
                            onClick={selectAllText}
                            onChange={(e) => setTitleColumn(e.target.value)}
                            spellCheck='false'
                            onBlur={handleClickOutside}
                            onMouseDown={(e) => e.preventDefault()}
                            ref={inputRef}
                        />
                    </div>
                    <div className='column-dropdown'>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" size='sm'>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item onClick={toggleModal}>Delete Column</Dropdown.Item>
                                <Dropdown.Item>Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </header>
                <div className='card-list'>
                    <Container
                        {...column.props}
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                        getChildPayload={index => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <Draggable key={card.id}>
                                    <Card
                                        card={card}
                                    />
                                </Draggable>
                            )
                        })}
                    </Container>
                    {isShowAddNewCard &&
                        <div className='add-new-card'>
                            <textarea
                                rows={2}
                                className='form-control'
                                placeholder='enter'
                                ref={textAreaRef}
                                value={valueTextArea}
                                onChange={(e) => setValueTextArea(e.target.value)}
                            >

                            </textarea>
                            <div className='group-btn'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => handleAddNewCard()}
                                >
                                    Add
                                </button>
                                <FontAwesomeIcon
                                    icon="fa-solid fa-xmark"
                                    style={{ marginLeft: '10px' }}
                                    size='xl'
                                    color='#b3b3b3'
                                    cursor={"pointer"}
                                    onClick={() => setIsShowAddNewCard(false)}
                                />
                            </div>


                        </div>
                    }

                </div>
                {!isShowAddNewCard &&
                    <footer>
                        <div className='footer-action' onClick={() => setIsShowAddNewCard(true)}>
                            <FontAwesomeIcon
                                icon="fa-solid fa-plus"
                                size='lg'
                                style={{ marginRight: '5px' }}

                            />
                            Add Card
                        </div>

                    </footer>
                }
            </div>

            <ConfirmModal
                show={isShowModalDelete}
                title={"Remove a column"}
                content={`Are you sure to remove this column: <b>${column.title}</b>`}
                onAction={onModalAction}
            />
        </>
    )
}

export default Column