import React from 'react'
import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Column = (props) => {
    const { column, onCardDrop } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')



    return (
        <>
            <div className='column'>
                <header className='column-drag-handle'>{column.title}</header>
                <div className='card-list'>
                    <Container
                        {...column.props}
                        groupName="col"
                        // onDragStart={e => console.log("drag started", e)}
                        // onDragEnd={e => console.log("drag end", e)}
                        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                        getChildPayload={index => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        // onDragEnter={() => {
                        //     console.log("drag enter:", column.id);
                        // }}
                        // onDragLeave={() => {
                        //     console.log("drag leave:", column.id);
                        // }}
                        // onDropReady={p => console.log('Drop ready: ', p)}
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

                </div>
                <footer>
                    <div className='footer-action'>
                        <FontAwesomeIcon
                            icon="fa-solid fa-plus"
                            size='lg'
                            style={{ marginRight: '5px' }}
                        />
                        Add another card
                    </div>

                </footer>
            </div>
        </>
    )
}

export default Column